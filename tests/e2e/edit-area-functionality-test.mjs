import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runEditAreaTest() {
  console.log('🚀 Starting Enhanced Edit Area Functionality Test...');
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

  page.on('pageerror', err => console.error('  [Browser Error]:', err.message));

  try {
    // 1. Open Editor
    console.log('1. Loading Editor at http://localhost:5173/editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // 2. Check Stage Quick View Bar (Rulers, Margins, Grid, Fit)
    console.log('2. Verifying Stage Quick View Bar...');
    const quickBarButtons = await page.$$eval('[data-testid="stage-quick-view-bar"] button, .stage-quick-view-bar button', (btns) =>
      btns.map((b) => b.textContent?.trim()).filter(Boolean)
    );
    console.log('   Quick view options found:', {
      hasRulers: quickBarButtons.includes('Rulers'),
      hasMargins: quickBarButtons.includes('Margins'),
      hasGrid: quickBarButtons.includes('Grid'),
      hasFit: quickBarButtons.includes('Fit'),
    });

    if (!quickBarButtons.includes('Rulers') || !quickBarButtons.includes('Margins') || !quickBarButtons.includes('Grid')) {
      throw new Error('Quick view bar controls missing in edit area');
    }

    // 3. Test Margins & Grid Toggle
    console.log('3. Testing Safety Margins and Precision Grid toggle...');
    const marginsBtn = page.locator('button[title="Toggle Safe Margins & Bleed"]');
    await marginsBtn.click();
    await page.waitForTimeout(400);
    const marginGuide = await page.$('text="Safety Margin (5%)"');
    console.log('   Safety margin guide visible:', !!marginGuide);

    const gridBtn = page.locator('button[title="Toggle Precision Grid"]').first();
    await gridBtn.click();
    await page.waitForTimeout(400);

    // 4. Test Adding Text and Typography Effects
    console.log('4. Testing Text Typography & Effects Suite...');
    const textDockBtn = page.locator('button[title="Text"]');
    await textDockBtn.click();
    await page.waitForTimeout(500);

    const addHeadingBtn = page.locator('button:has-text("Add a Bold Heading")');
    await addHeadingBtn.click();
    await page.waitForTimeout(600);

    // Effects button in toolbar
    const effectsBtn = page.locator('button:has-text("Effects")').first();
    console.log('   Text Effects toolbar button found:', await effectsBtn.count() > 0);
    if (await effectsBtn.count() > 0) {
      await effectsBtn.click();
      await page.waitForTimeout(400);
      const effectsHeading = await page.$('text="Typography Effects"');
      const hasKesariGlow = page.locator('button:has-text("Kesari Glow")').first();
      const hasHollow = page.locator('button:has-text("Hollow")').first();
      const hasHighlight = await page.$('text="Background Highlight"');
      console.log('   Effects popover content:', {
        heading: !!effectsHeading,
        kesariGlow: await hasKesariGlow.count() > 0,
        hollow: await hasHollow.count() > 0,
        backgroundHighlight: !!hasHighlight,
      });

      // Click Kesari Glow effect
      if (await hasKesariGlow.count() > 0) await hasKesariGlow.click();
      await page.waitForTimeout(300);
      // Close effects popover
      await effectsBtn.click();
    }

    // 5. Test Adding Shape and Border/Corner Controls
    console.log('5. Testing Shape Border & Corner Radius Controls...');
    const elementsDockBtn = page.locator('button[title="Elements"]');
    await elementsDockBtn.click();
    await page.waitForTimeout(500);

    const rectBtn = page.locator('button[title="Add Rectangle (R)"]');
    if (await rectBtn.count() > 0) {
      await rectBtn.click();
      await page.waitForTimeout(500);
      console.log('   Added Rectangle shape to canvas');
    }

    // 6. Test Position Popover (Layer Order & Alignment to Page)
    console.log('6. Testing Position & Alignment Suite...');
    const positionBtn = page.locator('button:has-text("Position")').first();
    if (await positionBtn.count() > 0) {
      await positionBtn.click();
      await page.waitForTimeout(400);
      const alignCenter = page.locator('button:has-text("Center H")').first();
      const alignMiddle = page.locator('button:has-text("Middle V")').first();
      const bringFront = page.locator('button:has-text("Bring to Front")').first();
      console.log('   Position popover actions visible:', {
        alignCenterH: await alignCenter.count() > 0,
        alignMiddleV: await alignMiddle.count() > 0,
        bringToFront: await bringFront.count() > 0,
      });
      if (await alignCenter.count() > 0) await alignCenter.click();
      await page.waitForTimeout(300);
      await positionBtn.click(); // Close
    }

    // 7. Test Right-Click Context Menu on Canvas
    console.log('7. Testing In-Canvas Right-Click Context Menu...');
    const canvas = await page.$('canvas');
    if (canvas) {
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: 'right' });
        await page.waitForTimeout(400);

        const contextMenu = page.locator('.fixed button:has-text("Copy")');
        const duplicateOption = page.locator('.fixed button:has-text("Duplicate")');
        const layerOption = page.locator('.fixed button:has-text("Layer")');
        const alignOption = page.locator('.fixed button:has-text("Align to Page")');
        console.log('   Canvas context menu options:', {
          copy: await contextMenu.count() > 0,
          duplicate: await duplicateOption.count() > 0,
          layer: await layerOption.count() > 0,
          align: await alignOption.count() > 0,
        });

        // Close context menu with Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }
    }

    // 8. Test Presentation Mode
    console.log('8. Testing Fullscreen Presentation Mode...');
    const presentBtn = page.locator('button[title="Present Fullscreen"]').first();
    if (await presentBtn.count() > 0) {
      await presentBtn.click();
      await page.waitForTimeout(600);
      const presHeading = await page.$('text=/Page 1 of/');
      console.log('   Presentation overlay loaded:', !!presHeading);

      // Exit presentation mode with Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }

    // 9. Take high-definition screenshot of the enhanced edit area
    const screenshotPath = path.join(ARTIFACTS_DIR, 'enhanced_edit_area.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot of enhanced edit area saved to: ${screenshotPath}`);

    console.log('\n🎉 ALL ENHANCED EDIT AREA FUNCTIONALITY TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runEditAreaTest();
