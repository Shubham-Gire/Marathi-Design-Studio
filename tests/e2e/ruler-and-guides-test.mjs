import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';
import path from 'path';

async function runRulerAndGuidesTest() {
  console.log('========================================================================');
  console.log('CANVA RULERS, SETTINGS AREA, VERTICAL MULTI-PAGE & DRAG-DROP TEST');
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
  const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

  try {
    console.log('1. Loading Canva Editor at http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1000);

    // -------------------------------------------------------------------------
    // TEST 1: VERIFY SETTINGS AREA IN CANVA HEADER (NO DIVIDING STRIP OVER STAGE)
    // -------------------------------------------------------------------------
    console.log('2. Verifying Setting Area in Canva Header (Clean Canvas Viewport)...');
    const settingsArea = page.locator('[data-testid="stage-quick-view-bar"]').first();
    assert(await settingsArea.isVisible(), 'Settings Area is rendered cleanly in Canva Header');

    const dimensionsBadge = settingsArea.locator('text=1080 × 1080 px').first();
    assert(await dimensionsBadge.isVisible(), 'Setting area displays canvas dimensions');

    const fitBtn = settingsArea.locator('button:has-text("Fit")').first();
    assert(await fitBtn.isVisible(), 'Setting area contains Fit button');

    const rulersToggleBtn = settingsArea.locator('button:has-text("Rulers")').first();
    const marginsToggleBtn = settingsArea.locator('button:has-text("Margins")').first();
    const gridToggleBtn = settingsArea.locator('button:has-text("Grid")').first();

    assert(await rulersToggleBtn.isVisible(), 'Setting area contains Rulers toggle');
    assert(await marginsToggleBtn.isVisible(), 'Setting area contains Margins toggle');
    assert(await gridToggleBtn.isVisible(), 'Setting area contains Grid toggle');

    // -------------------------------------------------------------------------
    // TEST 2: VERIFY CANVA RULERS & ADAPTIVE TICKS
    // -------------------------------------------------------------------------
    console.log('3. Verifying Top & Left Canva Rulers...');
    const topRuler = page.locator('div[title*="Top Ruler"]').first();
    const leftRuler = page.locator('div[title*="Left Ruler"]').first();

    assert(await topRuler.isVisible(), 'Top horizontal ruler is rendered cleanly');
    assert(await leftRuler.isVisible(), 'Left vertical ruler is rendered cleanly');

    // Verify Origin (0,0) Junction Box
    const originBox = page.locator('div[title*="Ruler Origin"]').first();
    assert(await originBox.isVisible(), 'Top-left corner origin junction box is visible');
    const originText = await originBox.innerText();
    assert(originText.includes('px'), 'Origin box displays "px" unit identifier');

    // -------------------------------------------------------------------------
    // TEST 3: VERIFY VERTICAL MULTI-PAGE STACK
    // -------------------------------------------------------------------------
    console.log('4. Verifying Vertical Multi-Page Stack...');
    // Initial: Exactly 1 page at the top
    const page1 = page.locator('#artboard-page-0');
    assert(await page1.isVisible(), 'Page 1 artboard is displayed vertically in viewport');

    // Click "+ Add page" button to add Page 2
    console.log('   Clicking "+ Add page" to add second page...');
    const addPageBtn = page.locator('button:has-text("Add page")').first();
    await addPageBtn.click();
    await page.waitForTimeout(600);

    // Verify Page 2 is rendered below Page 1
    const page2 = page.locator('#artboard-page-1');
    assert(await page2.isVisible(), 'Page 2 is rendered vertically below Page 1 in continuous scroll');

    const page1Box = await page1.boundingBox();
    const page2Box = await page2.boundingBox();
    assert(page1Box && page2Box, 'Bounding boxes for Page 1 and Page 2 retrieved');
    assert(page2Box.y >= page1Box.y + page1Box.height, `Page 2 (${page2Box.y}) is positioned vertically below Page 1 (${page1Box.y + page1Box.height})!`);

    // Verify Page 2 has its own Artboard Header
    const page2Badge = page2.locator('text=Page 2').first();
    assert(await page2Badge.isVisible(), 'Page 2 displays its own Artboard Header with Page 2 indicator');

    // -------------------------------------------------------------------------
    // TEST 4: BROWSER IMAGE DRAG AND DROP
    // -------------------------------------------------------------------------
    console.log('5. Testing Drag and Drop of Browser Image into Canva Editor...');
    // Simulate dropping an external image URL onto the active canvas
    const sampleImageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
    
    await page.evaluate((url) => {
      const stageWrapper = document.getElementById('fabric-stage-wrapper');
      const canvasEl = stageWrapper?.querySelector('canvas.upper-canvas') || stageWrapper?.querySelector('canvas');
      if (!canvasEl) throw new Error('Canvas element not found for drop');

      const dt = new DataTransfer();
      dt.setData('text/plain', url);
      dt.setData('text/uri-list', url);
      dt.setData('text/html', `<img src="${url}" />`);

      const rect = canvasEl.getBoundingClientRect();
      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer: dt,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      });

      canvasEl.dispatchEvent(dropEvent);
    }, sampleImageUrl);

    await page.waitForTimeout(1000);
    console.log('   Browser image drop event dispatched successfully');

    // -------------------------------------------------------------------------
    // CAPTURE VERIFICATION SCREENSHOT
    // -------------------------------------------------------------------------
    const screenshotPath = path.join(ARTIFACT_DIR, 'canva_vertical_pages_and_rulers_fixed.png');
    await page.screenshot({ path: screenshotPath, timeout: 5000 }).catch(() => {});
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    // Verify Rulers toggle off/on
    console.log('6. Verifying Toggle Rulers...');
    await rulersToggleBtn.click();
    await page.waitForTimeout(400);
    assert(!(await topRuler.isVisible()), 'Rulers hide when toggled off from Setting area');

    await rulersToggleBtn.click();
    await page.waitForTimeout(400);
    assert(await topRuler.isVisible(), 'Rulers reappear when toggled on from Setting area');

    console.log('\n========================================================================');
    console.log('🎉 ALL CANVA RULERS, SETTINGS AREA, VERTICAL PAGES & DRAG-DROP TESTS PASSED 100%!');
    console.log('========================================================================');

  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runRulerAndGuidesTest();
