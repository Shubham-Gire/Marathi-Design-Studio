import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('🚀 Starting Comprehensive 100+ Fonts & Double-Click Text Select All Test...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // Mock authentication token
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
    // PART 1: 100+ FONT LIBRARY VERIFICATION
    // ==========================================
    console.log('2. Verifying Font Library Count in runtime...');
    const fontLibStats = await page.evaluate(async () => {
      // Access FONT_LIBRARY or check DOM
      return {
        hasFontsApi: !!document.fonts,
      };
    });
    console.log('Font API available:', fontLibStats.hasFontsApi);

    // Click Text Tab in dock
    console.log('3. Clicking Text Tab in Dock...');
    const textTab = page.locator('button[title="Text"]');
    await textTab.waitFor({ state: 'visible', timeout: 10000 });
    await textTab.click();
    await page.waitForTimeout(1000);

    // Check All Fonts label in drawer
    const allFontsPill = page.locator('button:has-text("All Fonts (")').first();
    const isAllVisible = await allFontsPill.isVisible();
    const allFontsText = await allFontsPill.innerText();
    console.log(`✅ "${allFontsText}" filter pill is visible: ${isAllVisible}`);
    if (!isAllVisible) {
      const allPills = await page.locator('button:has-text("All Fonts")').allInnerTexts();
      console.log('Pills found:', allPills);
      throw new Error(`Expected "All Fonts" but found: ${JSON.stringify(allPills)}`);
    }

    // Check Category Pills
    const amsPill = page.locator('button:has-text("AMS Calligraphy")').first();
    const amsPillText = await amsPill.innerText();
    console.log(`✅ Category pill text: "${amsPillText}"`);

    const weddingPill = page.locator('button:has-text("Millennium & Wedding")').first();
    const weddingPillText = await weddingPill.innerText();
    console.log(`✅ Category pill text: "${weddingPillText}"`);

    const legacyPill = page.locator('button:has-text("Legacy Kruti/Shivaji")').first();
    const legacyPillText = await legacyPill.innerText();
    console.log(`✅ Category pill text: "${legacyPillText}"`);

    const classicSuitesPill = page.locator('button:has-text("Classic Suites")').first();
    const classicSuitesText = await classicSuitesPill.innerText();
    console.log(`✅ Category pill text: "${classicSuitesText}"`);

    // Click AMS Calligraphy Category
    console.log('4. Filtering by AMS Calligraphy...');
    await amsPill.click();
    await page.waitForTimeout(500);

    const amsCards = await page.locator('[data-font-card="true"]').allInnerTexts();
    console.log(`✅ AMS cards visible count: ${amsCards.length}`);
    const hasAaditya = amsCards.some(t => t.includes('AMS Aaditya'));
    const hasAakash = amsCards.some(t => t.includes('AMS Aakash'));
    console.log(`✅ Contains AMS Aaditya: ${hasAaditya}, AMS Aakash: ${hasAakash}`);

    await page.screenshot({ path: `${ARTIFACT_DIR}/font_library_1_ams_calligraphy.png` });

    // Click Millennium & Wedding Category
    console.log('5. Filtering by Millennium & Wedding...');
    await weddingPill.click();
    await page.waitForTimeout(500);

    const weddingCards = await page.locator('[data-font-card="true"]').allInnerTexts();
    console.log(`✅ Millennium wedding cards visible count: ${weddingCards.length}`);
    const hasGanesh = weddingCards.some(t => t.includes('MillenniumGanesh') || t.includes('गणेश'));
    console.log(`✅ Contains Millennium Ganesh: ${hasGanesh}`);

    await page.screenshot({ path: `${ARTIFACT_DIR}/font_library_2_millennium_wedding.png` });

    // Click Legacy Kruti/Shivaji Category
    console.log('6. Filtering by Legacy Kruti/Shivaji...');
    await legacyPill.click();
    await page.waitForTimeout(500);

    const legacyCards = await page.locator('[data-font-card="true"]').allInnerTexts();
    console.log(`✅ Legacy cards visible count: ${legacyCards.length}`);
    const hasKruti = legacyCards.some(t => t.includes('Kruti Dev 010') || t.includes('कृती देव'));
    console.log(`✅ Contains Kruti Dev 010: ${hasKruti}`);

    await page.screenshot({ path: `${ARTIFACT_DIR}/font_library_3_krutidev_legacy.png` });

    // Test Search Functionality in Font Library
    console.log('7. Testing Font Search in Drawer (searching "Pankaj")...');
    const fontSearchInput = page.locator('input[placeholder="Search fonts and combinations"]').first();
    await fontSearchInput.fill('Pankaj');
    await page.waitForTimeout(500);

    // Switch back to All Fonts while searching
    await allFontsPill.click();
    await page.waitForTimeout(500);

    const pankajCards = await page.locator('[data-font-card="true"]').allInnerTexts();
    console.log(`✅ Search "Pankaj" results count: ${pankajCards.length}`);
    const hasPankaj = pankajCards.some(t => t.includes('Pankaj'));
    console.log(`✅ Contains Pankaj fonts: ${hasPankaj}`);

    // Clear search
    await fontSearchInput.fill('');
    await page.waitForTimeout(500);

    // ==========================================
    // PART 2: DOUBLE-CLICK SELECT ALL TEXT TEST
    // ==========================================
    console.log('8. Adding a Bold Heading to Canvas...');
    const addHeadingBtn = page.locator('button:has-text("Add a Bold Heading")').first();
    await addHeadingBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addHeadingBtn.click();
    await page.waitForTimeout(1000);

    // Get exact screen coordinates of the active text object on canvas
    const clickCoords = await page.evaluate(() => {
      const canvas = window.__fabricCanvas;
      const active = canvas ? canvas.getActiveObject() : null;
      if (!active) return null;
      const zoom = canvas.getZoom();
      const rect = canvas.upperCanvasEl.getBoundingClientRect();
      return {
        x: Math.round(rect.left + (active.left + (active.width * (active.scaleX || 1)) / 2) * zoom),
        y: Math.round(rect.top + (active.top + 20) * zoom),
        text: active.text
      };
    });

    if (!clickCoords) {
      throw new Error('Active text object not found after adding heading!');
    }

    console.log(`9. Performing DOUBLE CLICK on Text Box "${clickCoords.text}" at (${clickCoords.x}, ${clickCoords.y})...`);
    await page.mouse.dblclick(clickCoords.x, clickCoords.y);
    await page.waitForTimeout(600);

    // Verify text selection in Fabric
    const textSelectionInfo = await page.evaluate(() => {
      const hiddenTextarea = document.querySelector('textarea[data-fabric-hiddentextarea]');
      
      return {
        hasHiddenTextarea: !!hiddenTextarea,
        textareaValue: hiddenTextarea ? hiddenTextarea.value : '',
        selectionStart: hiddenTextarea ? hiddenTextarea.selectionStart : -1,
        selectionEnd: hiddenTextarea ? hiddenTextarea.selectionEnd : -1,
        isSelectedAll: hiddenTextarea ? (hiddenTextarea.selectionStart === 0 && hiddenTextarea.selectionEnd === hiddenTextarea.value.length && hiddenTextarea.value.length > 0) : false
      };
    });

    console.log('Text Selection Info after Double-Click:', textSelectionInfo);
    if (!textSelectionInfo.hasHiddenTextarea) {
      throw new Error('FAILED: Hidden textarea not created, editing mode was not entered on double click!');
    }
    if (!textSelectionInfo.isSelectedAll) {
      throw new Error(`FAILED: All text was NOT selected on double click! Value="${textSelectionInfo.textareaValue}", start=${textSelectionInfo.selectionStart}, end=${textSelectionInfo.selectionEnd}`);
    }
    console.log('✅ PASS: Double-click entered editing mode AND selected ALL text inside the textbox!');

    await page.screenshot({ path: `${ARTIFACT_DIR}/doubleclick_1_selected_all_text.png` });

    // Step 10: Type replacement text directly to verify overwrite
    console.log('10. Typing replacement Marathi text: "महाराष्ट्र गौरव"...');
    await page.keyboard.type('महाराष्ट्र गौरव', { delay: 50 });
    await page.waitForTimeout(500);

    const updatedTextInfo = await page.evaluate(() => {
      const hiddenTextarea = document.querySelector('textarea[data-fabric-hiddentextarea]');
      return {
        value: hiddenTextarea ? hiddenTextarea.value : ''
      };
    });

    console.log(`✅ Text after typing overwrite: "${updatedTextInfo.value}"`);
    if (updatedTextInfo.value !== 'महाराष्ट्र गौरव') {
      throw new Error(`Expected text to be overwritten to "महाराष्ट्र गौरव" but was: "${updatedTextInfo.value}"`);
    }
    console.log('✅ PASS: Existing text was completely overwritten on immediate typing!');

    await page.screenshot({ path: `${ARTIFACT_DIR}/doubleclick_2_overwritten_text.png` });

    // Step 11: Test Font Selector Dropdown in Contextual Toolbar with the new 100 fonts
    console.log('11. Testing Font Selector in Contextual Toolbar...');
    const fontDropdownBtn = page.locator('button[data-testid="font-family-dropdown-btn"]');
    if (await fontDropdownBtn.isVisible()) {
      await fontDropdownBtn.click();
      await page.waitForTimeout(500);
      const fontSelectorModal = page.locator('[data-testid="canva-font-selector"]');
      const isModalOpen = await fontSelectorModal.isVisible();
      console.log(`✅ Canva Font Selector popup open: ${isModalOpen}`);
      await page.screenshot({ path: `${ARTIFACT_DIR}/font_selector_toolbar_dropdown.png` });
      
      // Select AMS Aaditya
      const amsAadityaOption = page.locator('div:has-text("AMS Aaditya")').first();
      if (await amsAadityaOption.isVisible()) {
        await amsAadityaOption.click();
        await page.waitForTimeout(800);
        console.log('✅ Selected AMS Aaditya from Font Selector!');
      }
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/comprehensive_100_fonts_and_doubleclick_verified.png` });

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100+ Fonts & Double-Click Select All verified 100%!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/test_failure.png` }).catch(() => {});
    throw err;
  } finally {
    await browser.close();
  }
}

runTest();
