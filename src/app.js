/* Divya Desam Yatra — app logic. No framework. State lives in localStorage and, when the page
   is opened as a Claude artifact, is mirrored to the signed-in viewer's private store. */
const APP_VERSION = '5.1 (17 Nov 2026)';
const SHORT = {};
SHORT_RAW.trim().split('\n').forEach(l => { const [n,bk,bl,story,see,when] = l.split('|'); SHORT[+n] = {bk:bk.split(' '),bl,story,see:see.split(';'),when}; });
Object.entries(BLESS_DEEP).forEach(([n,[bk,bl]]) => { SHORT[n] = Object.assign(SHORT[n]||{}, {bk:bk.split(' '),bl}); });
const BL = n => SHORT[n] || {};
const W = n => WIKI[n] || {};
const IMG = k => `img/${String(k).padStart(3,'0')}.jpg`;
const thumb = (t,cls) => `<img class="${cls||'th'}" src="${IMG(t.n)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
const T = RAW.trim().split('\n').map(l => {
  const [n,name,ta,aka,dist,st,per,tha,pos,az,form,grp,pearl] = l.split('|');
  const azm = {}; az.split(' ').filter(Boolean).forEach(x => { const m = x.match(/^([A-Za-z]+?)(\d+)$/); azm[m[1]] = +m[2]; });
  return {n:+n,name,ta,aka,dist,st,per,tha,pos:pos.split(','),az:azm,tot:Object.values(azm).reduce((a,b)=>a+b,0),form,grp:grp?grp.split(' '):[],pearl,reg:REGION(+n)};
});
const byN = n => T[n-1];
const $ = s => document.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const q = s => encodeURIComponent(s);

/* ---------- state ---------- */
const KEY = 'divyadesam-yatra-v1';
let S = {profile:{name:'',withWhom:'',gaudiya:true,big:false}, diary:{}, fb:[], ts:0};
let mem = null;
function loadLocal(){ try{ const r = localStorage.getItem(KEY); if(r) S = Object.assign(S, JSON.parse(r)); }catch(e){ if(mem) S = mem; } }
let cloud = null, cloudTimer = null, cloudState = 'This device only';
function save(){
  S.ts = Date.now();
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){ mem = S; }
  if(cloud){ clearTimeout(cloudTimer); cloudTimer = setTimeout(pushCloud, 1500); }
}
async function pushCloud(){
  try{ await cloud.doc.set({json:JSON.stringify({profile:S.profile,diary:S.diary,ts:S.ts}), ts:S.ts}); cloudState = 'Saved to your Claude account'; }
  catch(e){ cloudState = 'This device only (account save failed)'; }
}
async function initCloud(){
  try{
    if(!window.claude || !window.claude.use) return;
    const [db,user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if(!db || !user) return;
    const id = await user.id(); if(!id) return;
    const doc = db.collection('data/users/'+id).doc('yatra');
    cloud = {db, id, doc};
    let snap = null; try{ snap = await doc.get(); }catch(e){}
    let d = snap && (typeof snap.data==='function' ? snap.data() : (snap.data!==undefined ? snap.data : snap));
    if(d && d.json){
      const r = JSON.parse(d.json);
      if((r.ts||0) > (S.ts||0)){ S.profile = Object.assign(S.profile, r.profile||{}); S.diary = r.diary||{}; S.ts = r.ts; try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} render(); }
      else if((S.ts||0) > (r.ts||0)) pushCloud();
      cloudState = 'Saved to your Claude account';
    } else if(S.ts) pushCloud(); else cloudState = 'Saved to your Claude account';
    if(route().v==='me') render();
  }catch(e){}
}
async function pushFeedback(){
  if(!cloud) return false;
  try{ await cloud.db.collection('feedback').doc(cloud.id).set({name:S.profile.name||'', items:JSON.stringify(S.fb), ts:Date.now()}); return true; }catch(e){ return false; }
}
const D = n => S.diary[n] || {};
function setD(n, patch){ S.diary[n] = Object.assign({}, D(n), patch); if(!S.diary[n].s && !S.diary[n].d && !S.diary[n].note) delete S.diary[n]; save(); }
const visited = () => T.filter(t => D(t.n).s==='v' && t.n<=106).length;

function toast(m){ const d=document.createElement('div'); d.className='toast'; d.textContent=m; document.body.appendChild(d); setTimeout(()=>d.remove(),2200); }
async function copy(text, okMsg){
  try{ await navigator.clipboard.writeText(text); toast(okMsg||'Copied'); }
  catch(e){ const ta=$('#copybox'); if(ta){ ta.hidden=false; ta.value=text; ta.focus(); ta.select(); toast('Select all and copy'); } }
}

/* ---------- routing ---------- */
function route(){
  const h = (location.hash||'#home').slice(1);
  let m;
  if((m=h.match(/^t-(\d+)$/))) return {v:'temple',n:+m[1]};
  if((m=h.match(/^a-(\w+)$/))) return {v:'azhwar',k:m[1]};
  if((m=h.match(/^g-(\w+)$/))) return {v:'group',k:m[1]};
  return {v:h};
}
const TABS = [['home','Home','<path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/>'],['temples','Temples','<path d="M12 2l2 4h-4zM8 6h8l1 4H7zM5 10h14l1 5H4zM3 15h18v6H3zM10 21v-3h4v3"/>'],['azhwars','Azhwars','<circle cx="12" cy="7" r="3.5"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/>'],['journeys','Journeys','<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8 17c6-1 2-9 8-10"/>'],['learn','Learn','<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v13"/>']];
const TITLES = {checklist:'Checklist of the 106',quiz:'Learn the 108',nearby:'Nearby sacred places',map:'Map of the Divya Desams',home:'Divya Desam Yatra',temples:'The 108 Temples',azhwars:'The Twelve Azhwars',journeys:'Journeys and Connections',learn:'Learn',me:'My Yatra',about:'Sources and Thanks'};

/* ---------- pieces ---------- */
const posText = t => t.pos.map(p => POSTURE[p]).join(' · ');
const posShort = t => t.pos.map(p => ({N:'Standing',I:'Sitting',K:'Reclining',D:'Striding'}[p])).join(', ');
function statusPill(n){ const s=D(n).s; return s==='v'?'<span class="pill v">Visited</span>':s==='w'?'<span class="pill w">Wish</span>':''; }
function tRow(t){
  return `<a class="t" href="#t-${t.n}">${thumb(t)}<span><b><span class="num">${t.n}</span> ${esc(t.name)} <span class="ta muted small">${esc(t.ta)}</span></b><span class="sub">${esc(t.aka)}${t.st==='XX'?'':' · '+esc(t.st)}<br>${esc(t.per)}</span><span class="row" style="margin-top:4px"><span class="pill">${posShort(t)}</span>${statusPill(t.n)}</span></span></a>`;
}
const sel = (id,label,opts,val) => `<div><label for="${id}">${label}</label><select id="${id}"><option value="">All</option>${opts.map(([v,l])=>`<option value="${esc(v)}"${v===val?' selected':''}>${esc(l)}</option>`).join('')}</select></div>`;

/* ---------- views ---------- */
let F = {q:'',reg:'',st:'',pos:'',form:'',az:'',grp:'',mine:'',bl:'',face:''};
function applyFilters(){
  const s = F.q.trim().toLowerCase();
  return T.filter(t =>
    (!s || [t.name,t.ta,t.aka,t.per,t.tha,t.dist,String(t.n),BL(t.n).bl||''].join(' ').toLowerCase().includes(s)) &&
    (!F.reg || t.reg===F.reg) && (!F.st || t.st===F.st) && (!F.pos || t.pos.includes(F.pos)) &&
    (!F.form || t.form===F.form) && (!F.bl || (BL(t.n).bk||[]).includes(F.bl)) && (!F.face || (TAW[t.n]||{}).face===F.face) && (!F.az || t.az[F.az]) && (!F.grp || t.grp.includes(F.grp)) &&
    (!F.mine || (F.mine==='n' ? !D(t.n).s : D(t.n).s===F.mine)));
}
function vTemples(){
  const regs=[...new Set(T.map(t=>t.reg))].map(r=>[r,r]);
  const sts=Object.entries(STATE);
  return `<input type="search" id="fq" placeholder="Search name, place, Perumal, Thayar, who was blessed" value="${esc(F.q)}" aria-label="Search temples">
  <div class="filters">
   ${sel('f-reg','Region',regs,F.reg)}${sel('f-st','State',sts,F.st)}
   ${sel('f-pos','Posture of the Lord',Object.entries(POSTURE),F.pos)}${sel('f-form','Form of the Lord',Object.entries(FORM),F.form)}
   ${sel('f-az','Sung by',AZ_ORDER.filter(k=>k!=='Mk').map(k=>[k,AZ[k].name]),F.az)}${sel('f-grp','Group',Object.entries(GROUPS).filter(([k])=>S.profile.gaudiya||!['GT','NN'].includes(k)).map(([k,g])=>[k,g.name]),F.grp)}
   ${sel('f-bl','Blessed by the Lord',Object.entries(BLESS),F.bl)}${sel('f-face','Lord faces',[['East','East'],['West','West'],['South','South'],['North','North']],F.face)}
   ${sel('f-mine','My yatra',[['v','Visited'],['w','Wish to go'],['n','Not yet marked']],F.mine)}
   <div style="align-self:end"><button id="fclear">Clear filters</button></div>
  </div>
  <div id="tlist"></div>`;
}
function drawList(){
  const r = applyFilters();
  $('#tlist').innerHTML = `<p class="count muted small">${r.length} of 108 temples</p><div class="list">${r.map(tRow).join('')||'<p class="muted">No temple matches. Clear a filter and try again.</p>'}</div>`;
}
function vHome(){
  const v = visited(), pct = v/106, C = 2*Math.PI*40;
  const regs = [...new Set(T.filter(t=>t.n<=106).map(t=>t.reg))];
  const day = Math.floor(Date.now()/864e5), p = T[day % 106];
  const wish = T.filter(t=>D(t.n).s==='w').slice(0,4);
  const nm = S.profile.name ? ', '+esc(S.profile.name) : '';
  return `<div class="hero">
   <svg class="ring" viewBox="0 0 100 100" role="img" aria-label="${v} of 106 visited"><circle cx="50" cy="50" r="40" fill="none" stroke="var(--tint)" stroke-width="9"/>${v?`<circle cx="50" cy="50" r="40" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${C*pct} ${C}" transform="rotate(-90 50 50)"/>`:''}<text x="50" y="50" text-anchor="middle" font-size="24">${v}</text><text x="50" y="66" text-anchor="middle" font-size="10" style="font-family:var(--body);fill:var(--muted)">of 106</text></svg>
   <div><h2>Hare Krishna${nm}</h2><p class="muted small" style="margin:0">${v?`${v} Divya Desams visited, ${106-v} to go. The last two are given by the Lord.`:'Mark the temples you have already visited to see your yatra take shape. Open any temple and tap Visited.'}</p>
   <div class="bars">${regs.map(r=>{const a=T.filter(t=>t.reg===r),d=a.filter(t=>D(t.n).s==='v').length;return `<span>${r}</span><span class="bar"><i style="width:${100*d/a.length}%"></i></span><span class="muted">${d}/${a.length}</span>`}).join('')}</div></div>
  </div>
  <h3>Today's temple</h3>
  <a class="today" href="#t-${p.n}"><img src="${IMG(p.n)}" alt="${esc(p.aka)}" onerror="this.remove()"><span class="cap"><b>${p.n}. ${esc(p.name)}</b> <span class="ta">${esc(p.ta)}</span><br><span class="small">${esc(p.aka)}</span></span></a><p class="pearl">${esc(p.pearl)}</p>
  ${wish.length?`<h3>On your wish list</h3><div class="list">${wish.map(tRow).join('')}</div>`:''}
  <h3>Find a temple by</h3>
  <div class="tiles">
   <a href="#temples" data-f="reg"><b>Region and state</b><span>Chola, Pandya, Malai, Thondai, Vada Nadu</span></a>
   <a href="#temples" data-f="pos"><b>Posture of the Lord</b><span>Nindra, Irundha, Kidantha</span></a>
   <a href="#azhwars"><b>Azhwar</b><span>Who sang where, and how much</span></a>
   <a href="#temples" data-f="form"><b>Form of the Lord</b><span>Rama, Krishna, Narasimha, Varaha and more</span></a>
   <a href="#map"><b>Map</b><span>Zoomable map of all 106, with Google Maps routes</span></a>
   <a href="#checklist"><b>Checklist of the 106</b><span>Tick off temples, copy or download</span></a>
   <a href="#quiz"><b>Learn the 108</b><span>A short quiz; ${Object.keys(S.learnt||{}).length} learnt</span></a>
   <a href="#journeys"><b>Groups and base towns</b><span>Nava Tirupati, Nangur, Kanchi, Pancharanga</span></a>
   ${S.profile.gaudiya?'<a href="#g-GT"><b>Mahaprabhu\'s footsteps</b><span>Divya Desams in Caitanya-caritamrta</span></a>':''}
   <a href="#temples" data-deep="1"><b>Long profiles</b><span>${Object.keys(DEEP).length} temples in depth; all 108 have a written profile</span></a>
  </div>
  <p class="note" style="margin-top:18px">Version ${APP_VERSION}. A not-for-profit service project. Facts were compiled from public sources and are still being checked by devotees who know these temples. Use the correction box on any temple page.</p>`;
}
function verse(p){
  const trNote = p.auto?'Transliteration generated letter by letter from the Tamil.':(p.trk?'Transliteration as published on koyil.org.':'');
  const meaning = p.kl?`<a href="${p.kl}" target="_blank" rel="noopener">Meaning and audio on koyil.org</a>`:`<a href="https://www.google.com/search?q=${q('koyil.org '+p.ref+' audio meaning')}" target="_blank" rel="noopener">Meaning and audio on koyil.org</a>`;
  return `<div class="verse"><div class="ref"><b>${esc(p.by)}</b> · ${esc(p.ref)}${p.ndp?` <span class="muted small">(NDP ${p.ndp})</span>`:''}</div><pre class="ta">${esc(p.ta)}</pre><pre class="tr">${esc(p.tr)}</pre>${trNote?`<p class="small muted" style="margin:-6px 0 8px">${trNote}</p>`:''}<div class="draft">${p.v?(p.wk?'Tamil text as quoted in the Tamil Wikipedia article':'Tamil text from '+esc(p.v)):'Tamil text from memory, not yet checked'} · English is a study draft</div><p>${esc(p.en)}</p>${p.note?`<p class="small muted">${esc(p.note)}</p>`:''}${p.src?`<details class="small muted"><summary>Source note for reviewers</summary><p>${esc(p.src)}</p></details>`:''}<div class="links"><a href="https://www.youtube.com/results?search_query=${q(p.by+' '+p.ref+' pasuram')}" target="_blank" rel="noopener">Listen: recitations on YouTube</a>${meaning}${p.sl?`<a href="${p.sl}" target="_blank" rel="noopener">Tamil source text</a>`:''}</div></div>`;
}
function pasuramBlock(n,d){
  const vs=((d&&d.pasuram)||[]).concat(VERSES2.filter(v=>v.ns.includes(n)).map(v=>Object.assign({},v,{tr:tamilTr(v.ta),v:'Tamil Wikipedia (quoted in the temple article)',auto:1,wk:1}))).concat(VERSES5.filter(v=>v.ns.includes(n)).map(v=>Object.assign({},v,v.tr?{trk:1}:{tr:tamilTr(v.ta),auto:1})));
  const refs=SING[n]||[];
  if(!vs.length&&!refs.length) return '';
  return `<h3>Pasuram${vs.length>1?'s':''}</h3>${vs.map(verse).join('')}
  ${refs.length?`<div class="box"><b>Where the Azhwars sing this temple</b><ul class="refs">${refs.map(x=>`<li>${esc(singLabel(x))} <a href="${singSearch(x)}" target="_blank" rel="noopener">text and meaning</a> · <a href="https://www.youtube.com/results?search_query=${q(singLabel(x)+' pasuram')}" target="_blank" rel="noopener">listen</a></li>`).join('')}</ul><p class="small muted" style="margin:0">References from T. R. S. Iyengar's mangalasasanam table and the commentary tradition. Single-verse references are still to be checked by a reviewer.</p></div>`:''}`;
}
function vTemple(n){
  const t = byN(n); if(!t) return '<p>Temple not found.</p>';
  const d = DEEP[n], sh = SHORT[n]||{}, me = D(n), G = S.profile.gaudiya, w = W(n), tw = TAW[n]||{};
  const azs = AZ_ORDER.filter(k=>t.az[k]).map(k=>`<a href="#a-${k}">${esc(AZ[k].name)} ${t.az[k]}</a>`).join('');
  const grps = t.grp.filter(k=>G||!['GT','NN'].includes(k)).map(k=>`<a href="#g-${k}">${esc(GROUPS[k].name)}</a>`).join('');
  const place = t.st==='XX' ? '' : `${t.name} ${t.aka} temple ${t.dist}`;
  const base = BASES.find(b=>b.ns.includes(n));
  return `${t.st!=='XX'||w.ip?`<figure class="heroimg"><img src="${IMG(n)}" alt="${esc(t.aka)}" onerror="this.parentNode.remove()"><figcaption>Photo: ${esc(w.ia||'Wikimedia Commons')}${w.il?', '+esc(w.il):''}${w.ip?` · <a href="${w.ip}" target="_blank" rel="noopener">source</a>`:''}</figcaption></figure>`:''}
  <p class="muted small" style="margin:0">Divya Desam ${t.n} of 108 · ${esc(t.reg)}</p>
  <h2>${esc(t.name)}</h2><p class="ta" style="font-size:1.2rem;margin:0">${esc(t.ta)}</p><p class="muted">${esc(t.aka)}</p>
  ${t.st!=='XX'?`<div class="row" role="group" aria-label="My yatra status"><button id="bv" class="${me.s==='v'?'on':''}">${me.s==='v'?'Visited ✓':'Mark visited'}</button><button id="bw" class="${me.s==='w'?'on':''}">${me.s==='w'?'On wish list ✓':'Wish to go'}</button></div>`:''}
  <p class="pearl">${esc(t.pearl)}</p>
  <dl class="facts">
   <dt>Perumal</dt><dd>${esc(t.per)}</dd><dt>Thayar</dt><dd>${esc(t.tha)}</dd>
   <dt>Posture</dt><dd>${posText(t)}</dd><dt>Form</dt><dd>${esc(FORM[t.form])}</dd>
   <dt>Place</dt><dd>${esc(t.dist)}${t.st==='XX'?'':', '+esc(STATE[t.st])}</dd>
   <dt>Sung by</dt><dd><div class="chips">${azs}</div><span class="small muted">${t.tot} pasurams in the tabulation used here</span></dd>
   ${sh.bl?`<dt>Blessed here</dt><dd>${esc(sh.bl)} <span class="small muted">(as told in the sthala purana)</span></dd>`:''}
   ${grps?`<dt>Belongs to</dt><dd><div class="chips">${grps}</div></dd>`:''}
   ${tw.face?`<dt>Facing</dt><dd>${tw.face}</dd>`:''}${w.tw?`<dt>Vimanam</dt><dd>${esc(w.tw)}</dd>`:tw.vim?`<dt>Vimanam</dt><dd class="ta">${esc(tw.vim)}</dd>`:''}${w.tk?`<dt>Temple tank</dt><dd>${esc(w.tk)}${tw.tank?`<br><span class="ta small">${esc(tw.tank)}</span>`:''}</dd>`:tw.tank?`<dt>Temple tank</dt><dd class="ta">${esc(tw.tank)}</dd>`:''}${tw.tree?`<dt>Sacred tree</dt><dd class="ta">${esc(tw.tree)}</dd>`:''}${tw.prat?`<dt>Pratyaksham</dt><dd class="ta">${esc(tw.prat)}</dd>`:''}${w.fs?`<dt>Festivals</dt><dd>${esc(w.fs)}</dd>`:''}${w.cr?`<dt>Built by</dt><dd>${esc(w.cr)}</dd>`:''}
   ${base?`<dt>Base town</dt><dd>${esc(base.town)}. <span class="muted small">${esc(base.tip)}</span></dd>`:''}
  </dl>
  ${d?`
   <h3>Sthala purana</h3><p>${esc(d.story)}</p>
   ${d.see?`<h3>Do not miss</h3><ul>${d.see.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
   ${d.customs?`<h3>Unique traditions</h3><ul>${d.customs.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
   ${d.festivals?`<h3>Festivals</h3><p>${esc(d.festivals)}</p>`:''}
   ${d.when?`<h3>Planning your visit</h3><p>${esc(d.when)}</p>`:''}
   ${G&&d.gaudiya?`<h3>For the Gaudiya pilgrim</h3><div class="gbox"><p>${esc(d.gaudiya)}</p></div>`:''}
  `:sh.story?`
   <h3>About this temple</h3><p>${esc(sh.story)}</p>
   <h3>Do not miss</h3><ul>${sh.see.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
   <h3>Planning your visit</h3><p>${esc(sh.when)}</p>`:''}
  ${pasuramBlock(n,d)}
  ${(w.x||w.d)?`<h3>From Wikipedia</h3><div class="wk"><p>${esc(d||sh.story?(w.d||w.x):(w.x||w.d))}</p><p class="small muted">Text from Wikipedia, CC BY-SA 4.0. ${w.t?`<a href="https://en.wikipedia.org/wiki/${encodeURI(w.t)}" target="_blank" rel="noopener">Read the full article</a>`:''}</p></div>`:''}
  ${w.more?`<div class="gal">${w.more.map(m=>`<figure><img src="img/${m.k}.jpg" alt="${esc(m.name)}" loading="lazy" onerror="this.parentNode.remove()"><figcaption>${esc(m.name)} · Photo: ${esc(m.a||'Wikimedia Commons')}${m.l?', '+esc(m.l):''}</figcaption></figure>`).join('')}</div>`:''}
  ${t.st!=='XX'?`<h3>Links</h3><div class="links">
   <a href="https://www.google.com/maps/search/?api=1&query=${w.la?w.la+'%2C'+w.lo:q(place)}" target="_blank" rel="noopener">Google Maps</a>
   ${w.la?`<a href="https://www.google.com/maps/dir/?api=1&destination=${w.la}%2C${w.lo}" target="_blank" rel="noopener">Directions</a>`:''}
   <a href="https://www.youtube.com/results?search_query=${q(t.name+' '+t.aka+' divya desam temple')}" target="_blank" rel="noopener">YouTube</a>
   <a href="https://en.wikipedia.org/wiki/Special:Search?search=${q(t.name+' '+t.aka+' temple')}" target="_blank" rel="noopener">Wikipedia</a>
   <a href="https://www.google.com/search?q=${q(t.name+' divya desam pasurams meaning '+t.aka)}" target="_blank" rel="noopener">Pasurams and meaning</a>
   ${(d&&d.official)||w.ws?`<a href="${(d&&d.official)||w.ws}" target="_blank" rel="noopener">Official website</a>`:`<a href="https://www.google.com/search?q=${q(t.aka+' '+t.name+' temple official website timings contact')}" target="_blank" rel="noopener">Timings and contact</a>`}
  </div>
  <h3>My darshan diary</h3><div class="box">
   <label for="dd">Date of visit</label><input type="date" id="dd" value="${esc(me.d||'')}">
   <label for="dn">What I want to remember: the Lord's name, the darshan, who was with us</label><textarea id="dn">${esc(me.note||'')}</textarea>
   <p class="small muted" style="margin:6px 0 0" id="dsaved">Notes save as you type.</p></div>`:''}
  <h3>Suggest a correction</h3><div class="box"><label for="fbx">Something wrong or missing on this page? Names, posture, pasuram count, translation, story.</label><textarea id="fbx" placeholder="For example: The Thayar's name here is ..."></textarea><div class="row" style="margin-top:8px"><button id="fbs" class="pri">Save correction</button><span class="small muted">Saved corrections are listed under My Yatra, where you can copy and send them.</span></div></div>
  <div class="pn">${n>1?`<a href="#t-${n-1}">← ${n-1} ${esc(byN(n-1).name)}</a>`:'<span></span>'}${n<108?`<a href="#t-${n+1}" style="text-align:right">${n+1} ${esc(byN(n+1).name)} →</a>`:''}</div>`;
}
function vAzhwars(){
  return `<p class="muted">Eleven Azhwars sang the Divya Desams. Madhurakavi sang only of his teacher, Nammazhwar. Tap a name for the temples each one praised.</p><div class="list">${AZ_ORDER.map(k=>{const a=AZ[k],c=T.filter(t=>t.az[k]).length,v=T.reduce((s,t)=>s+(t.az[k]||0),0);return `<a class="t" href="#a-${k}"><span class="n">${c||'–'}<small>temples</small></span><span><b>${esc(a.name)} <span class="ta muted small">${esc(a.ta)}</span></b><span class="sub">${esc(a.works)}</span></span><span class="side"><span class="pill">${v?v+' verses on temples':'on his guru'}</span></span></a>`}).join('')}</div>
  <p class="note" style="margin-top:14px">Temple and verse counts are computed from the tabulation used in this app. Traditional counts differ slightly between sources because some verses name several temples.</p>`;
}
function vAzhwar(k){
  const a = AZ[k]; if(!a) return '<p>Not found.</p>';
  const ts = T.filter(t=>t.az[k]).sort((x,y)=>y.az[k]-x.az[k]);
  const only = ts.filter(t=>Object.keys(t.az).length===1);
  return `<h2>${esc(a.name)}</h2><p class="ta" style="font-size:1.15rem">${esc(a.ta)}</p><p>${esc(a.about)}</p>
  <dl class="facts"><dt>Appeared at</dt><dd>${esc(a.born)}</dd><dt>Month and star</dt><dd>${esc(a.star)}</dd><dt>Regarded as</dt><dd>${esc(a.amsa)}</dd><dt>Works</dt><dd>${esc(a.works)}</dd></dl>
  ${ts.length?`<h3>${ts.length} Divya Desams sung</h3>${only.length?`<p class="muted small">${only.length} of these were sung by no other Azhwar.</p>`:''}<div class="list">${ts.map(t=>`<a class="t" href="#t-${t.n}"><span class="n">${t.az[k]}<small>verses</small></span><span><b>${t.n}. ${esc(t.name)}</b><span class="sub">${esc(t.aka)}</span></span><span class="side">${statusPill(t.n)}</span></a>`).join('')}</div>`:'<p class="note">His eleven verses, Kanninun Siruthambu, praise Nammazhwar of Kurugur. See Azhwar Thirunagari (87) and his birthplace Thirukkolur (85).</p>'}`;
}
function vJourneys(){
  const G = S.profile.gaudiya;
  const many = T.filter(t=>Object.keys(t.az).length>=6).sort((a,b)=>Object.keys(b.az).length-Object.keys(a.az).length);
  const big = [...T].sort((a,b)=>b.tot-a.tot).slice(0,6);
  const pc = k => T.filter(t=>t.pos.includes(k)).length;
  return `<p><a class="bigbtn" href="#map">Open the map of all 106 temples</a></p><p><a href="#nearby">Abhimana sthalams and ISKCON temples on the route</a></p><h3 style="margin-top:0">Sacred groups</h3><div class="tiles">${Object.entries(GROUPS).filter(([k])=>G||!['GT','NN'].includes(k)).map(([k,g])=>{const a=T.filter(t=>t.grp.includes(k));return `<a href="#g-${k}"><b>${esc(g.name)}</b><span>${a.length} Divya Desams · ${a.filter(t=>D(t.n).s==='v').length} visited</span></a>`}).join('')}</div>
  <h3>Plan by base town</h3>${BASES.map(b=>{const d=b.ns.filter(n=>D(n).s==='v').length;return `<details><summary>${esc(b.town)} <span class="muted small" style="font-family:var(--body)">· ${b.ns.length} temples · ${d} visited</span></summary><p>${esc(b.tip)}</p>${iskconHtml(b.town)}<div class="links" style="margin-bottom:10px">${routeHtml(b.ns)}</div><div class="list" style="margin-bottom:14px">${b.ns.map(n=>tRow(byN(n))).join('')}</div></details>`}).join('')}
  <h3>Threads that connect the temples</h3>
  <div class="box"><b>Sung by the most Azhwars</b><p class="small muted">The temples that drew nearly every saint.</p><div class="chips">${many.map(t=>`<a href="#t-${t.n}">${esc(t.name)} · ${Object.keys(t.az).length} Azhwars</a>`).join('')}</div></div>
  <div class="box"><b>Most verses</b><div class="chips" style="margin-top:6px">${big.map(t=>`<a href="#t-${t.n}">${esc(t.name)} · ${t.tot}</a>`).join('')}</div></div>
  <div class="box"><b>How the Lord gives darshan</b><p style="margin:6px 0 0">Standing in ${pc('N')} temples, sitting in ${pc('I')}, reclining in ${pc('K')}. A few temples show more than one posture; Thiruneermalai shows four. <span class="muted small">Counts from this app's data; the traditional tally is 60 standing, 21 sitting and 27 reclining.</span></p></div>
  <div class="box"><b>One story, several temples</b><ul style="margin-top:6px">
   <li>Brahma's sacrifice at Kanchi: <a href="#t-45">45</a>, <a href="#t-44">44</a>, <a href="#t-46">46</a>, <a href="#t-51">51</a>, <a href="#t-43">43</a>.</li>
   <li>Jatayu's last rites: <a href="#t-10">Pullabhoothangudi</a> and <a href="#t-57">Thiruputkuzhi</a>.</li>
   <li>Trivikrama measuring the worlds: <a href="#t-28">Sirkazhi</a>, <a href="#t-42">Thirukkovalur</a>, <a href="#t-50">Ooragam</a>; and Vamana at <a href="#t-67">Thrikkakara</a>.</li>
   <li>Thirumazhisai Azhwar and the Lord who obeys: <a href="#t-51">Thiruvekka</a> and <a href="#t-12">Kumbakonam</a>.</li>
   <li>Andal's garland travels from <a href="#t-88">Srivilliputhur</a> to <a href="#t-106">Tirumala</a> and <a href="#t-91">Azhagar Koil</a>; she herself went to <a href="#t-1">Srirangam</a>.</li>
   <li>Ramanuja's road: study at <a href="#t-57">Thiruputkuzhi</a>, service at <a href="#t-43">Kanchi</a>, the mantra at <a href="#t-93">Thirukoshtiyur</a>, his life at <a href="#t-1">Srirangam</a>, Andal's vow at <a href="#t-91">Azhagar Koil</a>.</li>
   <li>The birth and recovery of the Prabandham: first verses at <a href="#t-42">Thirukkovalur</a>, lost verses heard at <a href="#t-12">Kumbakonam</a>, all recovered at <a href="#t-87">Azhwar Thirunagari</a>.</li>
   <li>Shiva within Vishnu's temple and Vishnu within Shiva's: <a href="#t-3">Uthamar Koil</a>, <a href="#t-7">Kandiyur</a>, <a href="#t-40">Chidambaram</a>, <a href="#t-49">Nilathingal Thundam</a>, <a href="#t-54">Kalvanur</a>.</li>
  </ul></div>`;
}
function vGroup(k){
  const g = GROUPS[k]; if(!g) return '<p>Not found.</p>';
  const a = T.filter(t=>t.grp.includes(k));
  return `<h2>${esc(g.name)}</h2><p>${esc(g.text)}</p><p class="count muted small">${a.length} Divya Desams · ${a.filter(t=>D(t.n).s==='v').length} visited</p><div class="list">${a.map(tRow).join('')}</div>`;
}
function vLearn(){
  const G = S.profile.gaudiya;
  return LEARN.filter(a=>G||!['syn','route'].includes(a.id)).map((a,i)=>`<details${i===0?' open':''}><summary>${esc(a.title)}</summary><div class="art">${a.html.replace(/<table>/g,'<div class="tablewrap"><table>').replace(/<\/table>/g,'</table></div>')}</div></details>`).join('')+`<p style="margin-top:16px"><a href="#about">Sources and acknowledgements</a></p>`;
}
function vMe(){
  const list = T.filter(t=>D(t.n).s||D(t.n).note||D(t.n).d);
  return `<h3 style="margin-top:0">About you</h3><div class="box">
   <label for="pn">Your name, as you would like to be greeted</label><input type="text" id="pn" value="${esc(S.profile.name)}" placeholder="For example: Nishant and Sujatha">
   <label for="pw">Travelling with</label><input type="text" id="pw" value="${esc(S.profile.withWhom)}" placeholder="Family, parents, friends">
   <div class="row" style="margin-top:12px"><button id="tg" class="${S.profile.gaudiya?'on':''}" aria-pressed="${S.profile.gaudiya}">Gaudiya Vaishnava notes: ${S.profile.gaudiya?'shown':'hidden'}</button><button id="tb" class="${S.profile.big?'on':''}" aria-pressed="${S.profile.big}">Larger text: ${S.profile.big?'on':'off'}</button></div>
   <p class="small muted" style="margin:10px 0 0">Your diary is stored: ${esc(cloudState)}. Each person who opens this app has a separate diary.</p></div>
  <h3>My yatra so far</h3><p class="muted small">${visited()} of 106 visited · ${T.filter(t=>D(t.n).s==='w').length} on the wish list</p>
  <div class="list">${list.map(t=>`<a class="t" href="#t-${t.n}"><span class="n">${t.n}</span><span><b>${esc(t.name)}</b><span class="sub">${D(t.n).d?esc(D(t.n).d)+' · ':''}${esc((D(t.n).note||'').slice(0,90))}</span></span><span class="side">${statusPill(t.n)}</span></a>`).join('')||'<p class="muted">Nothing marked yet. Open a temple and tap Mark visited.</p>'}</div>
  <h3>Backup</h3><div class="box"><p class="small">Copy your diary as text to keep it safe or move it to another device. To restore, paste a backup below and tap Restore.</p><div class="row"><button id="bk">Copy my diary backup</button><button id="rs">Restore from pasted backup</button></div><textarea id="copybox" style="margin-top:8px" placeholder="Paste a backup here to restore" aria-label="Backup text"></textarea>
   <p class="small" style="margin:12px 0 6px">Or keep the backup as a file, for example in Files or iCloud Drive.</p><div class="row"><button id="bkf">Download backup as file</button><button id="rsf">Restore from file</button></div><input type="file" id="rsfile" accept=".json,application/json,text/plain" hidden aria-label="Choose a backup file"></div>
  <h3>My corrections and feedback (${S.fb.length})</h3><div class="box">${S.fb.length?`<ul>${S.fb.map((f,i)=>`<li><b>${f.n?esc(f.n+'. '+byN(f.n).name):'General'}</b>: ${esc(f.text)} <button data-del="${i}" class="small" aria-label="Delete this correction">Delete</button></li>`).join('')}</ul><div class="row"><button id="fbc" class="pri">Copy all to send</button></div><p class="small muted" style="margin:8px 0 0">Paste into WhatsApp or email to the person who shared this app with you.</p><div class="links" style="margin-top:8px"><a href="${esc(correctionsMailto())}">Send by email</a>${repoUrl()?`<a href="${esc(repoUrl())}/issues" target="_blank" rel="noopener">Report on GitHub (Issues)</a>`:''}</div>`:'<p class="muted" style="margin:0">Corrections you save on temple pages appear here.</p>'}
   <label for="fbg">General feedback</label><textarea id="fbg" placeholder="Ideas, missing features, things that are hard to use"></textarea><div class="row" style="margin-top:8px"><button id="fbgs">Save feedback</button></div></div>
  <p style="margin-top:16px"><a href="#about">Sources and acknowledgements</a> · Version ${APP_VERSION}</p>`;
}
function vAbout(){
  return `<p>This app is a not-for-profit offering of service, made for the pleasure of the devotees and of Sriman Narayana and His consort. Nothing here is sold.</p>
  <h3>Dedication</h3><p>To the twelve Azhwars; to Bhagavad Ramanujacharya and the acharyas of the Sri sampradaya who preserved these temples and hymns; to Sri Caitanya Mahaprabhu, who walked this land in 1510; and to His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.</p>
  <h3>Sources</h3><ul>${SOURCES.map(([t,u,w])=>`<li>${u?`<a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`:esc(t)}<br><span class="small muted">${esc(w)}</span></li>`).join('')}</ul>
  <h3>How the content was prepared</h3><p>Core facts for all 108 temples were compiled from the public sources above by Claude (Anthropic) at the request of Nishant Sukumaran in November 2026, then arranged and summarised. Where sources disagreed, the choice made is recorded in the project handover notes.</p>
  <p><b>Pasurams.</b> The Tamil text is the ancient text of the Azhwars. The transliteration and English renderings were drafted for this app as study aids. They are not an authorised translation and have not yet been reviewed by a Sri Vaishnava scholar. For the traditional meaning, please consult the commentaries of Periyavachan Pillai and the published translations of the sampradaya.</p>
  <p><b>Accuracy.</b> Names of deities, postures, pasuram counts and legends vary between sources and local tradition. Temple timings, phone numbers and darshan rules change often and are deliberately not listed; use the links on each temple page. Please send corrections.</p>
  <p><b>Photographs.</b> Every photograph comes from Wikimedia Commons under a free licence (Creative Commons or public domain), reduced in size for the phone. The photographer and licence are shown under each picture, with a link to the original. No photographs were taken from printed books or other apps.</p>
  <details><summary>Photo credits for all temples</summary><ul class="small">${T.map(t=>{const w=W(t.n);return w.ip?`<li>${t.n}. ${esc(t.name)}: ${esc(w.ia||'unknown')}, ${esc(w.il)} · <a href="${w.ip}" target="_blank" rel="noopener">original</a></li>`:''}).join('')}</ul></details>
  <p><b>Wikipedia text.</b> The passages headed "About this temple" or "From Wikipedia" are taken from the English Wikipedia article for each temple and are available under the Creative Commons Attribution-ShareAlike 4.0 licence. They have been shortened.</p>`;
}


/* ---------- map ---------- */
const CITIES=[['Chennai',13.08,80.27],['Tiruchirappalli',10.79,78.70],['Madurai',9.93,78.12],['Kochi',9.97,76.28],['Thiruvananthapuram',8.52,76.94],['Kumbakonam',10.96,79.38],['Tirunelveli',8.73,77.70],['Tirupati',13.63,79.42],['Kanchipuram',12.83,79.70],['Delhi',28.61,77.21],['Mumbai',19.08,72.88],['Kolkata',22.57,88.36],['Bengaluru',12.97,77.59],['Hyderabad',17.39,78.49],['Kathmandu',27.72,85.32],['Lucknow',26.85,80.95],['Haridwar',29.95,78.16],['Mayiladuthurai',11.10,79.65],['Thanjavur',10.79,79.14],['Chengannur',9.32,76.61]];
const ZOOMS={south:['South India',7.9,14.3,75.6,80.6],delta:['Kaveri delta',10.55,11.55,78.5,79.95],kanchi:['Kanchi and Chennai',12.55,13.3,79.3,80.4],tamra:['Tamraparni and far south',8.1,9.75,76.8,78.6],kerala:['Kerala',9.0,11.1,75.8,77.0],north:['All India and Nepal',7.5,31.5,68,89]};
let MZ='south', MSEL=0;
function vMapSvg(){
  const [label,la0,la1,lo0,lo1]=ZOOMS[MZ]; const k=Math.cos((la0+la1)/2*Math.PI/180);
  const Wd=1000, Ht=Math.round(Wd*(la1-la0)/((lo1-lo0)*k));
  const X=lo=>(lo-lo0)/(lo1-lo0)*Wd, Y=la=>(la1-la)/(la1-la0)*Ht;
  const inb=(la,lo)=>la>=la0&&la<=la1&&lo>=lo0&&lo<=lo1;
  const pts=T.filter(t=>W(t.n).la&&inb(W(t.n).la,W(t.n).lo));
  const r=MZ==='north'||MZ==='south'?19:25;
  const sel=MSEL?byN(MSEL):null;
  return `<div class="chips" style="margin-bottom:10px">${Object.entries(ZOOMS).map(([z,v])=>`<a href="#map" data-z="${z}" class="${z===MZ?'on':''}">${v[0]}</a>`).join('')}</div>
  <div class="mapbox"><svg viewBox="0 0 ${Wd} ${Ht}" role="img" aria-label="Map of Divya Desams: ${label}">
   ${CITIES.filter(c=>inb(c[1],c[2])).map(c=>`<g class="city"><rect x="${X(c[2])-5}" y="${Y(c[1])-5}" width="10" height="10"/><text x="${X(c[2])+12}" y="${Y(c[1])+9}">${c[0]}</text></g>`).join('')}
   ${pts.map(t=>{const w=W(t.n),s=D(t.n).s;return `<g class="dot ${s==='v'?'v':s==='w'?'w':''} ${t.n===MSEL?'sel':''}" data-n="${t.n}" tabindex="0" role="button" aria-label="${t.n} ${esc(t.name)}"><circle cx="${X(w.lo).toFixed(1)}" cy="${Y(w.la).toFixed(1)}" r="${r}"/><text x="${X(w.lo).toFixed(1)}" y="${(Y(w.la)+r*0.38).toFixed(1)}" font-size="${r*0.95}">${t.n}</text></g>`}).join('')}
  </svg></div>
  <p class="small muted" style="margin:8px 0">${pts.length} temples in this view. <span class="lg v"></span> visited <span class="lg w"></span> wish list <span class="lg"></span> not yet. Tap a number. Where temples crowd together, choose a closer view above.</p>
  <div id="mapsel">${sel?tRow(sel):''}</div>
  <p class="note">A schematic map drawn from each temple's latitude and longitude (from Wikipedia). It shows relative position only, with no borders or roads. Use Google Maps on the temple page for travel.</p>`;
}

/* ---------- render and events ---------- */
function render(){
  if(LMAP){ try{LMAP.remove();}catch(e){} LMAP=null; }
  const r = route();
  document.body.classList.toggle('big', !!S.profile.big);
  let html, title = TITLES[r.v], tab = r.v;
  if(r.v==='temple'){ html = vTemple(r.n); title = 'Divya Desam '+r.n; tab='temples'; }
  else if(r.v==='azhwar'){ html = vAzhwar(r.k); title = 'Azhwar'; tab='azhwars'; }
  else if(r.v==='group'){ html = vGroup(r.k); title = 'Sacred group'; tab='journeys'; }
  else if(r.v==='temples') html = vTemples();
  else if(r.v==='azhwars') html = vAzhwars();
  else if(r.v==='journeys') html = vJourneys();
  else if(r.v==='learn') html = vLearn();
  else if(r.v==='map'){ html = vMap(); tab='journeys'; }
  else if(r.v==='checklist'){ html = vChecklist(); tab='home'; }
  else if(r.v==='quiz'){ html = vQuiz(); tab='learn'; }
  else if(r.v==='nearby'){ html = vNearby(); tab='journeys'; }
  else if(r.v==='me') html = vMe();
  else if(r.v==='about'){ html = vAbout(); tab='learn'; }
  else { html = vHome(); title = TITLES.home; tab='home'; }
  $('#title').textContent = title;
  $('#back').hidden = !(['temple','azhwar','group','me','about','map','checklist','quiz','nearby'].includes(r.v));
  $('main').innerHTML = html; $('main').scrollTop = 0;
  $('nav').innerHTML = TABS.map(([k,l,p])=>`<a href="#${k}" class="${k===tab?'on':''}"><svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>${l}</a>`).join('');
  bind(r);
}
function bind(r){
  if(r.v==='temples'){
    drawList();
    $('#fq').addEventListener('input', e=>{F.q=e.target.value; drawList();});
    ['reg','st','pos','form','az','grp','mine','bl','face'].forEach(k=>$('#f-'+k).addEventListener('change', e=>{F[k]=e.target.value; drawList();}));
    $('#fclear').addEventListener('click', ()=>{F={q:'',reg:'',st:'',pos:'',form:'',az:'',grp:'',mine:'',bl:'',face:''}; render();});
  }
  if(r.v==='home'||!TITLES[r.v]&&!['temple','azhwar','group'].includes(r.v)){
    document.querySelectorAll('.tiles a[data-f]').forEach(a=>a.addEventListener('click', ()=>{ setTimeout(()=>{const el=$('#f-'+a.dataset.f); if(el) el.focus();},60); }));
    const dp = document.querySelector('.tiles a[data-deep]'); if(dp) dp.addEventListener('click', e=>{ e.preventDefault(); location.hash='#g-DEEP'; });
  }
  if(r.v==='checklist') bindChecklist();
  if(r.v==='quiz') bindQuiz();
  if(r.v==='map' && window.L){ mapInit(); }
  else if(r.v==='map'){
    document.querySelectorAll('[data-z]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();MZ=a.dataset.z;render();}));
    document.querySelectorAll('.dot').forEach(g=>{const go=()=>{MSEL=+g.dataset.n;document.querySelectorAll('.dot.sel').forEach(x=>x.classList.remove('sel'));g.classList.add('sel');$('#mapsel').innerHTML=tRow(byN(MSEL));};g.addEventListener('click',go);g.addEventListener('keydown',e=>{if(e.key==='Enter')go();});});
  }
  if(r.v==='temple'){
    const n=r.n, b=(id,fn)=>{const el=$(id); if(el) el.addEventListener('click',fn);};
    b('#bv',()=>{ const on=D(n).s==='v'; setD(n,{s:on?'':'v', d:D(n).d||''}); render(); toast(on?'Removed from visited':'Marked visited'); });
    b('#bw',()=>{ const on=D(n).s==='w'; setD(n,{s:on?'':'w'}); render(); });
    const dd=$('#dd'), dn=$('#dn');
    if(dd) dd.addEventListener('change',()=>{ setD(n,{d:dd.value}); $('#dsaved').textContent='Saved.'; });
    if(dn) dn.addEventListener('input',()=>{ setD(n,{note:dn.value}); $('#dsaved').textContent='Saved.'; });
    b('#fbs',async()=>{ const v=$('#fbx').value.trim(); if(!v){toast('Write the correction first');return;} S.fb.push({n,text:v,t:Date.now()}); save(); $('#fbx').value=''; const ok=await pushFeedback(); toast(ok?'Saved and shared with the app owner':'Saved under My Yatra'); });
  }
  if(r.v==='me'){
    $('#pn').addEventListener('input',e=>{S.profile.name=e.target.value; save();});
    $('#pw').addEventListener('input',e=>{S.profile.withWhom=e.target.value; save();});
    $('#tg').addEventListener('click',()=>{S.profile.gaudiya=!S.profile.gaudiya; save(); render();});
    $('#tb').addEventListener('click',()=>{S.profile.big=!S.profile.big; save(); render();});
    $('#bk').addEventListener('click',()=>copy(backupText(),'Backup copied'));
    $('#rs').addEventListener('click',()=>restoreBackup($('#copybox').value));
    bindMeFiles();
    const fc=$('#fbc'); if(fc) fc.addEventListener('click',()=>copy(correctionsText(),'Corrections copied'));
    document.querySelectorAll('[data-del]').forEach(x=>x.addEventListener('click',()=>{S.fb.splice(+x.dataset.del,1); save(); pushFeedback(); render();}));
    $('#fbgs').addEventListener('click',async()=>{ const v=$('#fbg').value.trim(); if(!v) return; S.fb.push({n:0,text:v,t:Date.now()}); save(); await pushFeedback(); render(); toast('Feedback saved'); });
  }
}
/* virtual group: temples with full profiles */
GROUPS.DEEP = {name:'Temples with long profiles',text:'These temples have the longest pages: sthala purana, what not to miss, unique traditions, festivals, planning notes, a note for the Gaudiya pilgrim and usually a pasuram. Every other temple has a shorter hand-written profile.'};
Object.keys(DEEP).forEach(n=>byN(+n).grp.push('DEEP'));
window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', ()=>{
  loadLocal();
  $('#back').addEventListener('click', ()=>history.length>1?history.back():(location.hash='#home'));
  $('#mebtn').addEventListener('click', ()=>{location.hash='#me';});
  render(); initCloud();
});
