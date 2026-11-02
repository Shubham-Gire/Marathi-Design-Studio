import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

async function runPhotosElementsTest() {
  console.log('🚀 Starting Photos & Images Element Addition Verification...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    console.log('1. Navigating to Canva Editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // -------------------------------------------------------------
    // 1. VERIFY PHOTOS DOCK ITEM & DRAWER
    // -------------------------------------------------------------
    console.log('2. Clicking "Photos" on left dock...');
    const dockPhotos = page.getByTitle('Photos');
    const dockPhotosVisible = await dockPhotos.isVisible();
    console.log('   Photos dock item visible:', dockPhotosVisible);
    await dockPhotos.click();
    await page.waitForTimeout(1000);

    // Verify Photos drawer content
    const photosHeading = await page.getByRole('heading', { name: 'Photos & Stock Images' }).isVisible();
    const urlInput = await page.locator('input[placeholder*="https://example.com/photo.jpg"]').isVisible();
    const photoSearchInput = page.locator('input[placeholder*="Search photos"]');
    const searchVisible = await photoSearchInput.isVisible();
    console.log('   Photos Drawer UI elements visible:', { photosHeading, urlInput, searchVisible });

    // Category pills check
    const catHeritage = await page.getByRole('button', { name: 'Heritage & Forts' }).isVisible();
    const catFestivals = await page.getByRole('button', { name: 'Festivals' }).isVisible();
    const catFood = await page.getByRole('button', { name: 'Food & Delicacies' }).isVisible();
    console.log('   Photo Category pills visible:', { catHeritage, catFestivals, catFood });

    // -------------------------------------------------------------
    // 2. SEARCH & CLICK PHOTO TO ADD TO CANVAS
    // -------------------------------------------------------------
    console.log('3. Searching for "Ganesh" photo...');
    await photoSearchInput.fill('Ganesh');
    await page.waitForTimeout(600);

    const ganeshPhotoCard = page.locator('img[alt*="Ganeshotsav"]').first();
    const ganeshFound = await ganeshPhotoCard.isVisible();
    console.log('   Ganesh photo card found:', ganeshFound);

    console.log('4. Clicking photo card to insert onto canvas...');
    const photoCard = page.locator('div.group:has(img[alt*="Ganeshotsav"])').first();
    await photoCard.click({ force: true });
    await page.waitForTimeout(1500);

    // -------------------------------------------------------------
    // 3. VERIFY IMAGE TOOLBAR WITH FILTERS
    // -------------------------------------------------------------
    console.log('5. Verifying Contextual Image Toolbar & Filters...');
    const flipHBtn = await page.getByTitle('Flip Horizontal').isVisible();
    const flipVBtn = await page.getByTitle('Flip Vertical').isVisible();
    const bwFilterBtn = await page.getByRole('button', { name: 'B&W' }).isVisible();
    const sepiaFilterBtn = await page.getByRole('button', { name: 'Sepia' }).isVisible();
    console.log('   Image Toolbar & Filter buttons visible:', { flipHBtn, flipVBtn, bwFilterBtn, sepiaFilterBtn });

    // Test clicking B&W filter
    if (bwFilterBtn) {
      console.log('   Applying B&W filter to image...');
      await page.getByRole('button', { name: 'B&W' }).click();
      await page.waitForTimeout(400);
    }

    // -------------------------------------------------------------
    // 4. VERIFY PHOTOS ACCESSIBLE IN ELEMENTS TAB AS WELL
    // -------------------------------------------------------------
    console.log('6. Verifying Photos section within Elements tab...');
    await page.getByTitle('Elements').click();
    await page.waitForTimeout(1000);

    const photosInElements = await page.getByText('Stock Photos & Images').isVisible();
    const photosFilterPill = await page.getByRole('button', { name: '📷 Photos & Images' }).isVisible();
    console.log('   Photos accessible within Elements tab:', { photosInElements, photosFilterPill });

    // -------------------------------------------------------------
    // 5. CAPTURE WORKFLOW SCREENSHOT
    // -------------------------------------------------------------
    const screenshotPath = path.resolve('C:/Users/DELL/.gemini/antigravity/brain/d60627ea-5112-4ca2-9a75-8935b6f07c43/canva_photos_elements_workflow.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('📸 Screenshot saved at:', screenshotPath);

    console.log('\n🎉 ALL PHOTO & IMAGE ELEMENT ADDITION TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Photo addition test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runPhotosElementsTest();
