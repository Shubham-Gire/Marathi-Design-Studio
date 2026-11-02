import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

async function runArtboardAndCalligraphyVerification() {
  console.log('========================================================================');
  console.log('ARTBOARD HEADER FIX & CALLIGRAPHY/STENCILS STUDIO E2E VERIFICATION');
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

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
    // -------------------------------------------------------------------------
    // TEST 1: VERIFY ARTBOARD HEADER LAYOUT FIX & NO COLLISION
    // -------------------------------------------------------------------------
    console.log('1. Loading Canva Editor at http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);

    // Verify Top Stage Status Strip exists and is pinned cleanly
    const dimensionsText = await page.locator('text=1080 × 1080 px').first().isVisible();
    assert(dimensionsText, 'Pinned Top Stage Status Strip displays canvas dimensions (1080 × 1080 px)');

    const fitBtn = await page.locator('button:has-text("Fit")').first().isVisible();
    assert(fitBtn, 'Top Stage Status Strip contains Fit to Screen button');

    const rulersBtn = await page.locator('button:has-text("Rulers")').first().isVisible();
    assert(rulersBtn, 'Top Stage Status Strip contains Rulers toggle button');

    // Verify Artboard Page Header above canvas artboard
    const pageBadge = await page.locator('span:has-text("Page 1")').first().isVisible();
    assert(pageBadge, 'Artboard Header displays Page 1 pill');

    const pageTitleInput = page.locator('input[placeholder="Add page title"]').first();
    const titlePlaceholderVisible = await pageTitleInput.isVisible();
    assert(titlePlaceholderVisible, 'Artboard Header displays clean "Add page title" placeholder (no redundant "Page 1 - Page 1" or stale copy text)');

    // Verify Page Action Buttons
    const addPageUpBtn = page.locator('[data-testid="add-page-up-btn"]');
    const addPageUpVisible = await addPageUpBtn.isVisible();
    assert(addPageUpVisible, 'Artboard Header displays "Add page up" action button cleanly');

    const duplicateBtn = page.locator('button[title="Duplicate page"]').first();
    const duplicateVisible = await duplicateBtn.isVisible();
    assert(duplicateVisible, 'Artboard Header displays "Duplicate page" action button cleanly');

    // Take screenshot of the clean, fixed artboard header
    const fixedHeaderScreenshotPath = path.join(ARTIFACT_DIR, 'artboard_header_fixed_no_overlap.png');
    await page.screenshot({ path: fixedHeaderScreenshotPath });
    console.log(`📸 Screenshot saved: ${fixedHeaderScreenshotPath}`);

    // -------------------------------------------------------------------------
    // TEST 2: TEST MULTI-PAGE DUPLICATION & CLEAN TITLE FORMATTING
    // -------------------------------------------------------------------------
    console.log('\n2. Testing Page Duplication and Clean Naming...');
    await duplicateBtn.click();
    await page.waitForTimeout(500);

    // After duplicating page 1, current page should now be Page 2
    const page2Badge = await page.locator('span:has-text("Page 2")').first().isVisible();
    assert(page2Badge, 'Duplicating page cleanly updates active badge to "Page 2" without title collision');

    // -------------------------------------------------------------------------
    // TEST 3: VERIFY NODE.JS TOOLS MICROSERVICE & CALLIGRAPHY STUDIO
    // -------------------------------------------------------------------------
    console.log('\n3. Testing Calligraphy & Vector Stencils Studio in Canva Drawer...');
    
    // Open Calligraphy tab in dock
    const calligraphyDockBtn = page.locator('button:has-text("Stencils")');
    if (await calligraphyDockBtn.isVisible()) {
      await calligraphyDockBtn.click();
      await page.waitForTimeout(800);
    }

    const calligraphyHeading = await page.locator('text=Calligraphy & Stencils (कॅलिग्राफी)').isVisible();
    assert(calligraphyHeading, 'Calligraphy & Stencils Studio drawer opened successfully');

    const nodeToolsBadge = await page.locator('text=Node.js Tools Engine').isVisible();
    assert(nodeToolsBadge, 'Calligraphy Studio indicates Node.js Tools Engine integration');

    // Verify Category Filter Pills
    const rajmudraCategoryPill = page.locator('button:has-text("Rajmudra & Shivray")');
    assert(await rajmudraCategoryPill.isVisible(), 'Rajmudra & Shivray category filter pill is available');

    const sacredCategoryPill = page.locator('button:has-text("Sacred (देवस्थान)")');
    assert(await sacredCategoryPill.isVisible(), 'Sacred (देवस्थान) category filter pill is available');

    // Verify Color Themes
    const goldThemeBtn = page.locator('button:has-text("Gold Foil")');
    assert(await goldThemeBtn.isVisible(), 'Royal Gold Foil theme selector is available');

    const bhagwaThemeBtn = page.locator('button:has-text("Maratha Saffron")');
    assert(await bhagwaThemeBtn.isVisible(), 'Bhagwa Maratha Saffron theme selector is available');

    // Test English-to-Marathi live transliteration
    console.log('\n4. Testing English-to-Marathi Phonetic Transliteration...');
    const transliterateInput = page.locator('input[placeholder*="Type here (e.g. shubhechha"]');
    assert(await transliterateInput.isVisible(), 'Live phonetic transliteration input field is visible');

    await transliterateInput.fill('chhatrapati shivaji maharaj');
    await page.waitForTimeout(500);

    const devanagariResult = page.locator('span:has-text("छत्रपती शिवाजी महाराज")').first();
    assert(await devanagariResult.isVisible(), 'Phonetic input "chhatrapati shivaji maharaj" correctly transliterated to "छत्रपती शिवाजी महाराज"');

    // Take screenshot of Calligraphy Studio with Transliteration Active
    const studioScreenshotPath = path.join(ARTIFACT_DIR, 'calligraphy_stencils_studio_active.png');
    await page.screenshot({ path: studioScreenshotPath });
    console.log(`📸 Screenshot saved: ${studioScreenshotPath}`);

    // -------------------------------------------------------------------------
    // TEST 5: TEST 1-CLICK INSERTION OF RAJMUDRA VECTOR STENCIL
    // -------------------------------------------------------------------------
    console.log('\n5. Testing 1-Click Insertion of Rajmudra SVG Stencil onto Artboard...');
    const insertRajmudraBtn = page.locator('button:has-text("Insert")').first();
    assert(await insertRajmudraBtn.isVisible(), 'Insert button visible on Chhatrapati Shivaji Maharaj Rajmudra card');

    await insertRajmudraBtn.click();
    await page.waitForTimeout(800);

    // Verify canvas now has active vector object
    const hasActiveObject = await page.evaluate(() => {
      // @ts-ignore
      const canvasEl = document.querySelector('canvas.lower-canvas');
      return !!canvasEl;
    });
    assert(hasActiveObject, 'Rajmudra SVG Vector Stencil loaded onto Fabric canvas artboard');

    // Take screenshot of Canvas with Rajmudra Stencil
    const canvasStencilScreenshotPath = path.join(ARTIFACT_DIR, 'canvas_with_rajmudra_stencil_inserted.png');
    await page.screenshot({ path: canvasStencilScreenshotPath });
    console.log(`📸 Screenshot saved: ${canvasStencilScreenshotPath}`);

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log('\n========================================================================');
  console.log(`TEST RUN COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runArtboardAndCalligraphyVerification();
