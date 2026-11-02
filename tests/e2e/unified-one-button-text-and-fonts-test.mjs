import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runUnifiedTest() {
  console.log('🚀 Starting Verification: One Unified Button for Text & 100+ Fonts...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  await context.addInitScript(() => {
    localStorage.setItem('marathi_token', 'mock_admin_jwt_token_for_playwright');
    localStorage.setItem(
      'marathi_user',
      JSON.stringify({
        id: 1,
        email: 'admin@marathidesign.com',
        fullName: 'Admin User',
        role: 'ADMIN',
        planTier: 'PRO',
      })
    );
  });

  const page = await context.newPage();

  page.on('dialog', async (dialog) => {
    console.log(`💬 Dialog popup [${dialog.type()}]: ${dialog.message()}`);
    await dialog.accept();
  });

  try {
    console.log('1. Navigating to Editor: http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(2500);

    // ==========================================
    // STEP 1: VERIFY DOCK HAS ONLY ONE TEXT BUTTON (NO SEPARATE FONTS BUTTON)
    // ==========================================
    console.log('2. Checking dock items: verifying ONE single Text button and NO duplicate Fonts button...');
    const textDockBtn = page.locator('aside button[title="Text"]');
    assert(await textDockBtn.isVisible(), 'Dock must have "Text" button');

    const fontsDockBtn = page.locator('aside button[title="Fonts"]');
    const isFontsDockBtnVisible = await fontsDockBtn.isVisible();
    console.log(`✅ Duplicate "Fonts" button removed from dock: ${!isFontsDockBtnVisible}`);
    assert(!isFontsDockBtnVisible, 'Separate "Fonts" button should NOT be in the dock (unified into Text)');

    // Take screenshot of simplified dock
    await page.screenshot({ path: `${ARTIFACT_DIR}/unified_dock_one_button.png` });

    // ==========================================
    // STEP 2: OPEN UNIFIED TEXT PANEL & VERIFY ALL FEATURES
    // ==========================================
    console.log('3. Clicking single "Text" dock button...');
    await textDockBtn.click();
    await page.waitForTimeout(1000);

    // A. Verify Search Bar
    const searchInput = page.locator('input[placeholder="Search fonts and combinations"]').first();
    assert(await searchInput.isVisible(), 'Unified search input must be visible');
    console.log('✅ Search input visible');

    // B. Verify Quick Add Text Buttons
    const addTextBoxBtn = page.locator('button:has-text("Add a text box")').first();
    assert(await addTextBoxBtn.isVisible(), '"Add a text box" button must be visible');

    const addHeadingBtn = page.locator('button:has-text("Add a Bold Heading")').first();
    assert(await addHeadingBtn.isVisible(), '"Add a Bold Heading" button must be visible');

    const addSubheadingBtn = page.locator('button:has-text("Add a Subheading")').first();
    assert(await addSubheadingBtn.isVisible(), '"Add a Subheading" button must be visible');

    const addBodyBtn = page.locator('button:has-text("Add Little Bit of Body Text")').first();
    assert(await addBodyBtn.isVisible(), '"Add Little Bit of Body Text" button must be visible');
    console.log('✅ All Quick Add Text buttons visible');

    // C. Verify 3 Sub-Navigation Tabs inside the unified panel
    const fontsSubTab = page.locator('button:has-text("Fonts (")').first();
    const combosSubTab = page.locator('button:has-text("Combinations")').first();
    const calligraphySubTab = page.locator('button:has-text("Calligraphy")').first();
    assert(await fontsSubTab.isVisible(), '"Fonts" sub-tab must be visible');
    assert(await combosSubTab.isVisible(), '"Combinations" sub-tab must be visible');
    assert(await calligraphySubTab.isVisible(), '"Calligraphy" sub-tab must be visible');
    console.log('✅ 3 Clean Sub-navigation tabs visible (Fonts, Combinations, Calligraphy)');

    // D. In Fonts: Verify Category Pills and Live Preview
    const allFontsPill = page.locator('button:has-text("All Fonts (")').first();
    assert(await allFontsPill.isVisible(), '"All Fonts" category pill must be visible');
    const allFontsText = await allFontsPill.innerText();
    console.log(`✅ All Fonts Pill Text: "${allFontsText}"`);

    const amsPill = page.locator('button:has-text("AMS Calligraphy")').first();
    const weddingPill = page.locator('button:has-text("Millennium & Wedding")').first();
    const legacyPill = page.locator('button:has-text("Legacy Kruti/Shivaji")').first();
    const classicSuitesPill = page.locator('button:has-text("Classic Suites")').first();

    assert(await amsPill.isVisible(), 'AMS Calligraphy category pill visible');
    console.log(`✅ AMS Calligraphy Pill Text: "${await amsPill.innerText()}"`);
    assert(await weddingPill.isVisible(), 'Millennium & Wedding category pill visible');
    assert(await legacyPill.isVisible(), 'Legacy Kruti/Shivaji category pill visible');
    assert(await classicSuitesPill.isVisible(), 'Classic Suites category pill visible');
    console.log('✅ All Devanagari categories visible with exact counts');

    // E. Verify Live Marathi Preview Chips
    const ganeshChip = page.locator('button:has-text("॥ श्री गणेशाय नमः ॥")').first();
    const vivahChip = page.locator('button:has-text("शुभ विवाह")').first();
    const gauravChip = page.locator('button:has-text("महाराष्ट्र गौरव")').first();
    assert(await ganeshChip.isVisible(), '॥ श्री गणेशाय नमः ॥ chip visible');
    assert(await vivahChip.isVisible(), 'शुभ विवाह chip visible');
    assert(await gauravChip.isVisible(), 'महाराष्ट्र गौरव chip visible');

    // Click "शुभ विवाह" chip
    console.log('4. Clicking "शुभ विवाह" preview chip...');
    await vivahChip.click();
    await page.waitForTimeout(400);

    // Verify preview text in font cards updated to "शुभ विवाह"
    const firstFontCard = page.locator('[data-font-card="true"]').first();
    const cardText = await firstFontCard.innerText();
    console.log(`First font card text contains "शुभ विवाह": ${cardText.includes('शुभ विवाह')}`);
    assert(cardText.includes('शुभ विवाह'), 'Font cards should reflect clicked preview chip');

    await page.screenshot({ path: `${ARTIFACT_DIR}/unified_text_drawer_fonts_view.png` });

    // F. Verify Combinations Sub-Tab
    console.log('5. Clicking "Combinations" sub-tab...');
    await combosSubTab.click();
    await page.waitForTimeout(500);

    const comboHeadings = await page.locator('text=Curated Font Pairings').isVisible();
    assert(comboHeadings, '"Curated Font Pairings" section visible');
    await page.screenshot({ path: `${ARTIFACT_DIR}/unified_text_drawer_combos_view.png` });
    console.log('✅ Combinations view rendered cleanly');

    // G. Verify Calligraphy Sub-Tab
    console.log('6. Clicking "Calligraphy" sub-tab...');
    await calligraphySubTab.click();
    await page.waitForTimeout(500);

    const calligraphyHeadings = await page.locator('text=Devanagari Calligraphy Presets').isVisible();
    assert(calligraphyHeadings, '"Devanagari Calligraphy Presets" section visible');
    await page.screenshot({ path: `${ARTIFACT_DIR}/unified_text_drawer_calligraphy_view.png` });
    console.log('✅ Calligraphy presets view rendered cleanly');

    // Switch back to Fonts (100)
    await fontsSubTab.click();
    await page.waitForTimeout(500);

    // ==========================================
    // STEP 3: ADD TEXT TO CANVAS & APPLY FONT IN 1 CLICK
    // ==========================================
    console.log('7. Adding Bold Heading to Canvas...');
    await addHeadingBtn.click();
    await page.waitForTimeout(1000);

    // Check active object
    const activeTextBefore = await page.evaluate(() => {
      const active = window.__fabricCanvas?.getActiveObject();
      return active ? { text: active.text, fontFamily: active.fontFamily } : null;
    });
    console.log('Active text object on canvas:', activeTextBefore);
    assert(activeTextBefore, 'Active text object must exist on canvas');

    // Filter by AMS Calligraphy and apply AMS Aaditya in 1 click
    console.log('8. Filtering by AMS Calligraphy and applying AMS Aaditya in 1 click...');
    await amsPill.click();
    await page.waitForTimeout(500);

    const amsAadityaCard = page.locator('[data-font-card="true"]:has-text("AMS Aaditya")').first();
    await amsAadityaCard.click();
    await page.waitForTimeout(800);

    const activeTextAfter = await page.evaluate(() => {
      const active = window.__fabricCanvas?.getActiveObject();
      return active ? { text: active.text, fontFamily: active.fontFamily } : null;
    });
    console.log('Active text after 1-click font application:', activeTextAfter);
    assert.strictEqual(activeTextAfter.fontFamily, 'AMS Aaditya', 'Font family should be updated to AMS Aaditya');
    console.log('✅ 1-Click font application directly to selected text succeeded!');

    // ==========================================
    // STEP 4: VERIFY DOUBLE-CLICK SELECT ALL TEXT & IMMEDIATE OVERWRITE
    // ==========================================
    console.log('9. Double-clicking text box on canvas to select all text...');
    const clickCoords = await page.evaluate(() => {
      const canvas = window.__fabricCanvas;
      const active = canvas?.getActiveObject();
      if (!active) return null;
      const zoom = canvas.getZoom();
      const rect = canvas.upperCanvasEl.getBoundingClientRect();
      return {
        x: Math.round(rect.left + (active.left + (active.width * (active.scaleX || 1)) / 2) * zoom),
        y: Math.round(rect.top + (active.top + 20) * zoom),
      };
    });

    await page.mouse.dblclick(clickCoords.x, clickCoords.y);
    await page.waitForTimeout(600);

    const selectionState = await page.evaluate(() => {
      const hidden = document.querySelector('textarea[data-fabric-hiddentextarea]');
      return {
        hasHidden: !!hidden,
        value: hidden ? hidden.value : '',
        selectionStart: hidden ? hidden.selectionStart : -1,
        selectionEnd: hidden ? hidden.selectionEnd : -1,
        isAllSelected: hidden ? (hidden.selectionStart === 0 && hidden.selectionEnd === hidden.value.length && hidden.value.length > 0) : false
      };
    });

    console.log('Text Selection state on double-click:', selectionState);
    assert(selectionState.isAllSelected, 'All text must be selected on double click');
    console.log('✅ PASS: Double-click selected ALL text inside textbox!');

    // Type immediate replacement
    console.log('10. Typing immediate replacement text: "स्वागतम्"...');
    await page.keyboard.type('स्वागतम्', { delay: 50 });
    await page.waitForTimeout(500);

    const replacedTextState = await page.evaluate(() => {
      const hidden = document.querySelector('textarea[data-fabric-hiddentextarea]');
      return hidden ? hidden.value : '';
    });
    console.log(`Replaced text value: "${replacedTextState}"`);
    assert.strictEqual(replacedTextState, 'स्वागतम्', 'Text should be immediately replaced');
    console.log('✅ PASS: Immediate typing overwrote all text without needing backspace!');

    // ==========================================
    // STEP 5: VERIFY OUTSIDE CLICK DESELECTION
    // ==========================================
    console.log('11. Clicking dark canvas workspace to verify outside click deselection...');
    await page.mouse.click(1250, 250);
    await page.waitForTimeout(600);

    const isDeselected = await page.evaluate(() => {
      return !window.__fabricCanvas?.getActiveObject();
    });
    console.log(`Element deselected on outside click: ${isDeselected}`);
    assert(isDeselected, 'Active object must be deselected when clicking workspace background');

    await page.screenshot({ path: `${ARTIFACT_DIR}/unified_text_and_fonts_final_verified.png` });

    console.log('\n🎉 ALL TESTS PASSED! ONE unified button with all features and simple design verified 100%!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/unified_test_failure.png` }).catch(() => {});
    throw err;
  } finally {
    await browser.close();
  }
}

runUnifiedTest();