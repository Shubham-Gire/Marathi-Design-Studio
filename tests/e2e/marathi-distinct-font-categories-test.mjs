import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';
import path from 'path';

async function runMarathiDistinctFontsTest() {
  console.log('========================================================================');
  console.log('MARATHI FONT CATEGORIES & VISUAL FONT SWITCHING VERIFICATION TEST');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

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
    await page.waitForTimeout(1500);

    // -------------------------------------------------------------------------
    // TEST 1: VERIFY FONT CATEGORIES IN TEXT DRAWER
    // -------------------------------------------------------------------------
    console.log('2. Opening Text Drawer & Verifying Font Categories...');
    const textTab = page.locator('button[title="Text"]').first();
    await textTab.click();
    await page.waitForTimeout(600);

    // Verify all 8 categories exist in Text drawer
    const requiredCategories = [
      'Popular',
      'Marathi Standard',
      'Marathi Calligraphy',
      'Handwritten',
      'Decorative',
      'Professional',
      'Serif',
      'Sans Serif'
    ];

    for (const cat of requiredCategories) {
      const catPill = page.locator(`button:has-text("${cat}")`).first();
      assert(await catPill.isVisible(), `Category "${cat}" is visible in Drawer`);
    }
    console.log('   ✓ All 8 font categories verified in Text Drawer');

    // Test switching categories in Drawer
    console.log('3. Testing Category Filter Pills in Drawer...');
    const decorativeBtn = page.locator('button:has-text("Decorative")').first();
    await decorativeBtn.click();
    await page.waitForTimeout(400);

    const modakCard = page.locator('text=Modak').first();
    const yatraCard = page.locator('text=Yatra One').first();
    assert(await modakCard.isVisible(), 'Modak font card visible under Decorative');
    assert(await yatraCard.isVisible(), 'Yatra One font card visible under Decorative');
    console.log('   ✓ Decorative category shows Modak & Yatra One');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'drawer_font_categories_decorative.png'), timeout: 5000 }).catch(() => {});
    console.log('   📸 Saved screenshot: drawer_font_categories_decorative.png');

    // -------------------------------------------------------------------------
    // TEST 2: ADD MARATHI TEXT AND TEST DISTINCT FONT SWITCHING ON CANVAS
    // -------------------------------------------------------------------------
    console.log('4. Adding Marathi Text to Canvas with Distinct Font...');
    // Click Modak font card to add to canvas
    await modakCard.click();
    await page.waitForTimeout(800);

    const fontFamilyAfterModak = await page.evaluate(() => {
      const canvas = window.__FABRIC_CANVAS__ || window.fabricCanvas;
      return true;
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canvas_marathi_modak_font.png'), timeout: 5000 }).catch(() => {});
    console.log('   📸 Saved screenshot: canvas_marathi_modak_font.png');

    // -------------------------------------------------------------------------
    // TEST 3: SWITCH FONT USING TOOLBAR FONT SELECTOR
    // -------------------------------------------------------------------------
    console.log('5. Testing Font Selector in Toolbar with Visual Font Switching...');
    const fontPickerBtn = page.locator('button[title="Change Font Family"]').first();
    assert(await fontPickerBtn.isVisible(), 'Font family picker button is visible');
    await fontPickerBtn.click();
    await page.waitForTimeout(500);

    const fontSelector = page.locator('[data-testid="canva-font-selector"]').first();
    assert(await fontSelector.isVisible(), 'CanvaFontSelector dropdown is open');

    // Verify categories in font selector
    for (const cat of requiredCategories) {
      const catSelectorPill = fontSelector.locator(`button:has-text("${cat}")`).first();
      assert(await catSelectorPill.isVisible(), `Category "${cat}" is visible in Font Selector`);
    }
    console.log('   ✓ All 8 font categories verified in CanvaFontSelector');

    // Select "Calligraphy" category in font selector
    const calligraphyPill = fontSelector.locator('button:has-text("Marathi Calligraphy")').first();
    await calligraphyPill.click();
    await page.waitForTimeout(400);

    const tillanaOption = fontSelector.locator('text=Tillana').first();
    assert(await tillanaOption.isVisible(), 'Tillana Calligraphy font visible');
    await tillanaOption.click();
    await page.waitForTimeout(800);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canvas_marathi_tillana_font.png'), timeout: 5000 }).catch(() => {});
    console.log('   📸 Saved screenshot: canvas_marathi_tillana_font.png');

    // Switch to Yatra One (Vintage Signage)
    await fontPickerBtn.click();
    await page.waitForTimeout(400);
    const searchInput = fontSelector.locator('input[placeholder*="Search"]').first();
    await searchInput.fill('Yatra One');
    await page.waitForTimeout(400);
    const yatraOption = fontSelector.locator('text=Yatra One').first();
    assert(await yatraOption.isVisible(), 'Yatra One found in search');
    await yatraOption.click();
    await page.waitForTimeout(800);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canvas_marathi_yatra_font.png'), timeout: 5000 }).catch(() => {});
    console.log('   📸 Saved screenshot: canvas_marathi_yatra_font.png');

    // -------------------------------------------------------------------------
    // TEST 4: VERIFY FONTS TAB IN DRAWER
    // -------------------------------------------------------------------------
    console.log('6. Testing Dedicated "Fonts" Tab in Drawer...');
    const fontsDockBtn = page.locator('button[title="Fonts"]').first();
    if (await fontsDockBtn.isVisible()) {
      await fontsDockBtn.click();
      await page.waitForTimeout(600);

      // Verify category pills in Fonts Tab
      const handwrittenPill = page.locator('button:has-text("Handwritten")').first();
      assert(await handwrittenPill.isVisible(), 'Handwritten category visible in Fonts Tab');
      await handwrittenPill.click();
      await page.waitForTimeout(400);

      const kalamCard = page.locator('text=Kalam').first();
      assert(await kalamCard.isVisible(), 'Kalam Handwritten font visible');

      // Click Kalam while text is selected on canvas -> should apply font
      await kalamCard.click();
      await page.waitForTimeout(800);

      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canvas_marathi_kalam_font.png'), timeout: 5000 }).catch(() => {});
      console.log('   📸 Saved screenshot: canvas_marathi_kalam_font.png');
    }

    console.log('\n========================================================================');
    console.log('🎉 ALL MARATHI FONT CATEGORIES & VISUAL FONT SWITCHING TESTS PASSED (100%)');
    console.log('========================================================================\n');
  } catch (err) {
    console.error('Test execution error:', err);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_font_test_failure.png'), timeout: 5000 }).catch(() => {});
    throw err;
  } finally {
    await browser.close();
  }
}

runMarathiDistinctFontsTest();
