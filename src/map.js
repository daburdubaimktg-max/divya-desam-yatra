/* ---------- zoomable map (v4) ----------
   Leaflet with an offline vector base (coastline, countries, Indian state lines) because a Claude
   artifact may not load map tiles. On GitHub Pages, set MAP_TILES to an OpenStreetMap tile URL to
   add street detail (see HANDOVER). Every pin links to Google Maps for live navigation. */
const MAP_TILES = '';   // e.g. 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' on GitHub Pages
const STATE_LABELS=[['Tamil Nadu',11.0,78.3],['Kerala',10.1,76.55],['Karnataka',14.6,75.9],['Andhra Pradesh',15.6,79.2],['Telangana',17.9,79.1],['Maharashtra',19.5,76.0],['Gujarat',22.6,71.5],['Uttar Pradesh',26.9,80.6],['Uttarakhand',30.1,79.2],['Nepal',28.3,84.0],['Sri Lanka',7.8,80.7],['Arabian Sea',14.5,70.5],['Bay of Bengal',15.0,86.5]];
const MAP_PLACES=[['Chennai',13.08,80.27],['Tiruchirappalli',10.79,78.70],['Madurai',9.93,78.12],['Kochi',9.97,76.28],['Thiruvananthapuram',8.52,76.94],['Kumbakonam',10.96,79.38],['Tirunelveli',8.73,77.70],['Tirupati',13.63,79.42],['Kanchipuram',12.83,79.70],['Delhi',28.61,77.21],['Mumbai',19.08,72.88],['Bengaluru',12.97,77.59],['Hyderabad',17.39,78.49],['Kathmandu',27.72,85.32],['Lucknow',26.85,80.95],['Haridwar',29.95,78.16],['Mayiladuthurai',11.10,79.65],['Thanjavur',10.79,79.14],['Chengannur',9.32,76.61],['Nagercoil',8.18,77.41],['Thrissur',10.53,76.21],['Sirkazhi',11.24,79.74],['Nagapattinam',10.77,79.84],['Pokhara',28.21,83.99],['Mathura',27.49,77.67],['Dwarka',22.24,68.97],['Rameswaram',9.29,79.31]];
const MAP_SETS={all:['All 106',()=>T.filter(t=>t.n<=106).map(t=>t.n)],south:['South India',()=>T.filter(t=>t.n<=95).map(t=>t.n)],delta:['Kaveri delta',()=>T.filter(t=>t.n<=40&&!t.grp.includes('NG')).map(t=>t.n)],nangur:['Thirunangur eleven',()=>T.filter(t=>t.grp.includes('NG')).map(t=>t.n).concat([28,34])],kanchi:['Kanchi and Chennai',()=>T.filter(t=>t.n>=43&&t.n<=64).map(t=>t.n)],tamra:['Nava Tirupati and far south',()=>T.filter(t=>t.n>=75&&t.n<=88).map(t=>t.n)],kerala:['Kerala',()=>T.filter(t=>t.n>=65&&t.n<=74).map(t=>t.n)],pandya:['Madurai region',()=>T.filter(t=>t.n>=88&&t.n<=95).map(t=>t.n)],north:['North and Nepal',()=>T.filter(t=>t.n>=96&&t.n<=104).map(t=>t.n)],andhra:['Tirumala and Ahobilam',()=>[105,106]]};
const MAP_VIEWS=Object.fromEntries(Object.entries(MAP_SETS).map(([k,[lbl,f]])=>[k,[lbl,null,f]]));
function viewBounds(k){ const ns=MAP_SETS[k][1]().filter(n=>W(n).la); const la=ns.map(n=>W(n).la), lo=ns.map(n=>W(n).lo); const p=Math.max(0.02,(Math.max(...la)-Math.min(...la))*0.08); return [[Math.min(...la)-p,Math.min(...lo)-p],[Math.max(...la)+p,Math.max(...lo)+p]]; }
let LMAP=null, MVIEW='south';
function pinLatLng(){ // spread temples that share coordinates (e.g. four shrines in one Kanchi compound)
  const groups={}, out={};
  T.forEach(t=>{const w=W(t.n); if(!w.la) return; const k=w.la.toFixed(3)+','+w.lo.toFixed(3); (groups[k]=groups[k]||[]).push(t.n);});
  Object.values(groups).forEach(ns=>ns.forEach((n,i)=>{const w=W(n); if(ns.length===1){out[n]=[w.la,w.lo];return;} const a=2*Math.PI*i/ns.length; out[n]=[w.la+0.0007*Math.sin(a), w.lo+0.0007*Math.cos(a)];}));
  return out;
}
const gmapsAt = n => { const w=W(n); return w.la?`https://www.google.com/maps/search/?api=1&query=${w.la}%2C${w.lo}`:`https://www.google.com/maps/search/?api=1&query=${q(byN(n).name+' '+byN(n).aka)}`; };
const gmapsDir = n => { const w=W(n); return `https://www.google.com/maps/dir/?api=1&destination=${w.la}%2C${w.lo}`; };
function routeLinks(ns){ // Google Maps allows a destination plus up to 9 waypoints; start is the phone's location
  const pts=ns.filter(n=>W(n).la); if(!pts.length) return [];
  const left=[...pts], order=[left.shift()];
  while(left.length){ const a=W(order[order.length-1]); let bi=0,bd=1e9; left.forEach((n,i)=>{const b=W(n); const d=(a.la-b.la)**2+(a.lo-b.lo)**2; if(d<bd){bd=d;bi=i;}}); order.push(left.splice(bi,1)[0]); }
  const legs=[]; for(let i=0;i<order.length;i+=10) legs.push(order.slice(i,i+10));
  return legs.map(leg=>{ const dest=leg[leg.length-1], wps=leg.slice(0,-1).map(n=>W(n).la+','+W(n).lo).join('|');
    return {ns:leg, url:`https://www.google.com/maps/dir/?api=1&destination=${W(dest).la}%2C${W(dest).lo}${wps?'&waypoints='+encodeURIComponent(wps):''}&travelmode=driving`}; });
}
function routeHtml(ns){ return routeLinks(ns).map((r,i,a)=>`<a href="${r.url}" target="_blank" rel="noopener">Route in Google Maps${a.length>1?' '+(i+1)+' of '+a.length:''}: ${r.ns.length} stop${r.ns.length>1?'s':''}</a>`).join(''); }

