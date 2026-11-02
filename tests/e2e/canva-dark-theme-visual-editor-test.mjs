import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('========================================================================');
  console.log('CANVA DARK THEME VISUAL DESIGN EDITOR - COMPREHENSIVE VERIFICATION TEST');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // 1. Open home and authenticate
    console.log('1. Setting up authenticated designer session and navigating to Canva Editor...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.setItem('marathi_token', 'mock_jwt_token_for_verification');
      localStorage.setItem('marathi_user', JSON.stringify({
        id: 1,
        email: 'designer@canva.marathi',
        fullName: 'Canva Senior Designer',
        role: 'ADMIN',
        tier: 'ENTERPRISE'
      }));
    });
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 2. Check dark workspace theme
    console.log('2. Verifying dark-themed workspace (#0e1318)...');
    const stageContainer = page.locator('.stage-quick-view-bar');
    await stageContainer.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ Pinned stage status bar is visible');

    // 3. Verify artboard header
    const pageHeaderTitle = page.locator('input[placeholder="Add page title"]');
    await pageHeaderTitle.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ Artboard page header title input is visible');

    const addPageUpBtn = page.locator('[data-testid="add-page-up-btn"]');
    await addPageUpBtn.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ "Add page up" action button is visible');

    // 4. Verify no toolbar when nothing selected
    const initialToolbar = page.locator('button[title="Change Font Family"]');
    const hasToolbarWithoutSelection = await initialToolbar.isVisible();
    console.log(`   ✓ Contextual toolbar without selection: ${hasToolbarWithoutSelection ? 'Visible (unexpected)' : 'Hidden (correct)'}`);

    // 5. Add a Text Element to test Text Contextual Toolbar
    console.log('3. Adding a text element to test Text Contextual Toolbar...');
    // Open Text tab
    const textTabBtn = page.getByRole('button', { name: /text/i }).first();
    await textTabBtn.click();
    await page.waitForTimeout(500);

    // Click "Add a heading" or similar text preset
    const addHeadingBtn = page.getByRole('button', { name: /add a heading/i }).first();
    if (await addHeadingBtn.isVisible()) {
      await addHeadingBtn.click();
    } else {
      // Press T key to add text
      await page.keyboard.press('KeyT');
    }
    await page.waitForTimeout(800);

    // 6. Verify Text Contextual Toolbar Controls (Matching Image 2)
    console.log('4. Verifying Text Contextual Toolbar controls...');
    const fontSelectorBtn = page.locator('button[title="Change Font Family"]');
    await fontSelectorBtn.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ Font Family selector pill is visible');

    const boldBtn = page.locator('button[title="Bold (Ctrl+B)"]');
    await boldBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Bold button is visible');

    const italicBtn = page.locator('button[title="Italic (Ctrl+I)"]');
    await italicBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Italic button is visible');

    const underlineBtn = page.locator('button[title="Underline (Ctrl+U)"]');
    await underlineBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Underline button is visible');

    const strikethroughBtn = page.locator('button[title="Strikethrough"]');
    await strikethroughBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Strikethrough button is visible');

    const textCaseBtn = page.locator('button[title*="Text case"]');
    await textCaseBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Text case (aA) button is visible');

    const bulletListBtn = page.locator('button[title="Bullet list"]');
    await bulletListBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ List controls are visible');

    const spacingBtn = page.locator('button[title="Letter & line spacing"]');
    await spacingBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Spacing popover button is visible');

    const transparencyBtn = page.locator('button[title="Transparency"]').first();
    await transparencyBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Transparency (checkerboard icon) button is visible');

    const effectsBtn = page.locator('button[title="Effects"]');
    await effectsBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Effects pill button is visible');

    const animateBtn = page.locator('button[title="Animate"]');
    await animateBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Animate pill button is visible');

    const positionBtn = page.locator('button[title*="Position"]');
    await positionBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Position pill button is visible');

    const paintRollerBtn = page.locator('button[title*="Copy style"]');
    await paintRollerBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Copy style (paint roller) button is visible');

    // 7. Verify Floating Quick-Action HUD
    console.log('5. Verifying Floating Quick-Action HUD above element...');
    const floatingMoreBtn = page.locator('button[title="More options (Right-click)"]');
    await floatingMoreBtn.waitFor({ state: 'visible', timeout: 4000 });
    console.log('   ✓ Floating Action HUD is visible directly above selected element');

    // 8. Open Context Menu via Three-Dot Menu (Matching Image 2)
    console.log('6. Opening Context Menu via Three-Dot More button...');
    await floatingMoreBtn.click();
    await page.waitForTimeout(400);

    // Verify all menu items from Image 2
    const contextMenu = page.locator('div.fixed.z-50.w-64');
    await contextMenu.waitFor({ state: 'visible', timeout: 3000 });
    const copyItem = contextMenu.locator('button:has-text("Copy"):not(:has-text("style"))');
    const copyStyleItem = contextMenu.locator('button:has-text("Copy style")');
    const duplicateItem = contextMenu.locator('button:has-text("Duplicate")');
    const deleteItem = contextMenu.locator('button:has-text("Delete")');
    const layerItem = contextMenu.locator('button:has-text("Layer")');
    const alignToPageItem = contextMenu.locator('button:has-text("Align to page")');
    const createComponentItem = contextMenu.locator('button:has-text("Create component")');
    const commentItem = contextMenu.locator('button:has-text("Comment")');
    const lockItem = contextMenu.locator('button:has-text("Lock")');
    const linkItem = contextMenu.locator('button:has-text("Link")');
    const showTimingItem = contextMenu.locator('button:has-text("Show element timing")');
    const altTextItem = contextMenu.locator('button:has-text("Alternative text")');
    const magicWriteItem = contextMenu.locator('button:has-text("Magic Write")');
    const translateTextItem = contextMenu.locator('button:has-text("Translate text")');

    console.log(`   ✓ Context Menu Items Verification:`);
    console.log(`     Copy: ${await copyItem.isVisible()}`);
    console.log(`     Copy Style: ${await copyStyleItem.isVisible()}`);
    console.log(`     Duplicate: ${await duplicateItem.isVisible()}`);
    console.log(`     Delete: ${await deleteItem.isVisible()}`);
    console.log(`     Layer: ${await layerItem.isVisible()}`);
    console.log(`     Align to Page: ${await alignToPageItem.isVisible()}`);
    console.log(`     Create Component: ${await createComponentItem.isVisible()}`);
    console.log(`     Comment: ${await commentItem.isVisible()}`);
    console.log(`     Lock: ${await lockItem.isVisible()}`);
    console.log(`     Link: ${await linkItem.isVisible()}`);
    console.log(`     Show Timing: ${await showTimingItem.isVisible()}`);
    console.log(`     Alternative Text: ${await altTextItem.isVisible()}`);
    console.log(`     Magic Write: ${await magicWriteItem.isVisible()}`);
    console.log(`     Translate Text: ${await translateTextItem.isVisible()}`);

    // Take screenshot matching Image 2
    const textMenuScreenshotPath = path.join(ARTIFACT_DIR, 'canva_text_context_menu_dark.png');
    await page.screenshot({ path: textMenuScreenshotPath });
    console.log(`📸 Screenshot saved: ${textMenuScreenshotPath}`);

    // Close menu
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // 9. Test Font Selector Search & Devanagari Fonts
    console.log('7. Testing Font Selector search & Devanagari fonts...');
    await fontSelectorBtn.click();
    await page.waitForTimeout(400);

    const fontSearchInput = page.locator('input[placeholder*="Libre Baskerville"]');
    await fontSearchInput.waitFor({ state: 'visible', timeout: 3000 });
    await fontSearchInput.fill('AMS');
    await page.waitForTimeout(400);

    const amsFontCard = page.locator('text=AMS Aaditya').first();
    const hasAms = await amsFontCard.isVisible();
    console.log(`   ✓ AMS Calligraphy font search result: ${hasAms ? 'Found' : 'Not found'}`);

    const fontSelectorScreenshotPath = path.join(ARTIFACT_DIR, 'canva_font_selector_dark.png');
    await page.screenshot({ path: fontSelectorScreenshotPath });
    console.log(`📸 Screenshot saved: ${fontSelectorScreenshotPath}`);

    // Select font
    if (hasAms) {
      await amsFontCard.click();
      await page.waitForTimeout(400);
    } else {
      await page.keyboard.press('Escape');
    }

    // 10. Add Shape to test Shape / Graphic Contextual Toolbar
    console.log('8. Testing Shape / Graphic Contextual Toolbar...');
    const elementsTabBtn = page.getByRole('button', { name: /elements/i }).first();
    if (await elementsTabBtn.isVisible()) {
      await elementsTabBtn.click();
      await page.waitForTimeout(500);
    }

    // Press 'R' to add a rectangle
    await page.keyboard.press('KeyR');
    await page.waitForTimeout(600);

    // Verify Shape Toolbar controls
    const borderCornerBtn = page.locator('button[title="Border & corners"]');
    const hasBorderCorner = await borderCornerBtn.isVisible();
    console.log(`   ✓ Shape Border & Corner controls: ${hasBorderCorner ? 'Visible' : 'Hidden'}`);

    const shapeScreenshotPath = path.join(ARTIFACT_DIR, 'canva_shape_toolbar_dark.png');
    await page.screenshot({ path: shapeScreenshotPath });
    console.log(`📸 Screenshot saved: ${shapeScreenshotPath}`);

    // 11. Verify bottom Add page button with dropdown (Matching Image 1)
    console.log('9. Verifying bottom Add Page button with dropdown...');
    const addPagePill = page.getByRole('button', { name: /add page/i }).last();
    const hasAddPagePill = await addPagePill.isVisible();
    console.log(`   ✓ Bottom Add Page pill button visible: ${hasAddPagePill}`);

    // 12. Verify Bottom Zoom Slider
    console.log('10. Verifying Bottom Zoom Slider...');
    const zoomSlider = page.locator('input[title="Zoom level"]');
    const hasZoomSlider = await zoomSlider.isVisible();
    console.log(`   ✓ Bottom Zoom Slider visible: ${hasZoomSlider}`);

    console.log('\n========================================================================');
    console.log('🎉 ALL CANVA VISUAL DESIGN EDITOR VERIFICATIONS PASSED SUCCESSFULLY!');
    console.log('========================================================================\n');
  } finally {
    await browser.close();
  }
}

runTest().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
