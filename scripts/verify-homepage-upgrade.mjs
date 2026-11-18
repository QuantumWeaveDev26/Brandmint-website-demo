import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const out = 'outputs/homepage-upgrade';
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.BROWSER_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const results = [];
try {
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('h1');
  await page.evaluate(() => {
    localStorage.setItem('brandmint_consent', JSON.stringify({ analytics: false }));
    const button = [...document.querySelectorAll('button')].find(b => b.textContent === 'Essential only');
    button?.click();
  });
  for (const [width, height] of [[320, 812], [390, 700], [390, 844], [600, 800], [767, 800], [768, 1024], [1024, 900], [1191, 714], [1440, 960]]) {
    await page.setViewport({ width, height });
    await page.evaluate(() => scrollTo(0, 0));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${out}/hero-${width}.png` });
    const layout = await page.evaluate(() => ({
      viewport: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      heroWidth: document.querySelector('h1').getBoundingClientRect().width,
      tabCount: document.querySelectorAll('.solution-tabs [role="tab"]').length,
      videoSources: [...document.querySelectorAll('video')].filter(v => v.getAttribute('src')).length,
      clippedControls: [...document.querySelectorAll('.hero-actions a, .solution-tabs button')].filter(el => {
        const bounds = el.getBoundingClientRect();
        return bounds.left < 0 || bounds.right > innerWidth;
      }).length,
    }));
    assert.ok(layout.documentWidth <= width, `Horizontal overflow at ${width}: ${layout.documentWidth}`);
    assert.equal(layout.tabCount, 6);
    assert.equal(layout.clippedControls, 0, 'Primary controls must fit the viewport');
    assert.equal(layout.videoSources, 0, 'Reduced motion should not fetch video');
    await page.locator('a[href="#solutions"]').click();
    await page.waitForFunction(() => Math.abs(document.querySelector('#solutions').getBoundingClientRect().top - 100) < 10);
    await page.screenshot({ path: `${out}/solutions-${width}.png` });
    await page.evaluate(() => {
      const track = document.querySelector('.solution-scroll-track');
      scrollTo(0, scrollY + track.getBoundingClientRect().top - 82);
    });
    await page.waitForFunction(() => document.querySelector('#solution-panel').dataset.serviceIndex === '0' || document.querySelector('.solution-scroll-track').dataset.pinned === 'false');
    const pinnedLayout = await page.evaluate(() => {
      const stage = document.querySelector('.solution-scroll-stage').getBoundingClientRect();
      return { top: stage.top, bottom: stage.bottom, viewportHeight: innerHeight, pinned: document.querySelector('.solution-scroll-track').dataset.pinned === 'true' };
    });
    assert.ok(!pinnedLayout.pinned || pinnedLayout.bottom <= height, `Pinned content must fit ${width}x${height}: ${pinnedLayout.bottom}`);
    for (const index of [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]) {
      if (pinnedLayout.pinned) await page.evaluate(i => {
        const track = document.querySelector('.solution-scroll-track');
        const stage = document.querySelector('.solution-scroll-stage');
        const range = track.getBoundingClientRect().height - stage.offsetHeight;
        scrollTo(0, scrollY + track.getBoundingClientRect().top - 82 + (i + 0.5) / 6 * range);
      }, index);
      else await page.locator(`.solution-tabs button:nth-child(${index + 1})`).click();
      await page.waitForFunction(i => document.querySelector('#solution-panel').dataset.serviceIndex === String(i), {}, index);
    }
    await page.screenshot({ path: `${out}/scroll-stage-${width}.png` });
    results.push({ width, ...layout, pinned: pinnedLayout.pinned });
  }
  await page.setViewport({ width: 390, height: 844 });
  await page.locator('#tab-ai-integration').click();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.$eval('.solution-tabs [aria-selected="true"]', el => el.textContent), 'AI Workforce');
  await page.locator('.solution-copy .home-primary').click();
  await page.waitForSelector('dialog[open]');
  assert.ok((await page.$eval('dialog', el => el.textContent)).includes('AI Workforce Multiplier'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog[open]'));
  await page.locator('.support-unified-launcher').click();
  await page.waitForSelector('[aria-label="Contact BrandMint"]');
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('[aria-label="Contact BrandMint"]')).opacity) >= 0.99);
  assert.equal(await page.$('.motion-toggle'), null, 'Removed pause control must stay absent');
  assert.ok(!(await page.$eval('.support-dock', el => el.textContent)).includes('Background videos & demos'));
  await page.screenshot({ path: `${out}/support-mobile.png` });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('.support-unified-launcher').getAttribute('aria-expanded') === 'false');
  await page.locator('.home-faq summary').click();
  await page.screenshot({ path: `${out}/faq-mobile.png` });
  assert.equal(await page.$eval('.home-faq details', el => el.open), true);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForSelector('.hero-backdrop video[src]');
  assert.equal(await page.$eval('html', el => el.dataset.motion), 'playing');
  for (const route of ['/about', '/solutions', '/business-growth', '/ventures', '/academy', '/blog', '/contact']) {
    await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main h1');
  }
  await page.setViewport({ width: 1440, height: 960 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.evaluate(() => Boolean(window.__lenis)), true, 'Lenis must run for normal motion preferences');
  await page.mouse.move(450, 400);
  await page.mouse.wheel({ deltaY: 520 });
  const wheelSamples = await page.evaluate(async () => {
    const samples = [];
    for (let frame = 0; frame < 36; frame++) {
      await new Promise(requestAnimationFrame);
      samples.push(scrollY);
    }
    return samples;
  });
  assert.ok(new Set(wheelSamples.map(Math.round)).size > 8, 'Wheel scrolling should interpolate across multiple frames');
  await page.evaluate(() => window.__lenis.scrollTo(0, { immediate: true }));
  await page.locator('a[href="#solutions"]').click();
  await page.waitForFunction(() => Math.abs(document.querySelector('#solutions').getBoundingClientRect().top - 100) < 3);
  await page.locator('#tab-education-institutions').click();
  await page.mouse.wheel({ deltaY: -400 });
  await page.waitForFunction(() => !window.__lenis.isScrolling);
  await page.waitForFunction(() => {
    const track = document.querySelector('.solution-scroll-track').getBoundingClientRect();
    const travel = track.height - document.querySelector('.solution-scroll-stage').offsetHeight;
    const expected = Math.min(5, Math.floor(Math.max(0, Math.min(1, (82 - track.top) / travel)) * 6));
    return Number(document.querySelector('#solution-panel').dataset.serviceIndex) === expected;
  });
  await page.evaluate(() => window.__lenis.scrollTo(0, { immediate: true }));
  for (const id of ['agents', 'voice', 'learning', 'whatsapp']) {
    await page.locator(`#example-${id}`).click();
    await page.waitForFunction(selected => document.querySelector('.hero-workflow').dataset.example === selected, {}, id);
    await page.waitForFunction(() => document.querySelector('.hero-example-tabs [aria-selected="true"]').getAnimations().every(animation => animation.playState === 'finished'));
    await page.waitForFunction(() => document.querySelector('.workflow-message').getAnimations().every(animation => animation.playState === 'finished'));
    await page.screenshot({ path: `${out}/hero-example-${id}.png` });
  }
  await page.evaluate(() => {
    const node = document.querySelector('#workflow-example');
    window.__lenis.scrollTo(node, { immediate: true, offset: -100 });
  });
  const startStep = await page.$eval('.workflow-node[aria-pressed="true"]', el => el.textContent);
  await page.waitForFunction(previous => document.querySelector('.workflow-node[aria-pressed="true"]').textContent !== previous, {}, startStep);
  await page.screenshot({ path: `${out}/workflow-nodes-animated.png` });
  await page.evaluate(() => window.__lenis.scrollTo(document.querySelector('#velocity'), { immediate: true, offset: -100 }));
  await page.screenshot({ path: `${out}/growth-scan-desktop.png` });
  await page.locator('.scan-presets button:last-child').click();
  assert.equal(await page.$eval('.scan-blueprint', el => el.dataset.blueprint), '2');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.__lenis.scrollTo(document.querySelector('#velocity'), { immediate: true, offset: -100 }));
  await page.screenshot({ path: `${out}/growth-scan-mobile.png` });
  await page.setViewport({ width: 1440, height: 960 });
  await page.evaluate(() => window.__lenis.scrollTo(0, { immediate: true }));
  const phases = new Set();
  for (let phase = 0; phase < 4; phase++) {
    await page.waitForFunction(i => document.querySelector('.hero-workflow').dataset.phase === String(i), {}, phase);
    await page.waitForFunction(() => document.querySelector('.workflow-message').getAnimations().every(animation => animation.playState === 'finished'));
    phases.add(await page.$eval('.hero-workflow', el => el.dataset.phase));
    await page.screenshot({ path: `${out}/workflow-phase-${phase}.png` });
  }
  assert.equal(phases.size, 4, 'Hero workflow must progress through all four states');
  const labelColors = await page.evaluate(() => ({
    before: getComputedStyle(document.querySelector('.comparison-before')).color,
    after: getComputedStyle(document.querySelector('.comparison-after')).color,
    charterOrnaments: document.querySelectorAll('#principles .w-12.h-px').length,
  }));
  assert.equal(labelColors.before, 'rgb(248, 113, 113)');
  assert.equal(labelColors.after, 'rgb(74, 222, 128)');
  assert.equal(labelColors.charterOrnaments, 0);
  await page.screenshot({ path: `${out}/desktop-final.png` });
  await page.evaluate(() => document.querySelector('#transformation').scrollIntoView({ block: 'start' }));
  await page.screenshot({ path: `${out}/comparison-labels.png` });
  assert.deepEqual(errors, [], 'No uncaught browser errors');
  await fs.writeFile(`${out}/verification.json`, JSON.stringify({ results, errors, lenisDistinctScrollFrames: new Set(wheelSamples.map(Math.round)).size, checks: ['service keyboard navigation', 'pilot dialog context and Escape', 'support open and Escape', 'FAQ disclosure', 'reduced motion', 'nine viewport combinations', 'normal video playback source', 'all eight routes render', 'forward and reverse scroll selection', 'four hero workflow phases', 'comparison label colors', 'removed motion controls and charter ornament', 'Lenis wheel interpolation', 'smooth anchor navigation', 'interrupted tab navigation', 'AI agent, voice, and learning examples', 'workflow node autoplay', 'redesigned blueprint presets'] }, null, 2));
  console.log(JSON.stringify({ results, errors, result: 'All browser checks passed' }, null, 2));
} catch (error) {
  console.error(await page.evaluate(() => ({
    width: innerWidth, height: innerHeight, scroll: scrollY,
    trackTop: document.querySelector('.solution-scroll-track')?.getBoundingClientRect().top,
    trackHeight: document.querySelector('.solution-scroll-track')?.getBoundingClientRect().height,
    stageHeight: document.querySelector('.solution-scroll-stage')?.offsetHeight,
    selected: document.querySelector('#solution-panel')?.dataset.serviceIndex,
  })));
  await page.screenshot({ path: `${out}/browser-failure.png` });
  throw error;
} finally {
  await browser.close();
}
