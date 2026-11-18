import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const out = 'outputs/mobile-readability';
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const results = [];
try {
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  for (const [width, height] of [[320, 568], [360, 740], [375, 667], [390, 844], [430, 932], [768, 1024], [844, 390], [1024, 768], [1440, 960]]) {
    await page.setViewport({ width, height, hasTouch: width < 1024, isMobile: width < 768, deviceScaleFactor: 1 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
    await page.evaluate(() => { [...document.querySelectorAll('button')].find(button => button.textContent === 'Essential only')?.click(); });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => {
      const captions = [...document.querySelectorAll('.hero-call-note,.hero-signature,.workflow-small-label,.hero-flow-list p,.hero-example-tabs button,.hero-pillars span,.solution-outcomes dt,.scan-range-labels,.scan-controls-note,.scan-disclaimer')];
      const controls = [...document.querySelectorAll('.hero-actions a,.hero-example-tabs button,.solution-tabs button,.scan-presets button,.scan-controls input,.nav-actions > button,.nav-actions > a')].filter(element => element.getBoundingClientRect().width > 0);
      return {
        width: innerWidth, height: innerHeight, documentWidth: document.documentElement.scrollWidth,
        minimumCaption: Math.min(...captions.map(element => parseFloat(getComputedStyle(element).fontSize))),
        smallControls: controls.filter(element => { const rect = element.getBoundingClientRect(); return rect.height < 44 || rect.width < 44; }).map(element => ({ text: element.textContent, height: element.getBoundingClientRect().height })),
        overflowingControls: controls.filter(element => { const rect = element.getBoundingClientRect(); return rect.left < -1 || rect.right > innerWidth + 1; }).map(element => element.textContent),
        servicePinned: document.querySelector('.solution-scroll-track').dataset.pinned,
      };
    });
    assert.ok(layout.documentWidth <= width, `Page overflow at ${width}`);
    assert.ok(layout.minimumCaption >= 13, `Caption below 13px at ${width}: ${layout.minimumCaption}`);
    if (width < 768) assert.equal(layout.servicePinned, 'false', 'Phones use natural page scrolling');
    if (width < 1024) {
      assert.deepEqual(layout.smallControls, [], 'Touch controls should be at least 44px');
      assert.deepEqual(layout.overflowingControls, [], 'Header and service controls must stay in the viewport');
      await page.locator('[aria-label="Toggle Menu"]').click();
      await page.waitForFunction(() => document.activeElement?.closest('nav')?.id === 'mobile-navigation');
      await page.locator('[aria-label="Expand Solutions links"]').click();
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('#mobile-navigation')).opacity) >= 0.99);
      const menu = await page.$eval('#mobile-navigation', element => ({ bottom: element.getBoundingClientRect().bottom, scrollHeight: element.scrollHeight, height: element.clientHeight,
        small: [...element.querySelectorAll('a,button')].filter(node => node.getBoundingClientRect().height < 44).map(node => node.textContent) }));
      assert.ok(menu.bottom <= height, 'Expanded mobile menu must fit the viewport');
      assert.deepEqual(menu.small, []);
      await page.screenshot({ path: `${out}/menu-${width}.png` });
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Toggle Menu');
    }
    if (width < 768) {
      await page.locator('.solution-mobile-pager button:last-child').click();
      await page.waitForFunction(() => document.querySelector('#solution-panel')?.dataset.serviceIndex === '1');
      await page.evaluate(() => document.querySelector('#solutions').scrollIntoView());
      await page.screenshot({ path: `${out}/solutions-${width}.png` });
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${out}/hero-${width}.png` });
    results.push(layout);
  }
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await page.locator('.support-unified-launcher').click();
  await page.locator('[aria-label="Contact BrandMint"] .home-secondary').click();
  await page.waitForSelector('[aria-label="Ask Ishani"]');
  await page.evaluate(() => {
    Object.defineProperty(visualViewport, 'height', { configurable: true, get: () => 400 });
    Object.defineProperty(visualViewport, 'offsetTop', { configurable: true, get: () => 0 });
    visualViewport.dispatchEvent(new Event('resize'));
  });
  const keyboard = await page.$eval('[aria-label="Ask Ishani"]', element => ({ bottom: element.getBoundingClientRect().bottom, top: element.getBoundingClientRect().top, fontSize: getComputedStyle(element).fontSize }));
  assert.ok(keyboard.top >= 0 && keyboard.bottom <= 400, 'Chat input must remain above the emulated keyboard');
  assert.equal(keyboard.fontSize, '16px');
  await page.screenshot({ path: `${out}/chat-keyboard.png` });
  await page.keyboard.press('Escape');
  await page.evaluate(() => { delete visualViewport.height; delete visualViewport.offsetTop; visualViewport.dispatchEvent(new Event('resize')); });
  await page.locator('#tab-ai-integration').click();
  await page.locator('.solution-copy .home-primary').click();
  await page.waitForSelector('dialog[open]');
  const fields = await page.$$eval('dialog input', elements => elements.map(element => ({ font: parseFloat(getComputedStyle(element).fontSize), height: element.getBoundingClientRect().height })));
  assert.ok(fields.every(field => field.font >= 16 && field.height >= 48));
  await page.screenshot({ path: `${out}/pilot-form-mobile.png` });
  await page.keyboard.press('Escape');
  await page.evaluate(() => document.querySelector('#velocity').scrollIntoView());
  await page.screenshot({ path: `${out}/blueprint-mobile.png` });
  await page.evaluate(() => { document.documentElement.style.fontSize = '24px'; scrollTo(0, 0); });
  const enlarged = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    controlsFit: [...document.querySelectorAll('.nav-actions > button,.nav-actions > a,.hero-actions a')].filter(element => element.getBoundingClientRect().width > 0).every(element => {
      const bounds = element.getBoundingClientRect(); return bounds.left >= 0 && bounds.right <= innerWidth;
    }),
  }));
  assert.ok(enlarged.documentWidth <= 390 && enlarged.controlsFit, 'Header and primary actions must fit enlarged text');
  await page.screenshot({ path: `${out}/enlarged-text-mobile.png` });
  await page.evaluate(() => document.documentElement.style.removeProperty('font-size'));
  assert.deepEqual(errors, []);
  await fs.writeFile(`${out}/verification.json`, JSON.stringify({ results, keyboard, fields, enlarged, errors }, null, 2));
  console.log(JSON.stringify({ viewports: results.length, minimumCaption: Math.min(...results.map(result => result.minimumCaption)), keyboard, formFields: fields.length, errors, result: 'Mobile readability checks passed' }, null, 2));
} catch (error) {
  await page.screenshot({ path: `${out}/failure.png` });
  throw error;
} finally { await browser.close(); }
