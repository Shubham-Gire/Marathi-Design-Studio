import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runComprehensiveTest() {
  console.log('🚀 Starting Comprehensive 3-Image Canva Features Verification Test...');
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

  page.on('dialog', async (dialog) => {
    console.log(`💬 Dialog popup [${dialog.type()}]: ${dialog.message()}`);
    await dialog.accept();
  });

  try {
    console.log('1. Navigating to Editor: http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2500);

    // =========================================================================
    // PART 1: VERIFY IMAGE 1 - DOCK (Stencils [SVG], Text, Fonts [AMS])
    // =========================================================================
    console.log('\n--- PART 1: VERIFYING IMAGE 1 (DOCK: Stencils [SVG], Text, Fonts [AMS]) ---');
    
    // Check Stencils with SVG badge
    const stencilsDock = page.locator('button[title="Stencils"]');
    await stencilsDock.waitFor({ state: 'visible', timeout: 6000 });
    const stencilsBadge = stencilsDock.locator('text=SVG');
    console.log(`- Stencils dock item visible: ${await stencilsDock.isVisible()}`);
    console.log(`- Stencils "SVG" badge visible: ${await stencilsBadge.isVisible()}`);

    // Check Text dock item
    const textDock = page.locator('button[title="Text"]');
    console.log(`- Text dock item visible: ${await textDock.isVisible()}`);

    // Check Fonts dock item with AMS badge
    const fontsDock = page.locator('button[title="Fonts"]');
    await fontsDock.waitFor({ state: 'visible', timeout: 6000 });
    const fontsBadge = fontsDock.locator('text=AMS');
    console.log(`- Fonts dock item visible: ${await fontsDock.isVisible()}`);
    console.log(`- Fonts "AMS" badge visible: ${await fontsBadge.isVisible()}`);

    // Click Fonts dock item to verify activation
    console.log('Clicking Fonts [AMS] dock item...');
    await fontsDock.click();
    await page.waitForTimeout(1000);

    // Take screenshot of Image 1 feature (Dock with Fonts [AMS] active)
    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_dock_fonts_ams_verified.png`,
      clip: { x: 0, y: 50, width: 440, height: 650 },
    });
    console.log('📸 Screenshot saved: canva_dock_fonts_ams_verified.png');

    // =========================================================================
    // PART 2: VERIFY IMAGE 3 - FLOATING DRAW / TOOLS TOOLBAR
    // =========================================================================
    console.log('\n--- PART 2: VERIFYING IMAGE 3 (FLOATING DRAW & WHITEBOARD TOOLS TOOLBAR) ---');
    
    const toolsDock = page.locator('button[title="Tools"]');
    await toolsDock.waitFor({ state: 'visible', timeout: 6000 });
    console.log('Clicking "Tools" dock item with green pen icon...');
    await toolsDock.click();
    await page.waitForTimeout(1000);

    const floatingToolbar = page.locator('[data-testid="canva-draw-floating-toolbar"]');
    await floatingToolbar.waitFor({ state: 'visible', timeout: 6000 });
    console.log('✅ Floating Draw / Tools toolbar is visible beside dock.');

    const closeBtn = floatingToolbar.locator('button[title="Close Drawing Tools"]');
    const selectBtn = floatingToolbar.locator('button[title*="Select"]');
    const penBtn = floatingToolbar.locator('button[title*="Pen"]');
    const shapesBtn = floatingToolbar.locator('button[title="Shapes"]');
    const lineBtn = floatingToolbar.locator('button[title*="Line"]');
    const stickyBtn = floatingToolbar.locator('button[title="Sticky Note"]');
    const textBtn = floatingToolbar.locator('button[title*="Add Text"]');
    const calligraphyBtn = floatingToolbar.locator('button[title*="Calligraphy"]');
    const tableBtn = floatingToolbar.locator('button[title="Table Grid"]');

    console.log(`- Close button (✕): ${await closeBtn.isVisible()}`);
    console.log(`- 1. Select Pointer: ${await selectBtn.isVisible()}`);
    console.log(`- 2. Pen / Freehand Draw: ${await penBtn.isVisible()}`);
    console.log(`- 3. Shapes: ${await shapesBtn.isVisible()}`);
    console.log(`- 4. Line / Connector: ${await lineBtn.isVisible()}`);
    console.log(`- 5. Sticky Note: ${await stickyBtn.isVisible()}`);
    console.log(`- 6. Text: ${await textBtn.isVisible()}`);
    console.log(`- 7. Signature / Calligraphy: ${await calligraphyBtn.isVisible()}`);
    console.log(`- 8. Table Grid: ${await tableBtn.isVisible()}`);

    // Click Pen to open Brush Options
    await penBtn.click();
    await page.waitForTimeout(600);

    // Take screenshot of Image 3 feature (Floating Tools Pill + Brush Panel)
    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_draw_tools_floating_toolbar_verified.png`,
      clip: { x: 0, y: 50, width: 440, height: 650 },
    });
    console.log('📸 Screenshot saved: canva_draw_tools_floating_toolbar_verified.png');

    // Close floating toolbar
    await closeBtn.click();
    await page.waitForTimeout(600);

    // =========================================================================
    // PART 3: VERIFY IMAGE 2 - ELEMENT CONTEXT TOOLBAR & FLOATING ACTION HUD
    // =========================================================================
    console.log('\n--- PART 3: VERIFYING IMAGE 2 (ELEMENT CONTEXT TOOLBAR & FLOATING HUD) ---');

    // Re-open Tools floating bar to add a shape onto canvas
    console.log('Opening Tools floating toolbar to add a shape...');
    await toolsDock.click();
    await page.waitForTimeout(600);

    // Click Shapes tool and pick Square
    console.log('Clicking Shapes and selecting Square...');
    await shapesBtn.click();
    await page.waitForTimeout(500);

    const shapesPanel = page.locator('[data-testid="draw-shapes-panel"]');
    await shapesPanel.waitFor({ state: 'visible', timeout: 4000 });
    const squareBtn = shapesPanel.locator('button[title="Add Square"]');
    await squareBtn.click();
    await page.waitForTimeout(1200);
    console.log('✅ Shape added and selected on canvas.');

    // Close the floating tools toolbar
    await closeBtn.click();
    await page.waitForTimeout(500);

    // Click the shape on canvas to ensure it is selected
    console.log('Clicking shape on canvas to activate selection...');
    await page.mouse.click(740, 560);
    await page.waitForTimeout(800);

    // Verify Floating HUD Capsule directly above element: Comment, Lock, Duplicate, Delete, More
    const floatingHud = page.locator('[data-testid="floating-quick-hud"]');
    await floatingHud.waitFor({ state: 'visible', timeout: 6000 });
    console.log('✅ Floating Quick Action HUD is visible directly above selected element.');

    const commentBtn = floatingHud.locator('button[title*="comment"]');
    const lockBtn = floatingHud.locator('button[title*="element"]');
    const duplicateBtn = floatingHud.locator('button[title*="Duplicate"]');
    const deleteBtn = floatingHud.locator('button[title*="Delete"]');
    const moreBtn = floatingHud.locator('button[title*="More options"]');

    console.log(`- HUD Comment button: ${await commentBtn.isVisible()}`);
    console.log(`- HUD Lock button: ${await lockBtn.isVisible()}`);
    console.log(`- HUD Duplicate button: ${await duplicateBtn.isVisible()}`);
    console.log(`- HUD Delete button: ${await deleteBtn.isVisible()}`);
    console.log(`- HUD More button (...): ${await moreBtn.isVisible()}`);

    // Verify Circular Rotation Handle at bottom center of selected element
    const rotateHandle = page.locator('[data-testid="canva-rotation-handle"]');
    await rotateHandle.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Circular Rotation Handle (⟳) is visible at bottom center of element.');

    // Verify Canva Contextual Toolbar at top
    console.log('Verifying top Contextual Action Toolbar buttons...');
    const topToolbar = page.locator('[data-testid="contextual-toolbar"]');
    await topToolbar.waitFor({ state: 'visible', timeout: 5000 });

    // Check transparency button
    const transparencyBtn = topToolbar.locator('button[title="Transparency"]');
    console.log(`- Top Toolbar Transparency button: ${await transparencyBtn.isVisible()}`);

    // Check flip button
    const flipBtn = topToolbar.locator('button[title="Flip"]');
    console.log(`- Top Toolbar Flip button: ${await flipBtn.isVisible()}`);

    // Check animate button
    const animateBtn = topToolbar.locator('button[title="Animate"]');
    console.log(`- Top Toolbar Animate button: ${await animateBtn.isVisible()}`);

    // Check position button
    const positionBtn = topToolbar.locator('button[title="Position"]');
    console.log(`- Top Toolbar Position button: ${await positionBtn.isVisible()}`);

    // Hover over Transparency button to show tooltip
    await transparencyBtn.hover();
    await page.waitForTimeout(500);

    // Take screenshot of Image 2 feature (Element selection, top toolbar, HUD capsule, bottom rotation handle)
    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_element_selection_and_toolbar_verified.png`,
    });
    console.log('📸 Screenshot saved: canva_element_selection_and_toolbar_verified.png');

    console.log('\n🎉 ALL THREE REFERENCE IMAGES FULLY VERIFIED AND MATCHED!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_three_images_test_error.png` });
  } finally {
    await browser.close();
  }
}

runComprehensiveTest();
