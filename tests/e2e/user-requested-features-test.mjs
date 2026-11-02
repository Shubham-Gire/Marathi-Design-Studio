import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import assert from 'assert';
import path from 'path';

async function runFeaturesTest() {
  console.log('========================================================================');
  console.log('E2E TEST: ROTATE, TRANSPARENCY, GROUP/UNGROUP & DRAG-AND-DROP UPLOAD');
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
    // TEST 1: ADD ELEMENTS AND TEST ROTATION & TRANSPARENCY
    // -------------------------------------------------------------------------
    console.log('2. Adding a Shape to test Rotation, Transparency & Grouping...');
    // Open Elements drawer
    const elementsTab = page.locator('button:has-text("Elements")').first();
    await elementsTab.click();
    await page.waitForTimeout(500);

    // Click on Add Rectangle
    const rectBtn = page.locator('button[title="Add Rectangle (R)"]').first();
    if (await rectBtn.isVisible()) {
      await rectBtn.click();
    } else {
      await page.keyboard.press('KeyR');
    }
    await page.waitForTimeout(800);

    // Verify Shape is selected and CanvaToolbar appears
    const toolbar = page.locator('[data-testid="contextual-toolbar"]').first();
    assert(await toolbar.isVisible(), 'Top Contextual Toolbar is visible for selected shape');
    console.log('   ✓ Contextual toolbar displayed');

    // TEST ROTATE VIA TOOLBAR QUICK ROTATE BUTTON
    console.log('3. Testing Quick Rotate 90° button in Toolbar...');
    const rotateBtn = toolbar.locator('button[title="Rotate 90°"]').first();
    assert(await rotateBtn.isVisible(), 'Quick Rotate 90° button is present in Toolbar');
    await rotateBtn.click();
    await page.waitForTimeout(400);
    console.log('   ✓ Quick Rotate 90° clicked successfully');

    // TEST ROTATE IN POSITION POPOVER
    console.log('4. Testing Rotate (°) input inside Position popover...');
    const positionBtn = toolbar.locator('button:has-text("Position")').first();
    assert(await positionBtn.isVisible(), 'Position button is visible');
    await positionBtn.click();
    await page.waitForTimeout(400);

    const rotateInput = page.locator('[data-testid="rotate-angle-input"]').first();
    assert(await rotateInput.isVisible(), 'Rotate (°) angle input is present in Position popover');
    await rotateInput.fill('45');
    await rotateInput.dispatchEvent('change');
    await page.waitForTimeout(400);
    console.log('   ✓ Set rotation angle to 45° via Position popover');

    // Close popover by clicking Position button again
    await positionBtn.click();
    await page.waitForTimeout(300);

    // TEST TRANSPARENCY SLIDER
    console.log('5. Testing Universal Transparency slider across elements...');
    const transparencyBtn = toolbar.locator('button[title="Transparency"]').first();
    assert(await transparencyBtn.isVisible(), 'Transparency button is present in Toolbar');
    await transparencyBtn.click();
    await page.waitForTimeout(400);

    const opacitySlider = page.locator('input[type="range"][min="0"][max="100"]').first();
    assert(await opacitySlider.isVisible(), 'Transparency slider is visible in popover');
    
    // Set opacity to 50%
    await opacitySlider.fill('50');
    await opacitySlider.dispatchEvent('input');
    await opacitySlider.dispatchEvent('change');
    await page.waitForTimeout(400);
    console.log('   ✓ Transparency slider adjusted to 50%');

    // Take screenshot of toolbar and transparency popover
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'feature_transparency_and_rotate.png') });

    // Close transparency popover
    await transparencyBtn.click();
    await page.waitForTimeout(300);

    // TEST GROUP BUTTON IN TOOLBAR
    console.log('6. Testing Group Button in Toolbar...');
    const groupToolbarBtn = toolbar.locator('button:has-text("Group")').first();
    assert(await groupToolbarBtn.isVisible(), 'Group button is present in Contextual Toolbar');
    console.log('   ✓ Group button verified in Toolbar');

    // -------------------------------------------------------------------------
    // TEST 2: RIGHT-CLICK CONTEXT MENU (ROTATE 90°, GROUP / UNGROUP)
    // -------------------------------------------------------------------------
    console.log('7. Testing Right-Click Context Menu with Rotate & Group options...');
    
    // Click "More options" (...) on the Floating HUD
    const moreOptionsBtn = page.locator('button[title="More options (Right-click)"]').first();
    assert(await moreOptionsBtn.isVisible(), 'Floating HUD More Options button is visible');
    await moreOptionsBtn.click();
    await page.waitForTimeout(500);

    const rotateContextMenuBtn = page.locator('button:has-text("Rotate 90°")').first();
    assert(await rotateContextMenuBtn.isVisible(), 'Rotate 90° button is present in Right-Click Context Menu');
    console.log('   ✓ Rotate 90° found in Context Menu');

    const groupContextMenuBtn = page.locator('button:has-text("Group"), button:has-text("Ungroup")').first();
    assert(await groupContextMenuBtn.isVisible(), 'Group/Ungroup button is present in Context Menu');
    console.log('   ✓ Group/Ungroup option found in Context Menu');

    // Take screenshot of context menu
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'feature_context_menu_rotate_group.png') });

    // Close context menu by pressing Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 3: TEST DESELECTION WHEN CLICKING OUTSIDE CANVAS ELEMENTS
    // -------------------------------------------------------------------------
    console.log('8. Testing Deselection when clicking outside on stage background...');
    // Click on the empty gray viewport stage background (outside fabric-stage-wrapper)
    const stageBackground = page.locator('#canvas-viewport-container').first();
    if (await stageBackground.isVisible()) {
      await stageBackground.click({ position: { x: 450, y: 120 } });
    } else {
      await page.mouse.click(450, 120);
    }
    await page.waitForTimeout(500);

    const isToolbarStillVisible = await toolbar.isVisible();
    console.log(`   ✓ Element deselection on outside click: toolbar hidden = ${!isToolbarStillVisible}`);
    assert(!isToolbarStillVisible, 'Element was deselected and toolbar is hidden on outside click');

    // -------------------------------------------------------------------------
    // TEST 4: UNIVERSAL DRAG-AND-DROP IMAGE AUTO-SAVED TO UPLOAD SECTION
    // -------------------------------------------------------------------------
    console.log('9. Testing Universal Drag and Drop Image dropped onto Canvas & auto-saved to Upload Section...');
    
    // Use an inline SVG data URI as guaranteed drop payload
    const sampleSvgData = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%238b3dff"/><circle cx="50" cy="50" r="30" fill="%23ffffff"/></svg>';
    
    await page.evaluate((imgData) => {
      const targetEl = document.querySelector('.upper-canvas') || document.getElementById('fabric-stage-wrapper') || document.body;
      const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
          files: [],
          getData: (type) => (type === 'text/uri-list' || type === 'text/plain' ? imgData : '')
        }
      });
      Object.defineProperty(dropEvent, 'clientX', { value: 500 });
      Object.defineProperty(dropEvent, 'clientY', { value: 300 });

      targetEl.dispatchEvent(dropEvent);
    }, sampleSvgData);

    await page.waitForTimeout(2000);

    // Verify uploaded item appears in local storage / user media
    const userMediaItems = await page.evaluate(() => {
      try {
        const stored = localStorage.getItem('marathi_user_media');
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    });

    console.log(`   ✓ Total assets in User Uploads storage: ${userMediaItems.length}`);
    assert(userMediaItems.length > 0, 'Dropped image was automatically saved into userMedia Upload Section');

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'feature_drag_and_drop_upload_section.png') });

    console.log('\n========================================================================');
    console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY! (100% PASS)');
    console.log('========================================================================\n');
  } catch (error) {
    console.error('Test execution error:', error);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'feature_test_failure.png') });
    throw error;
  } finally {
    await browser.close();
  }
}

runFeaturesTest();
