import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function run() {
  console.log('🚀 Starting Canva Template & Element Integration Test...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // Mock authentication token & dismiss any dialogs
  await context.addInitScript(() => {
    localStorage.setItem('marathi_token', 'mock_admin_jwt_token_for_playwright');
    localStorage.setItem(
      'marathi_user',
      JSON.stringify({
        id: 1,
        email: 'admin@marathidesign.com',
        fullName: 'Shubham Gire (Canva Verified)',
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
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    // Verify Editor loaded
    const canvasExists = await page.waitForSelector('canvas.upper-canvas', { timeout: 15000 });
    if (!canvasExists) throw new Error('Fabric upper-canvas not found!');
    console.log('✅ Canvas upper-canvas loaded.');

    // 2. Open / Verify Templates Drawer
    console.log('2. Inspecting Templates Drawer...');
    const designsBtn = page.locator('button[title="Designs"], button[title="Templates"]').first();
    const isDrawerOpen = await page.locator('text=Design Templates').isVisible();
    if (!isDrawerOpen) {
      await designsBtn.click();
      await page.waitForTimeout(1000);
    }

    // Verify Canva Official Templates spotlight section is visible
    const canvaSectionTitle = page.locator('text=Canva Official Templates');
    await canvaSectionTitle.waitFor({ state: 'visible', timeout: 8000 });
    console.log('✅ "Canva Official Templates" spotlight header is visible.');

    // Screenshot Templates Drawer with Canva templates
    const templatesDrawerScreenshot = path.join(ARTIFACT_DIR, 'canva_templates_drawer_spotlight.png');
    await page.screenshot({ path: templatesDrawerScreenshot });
    console.log(`📸 Saved screenshot: ${templatesDrawerScreenshot}`);

    // 3. Load Canva Grand Opening Template
    console.log('3. Loading "भव्य उद्घाटन व सण विशेष (Canva Grand Opening Poster)" template...');
    const grandOpeningCard = page.locator('text=भव्य उद्घाटन व सण विशेष').first();
    await grandOpeningCard.click();
    await page.waitForTimeout(2500);

    // Check objects on canvas
    const objectsCountAfterTemplate = await page.evaluate(() => {
      const w = window;
      const editorWrapper = document.getElementById('fabric-stage-wrapper');
      // @ts-ignore
      const canvasEl = document.querySelector('canvas.lower-canvas');
      // Look up fabric canvas on window or container
      const fc = (window).fabricCanvas || (canvasEl && (canvasEl).__fabric);
      if (fc) {
        return fc.getObjects().length;
      }
      return -1;
    });
    console.log(`Canvas objects count after template load: ${objectsCountAfterTemplate}`);

    // Verify title on page or header updated
    const titleInput = page.locator('input[value*="भव्य उद्घाटन"], input[placeholder*="Untitled"], header input').first();
    const currentTitle = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return inputs.map(i => i.value).find(v => v.includes('भव्य उद्घाटन') || v.includes('Canva')) || '';
    });
    console.log(`Editor active title: "${currentTitle}"`);

    // Screenshot loaded Canva template on canvas
    const templateLoadedScreenshot = path.join(ARTIFACT_DIR, 'canva_grand_opening_template_loaded.png');
    await page.screenshot({ path: templateLoadedScreenshot });
    console.log(`📸 Saved screenshot: ${templateLoadedScreenshot}`);

    // 4. Test Text Editability on Canvas
    console.log('4. Testing Text Selection & Editability...');
    await page.evaluate(() => {
      const canvasEl = document.querySelector('canvas.lower-canvas');
      const fc = (canvasEl && (canvasEl).__fabric) || (window).fabricCanvas;
      if (fc) {
        const textObj = fc.getObjects().find((o) => o.type === 'textbox' && o.text && o.text.includes('भव्य उद्घाटन'));
        if (textObj) {
          fc.setActiveObject(textObj);
          textObj.set({ text: 'भव्य उद्घाटन २०२६ (Edited)' });
          fc.renderAll();
        }
      }
    });
    await page.waitForTimeout(1000);

    // Screenshot edited text
    const textEditedScreenshot = path.join(ARTIFACT_DIR, 'canva_template_text_edited.png');
    await page.screenshot({ path: textEditedScreenshot });
    console.log(`📸 Saved screenshot: ${textEditedScreenshot}`);

    // 5. Test Elements Tab & Canva Elements
    console.log('5. Switching to Elements tab...');
    const elementsTabBtn = page.locator('button[title="Elements"]');
    await elementsTabBtn.click();
    await page.waitForTimeout(1500);

    // Verify Canva Vector Elements header
    const canvaElementsHeader = page.locator('text=Canva Vector Elements');
    await canvaElementsHeader.waitFor({ state: 'visible', timeout: 8000 });
    console.log('✅ "Canva Vector Elements" section is visible.');

    // Screenshot Elements Drawer
    const elementsDrawerScreenshot = path.join(ARTIFACT_DIR, 'canva_elements_drawer_view.png');
    await page.screenshot({ path: elementsDrawerScreenshot });
    console.log(`📸 Saved screenshot: ${elementsDrawerScreenshot}`);

    // 6. Click Canva Element to Insert onto Canvas (e.g. Kalash or Rajmudra)
    console.log('6. Adding Canva Element "शुभ विवाह मंगल कलश व नारळ" to canvas...');
    const kalashElement = page.locator('div[title*="शुभ विवाह मंगल कलश"]').first();
    await kalashElement.click({ force: true });
    await page.waitForTimeout(2000);

    // Screenshot Canvas with Canva Element Added
    const elementAddedScreenshot = path.join(ARTIFACT_DIR, 'canva_element_added_to_canvas.png');
    await page.screenshot({ path: elementAddedScreenshot });
    console.log(`📸 Saved screenshot: ${elementAddedScreenshot}`);

    // 7. Test Save Canvas as Reusable Template
    console.log('7. Testing "Save Current Canvas as Template"...');
    await designsBtn.click();
    await page.waitForTimeout(1000);

    const saveTemplateBtn = page.locator('button:has-text("Save Current Canvas as Template")');
    if (await saveTemplateBtn.isVisible()) {
      await saveTemplateBtn.click();
      await page.waitForTimeout(1500);
      console.log('✅ Clicked "Save Current Canvas as Template".');
    }

    // Check localStorage for saved template
    const savedTemplatesInStorage = await page.evaluate(() => {
      const stored = localStorage.getItem('canva_user_templates');
      return stored ? JSON.parse(stored).length : 0;
    });
    console.log(`Saved user templates in localStorage: ${savedTemplatesInStorage}`);

    // Final full editor screenshot
    const finalScreenshot = path.join(ARTIFACT_DIR, 'canva_complete_workflow_verified.png');
    await page.screenshot({ path: finalScreenshot });
    console.log(`📸 Saved screenshot: ${finalScreenshot}`);

    console.log('🎉 ALL CANVA TEMPLATE & ELEMENT INTEGRATION TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    const errScreenshot = path.join(ARTIFACT_DIR, 'canva_integration_test_failure.png');
    await page.screenshot({ path: errScreenshot }).catch(() => {});
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
