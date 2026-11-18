import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='outputs/hero-transformation';await fs.mkdir(out,{recursive:true});
const browser=await puppeteer.launch({executablePath:process.env.BROWSER_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle2'});
 await page.evaluate(()=>[...document.querySelectorAll('button')].find(n=>n.textContent==='Essential only')?.click());
 assert.equal(await page.$('.transform-playback'),null);
 assert.equal(await page.$('#scan-guidance'),null);
 assert.equal(await page.$('.workflow-rail-arrow'),null);
 assert.ok(await page.$eval('.home-faq h3',n=>n.textContent.includes('Clear answers')));
 await page.setViewport({width:1440,height:960});
 await page.evaluate(()=>window.__lenis?.scrollTo(0,{immediate:true}));
 await page.waitForFunction(()=>document.querySelector('.hero-workflow').dataset.phase==='0');
 await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('.transform-manual-card')).opacity)>.99);
 const before=await page.$eval('.transform-manual-card',n=>getComputedStyle(n).transform);
 await page.waitForFunction(()=>document.querySelector('.hero-workflow').dataset.phase==='3');
 const after=await page.$eval('.transform-manual-card',n=>getComputedStyle(n).transform);assert.notEqual(before,after);
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.reload({waitUntil:'networkidle2'});
 assert.equal(await page.$eval('.hero-workflow',n=>n.dataset.phase),'3');
 for(const width of [320,390,768,1191,1440]) {
  await page.setViewport({width,height:900});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.evaluate(()=>document.querySelector('#solutions').scrollIntoView());
  await (await page.$('#solution-panel')).screenshot({path:`${out}/solution-actions-${width}.png`});
  const rects=await page.$eval('.solution-actions',n=>{const r=n.getBoundingClientRect();return[...n.children].map(c=>{const x=c.getBoundingClientRect();return{inside:x.left>=r.left-1&&x.right<=r.right+1&&x.top>=r.top-1&&x.bottom<=r.bottom+1};});});
  assert.ok(rects.every(r=>r.inside),'Both solution actions stay inside their group');
 }
 assert.deepEqual(errors,[]);console.log('Automatic transformation, removals, FAQ and grouped actions passed five sizes.');
}finally{await browser.close();}
