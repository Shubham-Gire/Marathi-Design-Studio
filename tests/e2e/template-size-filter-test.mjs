import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTemplateSizeFilterTest() {
  console.log('========================================================================');
  console.log('TEST: FILTER TEMPLATES STRICTLY AS PER EDITOR SIZE');
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
    console.log('1. Loading Editor at http://localhost:5173/editor (Default Square 1080x1080)...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    // -------------------------------------------------------------------------
    // TEST 1: Square Canvas (1080x1080) Template Filtering
    // -------------------------------------------------------------------------
    console.log('2. Verifying Templates drawer for 1080x1080 Square Canvas...');
    const filterBanner = page.locator('[data-testid="template-size-filter-banner"]').first();
    assert(await filterBanner.isVisible(), 'Template size filter banner is visible');

    const bannerText = await filterBanner.innerText();
    console.log(`   ✓ Filter Banner: "${bannerText.replace(/\n/g, ' ')}"`);
    assert(bannerText.includes('1080 × 1080 px'), 'Banner shows 1080 × 1080 px');
    assert(bannerText.includes('Same size only'), 'Filter mode defaults to Same size only');

    // Verify visible Canva official templates are square (1080x1080)
    console.log('   Checking Canva Official Templates shown for 1080x1080...');
    const squareTemplate1 = page.locator('text=मा. बाळासाहेब ठाकरे').first();
    const squareTemplate2 = page.locator('text=Property Dot Com').first();
    assert(await squareTemplate1.isVisible(), 'Balasaheb Thackeray 1080x1080 square template is visible');
    assert(await squareTemplate2.isVisible(), 'Property Dot Com 1080x1080 square template is visible');

    // The Grand Opening Poster (1080x1350) should NOT be visible!
    const posterTemplateInSquare = page.locator('text=भव्य उद्घाटन व सण विशेष').first();
    const isPosterVisibleInSquare = await posterTemplateInSquare.isVisible();
    console.log(`   ✓ Grand Opening Poster (1080x1350) visible in square canvas: ${isPosterVisibleInSquare} (Must be false)`);
    assert(!isPosterVisibleInSquare, 'Poster templates are NOT shown when editor is square!');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'template_filter_square_1080x1080.png') });
    console.log('   ✓ Screenshot saved: template_filter_square_1080x1080.png');

    // -------------------------------------------------------------------------
    // TEST 2: Switch to Poster Size (1080x1350) & Verify Template Drawer Updates
    // -------------------------------------------------------------------------
    console.log('3. Switching Canvas to Poster Size (1080x1350)...');
    const posterToggleBtn = page.locator('[data-testid="header-poster-toggle-btn"]').first();
    await posterToggleBtn.click();
    await page.waitForTimeout(600);

    const bannerTextPoster = await filterBanner.innerText();
    console.log(`   ✓ Filter Banner after switch: "${bannerTextPoster.replace(/\n/g, ' ')}"`);
    assert(bannerTextPoster.includes('1080 × 1350 px'), 'Banner updated to 1080 × 1350 px!');

    // Now the Grand Opening Poster (1080x1350) MUST be visible!
    console.log('   Checking Canva Official Templates shown for 1080x1350 Poster...');
    const posterTemplateInPoster = page.locator('text=भव्य उद्घाटन व सण विशेष').first();
    assert(await posterTemplateInPoster.isVisible(), 'Grand Opening Poster (1080x1350) is now visible!');

    // The Square templates (1080x1080) should NOT be visible under Canva Official!
    const isSquareVisibleInPoster = await squareTemplate1.isVisible();
    console.log(`   ✓ Haldi Research Square (1080x1080) visible in poster canvas: ${isSquareVisibleInPoster} (Must be false)`);
    assert(!isSquareVisibleInPoster, 'Square templates are NOT shown when editor is poster size!');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'template_filter_poster_1080x1350.png') });
    console.log('   ✓ Screenshot saved: template_filter_poster_1080x1350.png');

    // -------------------------------------------------------------------------
    // TEST 3: Toggle Size Filter ("All sizes" vs "Same size only")
    // -------------------------------------------------------------------------
    console.log('4. Testing Toggle Size Filter button ("All sizes")...');
    const toggleFilterBtn = page.locator('[data-testid="toggle-size-filter-btn"]').first();
    await toggleFilterBtn.click();
    await page.waitForTimeout(400);

    // In "All sizes" mode, both poster and square templates should be visible
    assert(await posterTemplateInPoster.isVisible(), 'Poster template is visible in all-sizes mode');
    assert(await squareTemplate1.isVisible(), 'Square template is also visible in all-sizes mode');
    console.log('   ✓ Both sizes visible when "All sizes" is toggled');

    // Toggle back to "Same size only"
    await toggleFilterBtn.click();
    await page.waitForTimeout(400);
    assert(!(await squareTemplate1.isVisible()), 'Square template hidden again when restored to "Same size only"');
    console.log('   ✓ Strict same-size filtering restored successfully');

    console.log('\n========================================================================');
    console.log('🎉 ALL TEMPLATE SIZE FILTERING TESTS PASSED 100%!');
    console.log('========================================================================');
  } finally {
    await browser.close();
  }
}

runTemplateSizeFilterTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
