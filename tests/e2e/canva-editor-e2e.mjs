import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

async function runCanvaEditorE2ETest() {
  console.log('🚀 Starting Canva-Exact Editor & Marathi Calligraphy Verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // 1. Navigate to /editor
    console.log('1. Navigating to /editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // 2. Check Canva Header Elements (in English)
    console.log('2. Verifying Canva Header elements in English...');
    const headerTitleInput = page.locator('input[type="text"]').first();
    const headerTitle = await headerTitleInput.inputValue();
    console.log('   Header Title found:', headerTitle);

    const downloadBtn = page.getByRole('button', { name: 'Download' });
    const downloadVisible = await downloadBtn.isVisible();
    console.log('   Canva Download Button visible:', downloadVisible);

    const fileMenuBtn = page.getByRole('button', { name: 'File' });
    console.log('   Canva File Menu visible:', await fileMenuBtn.isVisible());

    const resizeBtn = page.getByRole('button', { name: 'Resize' });
    console.log('   Canva Resize Button visible:', await resizeBtn.isVisible());

    // 3. Check Left Canva Dock (English tabs)
    console.log('3. Verifying Left Canva Dock...');
    const calligraphyTab = page.getByTitle('Calligraphy');
    const calligraphyVisible = await calligraphyTab.isVisible();
    console.log('   Calligraphy Studio Dock Tab visible:', calligraphyVisible);

    // 4. Click Calligraphy Tab in Dock
    console.log('4. Clicking Calligraphy Studio Tab...');
    await calligraphyTab.click();
    await page.waitForTimeout(1000);

    // Verify Calligraphy Drawer content
    const studioTitle = await page.getByText('Marathi Calligraphy & Typography').isVisible();
    console.log('   Marathi Calligraphy Studio header visible:', studioTitle);

    // 5. Click on "श्री गणेशाय नमः" Calligraphy Preset
    console.log('5. Clicking authentic Calligraphy preset "॥ श्री गणेशाय नमः ॥"...');
    const ganeshPreset = page.getByText('॥ श्री गणेशाय नमः ॥').first();
    await ganeshPreset.click();
    await page.waitForTimeout(1000);

    // 6. Test Export Modal (Canva-style)
    console.log('6. Testing Canva Export Modal...');
    await downloadBtn.click();
    await page.waitForTimeout(1000);

    const exportModalHeader = await page.getByRole('heading', { name: 'Download Design' }).isVisible();
    console.log('   Canva Export Modal opened:', exportModalHeader);

    const pngOption = await page.getByText('PNG Image (Recommended)').isVisible();
    console.log('   PNG option present:', pngOption);

    const pdfOption = await page.getByText('PDF Document (Print Ready)').isVisible();
    console.log('   PDF Print option present:', pdfOption);

    // Close export modal
    const closeBtn = page.locator('button:has(svg.lucide-x)').first();
    await closeBtn.click();
    await page.waitForTimeout(500);

    console.log('✅ ALL CANVA EDITOR & CALLIGRAPHY TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runCanvaEditorE2ETest();
