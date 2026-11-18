import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';

const out = 'outputs/site-audit';
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
const page = await browser.newPage();
const errors = [], failedResources = [], results = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) failedResources.push({ url: response.url(), status: response.status() }); });
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
try {
  for (const route of ['/', '/about', '/solutions', '/business-growth', '/ventures', '/academy', '/blog', '/contact']) {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewport({ width, height: 900 });
      await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => [...document.querySelectorAll('button')].find(node => node.textContent === 'Essential only')?.click());
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const visible = node => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden';
        const label = node => (node.getAttribute('aria-label') || node.textContent || node.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 95);
        const controls = [...document.querySelectorAll('main button,main a,main input,main select,main textarea,[role="button"]')].filter(visible);
        return {
          h1: [...document.querySelectorAll('h1')].map(node => node.textContent), title: document.title,
          overflow: [...document.querySelectorAll('main *')].filter(visible).filter(node => { const r = node.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1; }).filter(node => getComputedStyle(node).position !== 'absolute').map(node => ({ tag: node.tagName, label: label(node), class: node.className })).slice(0, 12),
          documentWidth: document.documentElement.scrollWidth,
          smallControls: controls.filter(node => { const r = node.getBoundingClientRect(); return r.height < 43 || r.width < 24; }).map(node => ({ tag: node.tagName, label: label(node), height: Math.round(node.getBoundingClientRect().height) })),
          unnamedControls: controls.filter(node => !label(node) && !node.labels?.length).map(node => node.outerHTML.slice(0, 150)),
          brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(node => node.hash && !document.getElementById(decodeURIComponent(node.hash.slice(1)))).map(node => node.getAttribute('href')),
          links: [...new Set([...document.querySelectorAll('main a[href]')].map(node => node.href))],
          truncated: [...document.querySelectorAll('main .truncate')].filter(visible).filter(node => node.scrollWidth > node.clientWidth + 1).map(label),
        };
      });
      results.push({ route, width, ...result });
      if (width === 390 || width === 1440) await page.screenshot({ path: `${out}/${route.slice(1) || 'home'}-${width}.png`, fullPage: true });
    }
  }
  const report = { results, errors, failedResources: [...new Map(failedResources.map(item => [item.url, item])).values()] };
  await fs.writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ errors, failedResources: report.failedResources, findings: results.map(({ route, width, h1, documentWidth, smallControls, unnamedControls, brokenAnchors, truncated, overflow }) => ({ route, width, h1Count: h1.length, documentWidth, smallControls, unnamedControls, brokenAnchors, truncated, overflow })) }, null, 2));
} finally { await browser.close(); }