function vMap(){
  if(!window.L) return vMapSvg();
  return `<div class="chips scrollx" style="margin-bottom:8px">${Object.entries(MAP_VIEWS).map(([k,v])=>`<a href="#map" data-mv="${k}" class="${k===MVIEW?'on':''}">${v[0]}</a>`).join('')}</div>
  <div id="lmap" role="region" aria-label="Map of the Divya Desams. Pinch or use the plus and minus buttons to zoom."></div>
  <p class="small muted" style="margin:8px 0">Pinch to zoom. Names appear as you zoom in. Tap a pin for the photo, the temple page, Google Maps and directions. <span class="lg v"></span> visited <span class="lg w"></span> wish list <span class="lg"></span> not yet.</p>
  <div class="box"><b>Want Google's own map with roads and satellite view?</b><p class="small" style="margin:6px 0">Tap any pin and choose Google Maps. For all 108 pins at once inside Google Maps, download the My Maps file below and import it once at mymaps.google.com (Create a new map, Import, choose the file, pick Latitude and Longitude). It then appears in the Google Maps app under Saved, Maps.</p>
   <div class="row"><button id="dl-kml" class="pri">Download for Google My Maps (KML)</button><button id="dl-csv">Download as spreadsheet (CSV)</button></div><p class="small muted" id="dl-msg" style="margin:6px 0 0"></p></div>
  <h3>Drive the circuits in Google Maps</h3><p class="small muted">Each link opens Google Maps with the temples of one base town as stops, starting from where you are. Open it in the Google Maps app; a phone browser allows fewer stops.</p>
  <div class="list">${BASES.map(b=>`<div class="box" style="margin:0"><b>${esc(b.town)}</b> <span class="small muted">· ${b.ns.length} temples</span><div class="links" style="margin-top:6px">${routeHtml(b.ns)}</div></div>`).join('')}</div>`;
}
function pinIcon(n){ const s=D(n).s; return L.divIcon({className:'', iconSize:[30,30], iconAnchor:[15,15], popupAnchor:[0,-12],
  html:`<div class="pin ${s==='v'?'v':s==='w'?'w':''}"><span>${n}</span></div><div class="pinlbl">${esc(byN(n).name)}</div>`}); }
