import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const out = 'outputs/video-removals';
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  for (const width of [320, 390, 1191]) {
    await page.setViewport({ width, height: 900 });
    for (const [route, section, links] of [
      ['/about', '.division-showcase', 4],
      ['/ventures', '.inner-content', null],
      ['/academy', '.programme-directory', 5],
      ['/blog', '.inner-content', null],
    ]) {
      await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => [...document.querySelectorAll('button')].find(node => node.textContent === 'Essential only')?.click());
      assert.equal(await page.$$eval(`${section} video`, nodes => nodes.length), 0, `Marked videos removed on ${route}`);
      assert.equal(await page.$$eval('main > div > section:first-child video', nodes => nodes.length), 1, 'Hero video retained');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} fits ${width}px`);
      if (links) assert.equal(await page.$$eval(`${section} a`, nodes => nodes.length), links);
      await (await page.$(section)).screenshot({ path: `${out}/${route.slice(1)}-${width}.png` });
    }
  }
  assert.deepEqual(errors, []);
  console.log('Marked videos removed; hero videos and destination links retained. Three responsive widths passed.');
} finally { await browser.close(); }
