import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

async function runFontSuiteVerification() {
  console.log('========================================================================');
  console.log('MARATHI DESIGN STUDIO — COMPREHENSIVE FONT SUITE VERIFICATION');
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

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

  try {
    // -------------------------------------------------------------------------
    // TEST 1: VERIFY TEXT DRAWER FONT COLLECTION (100+ FONTS)
    // -------------------------------------------------------------------------
    console.log('1. Loading Editor at http://localhost:5173/editor ...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    console.log('2. Opening Text Drawer tab...');
    // Click on Text tab in dock (contains 'Text')
    await page.getByRole('button', { name: 'Text' }).click();
    await page.waitForTimeout(800);

    const fontHeadingVisible = await page.getByText('Marathi & Devanagari Fonts').isVisible();
    assert(fontHeadingVisible, 'Text Drawer renders "Marathi & Devanagari Fonts" section heading');

    const previewInputVisible = await page.getByPlaceholder('Type words to preview all fonts...').isVisible();
    assert(previewInputVisible, 'Live sample preview input is present and interactive');

    // Check category pills in Text Drawer
    const amsPill = await page.getByRole('button', { name: 'AMS Calligraphy' }).isVisible();
    const shivajiPill = await page.getByRole('button', { name: 'Shivaji Series' }).isVisible();
    const millenniumPill = await page.getByRole('button', { name: 'Millennium' }).isVisible();
    const dtpPill = await page.getByRole('button', { name: 'Classic DTP' }).isVisible();
    const krutiPill = await page.getByRole('button', { name: 'Kruti Dev' }).isVisible();

    assert(
      amsPill && shivajiPill && millenniumPill && dtpPill && krutiPill,
      'All major font category pills (AMS, Shivaji, Millennium, DTP, Kruti Dev) are present'
    );

    // Filter by AMS Calligraphy
    await page.getByRole('button', { name: 'AMS Calligraphy' }).click();
    await page.waitForTimeout(500);

    const amsAadityaCard = await page.getByText('AMS Aaditya (आदित्य)').isVisible();
    const amsLekhaniCard = await page.getByText('AMS Lekhani (लेखणी)').isVisible();
    assert(amsAadityaCard && amsLekhaniCard, 'AMS Calligraphy category successfully filters to AMS font cards');

    // Click AMS Aaditya card to insert on canvas
    console.log('   Clicking AMS Aaditya card to insert text on canvas...');
    await page.getByText('AMS Aaditya (आदित्य)').click();
    await page.waitForTimeout(1000);

    // Take screenshot of Text Drawer with fonts
    const screenshotDir = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\4146000c-5660-421d-95b0-c2e65ec9e41d';
    await page.screenshot({ path: path.join(screenshotDir, 'text_drawer_font_library.png') });
    console.log('📸 Screenshot saved: text_drawer_font_library.png');

    // -------------------------------------------------------------------------
    // TEST 2: CONTEXTUAL TOOLBAR FONT SELECTOR DROPDOWN
    // -------------------------------------------------------------------------
    console.log('\n3. Testing Contextual Toolbar Font Selector...');
    
    // The active text object should now show the font family button
    const fontButton = page.locator('button[title="Change Font Family"]');
    const fontBtnVisible = await fontButton.isVisible();
    assert(fontBtnVisible, 'Contextual toolbar displays "Change Font Family" selector for active text element');

    // Open font selector dropdown
    await fontButton.click();
    await page.waitForTimeout(600);

    const fontDropdownSearch = await page.getByPlaceholder(/Search 100\+ Marathi & English fonts/i).isVisible();
    assert(fontDropdownSearch, 'Canva-style Font Selector modal opens with 100+ fonts search bar');

    // Search for "Shivaji" in font selector
    await page.getByPlaceholder(/Search 100\+ Marathi & English fonts/i).fill('Shivaji');
    await page.waitForTimeout(500);

    const shivajiUniVisible = await page.getByText('Shivaji Unicode (शिवाजी युनिकोड)').isVisible();
    assert(shivajiUniVisible, 'Font Selector instant search filters to "Shivaji Unicode" typeface');

    // Click Shivaji Unicode to apply
    await page.getByText('Shivaji Unicode (शिवाजी युनिकोड)').click();
    await page.waitForTimeout(800);

    await page.screenshot({ path: path.join(screenshotDir, 'font_selector_dropdown_active.png') });
    console.log('📸 Screenshot saved: font_selector_dropdown_active.png');

    // -------------------------------------------------------------------------
    // TEST 3: BRAND KIT PAGE FONT ROSTER
    // -------------------------------------------------------------------------
    console.log('\n4. Testing Brand Kit Page Font Roster at /brand-kit...');
    await page.goto('http://localhost:5173/brand-kit', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const amsOptgroup = await page.locator('optgroup[label="AMS Marathi Calligraphy"]').count();
    const dtpOptgroup = await page.locator('optgroup[label="Classic DTP (Pankaj, Richa, Varsha, Saroj, Vimal)"]').count();
    assert(amsOptgroup > 0 && dtpOptgroup > 0, 'Brand Kit page includes AMS Calligraphy and Classic DTP optgroups');

    console.log('\n========================================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Font Suite Verification encountered error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runFontSuiteVerification();
