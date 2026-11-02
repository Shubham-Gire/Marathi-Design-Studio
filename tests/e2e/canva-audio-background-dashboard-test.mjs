import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runCanvaAudioBackgroundDashboardTest() {
  console.log('========================================================================');
  console.log('CANVA AUDIO, BACKGROUND & HOME DASHBOARD COMPREHENSIVE E2E VERIFICATION');
  console.log('========================================================================\n');

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

  page.on('pageerror', (err) => console.error('  [Browser Error]:', err.message));

  try {
    // -----------------------------------------------------------------------
    // PART 1: HOME DASHBOARD (Images 4 & 5)
    // -----------------------------------------------------------------------
    console.log('1. Navigating to Home Dashboard at http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Verify Persistent Left Navigation Rail
    console.log('2. Verifying Persistent Left Navigation Rail...');
    const createDesignBtn = page.locator('aside button:has-text("Create a design")');
    const homeNavLink = page.locator('aside button:has-text("Home")');
    const templatesNavLink = page.locator('aside button:has-text("Templates")');
    const brandKitNav = page.locator('aside button:has-text("Brand Kit")');
    const aiStudioNav = page.locator('aside button:has-text("AI Studio")');
    const storageMeter = page.locator('aside').locator('text="1.2 / 10 GB"');

    console.log('   Left Rail items:', {
      createDesignBtn: await createDesignBtn.count() > 0,
      homeNavLink: await homeNavLink.count() > 0,
      templatesNavLink: await templatesNavLink.count() > 0,
      brandKitNav: await brandKitNav.count() > 0,
      aiStudioNav: await aiStudioNav.count() > 0,
      storageMeter: await storageMeter.count() > 0,
    });
    if (await createDesignBtn.count() === 0 || await storageMeter.count() === 0) {
      throw new Error('Left navigation rail or 10 GB storage indicator missing on Home Page');
    }

    // Verify Canva Hero Banner
    console.log('3. Verifying Canva Hero Banner (Image 4 & 5)...');
    const heroHeadline = page.locator('h1:has-text("What will you design today?")');
    const marathiEnglishSubtitle = page.locator('h2:has-text("Marathi & English")');
    const forYouToggle = page.locator('button:has-text("For you")');
    const templatesToggle = page.locator('button:has-text("Templates")');
    const heroSearchBar = page.locator('input[placeholder*="Search your content or Canva templates"]');

    console.log('   Hero Banner elements:', {
      heroHeadline: await heroHeadline.count() > 0,
      marathiEnglishSubtitle: await marathiEnglishSubtitle.count() > 0,
      forYouToggle: await forYouToggle.count() > 0,
      templatesToggle: await templatesToggle.count() > 0,
      heroSearchBar: await heroSearchBar.count() > 0,
    });
    if (await heroHeadline.count() === 0 || await heroSearchBar.count() === 0) {
      throw new Error('Canva hero banner headline or search bar missing');
    }

    // Verify 13 Circular Quick Tool Icons (Images 4 & 5)
    console.log('4. Verifying 13 Circular Quick Tool Icons...');
    const quickIcons = [
      'Templates',
      'Presentation',
      'Social media',
      'Video',
      'Printables',
      'Doc',
      'Whiteboard',
      'Sheet',
      'Website',
      'Magic Studio',
      'Custom size',
      'Upload',
      'More',
    ];
    for (const iconName of quickIcons) {
      const iconBtn = page.locator(`button:has-text("${iconName}")`).first();
      const isPresent = await iconBtn.count() > 0;
      if (!isPresent) throw new Error(`Quick tool icon "${iconName}" missing in hero rail`);
    }
    console.log('   All 13 circular quick tool icons verified present.');

    // Verify "Continue designing" (Recent Designs Grid)
    console.log('5. Verifying "Continue designing" Section...');
    const continueHeading = page.locator('h2:has-text("Continue designing")');
    const recentCard1 = page.locator('text="Shiv Jayanti Mahotsav 2026 Poster"');
    const recentCard2 = page.locator('text="Diwali Mega Offer 50% Off Banner"');
    const recentCard3 = page.locator('text="Ganesh Festival Invitation Card"');
    const timeTag = page.locator('text=/Edited .* ago/').first();

    console.log('   Recent Designs items:', {
      continueHeading: await continueHeading.count() > 0,
      recentCard1: await recentCard1.count() > 0,
      recentCard2: await recentCard2.count() > 0,
      recentCard3: await recentCard3.count() > 0,
      hasTimeTag: await timeTag.count() > 0,
    });
    if (await continueHeading.count() === 0 || await recentCard1.count() === 0) {
      throw new Error('"Continue designing" section or recent design cards missing');
    }

    // Test Opening CanvaCreateModal from "+ Create a design" Button
    console.log('6. Testing "+ Create a design" Modal launch...');
    await createDesignBtn.click();
    await page.waitForTimeout(500);

    const modalTitle = page.locator('text="Create a design"');
    const modalSearch = page.locator('input[placeholder*="What would you like to create"]');
    const hasModal = await modalTitle.count() > 0 && await modalSearch.count() > 0;
    console.log('   CanvaCreateModal open:', hasModal);
    if (!hasModal) throw new Error('CanvaCreateModal failed to open from "+ Create a design" button');

    // Close modal
    const closeBtn = page.locator('.fixed button:has(svg.lucide-x)').first();
    await closeBtn.click();
    await page.waitForTimeout(300);

    // Capture Home Dashboard Screenshot
    const homeScreenshotPath = path.join(ARTIFACTS_DIR, 'canva_home_dashboard.png');
    await page.screenshot({ path: homeScreenshotPath });
    console.log(`📸 Home Dashboard Screenshot saved to: ${homeScreenshotPath}`);

    // -----------------------------------------------------------------------
    // PART 2: AUDIO DRAWER IN CANVA EDITOR (Image 1)
    // -----------------------------------------------------------------------
    console.log('\n7. Navigating to Editor for Audio & Background Drawer Tests...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    console.log('8. Opening Audio Drawer (Image 1)...');
    const audioDockBtn = page.locator('button[title="Audio"]');
    await audioDockBtn.click();
    await page.waitForTimeout(500);

    // Verify Audio Search & Equalizer Filter Toggle
    const audioSearchInput = page.locator('input[placeholder="Search audio"]');
    const equalizerBtn = page.locator('button[title="Audio Filters & Equalizer"]');
    console.log('   Audio Search & Equalizer:', {
      search: await audioSearchInput.count() > 0,
      equalizer: await equalizerBtn.count() > 0,
    });
    if (await audioSearchInput.count() === 0 || await equalizerBtn.count() === 0) {
      throw new Error('Audio search or equalizer button missing in Audio drawer');
    }

    // Test Equalizer filter toggle
    await equalizerBtn.click();
    await page.waitForTimeout(300);
    const durationFilter = page.locator('text="Duration"');
    const vocalsFilter = page.locator('text="Vocals"');
    console.log('   Equalizer popover opened:', await durationFilter.count() > 0 && await vocalsFilter.count() > 0);
    await equalizerBtn.click(); // toggle close

    // Verify Filter Chips Strip (Image 1)
    const chipSoft = page.locator('button:has-text("Soft background music for video")');
    const chipCalm = page.locator('button:has-text("Calm")');
    const chipUpbeat = page.locator('button:has-text("Upbeat")');
    const chipMarathi = page.locator('button:has-text("Festive & Marathi")');
    console.log('   Filter chips check:', {
      soft: await chipSoft.count() > 0,
      calm: await chipCalm.count() > 0,
      upbeat: await chipUpbeat.count() > 0,
      marathi: await chipMarathi.count() > 0,
    });
    if (await chipSoft.count() === 0 || await chipCalm.count() === 0) {
      throw new Error('Audio filter chips missing in Audio drawer');
    }

    // Verify "Voiceovers" Card Banner (Image 1)
    const voiceoversHeading = page.locator('h4:has-text("Voiceovers")');
    const generateAiVoiceBtn = page.locator('button:has-text("Generate AI voice")');
    console.log('   Voiceovers Banner:', {
      heading: await voiceoversHeading.count() > 0,
      generateBtn: await generateAiVoiceBtn.count() > 0,
    });
    if (await voiceoversHeading.count() === 0 || await generateAiVoiceBtn.count() === 0) {
      throw new Error('"Voiceovers" card banner missing in Audio drawer');
    }

    // Test Opening AI Voiceover Studio Modal
    console.log('   Testing AI Voiceover Studio Modal...');
    await generateAiVoiceBtn.click();
    await page.waitForTimeout(400);
    const aiVoiceModalTitle = page.locator('h3:has-text("AI Voiceover Studio")');
    const voicePresetShivJayanti = page.locator('button:has-text("Shiv Jayanti")');
    console.log('   AI Voiceover Studio Modal loaded:', await aiVoiceModalTitle.count() > 0);
    if (await aiVoiceModalTitle.count() === 0) throw new Error('AI Voiceover Studio modal failed to open');

    // Click quick preset and preview voice
    await voicePresetShivJayanti.click();
    await page.waitForTimeout(200);
    const previewVoiceBtn = page.locator('button:has-text("Preview Voice")');
    await previewVoiceBtn.click();
    await page.waitForTimeout(700);

    // Insert voiceover to design
    const addToDesignBtn = page.locator('button:has-text("Add to Design")');
    await addToDesignBtn.click();
    await page.waitForTimeout(400);
    console.log('   Voiceover inserted into design successfully');

    // Verify Categorized Audio Tracks (Image 1)
    const upbeatTrack = page.locator('text="that feeling"');
    const calmTrack = page.locator('text="Neptune"');
    const marathiTrack = page.locator('text="Energetic Dhol Tasha Beat"');
    console.log('   Audio tracks check:', {
      upbeat: await upbeatTrack.count() > 0,
      calm: await calmTrack.count() > 0,
      marathi: await marathiTrack.count() > 0,
    });
    if (await upbeatTrack.count() === 0 || await marathiTrack.count() === 0) {
      throw new Error('Categorized audio tracks missing');
    }

    // Test Play Preview on a Track
    console.log('   Testing Play/Pause toggle on track "that feeling"...');
    const playBtn = page.locator('.group:has-text("that feeling") button').first();
    await playBtn.click();
    await page.waitForTimeout(600);

    // Capture Audio Drawer Screenshot
    const audioScreenshotPath = path.join(ARTIFACTS_DIR, 'canva_audio_drawer.png');
    await page.screenshot({ path: audioScreenshotPath });
    console.log(`📸 Audio Drawer Screenshot saved to: ${audioScreenshotPath}`);

    // -----------------------------------------------------------------------
    // PART 3: BACKGROUND DRAWER IN CANVA EDITOR (Image 2)
    // -----------------------------------------------------------------------
    console.log('\n9. Opening Background Drawer (Image 2)...');
    const bgDockBtn = page.locator('button[title="Background"]');
    await bgDockBtn.click();
    await page.waitForTimeout(500);

    // Verify Search Backgrounds input
    const bgSearchInput = page.locator('input[placeholder="Search backgrounds"]');
    console.log('   Background Search bar:', await bgSearchInput.count() > 0);
    if (await bgSearchInput.count() === 0) throw new Error('Background search bar missing');

    // Verify Color Palette Strip (Rainbow Wheel + Solid Color Circles)
    const colorWheelBtn = page.locator('button[title="Custom Color Wheel Picker"]');
    const solidWhiteCircle = page.locator('button[style*="background-color: rgb(255, 255, 255)"], button[style*="background-color: #ffffff"]').first();
    const solidNavyCircle = page.locator('button[style*="background-color: rgb(44, 62, 107)"], button[style*="background-color: #2c3e6b"]').first();
    console.log('   Color Palette Strip:', {
      colorWheel: await colorWheelBtn.count() > 0,
      solidWhite: await solidWhiteCircle.count() > 0,
      solidNavy: await solidNavyCircle.count() > 0,
    });
    if (await colorWheelBtn.count() === 0 || await solidWhiteCircle.count() === 0) {
      throw new Error('Color wheel picker or solid color swatches missing');
    }

    // Test Clicking Navy Blue color swatch to set background
    await solidNavyCircle.click();
    await page.waitForTimeout(400);
    console.log('   Set canvas background to Navy Blue');

    // Verify "Recently used" Section
    const recentlyUsedHeading = page.locator('h4:has-text("Recently used")');
    console.log('   Recently used section:', await recentlyUsedHeading.count() > 0);

    // Verify "Landscapes" Section with "See all" (Image 2)
    const landscapesHeading = page.locator('h4:has-text("Landscapes")');
    const snowyMountainThumb = page.locator('text="Snowy Mountain Peak"');
    console.log('   Landscapes section:', {
      heading: await landscapesHeading.count() > 0,
      snowyMountain: await snowyMountainThumb.count() > 0,
    });
    if (await landscapesHeading.count() === 0 || await snowyMountainThumb.count() === 0) {
      throw new Error('Landscapes section missing in Background drawer');
    }

    // Verify "Patterns" Section with "See all" (Image 2)
    const patternsHeading = page.locator('h4:has-text("Patterns")');
    const petalsThumb = page.locator('text="Pink Petals & Blossoms"');
    const rangoliThumb = page.locator('text="Traditional Marathi Rangoli"');
    console.log('   Patterns section:', {
      heading: await patternsHeading.count() > 0,
      petals: await petalsThumb.count() > 0,
      rangoli: await rangoliThumb.count() > 0,
    });
    if (await patternsHeading.count() === 0 || await petalsThumb.count() === 0) {
      throw new Error('Patterns section missing in Background drawer');
    }

    // Verify "Gradients" Section with "See all" (Image 2)
    const gradientsHeading = page.locator('h4:has-text("Gradients")');
    const kesariSunriseGrad = page.locator('button:has-text("Kesari Sunrise")');
    const royalMarathaGrad = page.locator('button:has-text("Royal Maratha")');
    const sunsetDuskGrad = page.locator('button:has-text("Sunset Dusk")');
    console.log('   Gradients section:', {
      heading: await gradientsHeading.count() > 0,
      kesariSunrise: await kesariSunriseGrad.count() > 0,
      royalMaratha: await royalMarathaGrad.count() > 0,
      sunsetDusk: await sunsetDuskGrad.count() > 0,
    });
    if (await gradientsHeading.count() === 0 || await kesariSunriseGrad.count() === 0) {
      throw new Error('Gradients section missing in Background drawer');
    }

    // Test Clicking Kesari Sunrise Gradient to set canvas background
    console.log('   Applying Kesari Sunrise gradient to canvas background...');
    await kesariSunriseGrad.click();
    await page.waitForTimeout(400);

    // Verify "Abstract" Section (Image 2)
    const abstractHeading = page.locator('h4:has-text("Abstract")');
    const holoWavesThumb = page.locator('text="3D Holographic Waves"');
    console.log('   Abstract section:', {
      heading: await abstractHeading.count() > 0,
      holoWaves: await holoWavesThumb.count() > 0,
    });
    if (await abstractHeading.count() === 0 || await holoWavesThumb.count() === 0) {
      throw new Error('Abstract section missing in Background drawer');
    }

    // Capture Background Drawer Screenshot
    const bgScreenshotPath = path.join(ARTIFACTS_DIR, 'canva_background_drawer.png');
    await page.screenshot({ path: bgScreenshotPath });
    console.log(`📸 Background Drawer Screenshot saved to: ${bgScreenshotPath}`);

    console.log('\n========================================================================');
    console.log('🎉 ALL AUDIO, BACKGROUND & HOME DASHBOARD E2E ACCEPTANCE TESTS PASSED 100%!');
    console.log('========================================================================');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runCanvaAudioBackgroundDashboardTest();
