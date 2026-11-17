/* ---------- files, corrections links, offline install (v5.1, GitHub Pages) ----------
   Everything here is harmless inside the Claude artifact and when index.html is opened from disk. */
function repoUrl(){
  if(REPO_URL) return REPO_URL.replace(/\/+$/,'');
  const m = location.hostname.match(/^([a-z0-9-]+)\.github\.io$/i), seg = location.pathname.split('/').filter(Boolean)[0];
  return m ? 'https://github.com/'+m[1]+'/'+(seg && !/\.html?$/i.test(seg) ? seg : m[1]+'.github.io') : '';
}
/* Save text as a file. In the Claude artifact this uses its downloads capability (and throws if that
   is missing, so callers fall back to copying). Everywhere else it is an ordinary browser download;
   in an app added to the iPhone home screen it opens the share sheet (Save to Files). */
async function saveFile(filename, data, mime){
  if(window.claude && window.claude.use){
    const d = await window.claude.use('downloads'); if(!d) throw new Error('downloads not available');
    await d.save({filename, data}); return;
  }
  const blob = new Blob([data], {type:(mime||'text/plain')+';charset=utf-8'});
  if(navigator.standalone === true && navigator.canShare){
    try{ const f = new File([blob], filename, {type:blob.type});
      if(navigator.canShare({files:[f]})){ await navigator.share({files:[f]}); return; }
    }catch(e){ if(e && e.name==='AbortError') return; }
  }
  const a = document.createElement('a'), url = URL.createObjectURL(blob);
  a.href = url; a.download = filename; a.style.display = 'none'; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 10000);
}
const backupText = () => JSON.stringify({app:'divyadesam-yatra',profile:S.profile,diary:S.diary,fb:S.fb});
function restoreBackup(text){
  try{ const o = JSON.parse(text); if(!o || o.app!=='divyadesam-yatra') throw 0;
    S.profile = Object.assign(S.profile, o.profile||{}); S.diary = o.diary||{}; S.fb = o.fb||S.fb; save(); render(); toast('Diary restored'); return true; }
  catch(e){ toast('That is not a backup from this app'); return false; }
}
const correctionsText = () => 'Divya Desam Yatra app – corrections from '+(S.profile.name||'a devotee')+'\n\n'+S.fb.map(f=>(f.n?f.n+'. '+byN(f.n).name:'General')+': '+f.text).join('\n\n');
function correctionsMailto(){
  let body = correctionsText(); // some mail apps refuse very long links
  if(body.length > 1700) body = body.slice(0,1700)+'\n\n[List shortened. Please also use "Copy all to send" in the app and paste the full list here.]';
  return 'mailto:'+encodeURIComponent(CORRECTIONS_EMAIL)+'?subject='+encodeURIComponent('Divya Desam Yatra: corrections')+'&body='+encodeURIComponent(body);
}
function bindMeFiles(){
  const b=(id,ev,fn)=>{const el=$(id); if(el) el.addEventListener(ev,fn);};
  b('#bkf','click',async()=>{ const name='divya-desam-yatra-backup-'+new Date().toISOString().slice(0,10)+'.json';
    try{ await saveFile(name, backupText(), 'application/json'); toast('Backup file saved'); }catch(e){ copy(backupText(),'Download not available here; backup copied instead'); } });
  b('#rsf','click',()=>{ const f=$('#rsfile'); if(f){ f.value=''; f.click(); } });
  b('#rsfile','change',e=>{ const f=e.target.files && e.target.files[0]; if(!f) return;
    const r=new FileReader(); r.onload=()=>restoreBackup(String(r.result||'')); r.onerror=()=>toast('Could not read that file'); r.readAsText(f); });
}
/* Offline: register the service worker (https or localhost only) and offer a refresh when a new version is ready. */
(function(){
  if(!('serviceWorker' in navigator)) return;
  if(location.protocol!=='https:' && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
  const hadController = !!navigator.serviceWorker.controller; let reloading = false;
  function offer(reg){
    if(!reg.waiting || !navigator.serviceWorker.controller || document.getElementById('updbar')) return;
    const b = document.createElement('button'); b.id='updbar'; b.className='updbar'; b.type='button'; b.textContent='Update available, tap to refresh';
    b.addEventListener('click',()=>{ b.textContent='Updating…'; if(reg.waiting) reg.waiting.postMessage('SKIP_WAITING'); else location.reload(); });
    document.body.appendChild(b);
  }
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').then(reg=>{
      offer(reg);
      reg.addEventListener('updatefound',()=>{ const w=reg.installing; if(w) w.addEventListener('statechange',()=>{ if(w.state==='installed') offer(reg); }); });
      document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') reg.update().catch(()=>{}); });
    }).catch(()=>{});
  });
  navigator.serviceWorker.addEventListener('controllerchange',()=>{ if(!hadController || reloading) return; reloading=true; location.reload(); });
})();
