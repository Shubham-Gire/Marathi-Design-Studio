import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('🚀 Starting Edit Section Toolbar Test (transparency, flip, crop, corner rounding, edit, replace)...');
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

  // Auto-accept alert/confirm dialogs
  page.on('dialog', async (dialog) => {
    console.log(`💬 Dialog popup [${dialog.type()}]: ${dialog.message()}`);
    await dialog.accept();
  });

  try {
    console.log('1. Navigating to Editor: http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2500);

    // 2. Open Photos Drawer
    console.log('2. Clicking Photos dock button...');
    const dockPhotos = page.locator('button[title="Photos"]');
    await dockPhotos.waitFor({ state: 'visible', timeout: 10000 });
    await dockPhotos.click();
    await page.waitForTimeout(1000);

    // Click the first stock photo to add it to canvas
    console.log('3. Clicking stock photo card to insert onto canvas...');
    const photoCard = page.locator('.aspect-\\[4\\/3\\]').first();
    await photoCard.waitFor({ state: 'visible', timeout: 8000 });
    await photoCard.click({ force: true });
    await page.waitForTimeout(2000);

    // Verify Contextual Toolbar is now visible
    const toolbar = page.locator('[data-testid="contextual-toolbar"]');
    await toolbar.waitFor({ state: 'visible', timeout: 8000 });
    console.log('✅ Contextual toolbar is visible.');

    // 4. Check presence and visibility of all user-requested buttons
    console.log('4. Checking all toolbar buttons in Edit section...');

    const editBtn = toolbar.locator('button[title="Edit image"]');
    const replaceBtn = toolbar.locator('button[title="Replace image"]');
    const borderStyleBtn = toolbar.locator('button[title="Border style"]');
    const cornerRoundingBtn = toolbar.locator('button[title="Corner rounding"]');
    const cropBtn = toolbar.locator('button[title="Crop"]');
    const flipBtn = toolbar.locator('button[title="Flip"]');
    const transparencyBtn = toolbar.locator('button[title="Transparency"]');
    const animateBtn = toolbar.locator('button[title="Animate"]');
    const positionBtn = toolbar.locator('button[title="Position"]');
    const styleBtn = toolbar.locator('button:has-text("Style")');

    console.log(`- Edit button visible: ${await editBtn.isVisible()}`);
    console.log(`- Replace button visible: ${await replaceBtn.isVisible()}`);
    console.log(`- Border style button visible: ${await borderStyleBtn.isVisible()}`);
    console.log(`- Corner rounding button visible: ${await cornerRoundingBtn.isVisible()}`);
    console.log(`- Crop button visible: ${await cropBtn.isVisible()}`);
    console.log(`- Flip button visible: ${await flipBtn.isVisible()}`);
    console.log(`- Transparency button visible: ${await transparencyBtn.isVisible()}`);
    console.log(`- Animate button visible: ${await animateBtn.isVisible()}`);
    console.log(`- Position button visible: ${await positionBtn.isVisible()}`);
    console.log(`- Style button visible: ${await styleBtn.isVisible()}`);

    if (
      !(await editBtn.isVisible()) ||
      !(await replaceBtn.isVisible()) ||
      !(await borderStyleBtn.isVisible()) ||
      !(await cornerRoundingBtn.isVisible()) ||
      !(await cropBtn.isVisible()) ||
      !(await flipBtn.isVisible()) ||
      !(await transparencyBtn.isVisible())
    ) {
      throw new Error('FAILED: One or more requested buttons are missing from the edit toolbar!');
    }

    // 5. Test Corner Rounding Popover & Functionality
    console.log('5. Testing Corner Rounding popover...');
    await cornerRoundingBtn.click();
    await page.waitForTimeout(500);

    const cornerRoundingHeader = page.locator('text=Corner Rounding');
    await cornerRoundingHeader.waitFor({ state: 'visible', timeout: 3000 });
    console.log('✅ Corner Rounding popover opened.');

    // Click 24px preset chip
    const preset24Btn = page.locator('button:has-text("24px")');
    if (await preset24Btn.isVisible()) {
      await preset24Btn.click();
      await page.waitForTimeout(600);
      console.log('✅ Clicked 24px corner rounding preset chip.');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_1_corner_rounding.png` });

    // Close corner rounding popover
    await cornerRoundingBtn.click();
    await page.waitForTimeout(400);

    // 6. Test Flip Dropdown
    console.log('6. Testing Flip dropdown...');
    await flipBtn.click();
    await page.waitForTimeout(500);

    const flipHBtn = page.locator('button:has-text("Flip horizontal")');
    const flipVBtn = page.locator('button:has-text("Flip vertical")');
    await flipHBtn.waitFor({ state: 'visible', timeout: 3000 });
    console.log('✅ Flip dropdown opened with Flip horizontal and Flip vertical.');

    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_2_flip.png` });

    await flipHBtn.click();
    await page.waitForTimeout(600);
    console.log('✅ Clicked Flip horizontal.');

    // 7. Test Transparency Popover & Tooltip
    console.log('7. Testing Transparency popover & slider...');
    await transparencyBtn.hover();
    await page.waitForTimeout(300);

    await transparencyBtn.click();
    await page.waitForTimeout(500);

    const transparencyHeader = page.locator('text=Transparency');
    await transparencyHeader.waitFor({ state: 'visible', timeout: 3000 });
    console.log('✅ Transparency popover opened.');

    // Click 50% preset
    const preset50Btn = page.locator('button:has-text("50%")');
    if (await preset50Btn.isVisible()) {
      await preset50Btn.click();
      await page.waitForTimeout(600);
      console.log('✅ Clicked 50% transparency preset chip.');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_3_transparency.png` });

    // Close transparency popover
    await transparencyBtn.click();
    await page.waitForTimeout(400);

    // 8. Test Border Style Popover
    console.log('8. Testing Border Style popover...');
    await borderStyleBtn.click();
    await page.waitForTimeout(500);

    const borderStyleHeader = page.locator('text=Border Style');
    await borderStyleHeader.waitFor({ state: 'visible', timeout: 3000 });
    console.log('✅ Border Style popover opened.');

    const dashedBtn = page.locator('button:has-text("Dashed")');
    if (await dashedBtn.isVisible()) {
      await dashedBtn.click();
      await page.waitForTimeout(500);
      console.log('✅ Clicked Dashed border style.');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_4_border_style.png` });

    // Close border style popover
    await borderStyleBtn.click();
    await page.waitForTimeout(400);

    // 9. Test Edit Photo Adjustments Popover
    console.log('9. Testing Edit Photo Adjustments popover...');
    await editBtn.click();
    await page.waitForTimeout(500);

    const photoAdjHeader = page.locator('text=Photo Adjustments');
    await photoAdjHeader.waitFor({ state: 'visible', timeout: 3000 });
    console.log('✅ Photo Adjustments popover opened.');

    const brightnessLabel = page.locator('text=Brightness');
    const contrastLabel = page.locator('text=Contrast');
    const saturationLabel = page.locator('text=Saturation');
    const normalFilter = page.locator('button:has-text("Normal")');
    const bwFilter = page.locator('button:has-text("B&W")');
    const removeBgBtn = page.locator('button:has-text("Remove Background")');

    console.log(`- Brightness slider present: ${await brightnessLabel.isVisible()}`);
    console.log(`- Contrast slider present: ${await contrastLabel.isVisible()}`);
    console.log(`- Saturation slider present: ${await saturationLabel.isVisible()}`);
    console.log(`- Preset filters present: ${await normalFilter.isVisible()} & ${await bwFilter.isVisible()}`);
    console.log(`- Remove BG present: ${await removeBgBtn.isVisible()}`);

    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_5_edit_adjustments.png` });

    // Close edit popover
    await editBtn.click();
    await page.waitForTimeout(400);

    // 10. Take final full verified screenshot
    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_final_verified.png` });
    console.log('🎉 ALL TESTS PASSED! Final screenshot saved.');

  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/edit_section_test_error.png` }).catch(() => {});
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
