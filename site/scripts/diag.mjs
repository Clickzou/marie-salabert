import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:1000},
  userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
const stats={css:0,cssFail:0,img:0,imgFail:0,other:0};
p.on('response', r=>{ const u=r.url(); const s=r.status();
  if(/\.css/.test(u)) s<400?stats.css++:stats.cssFail++;
  else if(/\.(jpe?g|png|webp|svg|gif)/.test(u)) s<400?stats.img++:stats.imgFail++; });
p.on('requestfailed', r=>{ stats.other++; });
await p.goto('https://osteopathie-animale.sitepreproduction.fr/',{waitUntil:'networkidle',timeout:90000});
console.log('avant interaction:',JSON.stringify(stats));
await p.mouse.move(300,300); await p.mouse.wheel(0,400); await p.keyboard.press('End');
await p.waitForTimeout(4000);
console.log('apres interaction:',JSON.stringify(stats));
const n = await p.evaluate(()=>({sheets:document.styleSheets.length, rules:[...document.styleSheets].reduce((a,s)=>{try{return a+s.cssRules.length}catch{return a}},0), bodyBg:getComputedStyle(document.body).backgroundColor, h1:document.querySelector('h1')&&getComputedStyle(document.querySelector('h1')).fontSize}));
console.log(n);
await b.close();
