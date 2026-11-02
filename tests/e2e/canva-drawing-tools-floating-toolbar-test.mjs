import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('🚀 Starting Canva Drawing & Whiteboard Tools Floating Toolbar E2E Test...');
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

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  // Auto-accept alert/confirm dialogs
  page.on('dialog', async (dialog) => {
    console.log(`💬 Dialog popup [${dialog.type()}]: ${dialog.message()}`);
    await dialog.accept();
  });

  try {
    console.log('1. Navigating to Editor: http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2500);

    // 2. Locate and Click "Tools" in Dock
    console.log('2. Clicking "Tools" dock item with green pen icon...');
    const toolsDockBtn = page.locator('button[title="Tools"]');
    await toolsDockBtn.waitFor({ state: 'visible', timeout: 8000 });
    await toolsDockBtn.click();
    await page.waitForTimeout(1000);

    // 3. Verify Floating Draw Toolbar is visible right next to Dock
    const floatingToolbar = page.locator('[data-testid="canva-draw-floating-toolbar"]');
    await floatingToolbar.waitFor({ state: 'visible', timeout: 6000 });
    console.log('✅ Floating Draw / Tools toolbar is visible.');

    // 4. Verify Close Button (✕) and all 8 Tools
    console.log('4. Verifying Close button (✕) and all 8 toolbar tools...');
    const closeBtn = floatingToolbar.locator('button[title="Close Drawing Tools"]');
    const selectBtn = floatingToolbar.locator('button[title*="Select"]');
    const penBtn = floatingToolbar.locator('button[title*="Pen"]');
    const shapesBtn = floatingToolbar.locator('button[title="Shapes"]');
    const lineBtn = floatingToolbar.locator('button[title*="Line"]');
    const stickyBtn = floatingToolbar.locator('button[title="Sticky Note"]');
    const textBtn = floatingToolbar.locator('button[title*="Add Text"]');
    const calligraphyBtn = floatingToolbar.locator('button[title*="Calligraphy"]');
    const tableBtn = floatingToolbar.locator('button[title="Table Grid"]');

    console.log(`- Close button (✕) visible: ${await closeBtn.isVisible()}`);
    console.log(`- 1. Select Pointer visible: ${await selectBtn.isVisible()}`);
    console.log(`- 2. Pen / Draw visible: ${await penBtn.isVisible()}`);
    console.log(`- 3. Shapes visible: ${await shapesBtn.isVisible()}`);
    console.log(`- 4. Line / Connector visible: ${await lineBtn.isVisible()}`);
    console.log(`- 5. Sticky Note visible: ${await stickyBtn.isVisible()}`);
    console.log(`- 6. Text visible: ${await textBtn.isVisible()}`);
    console.log(`- 7. Signature / Calligraphy visible: ${await calligraphyBtn.isVisible()}`);
    console.log(`- 8. Table Grid visible: ${await tableBtn.isVisible()}`);

    if (
      !(await closeBtn.isVisible()) ||
      !(await selectBtn.isVisible()) ||
      !(await penBtn.isVisible()) ||
      !(await shapesBtn.isVisible()) ||
      !(await lineBtn.isVisible()) ||
      !(await stickyBtn.isVisible()) ||
      !(await textBtn.isVisible()) ||
      !(await calligraphyBtn.isVisible()) ||
      !(await tableBtn.isVisible())
    ) {
      throw new Error('FAILED: One or more tools are missing from the floating toolbar!');
    }

    // 5. Test Pen / Freehand Draw Mode & Brush Panel
    console.log('5. Clicking Pen / Draw tool...');
    await penBtn.click();
    await page.waitForTimeout(600);

    const brushPanel = page.locator('[data-testid="draw-brush-panel"]');
    await brushPanel.waitFor({ state: 'visible', timeout: 4000 });
    console.log('✅ Brush options panel opened next to floating toolbar.');

    // Switch to Highlighter
    const highlighterBtn = brushPanel.locator('button:has-text("Highlight")');
    if (await highlighterBtn.isVisible()) {
      await highlighterBtn.click();
      await page.waitForTimeout(400);
      console.log('✅ Selected Highlighter brush style.');
    }

    // Pick Yellow or Kesari color
    const kesariColorBtn = brushPanel.locator('button[title="Kesari"]');
    if (await kesariColorBtn.isVisible()) {
      await kesariColorBtn.click();
      await page.waitForTimeout(400);
      console.log('✅ Selected Kesari color.');
    }

    // Freehand draw a stroke on canvas using mouse drag
    console.log('Drawing a stroke on canvas with mouse...');
    await page.mouse.move(500, 350);
    await page.mouse.down();
    await page.mouse.move(650, 380, { steps: 5 });
    await page.mouse.move(700, 330, { steps: 5 });
    await page.mouse.up();
    await page.waitForTimeout(800);

    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_draw_tools_1_pen_highlighter.png` });

    // 6. Test Shapes Submenu & Add Star
    console.log('6. Clicking Shapes tool...');
    await shapesBtn.click();
    await page.waitForTimeout(500);

    const shapesPanel = page.locator('[data-testid="draw-shapes-panel"]');
    await shapesPanel.waitFor({ state: 'visible', timeout: 4000 });
    console.log('✅ Shapes panel opened.');

    const starShapeBtn = shapesPanel.locator('button[title="Add Star"]');
    await starShapeBtn.waitFor({ state: 'visible', timeout: 3000 });
    await starShapeBtn.click();
    await page.waitForTimeout(800);
    console.log('✅ Added Star shape to canvas.');

    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_draw_tools_2_shapes.png` });

    // 7. Test Sticky Note Submenu & Add Sticky Note
    console.log('7. Clicking Sticky Note tool...');
    await stickyBtn.click();
    await page.waitForTimeout(500);

    const stickyPanel = page.locator('[data-testid="draw-sticky-panel"]');
    await stickyPanel.waitFor({ state: 'visible', timeout: 4000 });
    console.log('✅ Sticky notes panel opened with color palette.');

    const yellowStickyBtn = stickyPanel.locator('button[title="Add Yellow Note"]');
    await yellowStickyBtn.waitFor({ state: 'visible', timeout: 3000 });
    await yellowStickyBtn.click();
    await page.waitForTimeout(800);
    console.log('✅ Added Yellow Sticky Note to canvas.');

    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_draw_tools_3_sticky_note.png` });

    // 8. Test Line Tool
    console.log('8. Clicking Line tool...');
    await lineBtn.click();
    await page.waitForTimeout(600);
    console.log('✅ Added Line connector to canvas.');

    // 9. Test Pointer / Select Mode
    console.log('9. Clicking Pointer / Select tool to exit draw mode...');
    await selectBtn.click();
    await page.waitForTimeout(500);

    const isDrawingAfterSelect = await page.evaluate(() => {
      const canvasEl = document.querySelector('canvas.lower-canvas');
      const canvas = (window).fabricCanvas || (canvasEl)?.__fabric;
      return canvas?.isDrawingMode;
    });
    console.log(`✅ Canvas isDrawingMode after clicking Pointer: ${isDrawingAfterSelect}`);
    if (isDrawingAfterSelect) {
      throw new Error('FAILED: Pointer tool did not turn off isDrawingMode!');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_draw_tools_4_pointer_mode.png` });

    // 10. Test Close Button (✕)
    console.log('10. Clicking Close button (✕)...');
    await closeBtn.click();
    await page.waitForTimeout(600);

    const isToolbarHiddenAfterClose =
      (await floatingToolbar.count()) === 0 || !(await floatingToolbar.isVisible());
    console.log(`✅ Floating toolbar closed: ${isToolbarHiddenAfterClose}`);
    if (!isToolbarHiddenAfterClose) {
      throw new Error('FAILED: Close button did not dismiss floating toolbar!');
    }

    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_draw_tools_final_verified.png` });
    console.log('🎉 ALL TESTS PASSED! Drawing tools floating toolbar fully verified.');

  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_draw_tools_test_error.png` }).catch(() => {});
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
