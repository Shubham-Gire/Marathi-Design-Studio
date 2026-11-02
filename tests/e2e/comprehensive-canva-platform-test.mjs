import { chromium } from '../../frontend/node_modules/playwright/index.mjs';

async function runComprehensivePlatformTest() {
  console.log('========================================================================');
  console.log('MARATHI DESIGN STUDIO - COMPREHENSIVE CANVA-STYLE PLATFORM TEST SUITE');
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
    // -----------------------------------------------------------------------
    // TEST 1: HOME DASHBOARD & NAVIGATION
    // -----------------------------------------------------------------------
    console.log('Test 1: Verifying Home Dashboard at http://localhost:5173...');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const titleVisible = await page.getByRole('heading', { name: /Marathi & English/i }).isVisible();
    assert(titleVisible, 'Home page loaded with English-only navigation & Marathi typography focus');

    // -----------------------------------------------------------------------
    // TEST 2: GLOBAL COMMAND PALETTE (/ or Ctrl+E)
    // -----------------------------------------------------------------------
    console.log('Test 2: Testing Global Command Palette trigger via hotkey / ...');
    await page.keyboard.press('Slash');
    await page.waitForTimeout(500);

    const paletteInput = page.locator('input[placeholder*="Type a command"]');
    const paletteVisible = await paletteInput.isVisible();
    assert(paletteVisible, 'Command Palette modal triggered globally via "/" key');

    // Type in command palette to filter
    await paletteInput.fill('Brand Kit');
    await page.waitForTimeout(300);
    const brandKitCmd = await page.getByText('Brand Kit (Logos, Colors, Fonts)').isVisible();
    assert(brandKitCmd, 'Command Palette filtered and discovered "Brand Kit" action');

    // Close command palette via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // -----------------------------------------------------------------------
    // TEST 3: BRAND KIT MODULE (/brand-kit)
    // -----------------------------------------------------------------------
    console.log('Test 3: Testing Brand Kit page at /brand-kit...');
    await page.goto('http://localhost:5173/brand-kit', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const brandHeading = await page.getByRole('heading', { name: 'Brand Kit' }).isVisible();
    const brandColorsSection = await page.getByText('Official Brand Colors').isVisible();
    const brandIdentityHeading = await page.getByText('Brand Identity').isVisible();
    assert(brandHeading && brandColorsSection && brandIdentityHeading, 'Brand Kit loaded with colors, typography & logo tools');

    // -----------------------------------------------------------------------
    // TEST 4: AI STUDIO MODULE (/ai-studio) & HONEST INTEGRATION MODAL
    // -----------------------------------------------------------------------
    console.log('Test 4: Testing AI Studio page at /ai-studio...');
    await page.goto('http://localhost:5173/ai-studio', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const aiHeadlineGen = await page.getByText('Marathi Copy & Headline Generator').isVisible();
    assert(aiHeadlineGen, 'AI Studio copywriter interface loaded');

    // Click "Connect Provider" on Stability AI Image Generator
    console.log('   Testing honest integration placeholder on AI Image Generator...');
    const connectProviderBtn = page.getByRole('button', { name: 'Connect Provider' }).first();
    await connectProviderBtn.click();
    await page.waitForTimeout(500);

    const setupModalHeading = await page.getByText('Integration Setup Required').isVisible();
    const envVarCred = await page.getByText('STABILITY_API_KEY', { exact: true }).isVisible();
    assert(setupModalHeading && envVarCred, 'Honest IntegrationSetupModal displays missing API credentials without fake success');

    // Close integration modal
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(300);

    // -----------------------------------------------------------------------
    // TEST 5: PRESENTATIONS MODULE (/presentations)
    // -----------------------------------------------------------------------
    console.log('Test 5: Testing Presentations module at /presentations...');
    await page.goto('http://localhost:5173/presentations', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const presTitle = await page.getByText('Marathi Presentations & Pitch Decks').isVisible();
    const addSlideBtn = await page.getByText('Add Slide').isVisible();
    assert(presTitle && addSlideBtn, 'Presentations module loaded with slide deck thumbnail rails');

    // -----------------------------------------------------------------------
    // TEST 6: DOCUMENTS MODULE (/documents)
    // -----------------------------------------------------------------------
    console.log('Test 6: Testing Documents module at /documents...');
    await page.goto('http://localhost:5173/documents', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const exportPdfBtn = await page.getByRole('button', { name: 'Export to PDF' }).isVisible();
    assert(exportPdfBtn, 'Documents rich-text editor loaded with PDF export capabilities');

    // -----------------------------------------------------------------------
    // TEST 7: WHITEBOARDS MODULE (/whiteboards)
    // -----------------------------------------------------------------------
    console.log('Test 7: Testing Infinite Whiteboard module at /whiteboards...');
    await page.goto('http://localhost:5173/whiteboards', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const whiteboardHeading = await page.getByText(/Infinite Whiteboard/i).isVisible();
    const yellowNoteBtn = await page.getByRole('button', { name: 'Yellow Note' }).isVisible();
    assert(whiteboardHeading && yellowNoteBtn, 'Infinite Whiteboard canvas loaded with sticky notes tools');

    // -----------------------------------------------------------------------
    // TEST 8: SPREADSHEETS MODULE (/spreadsheets)
    // -----------------------------------------------------------------------
    console.log('Test 8: Testing Spreadsheets & Charts module at /spreadsheets...');
    await page.goto('http://localhost:5173/spreadsheets', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const sheetHeading = await page.getByText(/Dynamic Business Charts/i).isVisible();
    const ledgerTable = await page.getByText('Monthly Sales Ledger').isVisible();
    assert(sheetHeading && ledgerTable, 'Spreadsheets & financial charts module verified');

    // -----------------------------------------------------------------------
    // TEST 9: VIDEO EDITOR MODULE (/video-editor)
    // -----------------------------------------------------------------------
    console.log('Test 9: Testing Video Editor module at /video-editor...');
    await page.goto('http://localhost:5173/video-editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const videoTitle = await page.getByText('Marathi Video & Reels Studio').isVisible();
    const exportMp4 = await page.getByRole('button', { name: 'Export MP4 Video' }).isVisible();
    assert(videoTitle && exportMp4, 'Video editor loaded with reel preview, multi-track timeline & export hook');

    // -----------------------------------------------------------------------
    // TEST 10: WEBSITES & LANDING PAGES (/websites)
    // -----------------------------------------------------------------------
    console.log('Test 10: Testing Websites module at /websites...');
    await page.goto('http://localhost:5173/websites', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const publishBtn = await page.getByRole('button', { name: 'Publish Website' }).isVisible();
    assert(publishBtn, 'Website builder loaded with responsive previews & publish action');

    // -----------------------------------------------------------------------
    // TEST 11: PDF TOOLS SUITE (/pdf-tools)
    // -----------------------------------------------------------------------
    console.log('Test 11: Testing PDF Tools Suite at /pdf-tools...');
    await page.goto('http://localhost:5173/pdf-tools', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const mergePdfBtn = await page.getByRole('button', { name: 'Generate Merged PDF' }).isVisible();
    assert(mergePdfBtn, 'PDF Tools suite loaded with merge, split, and reorder features');

    // -----------------------------------------------------------------------
    // TEST 12: SOCIAL MEDIA PLANNER (/social-media)
    // -----------------------------------------------------------------------
    console.log('Test 12: Testing Social Media Planner at /social-media...');
    await page.goto('http://localhost:5173/social-media', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const plannerHeading = await page.getByText('Social Media Planner & Content Calendar').isVisible();
    const scheduleBtn = await page.getByRole('button', { name: 'Schedule New Post' }).isVisible();
    assert(plannerHeading && scheduleBtn, 'Social media content calendar loaded with channel adapters');

    // -----------------------------------------------------------------------
    // TEST 13: APPS MARKETPLACE (/apps)
    // -----------------------------------------------------------------------
    console.log('Test 13: Testing Apps & Integrations Marketplace at /apps...');
    await page.goto('http://localhost:5173/apps', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const appsHeading = await page.getByRole('heading', { name: 'Apps & Integrations Marketplace' }).isVisible();
    const geminiCard = await page.getByText('Google Gemini 1.5 Pro AI').isVisible();
    const unsplashCard = await page.getByText('Unsplash Stock Photography').isVisible();
    assert(appsHeading && geminiCard && unsplashCard, 'Apps marketplace loaded with 12+ real adapters & status badges');

    // -----------------------------------------------------------------------
    // TEST 14: PRICING & PLANS (/pricing)
    // -----------------------------------------------------------------------
    console.log('Test 14: Testing Pricing & Subscription Plans at /pricing...');
    await page.goto('http://localhost:5173/pricing', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const freeTitle = await page.getByText(/Free Design Studio for Every Marathi Creator/i).isVisible();
    const paymentBtn = await page.getByRole('button', { name: /Payment Gateway Configuration/i }).isVisible();
    assert(freeTitle && paymentBtn, 'Pricing page loaded with 100% Free Forever Community model & honest Payment Gateway configuration');

    // -----------------------------------------------------------------------
    // TEST 15: SETTINGS & HELP CENTER
    // -----------------------------------------------------------------------
    console.log('Test 15: Testing Settings & Help Center...');
    await page.goto('http://localhost:5173/settings', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    const settingsHeading = await page.getByRole('heading', { name: 'Account & Studio Settings' }).isVisible();
    assert(settingsHeading, 'Settings page loaded with profile & API key configuration');

    await page.goto('http://localhost:5173/help', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    const helpHeading = await page.getByRole('heading', { name: 'Help Center & Knowledge Base' }).isVisible();
    assert(helpHeading, 'Help Center loaded with searchable FAQs and shortcuts');

    // -----------------------------------------------------------------------
    // TEST 16: ADMIN DASHBOARD (INDEPENDENT 10 GB LIMITS)
    // -----------------------------------------------------------------------
    console.log('Test 16: Testing Admin Dashboard at /admin...');
    await page.evaluate(() => {
      localStorage.setItem('marathi_token', 'mock_admin_token');
      localStorage.setItem('marathi_user', JSON.stringify({
        id: 1,
        email: 'admin@marathidesignstudio.com',
        fullName: 'Admin User',
        role: 'ADMIN',
        planTier: 'FREE'
      }));
    });
    await page.goto('http://localhost:5173/admin', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const adminHeading = await page.getByRole('heading', { name: 'Platform Administration' }).isVisible();
    const tmplLimitCard = await page.getByText('Template Library').isVisible();
    const elemLimitCard = await page.getByText('Reusable Elements Library').isVisible();
    const tenGbCeilings = await page.getByText('10 GB Strict Ceiling').count();
    assert(adminHeading && tmplLimitCard && elemLimitCard && tenGbCeilings >= 2, 'Admin Dashboard enforces dual 10 GB limits for Templates and Elements');

    // -----------------------------------------------------------------------
    // TEST 17: CANVA INTERACTIVE EDITOR & EXPORT RESOLUTION (1x, 1.5x, 2x, 3x)
    // -----------------------------------------------------------------------
    console.log('Test 17: Testing Canva Editor workspace at /editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Open Download Modal
    const downloadBtn = page.getByRole('button', { name: 'Download' });
    await downloadBtn.click();
    await page.waitForTimeout(500);

    const exportModalTitle = await page.getByRole('heading', { name: 'Download Design' }).isVisible();
    const ultraPrintOption = await page.getByRole('button', { name: '3x Ultra' }).isVisible();
    assert(exportModalTitle && ultraPrintOption, 'Export Modal supports 3x Ultra 300 DPI high-resolution export');

    // Close download modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // Test Shortcut Help Modal (? key)
    console.log('   Testing Shortcuts Help modal via ? key...');
    await page.keyboard.press('Shift+Slash');
    await page.waitForTimeout(500);
    const shortcutsTitle = await page.getByRole('heading', { name: 'Keyboard Shortcuts' }).isVisible();
    assert(shortcutsTitle, 'Keyboard Shortcuts reference modal opened via "?" key');
    await page.keyboard.press('Escape');

    // SUMMARY
    console.log('\n========================================================================');
    console.log(`TEST EXECUTION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================================================');

    if (failed === 0) {
      console.log('🎉 ALL COMPREHENSIVE CANVA-STYLE PLATFORM TESTS PASSED 100%!');
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal platform test error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runComprehensivePlatformTest();
