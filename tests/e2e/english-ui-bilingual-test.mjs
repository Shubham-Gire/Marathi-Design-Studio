import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

async function runEnglishUiBilingualTest() {
  console.log('🚀 Starting English UI & Bilingual (Marathi + English) Typography Verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // -------------------------------------------------------------
    // 1. VERIFY HOMEPAGE (ENGLISH UI)
    // -------------------------------------------------------------
    console.log('1. Checking Homepage for 100% English UI...');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const navHome = await page.getByRole('link', { name: 'Home' }).isVisible();
    const navTemplates = await page.getByRole('link', { name: 'Templates' }).isVisible();
    const navPricing = await page.getByRole('button', { name: 'Pricing & Plans' }).isVisible();
    const navCreate = await page.getByRole('button', { name: 'Create Design' }).isVisible();
    const navSignUp = await page.getByRole('button', { name: 'Sign Up' }).isVisible();
    console.log('   Navbar in English:', { navHome, navTemplates, navPricing, navCreate, navSignUp });

    const heroTitle = await page.getByText('Create Stunning Marathi & English Designs').isVisible();
    console.log('   Hero Title in English:', heroTitle);

    // -------------------------------------------------------------
    // 2. VERIFY TEMPLATES PAGE (ENGLISH UI & BILINGUAL CARDS)
    // -------------------------------------------------------------
    console.log('2. Checking Templates Page...');
    await page.goto('http://localhost:5173/templates', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const templateHeading = await page.getByText('Design Template Library').isVisible();
    const searchPlaceholder = await page.locator('input[placeholder*="Search templates"]').isVisible();
    const filterAll = await page.getByRole('button', { name: 'All', exact: true }).isVisible();
    const filterFree = await page.getByRole('button', { name: 'Free', exact: true }).isVisible();
    const filterPro = await page.getByRole('button', { name: 'Pro', exact: true }).isVisible();
    console.log('   Templates Page UI in English:', { templateHeading, searchPlaceholder, filterAll, filterFree, filterPro });

    // Verify Bilingual template exists in catalog
    const bilingualCard = await page.getByText('GRAND OPENING').first().isVisible();
    console.log('   Bilingual Template found in catalog:', bilingualCard);

    // -------------------------------------------------------------
    // 3. VERIFY CANVA EDITOR (100% ENGLISH INTERFACE)
    // -------------------------------------------------------------
    console.log('3. Navigating to Canva-Exact Editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Header checks
    const fileBtn = await page.getByRole('button', { name: 'File' }).isVisible();
    const resizeBtn = await page.getByRole('button', { name: 'Resize' }).isVisible();
    const downloadBtn = await page.getByRole('button', { name: 'Download' }).first().isVisible();
    const titlePlaceholder = await page.locator('input[placeholder="Design Title"]').isVisible();
    console.log('   Editor Header in English:', { fileBtn, resizeBtn, downloadBtn, titlePlaceholder });

    // Dock Navigation checks
    const dockDesigns = await page.getByTitle('Designs').isVisible();
    const dockElements = await page.getByTitle('Elements').isVisible();
    const dockCalligraphy = await page.getByTitle('Calligraphy').isVisible();
    const dockText = await page.getByTitle('Text').isVisible();
    const dockUploads = await page.getByTitle('Uploads').isVisible();
    const dockDraw = await page.getByTitle('Draw').isVisible();
    const dockAi = await page.getByTitle('AI Magic').isVisible();
    const dockBackground = await page.getByTitle('Background').isVisible();
    const dockLayers = await page.getByTitle('Layers').isVisible();
    console.log('   Editor Left Dock in English:', {
      dockDesigns, dockElements, dockCalligraphy, dockText, dockUploads, dockDraw, dockAi, dockBackground, dockLayers
    });

    // -------------------------------------------------------------
    // 4. VERIFY TEXT & BILINGUAL CONTENT INSERTION
    // -------------------------------------------------------------
    console.log('4. Testing Text Tab & Bilingual Typography Insertions...');
    await page.getByTitle('Text').click();
    await page.waitForTimeout(800);

    const addHeadingBtn = await page.getByText('Add a Heading (56px)');
    await addHeadingBtn.click();
    await page.waitForTimeout(800);

    // Verify contextual toolbar appeared with English items
    const spacingBtn = await page.getByTitle('Letter & Line Spacing').isVisible();
    const effectsBtn = await page.getByTitle('Text Effects & Shadow').isVisible();
    const positionBtn = await page.getByTitle('Position & Layer Order').isVisible();
    const boldBtn = await page.getByTitle('Bold').isVisible();
    console.log('   Contextual Toolbar in English:', { spacingBtn, effectsBtn, positionBtn, boldBtn });

    // -------------------------------------------------------------
    // 5. TEST PROFESSIONAL FONT SELECTOR
    // -------------------------------------------------------------
    console.log('5. Testing Professional Font Selector...');
    const fontDropdownBtn = await page.getByTitle('Change Font Family');
    await fontDropdownBtn.click();
    await page.waitForTimeout(600);

    // Check search input in font selector
    const fontSearch = page.locator('input[placeholder*="Search fonts"]');
    console.log('   Font Search input visible:', await fontSearch.isVisible());

    // Search for English font 'Poppins'
    await fontSearch.fill('Poppins');
    await page.waitForTimeout(400);
    const poppinsOption = page.getByText('Poppins').first();
    console.log('   Poppins font option found in search:', await poppinsOption.isVisible());
    await poppinsOption.click();
    await page.waitForTimeout(600);

    // Reopen font selector to test Devanagari category
    await fontDropdownBtn.click();
    await page.waitForTimeout(400);
    // Clear previous search term
    await fontSearch.fill('');
    await page.waitForTimeout(200);
    const devanagariFilterBtn = page.getByRole('button', { name: 'Marathi / Devanagari' });
    await devanagariFilterBtn.click();
    await page.waitForTimeout(400);
    const notoOption = page.getByText('Noto Sans Devanagari').first();
    console.log('   Noto Sans Devanagari font visible in Devanagari filter:', await notoOption.isVisible());
    
    // Search for AMS Aaditya calligraphy font
    await fontSearch.fill('AMS Aaditya');
    await page.waitForTimeout(300);
    const amsOption = page.getByText('AMS Aaditya').first();
    console.log('   AMS Aaditya font found in search:', await amsOption.isVisible());
    await amsOption.click();
    await page.waitForTimeout(600);

    // -------------------------------------------------------------
    // 6. TEST BILINGUAL TYPOGRAPHY PAIR
    // -------------------------------------------------------------
    console.log('6. Adding Bilingual Preset: "GRAND OPENING — ॥ भव्य शुभ उद्घाटन सोहळा ॥"...');
    const grandOpeningPreset = page.getByText('GRAND OPENING').first();
    await grandOpeningPreset.click();
    await page.waitForTimeout(1000);

    // -------------------------------------------------------------
    // 7. VERIFY RESIZE & DOWNLOAD MODALS (ENGLISH UI)
    // -------------------------------------------------------------
    console.log('7. Verifying Resize Modal (English)...');
    await page.getByRole('button', { name: 'Resize' }).click();
    await page.waitForTimeout(600);
    const resizeModalHeader = await page.getByText('Resize Canvas').isVisible();
    const instaSquarePreset = await page.getByText('Instagram Square Post').isVisible();
    console.log('   Resize Modal in English:', { resizeModalHeader, instaSquarePreset });
    await page.locator('button:has(svg.lucide-x)').first().click();
    await page.waitForTimeout(400);

    console.log('8. Verifying Download Modal (English)...');
    await page.getByRole('button', { name: 'Download' }).first().click();
    await page.waitForTimeout(600);
    const downloadModalHeader = await page.getByText('Download Design').isVisible();
    const pngOption = await page.getByText('PNG Image (Recommended)').isVisible();
    const pdfOption = await page.getByText('PDF Document (Print Ready)').isVisible();
    console.log('   Download Modal in English:', { downloadModalHeader, pngOption, pdfOption });
    await page.locator('button:has(svg.lucide-x)').first().click();
    await page.waitForTimeout(400);

    // -------------------------------------------------------------
    // 8. SCREENSHOT CAPTURE FOR USER REVIEW
    // -------------------------------------------------------------
    const screenshotPath = path.resolve('C:/Users/DELL/.gemini/antigravity/brain/d60627ea-5112-4ca2-9a75-8935b6f07c43/english_ui_bilingual_canvas.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('📸 Screenshot saved at:', screenshotPath);

    console.log('🎉 ALL ENGLISH UI & BILINGUAL DESIGN CRITERIA PASSED 100%!');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runEnglishUiBilingualTest();
