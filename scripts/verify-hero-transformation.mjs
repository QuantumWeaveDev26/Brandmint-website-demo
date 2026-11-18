import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const out = 'outputs/hero-transformation';
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const sizes = [];
try {
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => { [...document.querySelectorAll('button')].find(node => node.textContent === 'Essential only')?.click(); });
  for (const [width, height] of [[1440, 960], [1191, 714], [768, 1024], [390, 844], [320, 568]]) {
    await page.setViewport({ width, height });
    await page.evaluate(() => { window.__lenis?.scrollTo(0, { immediate: true }); });
    await page.evaluate(() => document.fonts.ready);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${out}/hero-${width}.png` });
    await page.locator('[aria-label="Show manual workflow"]').click();
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.transform-manual-card')).opacity) > .99);
    const manual = await page.$eval('.transform-manual-card', node => getComputedStyle(node).transform);
    await page.screenshot({ path: `${out}/before-${width}.png` });
    await page.locator('[aria-label="Show connected workflow"]').click();
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.transform-result-node')).opacity) > .99);
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.transform-node-check')).opacity) > .99);
    const after = await page.$eval('.transform-manual-card', node => getComputedStyle(node).transform);
    assert.notEqual(manual, after, 'Manual tasks must physically transform into the connected system');
    assert.equal(await page.$eval('.hero-workflow', node => node.dataset.phase), '3');
    await page.screenshot({ path: `${out}/after-${width}.png` });
    sizes.push({ width, height });
  }
  await page.setViewport({ width: 1440, height: 960 });
  await page.locator('[aria-label="Replay transformation"]').click();
  for (let phase = 0; phase < 4; phase++) {
    await page.waitForFunction(index => document.querySelector('.hero-workflow').dataset.phase === String(index), {}, phase);
    await page.screenshot({ path: `${out}/sequence-${phase}.png` });
  }
  for (const id of ['agents', 'voice', 'learning']) {
    await page.locator(`#example-${id}`).click();
    await page.locator('[aria-label="Show connected workflow"]').click();
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.transform-result-node')).opacity) > .99);
    assert.equal(await page.$eval('.hero-workflow', node => node.dataset.example), id);
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle2' });
  assert.equal(await page.$eval('.hero-workflow', node => node.dataset.phase), '3');
  await page.locator('[aria-label="Show manual workflow"]').click();
  assert.equal(await page.$eval('.hero-workflow', node => node.dataset.phase), '0');
  assert.deepEqual(errors, []);
  await fs.writeFile(`${out}/verification.json`, JSON.stringify({ sizes, errors, checks: ['physical before/after transforms', 'manual controls', 'autoplay four phases', 'all capability examples', 'reduced-motion alternative', 'five responsive sizes'] }, null, 2));
  console.log(JSON.stringify({ result: 'Hero transformation checks passed', sizes, errors }, null, 2));
} finally { await browser.close(); }
