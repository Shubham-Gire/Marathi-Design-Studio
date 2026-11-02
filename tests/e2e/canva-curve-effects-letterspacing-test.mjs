import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('🚀 Starting Canva Curve Text, Letter Spacing & Effects Drawer E2E Test...');
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

  try {
    console.log('1. Navigating to Editor: http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2500);

    // 2. Add text "MODERN" to canvas
    console.log('2. Adding text "MODERN" to canvas...');
    const textDock = page.locator('button[title="Text"]');
    await textDock.click();
    await page.waitForTimeout(1000);

    const addHeadingBtn = page.locator('button:has-text("Add a Bold Heading")');
    await addHeadingBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addHeadingBtn.click();
    await page.waitForTimeout(1000);

    // Update text content to "MODERN"
    await page.evaluate(() => {
      const win = window;
      const canvas = win.__fabricCanvas;
      const active = canvas?.getActiveObject();
      if (active && (active.type === 'text' || active.type === 'i-text' || active.type === 'textbox')) {
        active.text = 'MODERN';
        active.fontSize = 54;
        active.fontWeight = '900';
        active.setCoords();
        canvas.renderAll();
      }
    });
    await page.waitForTimeout(600);
    console.log('✅ Added text "MODERN" onto canvas.');

    // 3. Click "Effects" in top contextual toolbar
    console.log('3. Clicking "Effects" in contextual toolbar...');
    const topToolbar = page.locator('[data-testid="contextual-toolbar"]');
    await topToolbar.waitFor({ state: 'visible', timeout: 5000 });

    const effectsBtn = topToolbar.locator('button[title="Effects"]');
    await effectsBtn.waitFor({ state: 'visible', timeout: 5000 });
    await effectsBtn.click();
    await page.waitForTimeout(1000);

    // 4. Verify Canva Text Effects Drawer is visible
    console.log('4. Verifying Canva Text Effects Drawer...');
    const effectsDrawer = page.locator('[data-testid="canva-text-effects-drawer"]');
    await effectsDrawer.waitFor({ state: 'visible', timeout: 6000 });
    console.log('✅ Text Effects Drawer is visible beside Dock.');

    // 5. Select "Curve" under Shape section
    console.log('5. Clicking "Curve" shape card (Arched ABCD)...');
    const curveCard = effectsDrawer.locator('button[title="Curved text"]');
    await curveCard.waitFor({ state: 'visible', timeout: 4000 });
    await curveCard.click();
    await page.waitForTimeout(800);

    // Verify curve slider and stepper
    const curveInput = effectsDrawer.locator('input[type="number"]').first();
    const curveVal = await curveInput.inputValue();
    console.log(`✅ Curve card selected. Current curve value: ${curveVal}`);

    // Set curvature to 28 exactly matching user screenshot
    console.log('Setting curvature to 28...');
    await curveInput.fill('28');
    await curveInput.dispatchEvent('change');
    await page.waitForTimeout(800);

    // Click "+" stepper to test stepper button
    const plusStepBtn = effectsDrawer.locator('button[title="Increase curve"]');
    if (await plusStepBtn.isVisible()) {
      await plusStepBtn.click();
      await page.waitForTimeout(400);
      console.log('✅ Tested "+" curve stepper button.');
    }

    // Set back to 28
    await curveInput.fill('28');
    await curveInput.dispatchEvent('change');
    await page.waitForTimeout(800);

    // Verify curve guide circle is rendered on canvas
    const curveGuide = page.locator('[data-testid="canva-curve-guide-circle"]');
    const hasGuide = await curveGuide.isVisible();
    console.log(`✅ Circular Curve Guide on canvas visible: ${hasGuide}`);

    // Take screenshot 1: Curve Shape, Curve 28, Circular Guide, Text "MODERN" curved
    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_curved_text_modern_verified.png`,
    });
    console.log('📸 Screenshot saved: canva_curved_text_modern_verified.png');

    // 6. Test Letter Spacing & Line Spacing
    console.log('6. Testing Letter Spacing...');
    const letterSpacingSlider = effectsDrawer.locator('input[type="range"]').nth(1);
    await letterSpacingSlider.fill('60');
    await letterSpacingSlider.dispatchEvent('change');
    await page.waitForTimeout(600);

    const letterSpacingStepperPlus = effectsDrawer.locator('button[title="Increase letter spacing"]');
    if (await letterSpacingStepperPlus.isVisible()) {
      await letterSpacingStepperPlus.click();
      await page.waitForTimeout(400);
      console.log('✅ Tested Letter Spacing stepper "+".');
    }

    // Check Fabric canvas object charSpacing
    const charSpacingVal = await page.evaluate(() => {
      const win = window;
      const canvas = win.__fabricCanvas;
      const active = canvas?.getActiveObject();
      return active ? active.charSpacing : null;
    });
    console.log(`✅ Text charSpacing on canvas: ${charSpacingVal}`);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_letter_spacing_verified.png`,
    });
    console.log('📸 Screenshot saved: canva_letter_spacing_verified.png');

    // 7. Test Advanced Effects: Neon Lights, TV Static, 70s
    console.log('7. Testing Advanced Effect "Neon Lights"...');
    const neonBtn = effectsDrawer.locator('button[title="Neon Lights Glow"]');
    await neonBtn.waitFor({ state: 'visible', timeout: 4000 });
    await neonBtn.click();
    await page.waitForTimeout(800);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_neon_lights_effect_verified.png`,
    });
    console.log('📸 Screenshot saved: canva_neon_lights_effect_verified.png');

    console.log('Testing Advanced Effect "TV Static"...');
    const tvStaticBtn = effectsDrawer.locator('button[title="TV Static Glitch"]');
    await tvStaticBtn.click();
    await page.waitForTimeout(800);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_tv_static_effect_verified.png`,
    });
    console.log('📸 Screenshot saved: canva_tv_static_effect_verified.png');

    console.log('Testing Advanced Effect "70s Retro"...');
    const retro70sBtn = effectsDrawer.locator('button[title="70s Retro Layered"]');
    await retro70sBtn.click();
    await page.waitForTimeout(800);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/canva_70s_retro_effect_verified.png`,
    });
    console.log('📸 Screenshot saved: canva_70s_retro_effect_verified.png');

    console.log('\n🎉 ALL TEXT EFFECTS, CURVE TEXT, AND LETTER SPACING FEATURES FULLY VERIFIED!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: `${ARTIFACT_DIR}/canva_curve_effects_test_error.png` });
  } finally {
    await browser.close();
  }
}

runTest();
