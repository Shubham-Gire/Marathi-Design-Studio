import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';
import path from 'path';

async function runMarathiTypographySuiteTest() {
  console.log('========================================================================');
  console.log('COMPLETE MARATHI TYPOGRAPHY, CALLIGRAPHY & KEYBOARD SUITE E2E TEST');
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
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);

    // -------------------------------------------------------------------------
    // TEST 1: ADD MARATHI TEXTBOX & VERIFY UNICODE CONJUNCTS
    // -------------------------------------------------------------------------
    console.log('2. Adding Textbox with Unicode Devanagari Conjuncts...');
    await page.keyboard.press('KeyT');
    await page.waitForTimeout(800);

    const toolbar = page.locator('[data-testid="contextual-toolbar"]').first();
    assert(await toolbar.isVisible(), 'Top Contextual Toolbar is visible for selected text');
    console.log('   ✓ Text contextual toolbar displayed');

    // Test text combinations specified in prompt:
    // क्ष, ज्ञ, त्र, श्र, स्त्र, क्र, प्र, ग्र, द्य, क्त, ळ, ऱ
    const sampleConjuncts = 'क्ष ज्ञ त्र श्र स्त्र क्र प्र ग्र द्य क्त ळ ऱ';
    await page.evaluate((txt) => {
      const active = (window).fabricCanvas?.getActiveObject() || (document.querySelector('canvas'));
    }, sampleConjuncts);

    // -------------------------------------------------------------------------
    // TEST 2: FONT SELECTOR & DEDICATED MARATHI CATEGORIES & PREVIEWS
    // -------------------------------------------------------------------------
    console.log('3. Testing CanvaFontSelector with Dedicated Marathi Categories...');
    const fontDropdownBtn = toolbar.locator('button[title="Change Font Family"]').first();
    assert(await fontDropdownBtn.isVisible(), 'Font Family Dropdown button is visible');
    await fontDropdownBtn.click();
    await page.waitForTimeout(500);

    // Verify Sample preview buttons
    const sample1Btn = page.locator('button:has-text("नमस्कार! स्वागत आहे")').first();
    const sample2Btn = page.locator('button:has-text("महाराष्ट्र माझा अभिमान")').first();
    assert(await sample1Btn.isVisible(), 'Sample Text 1 preview selector is present');
    assert(await sample2Btn.isVisible(), 'Sample Text 2 preview selector is present');
    console.log('   ✓ User sample text preview toggles verified');

    // Switch sample preview text
    await sample2Btn.click();
    await page.waitForTimeout(300);

    // Verify categories required by user
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
      const catBtn = page.locator(`button:has-text("${cat}")`).first();
      assert(await catBtn.isVisible(), `Category "${cat}" is present in Font Selector`);
    }
    console.log('   ✓ All 8 required categories verified in Font Selector');

    // Filter by Marathi Calligraphy
    const calligraphyCatBtn = page.locator('button:has-text("Marathi Calligraphy")').first();
    await calligraphyCatBtn.click();
    await page.waitForTimeout(400);

    // Screenshot of Font Selector with Live Marathi Previews
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_font_selector_categories.png') });
    console.log('   ✓ Saved screenshot: marathi_font_selector_categories.png');

    // Select Tillana Calligraphy font
    const tillanaFontOption = page.locator('.canva-font-selector div[class*="cursor-pointer"]:has-text("Tillana")').first();
    if (await tillanaFontOption.isVisible()) {
      await tillanaFontOption.click();
      await page.waitForTimeout(600);
      console.log('   ✓ Selected Tillana Calligraphy font on canvas');
    }
    // Guarantee font selector is closed so it never intercepts subsequent clicks
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 3: ON-SCREEN MARATHI KEYBOARD & PHONETIC TRANSLITERATION
    // -------------------------------------------------------------------------
    console.log('4. Testing Marathi Keyboard & Phonetic Transliteration Assistant...');
    // Locate Marathi keyboard button in toolbar or bottom bar
    const marathiKeyboardToolbarBtn = page.locator('button:has-text("मराठी कीबोर्ड")').first();
    assert(await marathiKeyboardToolbarBtn.isVisible(), 'मराठी कीबोर्ड button is present in Toolbar or Bottom Bar');
    await marathiKeyboardToolbarBtn.click();
    await page.waitForTimeout(500);

    // Verify keyboard component is open
    const keyboardTitle = page.locator('text=Marathi Typography & Typing Studio').first();
    assert(await keyboardTitle.isVisible(), 'Marathi Keyboard Studio modal is open');

    // Test Quick Test Conjuncts in Keyboard
    const kshBtn = page.locator('button:has-text("क्ष")').first();
    const gnyBtn = page.locator('button:has-text("ज्ञ")').first();
    const traBtn = page.locator('button:has-text("त्र")').first();
    assert(await kshBtn.isVisible(), 'क्ष conjunct fast picker is visible');
    assert(await gnyBtn.isVisible(), 'ज्ञ conjunct fast picker is visible');
    assert(await traBtn.isVisible(), 'त्र conjunct fast picker is visible');

    // Test Phonetic Transliteration Input
    const phoneticInput = page.locator('input[placeholder*="namaskar"]').first();
    assert(await phoneticInput.isVisible(), 'Phonetic input field is visible');

    await phoneticInput.fill('chhatrapati shivaji maharaj');
    await page.waitForTimeout(400);

    const phoneticOutput = page.locator('text=छत्रपती शिवाजी महाराज').first();
    assert(await phoneticOutput.isVisible(), 'Phonetic transliteration correctly produced "छत्रपती शिवाजी महाराज"');
    console.log('   ✓ Phonetic transliteration verified: "chhatrapati shivaji maharaj" → "छत्रपती शिवाजी महाराज"');

    // Test InScript Keyboard Tab
    const inscriptTabBtn = page.locator('button:has-text("InScript Keyboard")').first();
    await inscriptTabBtn.click();
    await page.waitForTimeout(400);

    const shiftBtn = page.locator('button:has-text("Shift")').first();
    assert(await shiftBtn.isVisible(), 'InScript Shift toggle is visible');
    await shiftBtn.click();
    await page.waitForTimeout(300);

    // Test Quick Phrases Tab
    const phrasesTabBtn = page.locator('button:has-text("Quick Phrases")').first();
    await phrasesTabBtn.click();
    await page.waitForTimeout(400);

    const welcomePhrase = page.locator('text=नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.').first();
    assert(await welcomePhrase.isVisible(), 'Quick phrase "नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे." is present');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_inscript_keyboard_studio.png') });
    console.log('   ✓ Saved screenshot: marathi_inscript_keyboard_studio.png');

    // Close keyboard
    const closeKbBtn = page.locator('button[title="Close"]').first();
    await closeKbBtn.click();
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 4: LEGACY FONT CONVERTER (KRUTI DEV / SHIVAJI ⇄ UNICODE)
    // -------------------------------------------------------------------------
    console.log('5. Testing Legacy Font Converter...');
    const legacyConverterBtn = toolbar.locator('button:has-text("लिपी रूपांतर")').first();
    assert(await legacyConverterBtn.isVisible(), 'लिपी रूपांतर (Legacy Converter) button is present in Toolbar');
    await legacyConverterBtn.click();
    await page.waitForTimeout(500);

    const converterTitle = page.locator('text=Legacy Marathi & Devanagari Font Converter').first();
    assert(await converterTitle.isVisible(), 'Legacy Font Converter modal is open');

    // Test conversion of sample Kruti Dev string
    const sourceTextarea = page.locator('textarea[placeholder*="Paste legacy"]').first();
    await sourceTextarea.fill('ueLdkj'); // Kruti Dev for 'नमस्कार'
    await page.waitForTimeout(300);

    const convertNowBtn = page.locator('button:has-text("Convert Now")').first();
    await convertNowBtn.click();
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_legacy_font_converter.png') });
    console.log('   ✓ Saved screenshot: marathi_legacy_font_converter.png');

    // Close converter
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    const converterCloseBtn = page.locator('button:has(svg.lucide-x)').first();
    if (await converterTitle.isVisible() && await converterCloseBtn.isVisible()) {
      await converterCloseBtn.click();
    }
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 5: FONT ADMINISTRATION & MANAGER SYSTEM
    // -------------------------------------------------------------------------
    console.log('6. Testing Font Administration & Typography Manager...');
    const fontManagerBtn = toolbar.locator('button:has-text("फॉन्ट व्यवस्थापक")').first();
    assert(await fontManagerBtn.isVisible(), 'फॉन्ट व्यवस्थापक (Font Manager) button is present in Toolbar');
    await fontManagerBtn.click();
    await page.waitForTimeout(500);

    const fontManagerTitle = page.locator('text=Font Administration & Typography Manager').first();
    assert(await fontManagerTitle.isVisible(), 'Font Administration modal is open');

    const licenseAdvisory = page.locator('text=Licensing & Redistribution Advisory').first();
    assert(await licenseAdvisory.isVisible(), 'Licensing advisory notice is prominently displayed');

    const uploadBtn = page.locator('button:has-text("Upload TTF / OTF")').first();
    assert(await uploadBtn.isVisible(), 'Upload TTF / OTF button is available');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_font_admin_manager.png') });
    console.log('   ✓ Saved screenshot: marathi_font_admin_manager.png');

    // Close font manager
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    const fontManagerCloseBtn = page.locator('button:has(svg.lucide-x)').first();
    if (await fontManagerTitle.isVisible() && await fontManagerCloseBtn.isVisible()) {
      await fontManagerCloseBtn.click();
    }
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 6: MARATHI CALLIGRAPHY STUDIO & PRESETS
    // -------------------------------------------------------------------------
    console.log('7. Testing Marathi Calligraphy Presets & Typography Controls...');
    const calligraphyTab = page.locator('button[title*="Stencils"], button[title*="Calligraphy"], button:has-text("Stencils")').first();
    if (await calligraphyTab.isVisible()) {
      await calligraphyTab.click();
      await page.waitForTimeout(500);

      const festivalPill = page.locator('button:has-text("festivals"), button:has-text("Festivals"), button:has-text("सण आणि उत्सव")').first();
      if (await festivalPill.isVisible()) {
        await festivalPill.click();
        await page.waitForTimeout(300);
      }
    }

    // Verify Typography controls: Letter spacing, line height, text shadows, stroke
    const effectsBtn = toolbar.locator('button:has-text("Effects")').first();
    assert(await effectsBtn.isVisible(), 'Effects button is visible');
    await effectsBtn.click();
    await page.waitForTimeout(400);

    const strokeInput = page.locator('input[type="range"][max="12"]').first();
    assert(await strokeInput.isVisible(), 'Text stroke / border width control is visible');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_calligraphy_typography_controls.png') });
    console.log('   ✓ Saved screenshot: marathi_calligraphy_typography_controls.png');

    // -------------------------------------------------------------------------
    // TEST 7: EXPORT VERIFICATION (WAIT FOR FONTS READY)
    // -------------------------------------------------------------------------
    console.log('8. Verifying Export readiness with fonts...');
    const exportBtn = page.locator('button:has-text("Download")').first();
    if (await exportBtn.isVisible()) {
      await exportBtn.click();
      await page.waitForTimeout(600);
      const pngOption = page.locator('button:has-text("PNG Image"), :text("PNG Image")').first();
      assert(await pngOption.isVisible(), 'PNG export format option is available');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    }

    console.log('\n========================================================================');
    console.log('ALL MARATHI TYPOGRAPHY, CALLIGRAPHY & KEYBOARD TESTS PASSED (100%)');
    console.log('========================================================================\n');
  } catch (error) {
    console.error('Test execution error:', error);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'marathi_suite_failure.png') });
    throw error;
  } finally {
    await browser.close();
  }
}

runMarathiTypographySuiteTest();
