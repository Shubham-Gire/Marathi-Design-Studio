import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runPosterRulerTest() {
  console.log('========================================================================');
  console.log('VERIFYING RULER AS PER POSTER SIZE, UNITS, MARGINS & PRESETS');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  await context.addInitScript(() => {
    localStorage.setItem('marathi_token', 'mock_admin_token');
    localStorage.setItem('marathi_user', JSON.stringify({
      id: 1,
      email: 'admin@marathidesignstudio.com',
      fullName: 'Admin User',
      role: 'ADMIN',
      planTier: 'FREE'
    }));
  });

  const page = await context.newPage();

  try {
    console.log('1. Loading Editor at http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    // -------------------------------------------------------------------------
    // TEST 1: Initial State & Poster Toggle in Quick View Bar
    // -------------------------------------------------------------------------
    console.log('2. Verifying Poster Size button in Quick View Bar...');
    const posterToggleBtn = page.locator('[data-testid="header-poster-toggle-btn"]').first();
    assert(await posterToggleBtn.isVisible(), 'Header contains Poster Size button');

    // Click "Poster Size" to switch from 1080x1080 to 1080x1350
    console.log('   Clicking "Poster Size" button...');
    await posterToggleBtn.click();
    await page.waitForTimeout(600);

    const dimsBadge = page.locator('[data-testid="header-dimensions-badge"]').first();
    const dimsText = await dimsBadge.innerText();
    console.log(`   ✓ Dimensions text: "${dimsText}"`);
    assert(dimsText.includes('1080 × 1350 px') && dimsText.includes('Poster'), 'Canvas switched to 1080 × 1350 px Poster size!');

    // -------------------------------------------------------------------------
    // TEST 2: Ruler Dimensions & Boundary Markers
    // -------------------------------------------------------------------------
    console.log('3. Verifying Rulers match Poster Dimensions exactly...');
    const topRuler = page.locator('[data-testid="top-poster-ruler"]').first();
    const leftRuler = page.locator('[data-testid="left-poster-ruler"]').first();
    const canvasContainer = page.locator('.canvas-container').first();

    const topRulerBox = await topRuler.boundingBox();
    const leftRulerBox = await leftRuler.boundingBox();
    const canvasBox = await canvasContainer.boundingBox();

    assert(topRulerBox && leftRulerBox && canvasBox, 'Bounding boxes found');
    console.log(`   ✓ Top ruler width: ${topRulerBox.width.toFixed(1)}px vs Canvas width: ${canvasBox.width.toFixed(1)}px`);
    console.log(`   ✓ Left ruler height: ${leftRulerBox.height.toFixed(1)}px vs Canvas height: ${canvasBox.height.toFixed(1)}px`);

    assert(Math.abs(topRulerBox.width - canvasBox.width) < 2, 'Top ruler width matches poster width!');
    assert(Math.abs(leftRulerBox.height - canvasBox.height) < 2, 'Left ruler height matches poster height!');

    // Check Poster End Badges
    const endWidthBadge = page.locator('[data-testid="ruler-poster-end-width"]').first();
    const endHeightBadge = page.locator('[data-testid="ruler-poster-end-height"]').first();
    assert(await endWidthBadge.isVisible(), 'Poster width boundary badge is visible at top ruler edge');
    assert(await endHeightBadge.isVisible(), 'Poster height boundary badge is visible at left ruler edge');

    const endWText = await endWidthBadge.innerText();
    const endHText = await endHeightBadge.innerText();
    console.log(`   ✓ Poster width badge: "${endWText}", height badge: "${endHText}"`);
    assert(endWText.includes('1080'), 'Top ruler end badge shows 1080');
    assert(endHText.includes('1350'), 'Left ruler end badge shows 1350');

    // -------------------------------------------------------------------------
    // TEST 3: Origin Junction Box & Units Switcher
    // -------------------------------------------------------------------------
    console.log('4. Verifying Ruler Origin & Units Menu...');
    const originBox = page.locator('[data-testid="ruler-origin-box"]').first();
    assert(await originBox.isVisible(), 'Ruler Origin box is visible');

    // Click origin box to open dropdown
    await originBox.click();
    await page.waitForTimeout(300);

    const inchesBtn = page.locator('[data-testid="ruler-unit-in"]').first();
    assert(await inchesBtn.isVisible(), 'Inches unit button is available in menu');

    console.log('   Switching unit to Inches (in)...');
    await inchesBtn.click();
    await page.waitForTimeout(400);

    const endWInches = await endWidthBadge.innerText();
    const endHInches = await endHeightBadge.innerText();
    console.log(`   ✓ In inches - Width badge: "${endWInches}", Height badge: "${endHInches}"`);
    assert(endWInches.includes('11.3″'), 'Top ruler displays 11.3″ (1080 / 96 in)');
    assert(endHInches.includes('14.1″'), 'Left ruler displays 14.1″ (1350 / 96 in)');

    // Switch back to px (menu is already open)
    const pxBtn = page.locator('[data-testid="ruler-unit-px"]').first();
    await pxBtn.click();
    await page.waitForTimeout(400);

    // Close menu by clicking outside or origin box
    await page.mouse.click(800, 200);
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 4: Loading Canva Grand Opening Poster Template
    // -------------------------------------------------------------------------
    console.log('5. Testing Canva Grand Opening Poster Template load...');
    const posterTmpl = page.locator('text=भव्य उद्घाटन व सण विशेष').first();
    await posterTmpl.click();
    await page.waitForTimeout(1500);

    const postTmplCanvasBox = await canvasContainer.boundingBox();
    const postTmplTopRulerBox = await topRuler.boundingBox();
    const postTmplLeftRulerBox = await leftRuler.boundingBox();

    console.log(`   ✓ After template load - Canvas size: ${postTmplCanvasBox.width.toFixed(1)} × ${postTmplCanvasBox.height.toFixed(1)}`);
    assert(Math.abs(postTmplTopRulerBox.width - postTmplCanvasBox.width) < 2, 'Top ruler matches template poster width');
    assert(Math.abs(postTmplLeftRulerBox.height - postTmplCanvasBox.height) < 2, 'Left ruler matches template poster height');

    // -------------------------------------------------------------------------
    // TEST 5: Poster Margins & Bleed Overlay
    // -------------------------------------------------------------------------
    console.log('6. Verifying Poster Safe Margins & Print Bleed Overlay...');
    const marginsBtn = page.locator('button:has-text("Margins")').first();
    await marginsBtn.click();
    await page.waitForTimeout(400);

    const safeZone = page.locator('text=Poster Safe Zone (5%)').first();
    const printBleed = page.locator('text=Print Bleed (3%)').first();
    assert(await safeZone.isVisible(), 'Poster Safe Zone (5%) is visible');
    assert(await printBleed.isVisible(), 'Print Bleed (3%) is visible');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'poster_ruler_verified_final.png') });
    console.log('   ✓ Screenshot saved: poster_ruler_verified_final.png');

    console.log('\n🎉 ALL POSTER RULER & DIMENSION TESTS PASSED 100%!');
  } finally {
    await browser.close();
  }
}

runPosterRulerTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
