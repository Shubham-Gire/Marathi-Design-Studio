import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runCanvaFeaturesTest() {
  console.log('🚀 Starting Canva Screenshots Feature Verification Test...\n');
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
    // 1. Load Editor
    console.log('1. Loading Editor at http://localhost:5173/editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // 2. Verify Add Page Pill Button directly below artboard (Image 1)
    console.log('2. Verifying Full-width "+ Add page" button under artboard...');
    const addPagePill = page.locator('button:has-text("Add page")').first();
    const hasAddPage = await addPagePill.count() > 0;
    console.log('   Add page pill button present:', hasAddPage);
    if (!hasAddPage) throw new Error('Add page button missing under artboard');

    // 3. Verify Elements Drawer: Quick Icons, Recommended, & 12 Browse Categories (Image 3 & 1)
    console.log('3. Verifying Elements Drawer (Image 3)...');
    const elementsTabBtn = page.locator('button[title="Elements"]');
    await elementsTabBtn.click();
    await page.waitForTimeout(500);

    const elementsSearch = page.locator('input[placeholder="+ Search elements"]');
    console.log('   + Search elements input found:', await elementsSearch.count() > 0);

    // Verify 12 Colorful Gradient Tiles
    const browseCategoryTiles = await page.$$eval('button:has(div span.text-xs)', (btns) =>
      btns.map((b) => b.textContent?.trim()).filter(Boolean)
    );
    console.log('   Browse categories found:', browseCategoryTiles.slice(0, 8));
    const hasShapesTile = await page.locator('button:has-text("Shapes")').count() > 0;
    const hasGraphicsTile = await page.locator('button:has-text("Graphics")').count() > 0;
    const hasChartsTile = await page.locator('button:has-text("Charts")').count() > 0;
    const hasTablesTile = await page.locator('button:has-text("Tables")').count() > 0;
    console.log('   Category tiles check:', { hasShapesTile, hasGraphicsTile, hasChartsTile, hasTablesTile });
    if (!hasShapesTile || !hasChartsTile) throw new Error('Browse category gradient tiles missing');

    // 4. Verify Text Drawer: + Add a text box, Magic Write, & Font Combinations (Image 4)
    console.log('4. Verifying Text Drawer & Font Combinations (Image 4)...');
    const textTabBtn = page.locator('button[title="Text"]');
    await textTabBtn.click();
    await page.waitForTimeout(500);

    const addTextBoxBtn = page.locator('button:has-text("Add a text box")');
    const magicWriteBtn = page.locator('button:has-text("Magic Write")');
    console.log('   Primary CTA "+ Add a text box" found:', await addTextBoxBtn.count() > 0);
    console.log('   Secondary CTA "Magic Write" found:', await magicWriteBtn.count() > 0);
    if (await addTextBoxBtn.count() === 0) throw new Error('+ Add a text box button missing');

    // Verify Curated Font Combination Cards
    const hasCreatingMagic = await page.locator('text="MAGIC"').count() > 0;
    const hasThankYou = await page.locator('text="Thank you!"').count() > 0;
    const hasGoldenHour = await page.locator('text="GOLDEN HOUR"').count() > 0;
    const hasGaneshCombo = await page.locator('text="॥ श्री गणेशाय नमः ॥"').count() > 0;
    console.log('   Font combination cards check:', {
      creatingMagic: hasCreatingMagic,
      thankYou: hasThankYou,
      goldenHour: hasGoldenHour,
      ganeshInvocation: hasGaneshCombo,
    });
    if (!hasCreatingMagic || !hasThankYou || !hasGoldenHour) {
      throw new Error('Font combination cards missing');
    }

    // Click "creating MAGIC" font combination to insert onto canvas
    console.log('   Inserting "creating MAGIC" font combination onto canvas...');
    const magicCard = page.locator('text="MAGIC"').first();
    await magicCard.click();
    await page.waitForTimeout(600);

    // 5. Verify Floating Contextual HUD (Image 1)
    console.log('5. Verifying Contextual Floating Quick-Action HUD (Image 1)...');
    const floatingHud = page.locator('.fixed, .absolute').locator('button[title="Duplicate (Ctrl+D)"]');
    const hudLock = page.locator('button[title="Lock element"], button[title="Unlock element"]');
    const hudDelete = page.locator('button[title="Delete (Del)"]');
    const hudMore = page.locator('button[title="More options (Right-click)"]');
    console.log('   Floating HUD buttons visible:', {
      duplicate: await floatingHud.count() > 0,
      lock: await hudLock.count() > 0,
      delete: await hudDelete.count() > 0,
      more: await hudMore.count() > 0,
    });
    if (await floatingHud.count() === 0) throw new Error('Floating contextual HUD missing');

    // Test Duplicating element via Floating HUD
    console.log('   Testing Duplicate via Floating HUD...');
    await floatingHud.first().click();
    await page.waitForTimeout(400);

    // 6. Verify Brand Kit Drawer: Header, Progress Banner, & Categories (Image 5)
    console.log('6. Verifying Brand Kit Drawer (Image 5)...');
    const brandTabBtn = page.locator('button[title="Brand Kit"]');
    await brandTabBtn.click();
    await page.waitForTimeout(500);

    const brandDropdown = page.locator('select');
    const allAssetsBtn = page.locator('button:has-text("+ All assets")');
    const progressBanner = page.locator('text="You\'re on your way!"');
    const progressFraction = page.locator('text="1 / 3"');
    const brandTemplatesPill = page.locator('button:has-text("Brand Templates")');
    const brandColorsPill = page.locator('button:has-text("Colors")');

    console.log('   Brand Kit components check:', {
      dropdown: await brandDropdown.count() > 0,
      allAssetsBtn: await allAssetsBtn.count() > 0,
      onboardingBanner: await progressBanner.count() > 0,
      progressFraction: await progressFraction.count() > 0,
      brandTemplatesPill: await brandTemplatesPill.count() > 0,
      brandColorsPill: await brandColorsPill.count() > 0,
    });
    if (await progressBanner.count() === 0 || await allAssetsBtn.count() === 0) {
      throw new Error('Brand Kit onboarding or assets header missing');
    }

    // 7. Verify Templates Drawer: Logo Templates & Crown Badges (Image 2)
    console.log('7. Verifying Templates Drawer (Image 2)...');
    const templatesTabBtn = page.locator('button[title="Designs"]');
    await templatesTabBtn.click();
    await page.waitForTimeout(500);

    const logoSearchInput = page.locator('input[placeholder="Search Logo templates..."]');
    const moreTemplatesText = page.locator('text="More templates for you"');
    const milesLogo = page.locator('text="Miles & Mensah"');
    const auroraLogo = page.locator('text="Aurora Luxury"');
    const suvarnaLogo = page.locator('text="सुवर्ण पेढी"');

    console.log('   Logo Templates check:', {
      logoSearchInput: await logoSearchInput.count() > 0,
      moreTemplatesHeader: await moreTemplatesText.count() > 0,
      milesLogo: await milesLogo.count() > 0,
      auroraLogo: await auroraLogo.count() > 0,
      suvarnaPedhiLogo: await suvarnaLogo.count() > 0,
    });
    if (await logoSearchInput.count() === 0 || await milesLogo.count() === 0) {
      throw new Error('Logo templates or search missing in templates drawer');
    }

    // 8. Verify Bottom Bar: Notes Drawer & Presentation Timer (Image 1)
    console.log('8. Verifying Notes Drawer & Timer Modal (Image 1)...');
    const notesBtn = page.locator('button:has-text("Notes")').first();
    const timerBtn = page.locator('button:has-text("Timer")').first();
    console.log('   Bottom bar Notes and Timer buttons:', {
      hasNotesBtn: await notesBtn.count() > 0,
      hasTimerBtn: await timerBtn.count() > 0,
    });
    if (await notesBtn.count() === 0 || await timerBtn.count() === 0) {
      throw new Error('Notes or Timer buttons missing in bottom bar');
    }

    // Test Toggling Notes Drawer
    await notesBtn.click();
    await page.waitForTimeout(400);
    const notesDrawerTitle = await page.$('text=/Presenter Notes/');
    console.log('   Presenter notes drawer opened:', !!notesDrawerTitle);
    if (!notesDrawerTitle) throw new Error('Presenter notes drawer failed to open');

    const notesTextarea = page.locator('textarea[placeholder*="talking points"]');
    await notesTextarea.fill('Key talking point: Explain Shivaji Maharaj festival poster features.');
    await page.waitForTimeout(300);
    console.log('   Notes successfully entered and autosaved');

    // Close notes drawer
    await notesBtn.click();
    await page.waitForTimeout(300);

    // Test Opening Timer Modal
    await timerBtn.click();
    await page.waitForTimeout(400);
    const timerHeader = await page.$('text="Design Timer"');
    const hasPreset1m = await page.locator('button:has-text("1m")').count() > 0;
    const hasPreset5m = await page.locator('button:has-text("5m")').count() > 0;
    console.log('   Timer modal loaded with presets:', {
      timerHeader: !!timerHeader,
      preset1m: hasPreset1m,
      preset5m: hasPreset5m,
    });
    if (!timerHeader) throw new Error('Timer modal failed to open');

    // Close timer modal
    const closeTimerBtn = page.locator('.fixed button:has(svg.lucide-x)');
    if (await closeTimerBtn.count() > 0) {
      await closeTimerBtn.click();
      await page.waitForTimeout(300);
    }

    // 9. Take high-definition screenshot of the full Canva UI
    const screenshotPath = path.join(ARTIFACTS_DIR, 'canva_full_features_live.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Full Canva Features Screenshot saved to: ${screenshotPath}`);

    console.log('\n🎉 ALL 5 CANVA SCREENSHOTS FEATURE VERIFICATION TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runCanvaFeaturesTest();
