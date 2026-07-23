import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:1000},
  userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('https://osteopathie-animale.sitepreproduction.fr/',{waitUntil:'networkidle',timeout:90000});
await p.mouse.move(200,200); await p.mouse.wheel(0,200); await p.waitForTimeout(3000);
const r = await p.evaluate(()=>{
  const out=[];
  document.querySelectorAll('section,div').forEach(el=>{
    const bg=getComputedStyle(el).backgroundImage;
    if(bg && bg!=='none' && bg.includes('url')){
      const rc=el.getBoundingClientRect();
      out.push({cls:el.className.toString().slice(0,90), bg:bg.slice(0,160), h:Math.round(rc.height), w:Math.round(rc.width), y:Math.round(rc.top+scrollY)});
    }
  });
  return out.slice(0,12);
});
console.log(JSON.stringify(r,null,1));
await b.close();
