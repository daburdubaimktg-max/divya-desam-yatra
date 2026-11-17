// Renders icons/icon.svg to the PNG sizes the manifest and iOS need.  node tools/make_icons.js
// Needs Playwright with Chromium (only for regenerating the icons; the app itself has no dependencies).
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const dir = path.join(__dirname, '..', 'icons'); const svg = fs.readFileSync(path.join(dir, 'icon.svg'), 'utf8');
  const b = await chromium.launch(); 
  for (const [name, size, scale] of [['icon-192.png',192,1],['icon-512.png',512,1],['icon-maskable-512.png',512,0.82],['apple-touch-icon.png',180,1],['favicon-32.png',32,1.12]]) {
    const p = await b.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await p.setContent(`<body style="margin:0;background:#0f6e73;overflow:hidden"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center"><div style="width:${size*scale}px;height:${size*scale}px">${svg.replace('width="512" height="512"','width="100%" height="100%"')}</div></div></body>`);
    await p.screenshot({ path: path.join(dir, name) }); await p.close();
  }
  await b.close();
})();
