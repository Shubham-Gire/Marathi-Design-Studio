import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('🚀 Starting Outside Click Deselection Test...');
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

    // 2. Open Text Tab in Dock
    console.log('2. Clicking Text Tab in Dock...');
    const textTab = page.locator('button[title="Text"]');
    await textTab.waitFor({ state: 'visible', timeout: 10000 });
    await textTab.click();
    await page.waitForTimeout(1000);

    // 3. Add Heading Text to canvas
    console.log('3. Clicking "Add a Bold Heading"...');
    const addHeadingBtn = page.locator('button:has-text("Add a Bold Heading")').first();
    await addHeadingBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addHeadingBtn.click();
    await page.waitForTimeout(1000);

    // Verify element is selected
    const contextualToolbar = page.locator('[data-testid="contextual-toolbar"]');
    const floatingHud = page.locator('#floating-quick-hud');

    await contextualToolbar.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Contextual toolbar is visible.');
    const hudVisible = await floatingHud.isVisible();
    console.log(`✅ Floating HUD is visible: ${hudVisible}`);

    await page.screenshot({ path: `${ARTIFACT_DIR}/outside_click_1_selected.png` });

    // Step 4: Click on the dark viewport background outside canvas (e.g. at (1250, 250))
    console.log('4. Clicking on dark viewport workspace background outside canvas (x=1250, y=250)...');
    await page.mouse.click(1250, 250);
    await page.waitForTimeout(600);

    // Check that contextual toolbar and HUD are no longer visible (deselected!)
    const isToolbarHiddenAfterViewportClick = (await contextualToolbar.count()) === 0 || !(await contextualToolbar.isVisible());
    const isHudHiddenAfterViewportClick = (await floatingHud.count()) === 0 || !(await floatingHud.isVisible());

    console.log(`✅ After clicking viewport background: Toolbar hidden = ${isToolbarHiddenAfterViewportClick}, HUD hidden = ${isHudHiddenAfterViewportClick}`);
    if (!isToolbarHiddenAfterViewportClick) {
      throw new Error('FAILED: Contextual toolbar did NOT hide after clicking viewport background!');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/outside_click_2_deselected_viewport.png` });

    // Step 5: Re-select the element by clicking on it in the canvas
    console.log('5. Re-selecting element on canvas...');
    const upperCanvas = page.locator('canvas.upper-canvas').first();
    const box = await upperCanvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not found!');

    // Click near center where heading was added
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);

    await contextualToolbar.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Contextual toolbar re-appeared upon selecting element on canvas.');

    // Step 6: Click on top Canva header (e.g. near top title at x=450, y=25)
    console.log('6. Clicking on top Canva header (x=450, y=25)...');
    await page.mouse.click(450, 25);
    await page.waitForTimeout(600);

    const isToolbarHiddenAfterHeaderClick = (await contextualToolbar.count()) === 0 || !(await contextualToolbar.isVisible());
    console.log(`✅ After clicking top header: Toolbar hidden = ${isToolbarHiddenAfterHeaderClick}`);
    if (!isToolbarHiddenAfterHeaderClick) {
      throw new Error('FAILED: Contextual toolbar did NOT hide after clicking header!');
    }

    // Step 7: Re-select element and click on Left Dock tabs (e.g. CanvaDock "Uploads" at x=36, y=250)
    console.log('7. Re-selecting element and clicking left dock tab...');
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);
    await contextualToolbar.waitFor({ state: 'visible', timeout: 5000 });

    const uploadsTab = page.locator('button[title="Uploads"]');
    if (await uploadsTab.isVisible()) {
      await uploadsTab.click();
    } else {
      await page.mouse.click(36, 250);
    }
    await page.waitForTimeout(600);

    const isToolbarHiddenAfterDockClick = (await contextualToolbar.count()) === 0 || !(await contextualToolbar.isVisible());
    console.log(`✅ After clicking left dock: Toolbar hidden = ${isToolbarHiddenAfterDockClick}`);
    if (!isToolbarHiddenAfterDockClick) {
      throw new Error('FAILED: Contextual toolbar did NOT hide after clicking dock!');
    }

    // Step 8: Formatting safety test - clicking toolbar formatting controls must NOT deselect
    console.log('8. Re-selecting and verifying toolbar formatting controls DO NOT deselect...');
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);
    await contextualToolbar.waitFor({ state: 'visible', timeout: 5000 });

    // Click the Bold button in the contextual toolbar
    const boldBtn = contextualToolbar.locator('button[title*="Bold"], button:has-text("B")').first();
    if (await boldBtn.isVisible()) {
      await boldBtn.click();
      await page.waitForTimeout(400);
      const isStillSelected = await contextualToolbar.isVisible();
      console.log(`✅ After clicking Bold in toolbar: Toolbar remains visible = ${isStillSelected}`);
      if (!isStillSelected) {
        throw new Error('FAILED: Contextual toolbar prematurely closed when clicking Bold button!');
      }
    }

    // Step 9: Deselect by clicking empty space on canvas (bottom right of canvas)
    console.log('9. Clicking blank canvas area to deselect (x=box.right - 20, y=box.bottom - 20)...');
    await page.mouse.click(box.x + box.width - 25, box.y + box.height - 25);
    await page.waitForTimeout(600);

    const isToolbarHiddenAfterBlankCanvasClick = (await contextualToolbar.count()) === 0 || !(await contextualToolbar.isVisible());
    console.log(`✅ After clicking blank canvas: Toolbar hidden = ${isToolbarHiddenAfterBlankCanvasClick}`);
    if (!isToolbarHiddenAfterBlankCanvasClick) {
      throw new Error('FAILED: Contextual toolbar did NOT hide after clicking blank canvas background!');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/outside_click_3_final_deselected.png` });

    console.log('🎉 ALL OUTSIDE-CLICK DESELECTION TESTS PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/outside_click_failure.png` }).catch(() => {});
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
