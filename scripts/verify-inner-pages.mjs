import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';

const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  for (const width of [390, 1440]) {
    await page.setViewport({ width, height: 900 });
    for (const route of ['/about', '/solutions', '/ventures', '/blog', '/academy']) {
      await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => [...document.querySelectorAll('button')].find(node => node.textContent === 'Essential only')?.click());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.equal(await page.$$eval('.inner-content .glass-card,.inner-content .glass-card-active,.inner-content [role="button"]', nodes => nodes.length), 0);
      if (route === '/about') {
        assert.equal(await page.$$eval('.leadership-profiles article', nodes => nodes.length), 2);
        await page.locator('.division-destinations a:first-child').click();
        await page.waitForFunction(() => location.pathname === '/solutions');
      } else if (route === '/solutions') {
        await page.goto('http://127.0.0.1:5173/solutions#ai-integration', { waitUntil: 'networkidle2' });
        assert.equal(await page.$eval('#service-tab-ai-integration', node => node.getAttribute('aria-selected')), 'true');
        await page.locator('#service-tab-ai-integration').click();
        const links = await page.$$eval('.service-explorer-copy a', nodes => nodes.map(node => node.href));
        assert.equal(links.length, 1);
        assert.ok(links.every(href => new URL(href).hostname === 'wa.me' && new URL(href).searchParams.get('text')?.includes('organisation')));
        await page.locator('.infrastructure-section button').click();
      } else if (route === '/ventures') {
        assert.equal(await page.$$eval('.portfolio-list button', nodes => nodes.length), 7);
        await page.locator('.portfolio-list button:first-child').click();
      } else if (route === '/blog') {
        assert.equal(await page.$$eval('.visual-guide-card', nodes => nodes.length), 3);
        assert.equal(await page.$eval('.featured-guide h2 a', node => new URL(node.href).pathname), '/small-business-automation-ideas/');
      } else if (route === '/academy') {
        assert.equal(await page.$$eval('.programme-card', nodes => nodes.length), 5);
        await page.locator('.academy-team button').click();
      }
      if (['/solutions', '/ventures', '/academy'].includes(route)) {
        await page.waitForSelector('dialog[open]');
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('dialog[open]'));
      }
    }
  }
  assert.deepEqual(errors, []);
  console.log('Five redesigned bodies passed desktop/mobile content, links, navigation, booking dialog and visual programme checks.');
} finally { await browser.close(); }
