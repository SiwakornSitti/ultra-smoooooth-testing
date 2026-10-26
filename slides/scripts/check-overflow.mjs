#!/usr/bin/env node
/**
 * Automated Slide Overflow Checker for Slidev
 * 
 * Verifies that all slides (or targeted slides) fit strictly within the 16:9 canvas (980x552)
 * with zero vertical or horizontal overflow.
 *
 * Usage:
 *   node slides/scripts/check-overflow.mjs          # Checks all slides
 *   node slides/scripts/check-overflow.mjs 63       # Checks slide 63
 *   node slides/scripts/check-overflow.mjs 1 10     # Checks slides 1 to 10
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('../../tests/node_modules/playwright');

const PORT = process.env.PORT || 3030;
const BASE_URL = `http://localhost:${PORT}`;
const CANVAS_WIDTH = 980;
const CANVAS_HEIGHT = 552;
const BOTTOM_TOLERANCE_PX = 1; // 1px rounding tolerance

async function main() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
  let startSlide = 1;
  let endSlide = null;

  if (args.length === 1) {
    startSlide = parseInt(args[0], 10);
    endSlide = startSlide;
  } else if (args.length >= 2) {
    startSlide = parseInt(args[0], 10);
    endSlide = parseInt(args[1], 10);
  }

  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT }
  });

  try {
    await page.goto(`${BASE_URL}/1`, { waitUntil: 'networkidle', timeout: 10000 });
  } catch (err) {
    console.error(`❌ Could not connect to Slidev server at ${BASE_URL}. Ensure 'npm run dev' is running.`);
    process.exit(1);
  }

  // Determine total slides if not specified
  if (endSlide === null) {
    endSlide = await page.evaluate(() => {
      // Find all slide indicator links or total pages
      const pages = document.querySelectorAll('[class*="slidev-page-"]');
      let maxNo = 0;
      pages.forEach(p => {
        const m = p.className.match(/slidev-page-(\d+)/);
        if (m) maxNo = Math.max(maxNo, parseInt(m[1], 10));
      });
      // Fallback: check text in slide counter if available
      return maxNo > 0 ? maxNo : 102;
    });
  }

  console.log(`🔍 Checking Slidev deck for overflow: Slides ${startSlide} to ${endSlide} at ${BASE_URL} (Canvas ${CANVAS_WIDTH}x${CANVAS_HEIGHT})...\n`);

  const overflowingSlides = [];
  let checkedCount = 0;

  for (let slideNo = startSlide; slideNo <= endSlide; slideNo++) {
    await page.goto(`${BASE_URL}/${slideNo}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(350);

    const report = await page.evaluate(({ slideNo, CANVAS_HEIGHT, CANVAS_WIDTH, BOTTOM_TOLERANCE_PX }) => {
      const pageEl = document.querySelector(`.slidev-page-${slideNo}`);
      if (!pageEl) return { slideNo, found: false };

      const layout = pageEl.querySelector('.slidev-layout') || pageEl;
      const elements = Array.from(layout.querySelectorAll('*'));
      let maxBottom = 0;
      let maxRight = 0;
      const verticalOverflows = [];
      const horizontalOverflows = [];

      elements.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          if (r.bottom > maxBottom) maxBottom = r.bottom;
          if (r.right > maxRight) maxRight = r.right;

          if (r.bottom > CANVAS_HEIGHT + BOTTOM_TOLERANCE_PX) {
            verticalOverflows.push({
              tag: el.tagName.toLowerCase(),
              className: typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join(' ') : '',
              bottom: Math.round(r.bottom),
              overflowPx: Math.round(r.bottom - CANVAS_HEIGHT),
              text: (el.innerText || '').slice(0, 45).replace(/\n/g, ' ')
            });
          }

          if (r.right > CANVAS_WIDTH + 2) {
            horizontalOverflows.push({
              tag: el.tagName.toLowerCase(),
              className: typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join(' ') : '',
              right: Math.round(r.right),
              overflowPx: Math.round(r.right - CANVAS_WIDTH),
              text: (el.innerText || '').slice(0, 45).replace(/\n/g, ' ')
            });
          }
        }
      });

      return {
        slideNo,
        found: true,
        maxBottom: Math.round(maxBottom),
        maxRight: Math.round(maxRight),
        verticalCount: verticalOverflows.length,
        maxVOverflow: verticalOverflows.length > 0 ? Math.max(...verticalOverflows.map(o => o.overflowPx)) : 0,
        maxHOverflow: horizontalOverflows.length > 0 ? Math.max(...horizontalOverflows.map(o => o.overflowPx)) : 0,
        sampleV: verticalOverflows[0] || null,
        sampleH: horizontalOverflows[0] || null
      };
    }, { slideNo, CANVAS_HEIGHT, CANVAS_WIDTH, BOTTOM_TOLERANCE_PX });

    checkedCount++;

    if (!report.found) {
      console.log(`⚠️ Slide ${slideNo}: Could not locate .slidev-page-${slideNo} element.`);
      continue;
    }

    if (report.verticalCount > 0 || report.maxHOverflow > 0) {
      overflowingSlides.push(report);
      const parts = [];
      if (report.maxVOverflow > 0) parts.push(`V-Overflow: +${report.maxVOverflow}px (bottom: ${report.maxBottom}px)`);
      if (report.maxHOverflow > 0) parts.push(`H-Overflow: +${report.maxHOverflow}px (right: ${report.maxRight}px)`);
      console.log(`❌ Slide ${slideNo}: ${parts.join(', ')}`);
      if (report.sampleV) {
        console.log(`   └─ Culprit: <${report.sampleV.tag} class="${report.sampleV.className}"> "${report.sampleV.text}"`);
      }
    } else {
      console.log(`✅ Slide ${slideNo}: OK (maxBottom: ${report.maxBottom}px / ${CANVAS_HEIGHT}px)`);
    }
  }

  await browser.close();

  console.log(`\n==================================================`);
  console.log(`📊 Audit Summary: ${checkedCount} slides checked.`);
  if (overflowingSlides.length === 0) {
    console.log(`🎉 ALL SLIDES PASS! Zero overflow detected.`);
    process.exit(0);
  } else {
    console.log(`🚨 Found ${overflowingSlides.length} slide(s) with content overflow:`);
    console.log(`   ${overflowingSlides.map(s => `Slide ${s.slideNo} (+${s.maxVOverflow}px)`).join(', ')}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error during overflow check:', err);
  process.exit(1);
});
