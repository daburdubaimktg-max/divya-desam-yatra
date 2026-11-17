/* v4 extras: ISKCON centres on the route, abhimana sthalams, the 106 checklist, and a learning quiz. */
const ISKCON = [
 {town:'Tiruchirappalli', name:'ISKCON Srirangam, Sri Jagannath Mandir', where:'Amma Mandapam Road, Srirangam (near the Kaveri bathing ghat)', q:'ISKCON Srirangam Amma Mandapam Road'},
 {town:'Chennai', name:'ISKCON Chennai, Sri Sri Radha Krishna Temple', where:'Bhaktivedanta Swami Road, Akkarai, Sholinganallur, East Coast Road: on the way to Thiruvidanthai and Mamallapuram', q:'ISKCON Chennai Sholinganallur'},
 {town:'Madurai', name:'ISKCON Madurai, Sri Sri Radha Mathurapathi', where:'Maninagaram Main Road, Madurai', q:'ISKCON Madurai Maninagaram'},
 {town:'Tirunelveli', name:'ISKCON Tirunelveli, Sri Sri Krishna Balaram', where:'Trivandrum Road, Kailash Nagar, Tirunelveli', q:'ISKCON Tirunelveli Krishna Balaram'},
 {town:'Thiruvananthapuram and Nagercoil', name:'ISKCON Thiruvananthapuram, Sri Sri Krishna Balaram', where:'Hospital Road, Thycaud, Thiruvananthapuram', q:'ISKCON Thycaud Thiruvananthapuram'},
 {town:'Thiruvananthapuram and Nagercoil', name:'ISKCON Kanyakumari (Nagercoil)', where:'Bhaktivedanta Yoga Centre, Suchindram Akkarai, Nagercoil', q:'ISKCON Nagercoil'},
 {town:'Kochi, Thrissur and Malappuram', name:'ISKCON South Vrindavan', where:'Puthur, Edakkalathur, on the Thrissur to Guruvayur road; guest house on site', q:'ISKCON South Vrindavan Edakkalathur'},
 {town:'Kochi, Thrissur and Malappuram', name:'ISKCON Kochi', where:'Kaloor, Kochi', q:'ISKCON Kochi Kaloor'},
 {town:'Andhra Pradesh', name:'ISKCON Tirupati, Sri Sri Radha Govinda', where:'Hare Krishna Road, Tirupati, at the foot of the Tirumala hills', q:'ISKCON Tirupati'},
 {town:'Mathura', name:'ISKCON Vrindavan, Sri Sri Krishna Balaram Mandir', where:'Raman Reti, Vrindavan: Srila Prabhupada\'s samadhi', q:'ISKCON Vrindavan Krishna Balaram Mandir'}
];
const ABHIMANA = [
 ['Sriperumbudur','Birthplace of Ramanujacharya, 40 km west of Chennai. The Adikesava temple holds the "Thaan Ugandha Thirumeni", the image Ramanuja himself embraced.','Sriperumbudur Adikesava Perumal temple'],
 ['Melkote (Thirunarayanapuram)','Karnataka. Ramanuja lived here twelve years and recovered the processional deity Selvapillai from Delhi; the Muslim princess who loved the Lord is honoured as Bibi Nachiyar.','Melkote Cheluvanarayana Swamy temple'],
 ['Srimushnam','Near Chidambaram. One of the eight self-manifest kshetrams; Bhu Varaha is worshipped.','Srimushnam Bhu Varaha Swamy temple'],
 ['Mannargudi','Near Thiruvarur. Rajagopalaswamy, Krishna as a cowherd with a single cloth and a whip, in a vast temple with a famous tank.','Mannargudi Rajagopalaswamy temple'],
 ['Guruvayur','Kerala, 30 km from Thrissur and close to ISKCON South Vrindavan. Unnikrishna, beloved of Narayana Bhattathiri and Poonthanam.','Guruvayur Sri Krishna temple'],
 ['Udupi','Karnataka. Krishna installed by Sri Madhvacharya, the acharya of the Brahma-Madhva sampradaya. Sri Caitanya Mahaprabhu visited and danced before Him (Caitanya-caritamrta, Madhya 9).','Udupi Sri Krishna Matha'],
 ['Thirumazhisai','Near Poonamallee, Chennai. Birthplace of Thirumazhisai Azhwar, with the Jagannatha Perumal temple.','Thirumazhisai Jagannatha Perumal temple'],
 ['Puri Jagannatha','Odisha. Not a Divya Desam, but Ramanuja established worship here and Mahaprabhu spent eighteen years before Lord Jagannatha.','Jagannath Temple Puri']
];
function iskconFor(town){ return ISKCON.filter(i=>i.town===town); }
function iskconHtml(town){ const xs=iskconFor(town); if(!xs.length||!S.profile.gaudiya) return '';
  return `<p class="small"><b>ISKCON nearby:</b> ${xs.map(i=>`${esc(i.name)}, ${esc(i.where)} <a href="https://www.google.com/maps/search/?api=1&query=${q(i.q)}" target="_blank" rel="noopener">map</a>`).join('; ')}</p>`; }