function mapInit(){
  const el=$('#lmap'); if(!el||!window.L) return;
  LMAP=L.map(el,{zoomSnap:0.5,minZoom:4,maxZoom:16,attributionControl:true,worldCopyJump:false,maxBounds:[[-5,55],[42,105]]});
  if(MAP_TILES){ L.tileLayer(MAP_TILES,{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(LMAP); }
  else {
    L.geoJSON(BASEMAP.countries,{interactive:false,style:f=>({color:'#b59a72',weight:0.8,fillColor:f.properties.n==='India'?'#f6ead2':'#ece3d3',fillOpacity:1})}).addTo(LMAP);
    L.geoJSON({type:'Feature',geometry:BASEMAP.states},{interactive:false,style:{color:'#c4a27a',weight:0.7,dashArray:'3 3',fill:false}}).addTo(LMAP);
    LMAP.attributionControl.addAttribution('Boundaries: Natural Earth (via world-atlas, datamaps)');
  }
  STATE_LABELS.forEach(([s,la,lo])=>L.marker([la,lo],{interactive:false,keyboard:false,icon:L.divIcon({className:'stlbl',iconSize:[120,16],iconAnchor:[60,8],html:esc(s)})}).addTo(LMAP));
  MAP_PLACES.forEach(([s,la,lo])=>L.marker([la,lo],{interactive:false,keyboard:false,icon:L.divIcon({className:'citylbl',iconSize:[110,14],iconAnchor:[-4,7],html:'<i></i>'+esc(s)})}).addTo(LMAP));
  const P=pinLatLng();
  Object.entries(P).forEach(([n,ll])=>{ n=+n; const t=byN(n), w=W(n);
    L.marker(ll,{icon:pinIcon(n),title:n+'. '+t.name,riseOnHover:true}).addTo(LMAP).bindPopup(
      `<div class="pop"><img src="${IMG(n)}" alt="" onerror="this.remove()"><b>${n}. ${esc(t.name)}</b><br><span class="ta">${esc(t.ta)}</span><br><span class="small">${esc(t.aka)}</span><br><span class="small">${esc(t.per)} · ${posShort(t)}</span>${statusPill(n)?'<br>'+statusPill(n):''}
       <div class="poplinks"><a href="#t-${n}">Temple page</a><a href="${gmapsAt(n)}" target="_blank" rel="noopener">Google Maps</a><a href="${gmapsDir(n)}" target="_blank" rel="noopener">Directions</a></div></div>`,{maxWidth:240,minWidth:200});
  });
  const zoomCls=()=>{const z=LMAP.getZoom(); el.classList.toggle('z-city',z>=6.5); el.classList.toggle('z-name',z>=10); el.classList.toggle('z-state',z>=5 && z<9);};
  LMAP.on('zoomend',zoomCls);
  LMAP.fitBounds(viewBounds(MVIEW)); zoomCls();
  document.querySelectorAll('[data-mv]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault(); MVIEW=a.dataset.mv; document.querySelectorAll('[data-mv]').forEach(x=>x.classList.toggle('on',x===a)); LMAP.flyToBounds(viewBounds(MVIEW),{duration:0.6});}));
  const dl=async(kind)=>{ const msg=$('#dl-msg'); const data=kind==='kml'?buildKML():buildCSV(); const filename='Divya Desam Yatra - 108 temples.'+kind;
    try{ const d=window.claude&&window.claude.use?await window.claude.use('downloads'):null; if(!d) throw new Error('none'); await d.save({filename,data}); msg.textContent='Saved '+filename+'.'; }
    catch(e){ copy(data, kind.toUpperCase()+' copied. Paste into a new file named '+filename); msg.textContent='Download is not available here, so the file was copied instead. Paste it into a text file named '+filename+'.'; } };
  $('#dl-kml').addEventListener('click',()=>dl('kml')); $('#dl-csv').addEventListener('click',()=>dl('csv'));
}
const xml = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function buildKML(){
  const regs=[...new Set(T.map(t=>t.reg))].filter(r=>r!=='Vinnulagam'); const col={'Chola Nadu':'ff1c1c8a','Nadu Nadu':'ff12a0c0','Thondai Nadu':'ff736e0f','Malai Nadu':'ff2f8f3a','Pandya Nadu':'ff8a1c6d','Vada Nadu':'ff1a5fd0'};
  return `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Divya Desam Yatra: 106 earthly Divya Desams</name><description>From the Divya Desam Yatra app. Coordinates from Wikipedia. Not-for-profit.</description>
${regs.map(r=>`<Style id="s${r.replace(/\W/g,'')}"><IconStyle><color>${col[r]||'ff1c1c8a'}</color><scale>1.1</scale><Icon><href>http://maps.google.com/mapfiles/kml/paddle/wht-blank.png</href></Icon></IconStyle></Style>`).join('\n')}
${regs.map(r=>`<Folder><name>${xml(r)}</name>${T.filter(t=>t.reg===r&&W(t.n).la).map(t=>`<Placemark><name>${t.n}. ${xml(t.name)}</name><styleUrl>#s${r.replace(/\W/g,'')}</styleUrl><description>${xml(t.aka+'. Perumal: '+t.per+'. Thayar: '+t.tha+'. Posture: '+posShort(t)+'. '+t.pearl)}</description><ExtendedData><Data name="Number"><value>${t.n}</value></Data><Data name="Region"><value>${xml(r)}</value></Data><Data name="Tamil"><value>${xml(t.ta)}</value></Data></ExtendedData><Point><coordinates>${W(t.n).lo},${W(t.n).la},0</coordinates></Point></Placemark>`).join('')}</Folder>`).join('\n')}
</Document></kml>`;
}
function buildCSV(){
  const c=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';
  return ['Number,Name,Tamil name,Place,Region,State,Perumal,Thayar,Posture,Latitude,Longitude,Note'].concat(T.filter(t=>W(t.n).la).map(t=>[t.n,t.name,t.ta,t.aka,t.reg,STATE[t.st]||'',t.per,t.tha,posShort(t),W(t.n).la,W(t.n).lo,t.pearl].map(c).join(','))).join('\n');
}
