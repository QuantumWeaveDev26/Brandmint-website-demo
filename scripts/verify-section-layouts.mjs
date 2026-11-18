import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const out = 'outputs/section-layouts';
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const sizes = [[1440, 960], [1024, 768], [768, 1024], [390, 844], [320, 568]];
try {
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => [...document.querySelectorAll('button')].find(node => node.textContent === 'Essential only')?.click());
  for (const [width, height] of sizes) {
    await page.setViewport({ width, height });
    await page.evaluate(() => document.fonts.ready);
    for (const id of ['workflow-example', 'velocity']) {
      await page.evaluate(id => { const el = document.getElementById(id); window.__lenis?.scrollTo(el, { immediate: true, offset: -100 }); if (!window.__lenis) el.scrollIntoView(); }, id);
      await page.waitForFunction(() => [...document.querySelectorAll('#workflow-example button,#velocity button,#velocity input')].every(node => node.getBoundingClientRect().height >= 44));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id} overflows at ${width}`);
      await (await page.$(`#${id}`)).screenshot({ path: `${out}/${id}-${width}.png` });
    }
    assert.equal(await page.$('#principles'), null, 'Removed charter should not render');
    await page.locator('.scan-presets button:first-child').click();
    assert.equal(await page.$eval('.scan-blueprint', node => node.dataset.blueprint), '0');
    await page.locator('.scan-presets button:last-child').click();
    assert.equal(await page.$eval('.scan-blueprint', node => node.dataset.blueprint), '2');
    await page.focus('#enquiry-volume');
    await page.keyboard.press('Home');
    for (let step = 0; step < 8; step++) await page.keyboard.press('ArrowRight');
    assert.equal(await page.$eval('.scan-blueprint', node => node.dataset.blueprint), '1');
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle2' });
  await page.locator('.workflow-node:nth-of-type(1)').click();
  assert.equal(await page.$eval('.workflow-story-detail', node => getComputedStyle(node).animationName), 'none');
  assert.deepEqual(errors, []);
  const report = { result: 'Section layout checks passed', sizes, errors };
  await fs.writeFile(`${out}/verification.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
