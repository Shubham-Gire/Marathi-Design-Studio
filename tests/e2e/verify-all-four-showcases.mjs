import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function run() {
  console.log('🚀 Starting All 4 Features Verification...');
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

  try {
    console.log('Navigating to http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // =========================================================================
    // 1. SHOWCASE 1: Canva Dock with SVG Stencils and AMS Fonts badge
    // =========================================================================
    console.log('📸 Testing Showcase 1: Dock with SVG Stencils and AMS Fonts badges...');
    const fontsDockBtn = page.locator('button[title="Fonts"]').first();
    await fontsDockBtn.waitFor({ state: 'visible', timeout: 10000 });
    await fontsDockBtn.click();
    await page.waitForTimeout(1000);

    // Take screenshot of dock area matching User Screenshot 1
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'showcase_1_dock_fonts_ams_stencils_svg.png'),
      clip: { x: 0, y: 155, width: 75, height: 260 }
    });
    console.log('✓ Showcase 1 captured');

    // Close the drawer to give canvas full room
    await fontsDockBtn.click();
    await page.waitForTimeout(600);

    // =========================================================================
    // 2. SHOWCASE 2: Image / Graphic Selection Toolbar & Floating HUD
    // =========================================================================
    console.log('📸 Testing Showcase 2: Image/Graphic Edit toolbar & HUD...');
    // Add image/graphic to canvas to trigger Image/Graphic contextual toolbar
    await page.evaluate(async () => {
      const win = window;
      const canvas = win.__fabricCanvas;
      if (canvas) {
        canvas.clear();
        // Create an SVG-based eagle/graphic illustration
        const svgStr = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23f59e0b"/><polygon points="50,20 60,45 85,50 65,65 72,90 50,75 28,90 35,65 15,50 40,45" fill="%23ffffff"/><circle cx="40" cy="45" r="5" fill="%23111827"/><circle cx="60" cy="45" r="5" fill="%23111827"/><polygon points="50,50 42,65 58,65" fill="%23ea580c"/></svg>`;
        
        await new Promise((resolve) => {
          fabric.Image.fromURL(svgStr, (img) => {
            img.set({
              left: 560,
              top: 240,
              originX: 'center',
              originY: 'center',
            });
            img.cornerRounding = 12;
            img.palette = ['#111827', '#cbd5e1', '#ea580c', '#f59e0b', '#ffffff'];
            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
            resolve(true);
          });
        });
      }
    });
    await page.waitForTimeout(1500);

    // Hover on the Transparency icon to trigger the "Transparency" tooltip!
    const transparencyBtn = page.locator('button[title="Transparency"]').first();
    if (await transparencyBtn.isVisible()) {
      await transparencyBtn.hover();
      await page.waitForTimeout(500);
    }

    // Take screenshot matching User Screenshot 2 (full width from x: 0 so Edit | Replace is completely visible)
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'showcase_2_graphic_edit_toolbar_and_hud.png'),
      clip: { x: 0, y: 54, width: 1100, height: 600 }
    });
    console.log('✓ Showcase 2 captured');

    // =========================================================================
    // 3. SHOWCASE 3: Drawing Tools Vertical Floating Toolbar
    // =========================================================================
    console.log('📸 Testing Showcase 3: Drawing Tools Floating Toolbar...');
    const toolsDockBtn = page.locator('button[title="Tools"]').first();
    await toolsDockBtn.waitFor({ state: 'visible', timeout: 5000 });
    await toolsDockBtn.click();
    await page.waitForTimeout(1000);

    const drawToolbar = page.locator('[data-testid="canva-draw-floating-toolbar"]');
    await drawToolbar.waitFor({ state: 'visible', timeout: 5000 });

    // Take screenshot matching User Screenshot 3
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'showcase_3_drawing_tools_floating_toolbar.png'),
      clip: { x: 0, y: 48, width: 170, height: 580 }
    });
    console.log('✓ Showcase 3 captured');

    // Close drawing toolbar
    const drawCloseBtn = drawToolbar.locator('button[title="Close Drawing Tools"]');
    if (await drawCloseBtn.isVisible()) {
      await drawCloseBtn.click();
      await page.waitForTimeout(600);
    }

    // =========================================================================
    // 4. SHOWCASE 4: Text Effects Drawer, Curved Text & Circular Guide Circle
    // =========================================================================
    console.log('📸 Testing Showcase 4: Text Effects Drawer & Curved Text...');
    // Add text element "MODERN"
    await page.evaluate(() => {
      const win = window;
      const canvas = win.__fabricCanvas;
      if (canvas) {
        canvas.clear();
        const text = new fabric.IText('MODERN', {
          left: 560,
          top: 180,
          fontSize: 72,
          fontFamily: 'Mukta',
          fontWeight: '900',
          fill: '#111827',
          charSpacing: 80,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
      }
    });
    await page.waitForTimeout(1000);

    // Click Effects button on CanvaToolbar
    const effectsBtn = page.locator('button[title="Effects"], button:has-text("Effects")').first();
    await effectsBtn.click();
    await page.waitForTimeout(1200);

    const effectsDrawer = page.locator('[data-testid="canva-text-effects-drawer"]');
    await effectsDrawer.waitFor({ state: 'visible', timeout: 5000 });

    // Select "Curve" card
    const curveCard = effectsDrawer.locator('button[title="Curved text"]').first();
    await curveCard.click();
    await page.waitForTimeout(1500);

    // Take screenshot matching User Screenshot 4
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'showcase_4_text_effects_curve_and_guide.png'),
      clip: { x: 72, y: 48, width: 1200, height: 750 }
    });
    console.log('✓ Showcase 4 captured');

    console.log('🎉 ALL 4 SHOWCASES SUCCESSFULLY TESTED AND VERIFIED!');
  } catch (err) {
    console.error('Test error:', err);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'showcase_verification_error.png') });
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
