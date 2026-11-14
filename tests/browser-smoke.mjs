import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.REVIEW_URL || 'http://localhost:5173';
const output = new URL('../outputs/review-fixes/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});
const results = [];
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('brandmint_cookie_consent_v1', JSON.stringify({ essential: true }));
    window.open = url => { window.__testDraft = url; return null; };
  });
  const clickText = async text => {
    const buttons = await page.$$('button');
    for (const button of buttons) {
      if ((await button.evaluate(el => el.textContent.trim())) === text) { await button.click(); return; }
    }
    throw new Error(`Button missing: ${text}`);
  };
  for (const width of [1440, 390, 320]) {
    await page.setViewport({ width, height: width < 768 ? 844 : 900 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('video');
    await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
    const media = await page.evaluate(() => {
      const video = document.querySelector('video');
      return { source: video.currentSrc, playing: !video.paused, width: innerWidth, scrollWidth: document.documentElement.scrollWidth };
    });
    assert.equal(media.width, media.scrollWidth, `Home overflows at ${width}`);
    const headerFits = await page.evaluate(() => Array.from(document.querySelectorAll('header a, header button')).every(el => { const box = el.getBoundingClientRect(); return box.width === 0 || (box.left >= 0 && box.right <= innerWidth); }));
    assert.ok(headerFits, `Header controls fit at ${width}`);
    assert.ok(media.source.includes(width < 768 ? '-mobile.mp4' : '-desktop.mp4'));
    assert.ok(media.playing, 'Hero video should play silently');
    await page.screenshot({ path: new URL(`home-${width}.png`, output).pathname.replace(/^\/(\w:)/, '$1') });
    await page.click('[aria-label="Pause videos and demos"]');
    await page.waitForFunction(() => Array.from(document.querySelectorAll('video')).every(video => video.paused));
    results.push({ check: 'homepage responsive video and global pause', ...media });
    if (width === 1440) {
      await clickText('Discuss this workflow');
      await page.waitForSelector('dialog[open]');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'pilot-name');
      await page.type('#pilot-name', 'Local Test');
      await page.type('#pilot-phone', '+91 99999 99999');
      await clickText('Continue in WhatsApp');
      await page.waitForSelector('[role="status"]');
      const handoff = await page.evaluate(() => ({ url: window.__testDraft, text: document.querySelector('[role="status"]').textContent, name: document.querySelector('#pilot-name').value }));
      assert.ok(handoff.url.includes('Local%20Test'));
      assert.match(handoff.text, /Review and send it in WhatsApp/);
      assert.equal(handoff.name, 'Local Test');
      await page.screenshot({ path: new URL('pilot-dialog-desktop.png', output).pathname.replace(/^\/(\w:)/, '$1') });
      await page.keyboard.press('Escape');
      assert.equal(await page.$('dialog[open]'), null);
      results.push({ check: 'pilot dialog focus, honest draft handoff and Escape', passed: true });
      await page.evaluate(() => document.querySelector('#workflow-example').scrollIntoView());
      await page.screenshot({ path: new URL('workflow-desktop.png', output).pathname.replace(/^\/(\w:)/, '$1') });
    }
    if (width === 390) {
      await clickText('Discuss this workflow');
      await page.waitForSelector('dialog[open]');
      const box = await page.$eval('dialog', dialog => { const r = dialog.getBoundingClientRect(); return { x: r.x, right: r.right, height: r.height, viewport: innerWidth }; });
      assert.ok(box.x >= 0 && box.right <= box.viewport, 'Dialog fits mobile viewport');
      await page.screenshot({ path: new URL('pilot-dialog-mobile.png', output).pathname.replace(/^\/(\w:)/, '$1') });
      await page.keyboard.press('Escape');
      await page.click('[aria-label="Toggle Menu"]');
      assert.equal(await page.$eval('[aria-label="Toggle Menu"]', el => el.getAttribute('aria-expanded')), 'true');
      await page.click('#mobile-navigation a[href="/solutions"]');
      await page.waitForFunction(() => location.pathname === '/solutions');
      results.push({ check: 'mobile modal and menu navigation', passed: true });
    }
  }
  await page.setViewport({ width: 390, height: 844 });
  for (const route of ['/about', '/solutions', '/business-growth', '/ventures', '/contact']) {
    await page.goto(url + route, { waitUntil: 'networkidle2' });
    const state = await page.evaluate(() => ({ heading: document.querySelector('h1')?.textContent, width: innerWidth, scrollWidth: document.documentElement.scrollWidth, brokenImages: Array.from(document.images).filter(image => image.complete && !image.naturalWidth).map(image => image.src) }));
    assert.ok(state.heading, `Heading on ${route}`);
    assert.equal(state.scrollWidth, state.width, `Overflow on ${route}`);
    assert.deepEqual(state.brokenImages, []);
    await page.screenshot({ path: new URL(`${route.slice(1)}-mobile.png`, output).pathname.replace(/^\/(\w:)/, '$1') });
    results.push({ route, ...state });
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle2' });
  const reduced = await page.evaluate(() => ({ paused: document.documentElement.dataset.motion, media: Array.from(document.querySelectorAll('video')).map(video => ({ paused: video.paused, source: video.currentSrc })) }));
  assert.equal(reduced.paused, 'paused');
  assert.ok(reduced.media.every(video => video.paused && video.source === ''));
  assert.deepEqual(errors, []);
  results.push({ check: 'reduced motion prevents autoplay and video transfer', passed: true });
  await writeFile(new URL('browser-results.json', output), JSON.stringify({ passed: true, results, errors }, null, 2));
  console.log(JSON.stringify({ passed: true, checks: results.length, errors, screenshots: output.pathname }, null, 2));
} finally { await browser.close(); }
