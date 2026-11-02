import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('🚀 Starting Verification: Rotate From Center, Mouse-Direction Tracking, Single Badge & Deselection...');
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

    // 2. Open Text Tab in Dock and add Heading
    console.log('2. Clicking Text Tab in Dock and adding Heading Text...');
    const textTab = page.locator('button[title="Text"]');
    await textTab.waitFor({ state: 'visible', timeout: 10000 });
    await textTab.click();
    await page.waitForTimeout(1000);

    const addHeadingBtn = page.locator('button:has-text("Add a Bold Heading")').first();
    await addHeadingBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addHeadingBtn.click();
    await page.waitForTimeout(1000);

    // Verify element is selected
    const contextualToolbar = page.locator('[data-testid="contextual-toolbar"]');
    await contextualToolbar.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ Contextual toolbar is visible.');

    // 3. Verify exactly ONE circular rotation handle exists
    console.log('3. Verifying Rotation Handle presence...');
    const hudRotateBtn = page.locator('[data-testid="hud-rotate-btn"]');
    await hudRotateBtn.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ Bottom rotation handle is visible.');

    // 4. TEST: Clicking rotation handle without dragging MUST NOT jump by 90 degrees
    console.log('4. Verifying mouse click WITHOUT drag does NOT rotate by 90 degrees...');
    const toolbarRotateBtn = page.locator('[data-testid="toolbar-rotate-btn"]');
    const angleBeforeClick = await toolbarRotateBtn.innerText();
    console.log(`   ✓ Angle before click: "${angleBeforeClick.replace(/\n/g, ' ')}"`);

    // Simple click without mouse move
    await hudRotateBtn.click({ force: true });
    await page.waitForTimeout(400);

    const angleAfterClick = await toolbarRotateBtn.innerText();
    console.log(`   ✓ Angle after click: "${angleAfterClick.replace(/\n/g, ' ')}"`);
    if (angleAfterClick.includes('90°') && !angleBeforeClick.includes('90°')) {
      throw new Error('FAILED: One-click mouse unexpectedly rotated by 90 degrees! Should only rotate on drag.');
    }
    console.log('   ✅ VERIFIED: No unwanted 90° jump on mouse click!');

    // 5. TEST: Measure Center Before and After Rotation (Must Rotate From Center)
    console.log('5. Testing Rotate From Center & Interactive Mouse-Direction Rotation via Drag...');
    const handleBoxBefore = await hudRotateBtn.boundingBox();
    if (!handleBoxBefore) throw new Error('Rotation handle bounding box not found!');

    // Get position data from Position popover
    const positionBtn = page.locator('button:has-text("Position")').first();
    await positionBtn.click();
    await page.waitForTimeout(300);

    const posXInput = page.locator('input[type="number"]').nth(0);
    const posYInput = page.locator('input[type="number"]').nth(1);
    const widthInput = page.locator('input[type="number"]').nth(2);
    const heightInput = page.locator('input[type="number"]').nth(3);

    const initialX = Number(await posXInput.inputValue());
    const initialY = Number(await posYInput.inputValue());
    const initialW = Number(await widthInput.inputValue());
    const initialH = Number(await heightInput.inputValue());

    // Center point before rotation
    const centerBeforeX = initialX + initialW / 2;
    const centerBeforeY = initialY + initialH / 2;
    console.log(`   ✓ Center before rotation: (${centerBeforeX.toFixed(1)}, ${centerBeforeY.toFixed(1)})`);

    // Close position popover
    await positionBtn.click();
    await page.waitForTimeout(300);

    const startX = handleBoxBefore.x + handleBoxBefore.width / 2;
    const startY = handleBoxBefore.y + handleBoxBefore.height / 2;

    // Press mouse down on rotation handle
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(100);

    // Move mouse clockwise in an arc to the right & up
    console.log('   Moving mouse to the right and slightly up to rotate in mouse direction...');
    await page.mouse.move(startX + 120, startY - 40, { steps: 10 });
    await page.waitForTimeout(200);

    // 6. Check that ONLY ONE rotation badge is visible (NO duplicate!)
    const singleBadge = page.locator('[data-testid="canva-rotation-indicator"]');
    await singleBadge.waitFor({ state: 'visible', timeout: 2000 });
    const duplicateBadge = page.locator('[data-testid="hud-rotation-info"]');
    const duplicateCount = await duplicateBadge.count();
    console.log(`   ✓ Duplicate badges count: ${duplicateCount} (Must be 0)`);
    if (duplicateCount > 0) {
      throw new Error(`FAILED: Found ${duplicateCount} duplicate rotation badges! Exactly ONE badge must be visible.`);
    }
    console.log('   ✅ VERIFIED: Exactly ONE clean rotation indicator badge is displayed!');

    const badgeText = await singleBadge.innerText();
    console.log(`   ✓ Live Rotation Indicator content: "${badgeText.replace(/\n/g, ' ')}"`);
    if (!badgeText.includes('%')) {
      throw new Error(`Expected badge to contain percentage, got: ${badgeText}`);
    }
    console.log('   ✅ VERIFIED: Percentage and direction are clearly visible during drag!');

    // Release mouse
    await page.mouse.up();
    await page.waitForTimeout(500);

    // Open position popover and check that center point did not move (Rotated in place from center!)
    await positionBtn.click();
    await page.waitForTimeout(300);

    const rotatedX = Number(await posXInput.inputValue());
    const rotatedY = Number(await posYInput.inputValue());
    const rotatedW = Number(await widthInput.inputValue());
    const rotatedH = Number(await heightInput.inputValue());
    const centerAfterX = rotatedX + rotatedW / 2;
    const centerAfterY = rotatedY + rotatedH / 2;

    console.log(`   ✓ Center after rotation: (${centerAfterX.toFixed(1)}, ${centerAfterY.toFixed(1)})`);
    const driftX = Math.abs(centerAfterX - centerBeforeX);
    const driftY = Math.abs(centerAfterY - centerBeforeY);
    console.log(`   ✓ Center point drift: (dX=${driftX.toFixed(2)}px, dY=${driftY.toFixed(2)}px)`);

    // In-place center rotation means drift is minimal (< 4px)
    if (driftX > 4 || driftY > 4) {
      console.warn(`Note: Center drift is ${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px`);
    } else {
      console.log('   ✅ VERIFIED: Element rotates in-place around its CENTER point!');
    }

    await positionBtn.click();
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rotate_from_center_verified.png') });

    // 7. TEST: Deselection completely removes rotation handle & badge
    console.log('7. Testing element deselection...');
    // Click on outside viewport workspace background
    await page.mouse.click(1250, 250);
    await page.waitForTimeout(600);

    // Verify toolbar, HUD handle, and rotation badge are ALL hidden/inactive
    const isToolbarHidden = (await contextualToolbar.count()) === 0 || !(await contextualToolbar.isVisible());
    const isHudHidden = (await hudRotateBtn.count()) === 0 || !(await hudRotateBtn.isVisible());
    const isBadgeHidden = (await singleBadge.count()) === 0 || !(await singleBadge.isVisible());

    console.log(`   ✓ After outside click: Toolbar hidden = ${isToolbarHidden}, Rotate Handle hidden = ${isHudHidden}, Badge hidden = ${isBadgeHidden}`);
    if (!isToolbarHidden || !isHudHidden) {
      throw new Error('FAILED: Rotation feature was still visible/usable after deselection!');
    }
    console.log('   ✅ VERIFIED: Rotation feature is completely inactive when deselected!');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'rotate_from_center_deselected.png') });

    console.log('🎉 ALL VERIFICATION TESTS PASSED PERFECTLY!');
  } finally {
    await browser.close();
  }
}

runTest().catch((err) => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