function vNearby(){
  return `<p>Places that are not among the 108 but are dear to Sri Vaishnavas (abhimana sthalams), and ISKCON temples on the yatra route where a Gaudiya family can take prasadam, find a guest house or join kirtan.</p>
  <h3>Abhimana sthalams</h3><div class="list">${ABHIMANA.map(([n,t,qq])=>`<div class="box" style="margin:0"><b>${esc(n)}</b><p class="small" style="margin:4px 0">${esc(t)}</p><div class="links"><a href="https://www.google.com/maps/search/?api=1&query=${q(qq)}" target="_blank" rel="noopener">Google Maps</a></div></div>`).join('')}</div>
  ${S.profile.gaudiya?`<h3>ISKCON temples on the route</h3><div class="list">${ISKCON.map(i=>`<div class="box" style="margin:0"><b>${esc(i.name)}</b><p class="small" style="margin:4px 0">${esc(i.where)}. Base town in this app: ${esc(i.town)}.</p><div class="links"><a href="https://www.google.com/maps/search/?api=1&query=${q(i.q)}" target="_blank" rel="noopener">Google Maps</a></div></div>`).join('')}</div><p class="note" style="margin-top:10px">Addresses from the ISKCON centres directory and temple listings, November 2026. Check timings and guest-house availability with the temple before travelling.</p>`:''}`;
}
/* ---------- checklist ---------- */
function vChecklist(){
  const regs=[...new Set(T.filter(t=>t.n<=106).map(t=>t.reg))];
  return `<p class="muted">Tick each Divya Desam as you complete darshan. Ticks are the same as "Visited" on the temple pages. ${visited()} of 106 done.</p>
  <div class="row" style="margin-bottom:10px"><button id="ck-copy" class="pri">Copy as text</button><button id="ck-dl">Download (CSV)</button></div>
  ${regs.map(r=>`<h3>${esc(r)}</h3><div class="ck">${T.filter(t=>t.reg===r).map(t=>`<label class="ckrow"><input type="checkbox" data-ck="${t.n}" ${D(t.n).s==='v'?'checked':''}><span class="num">${t.n}</span> <span>${esc(t.name)} <span class="small muted">${esc(t.aka)}</span></span><span class="small muted">${esc(D(t.n).d||'')}</span></label>`).join('')}</div>`).join('')}
  <textarea id="copybox" hidden aria-label="Checklist text"></textarea>`;
}
function checklistText(){ return 'Divya Desam Yatra checklist'+(S.profile.name?' – '+S.profile.name:'')+'\n'+visited()+' of 106 visited\n\n'+T.filter(t=>t.n<=106).map(t=>(D(t.n).s==='v'?'[x] ':'[ ] ')+t.n+'. '+t.name+' ('+t.aka+')'+(D(t.n).d?' – '+D(t.n).d:'')).join('\n'); }
function bindChecklist(){
  document.querySelectorAll('[data-ck]').forEach(c=>c.addEventListener('change',()=>{ const n=+c.dataset.ck; setD(n,{s:c.checked?'v':'', d:D(n).d||''}); toast(c.checked?'Marked visited':'Unmarked'); }));
  $('#ck-copy').addEventListener('click',()=>copy(checklistText(),'Checklist copied'));
  $('#ck-dl').addEventListener('click',async()=>{ const data='Number,Divya Desam,Place,Region,Visited,Date\n'+T.filter(t=>t.n<=106).map(t=>[t.n,t.name,t.aka,t.reg,D(t.n).s==='v'?'Yes':'',D(t.n).d||''].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    try{ const d=window.claude&&window.claude.use?await window.claude.use('downloads'):null; if(!d) throw 0; await d.save({filename:'Divya Desam checklist.csv',data}); }catch(e){ copy(data,'Download not available here; copied instead'); } });
}
/* ---------- quiz ---------- */
let QZ=null;
function rnd(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function makeQ(){
  const earthly=T.filter(t=>t.n<=106);
  const kinds=[
   ()=>{ const t=rnd(earthly.filter(x=>!x.pearl.match(/^(One|A|The) /)||1)); const opts=shuffle([t,...shuffle(earthly.filter(x=>x.n!==t.n)).slice(0,3)]); return {n:t.n,q:'Which Divya Desam is this? "'+t.pearl.split('. ')[0]+'."',opts:opts.map(o=>o.name+' ('+o.aka.split(' (')[0]+')'),a:opts.indexOf(t)}; },
   ()=>{ const t=rnd(earthly); const ps=['Standing','Sitting','Reclining']; const right=posShort(t).split(', ')[0]; return {n:t.n,q:'How does the Lord give darshan at '+t.name+' ('+t.aka.split(' (')[0]+')?',opts:ps,a:ps.indexOf(right)}; },
   ()=>{ const k=rnd(AZ_ORDER.filter(x=>x!=='Mk')); const a=AZ[k]; const opts=shuffle([k,...shuffle(AZ_ORDER.filter(x=>x!==k)).slice(0,3)]); return {q:'Which Azhwar appeared at '+a.born+'?',opts:opts.map(o=>AZ[o].name),a:opts.indexOf(k)}; },
   ()=>{ const t=rnd(earthly.filter(x=>x.tha&&x.tha.length<40)); const opts=shuffle([t,...shuffle(earthly.filter(x=>x.tha!==t.tha)).slice(0,3)]); return {n:t.n,q:'Thayar here is '+t.tha+'. Which temple?',opts:opts.map(o=>o.name+' ('+o.aka.split(' (')[0]+')'),a:opts.indexOf(t)}; },
   ()=>{ const t=rnd(earthly.filter(x=>x.st!=='TN')); const sts=shuffle([...new Set(earthly.map(x=>x.st))].filter(s=>s!==t.st)).slice(0,3); const opts=shuffle([t.st,...sts]); return {n:t.n,q:'In which state or country is '+t.name+' ('+t.aka.split(' (')[0]+')?',opts:opts.map(s=>STATE[s]),a:opts.indexOf(t.st)}; },
   ()=>{ const t=rnd(earthly.filter(x=>Object.keys(x.az).length===1)); const k=Object.keys(t.az)[0]; const opts=shuffle([k,...shuffle(AZ_ORDER.filter(x=>x!==k&&x!=='Mk')).slice(0,3)]); return {n:t.n,q:'Only one Azhwar sang '+t.name+' ('+t.aka.split(' (')[0]+'). Who?',opts:opts.map(o=>AZ[o].name),a:opts.indexOf(k)}; }
  ];
  return rnd(kinds)();
}
function vQuiz(){
  if(!QZ) QZ={q:makeQ(),picked:-1,score:0,asked:0};
  const z=QZ, learnt=Object.keys(S.learnt||{}).length;
  return `<p class="muted">Learn the 108 a little at a time. Correct answers about a temple count it as learnt. Learnt so far: <b>${learnt}</b> of 108. This round: ${z.score} of ${z.asked}.</p>
  <div class="box"><p style="font-size:1.08rem"><b>${esc(z.q.q)}</b></p><div class="list">${z.q.opts.map((o,i)=>`<button class="qopt ${z.picked<0?'':(i===z.q.a?'ok':(i===z.picked?'no':''))}" data-qo="${i}" ${z.picked<0?'':'disabled'}>${esc(o)}</button>`).join('')}</div>
  ${z.picked<0?'':`<p style="margin-top:10px">${z.picked===z.q.a?'Correct.':'Not quite. The answer is highlighted.'} ${z.q.n?`<a href="#t-${z.q.n}">Read about ${esc(byN(z.q.n).name)}</a>`:''}</p><button id="qnext" class="pri">Next question</button>`}</div>`;
}
function bindQuiz(){
  document.querySelectorAll('[data-qo]').forEach(b=>b.addEventListener('click',()=>{ const z=QZ; if(z.picked>=0) return; z.picked=+b.dataset.qo; z.asked++; if(z.picked===z.q.a){ z.score++; if(z.q.n){ S.learnt=S.learnt||{}; S.learnt[z.q.n]=1; save(); } } render(); }));
  const nx=$('#qnext'); if(nx) nx.addEventListener('click',()=>{ QZ.q=makeQ(); QZ.picked=-1; render(); });
}
