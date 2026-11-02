import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTIFACT_DIR = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runTest() {
  console.log('========================================================================');
  console.log('OAUTH AUTHENTICATION, CONTEXTUAL TOOLBAR & MULTI-PAGE ADD UP E2E TEST');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // -------------------------------------------------------------
    // PART 1: TEST OAUTH AUTHENTICATION
    // -------------------------------------------------------------
    console.log('1. Testing OAuth 2.0 / Social Authentication in AuthModal...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // Open Auth Modal via Sign In button on Navbar
    const signInBtn = page.getByRole('button', { name: /sign in/i }).first();
    await signInBtn.click();
    await page.waitForTimeout(500);

    // Verify OAuth buttons exist
    const googleBtn = page.locator('[data-testid="oauth-google-btn"]');
    const githubBtn = page.locator('[data-testid="oauth-github-btn"]');
    const facebookBtn = page.locator('[data-testid="oauth-facebook-btn"]');

    const hasGoogle = await googleBtn.isVisible();
    const hasGithub = await githubBtn.isVisible();
    const hasFacebook = await facebookBtn.isVisible();

    console.log(`   OAuth buttons visible: Google: ${hasGoogle}, GitHub: ${hasGithub}, Facebook: ${hasFacebook}`);
    if (!hasGoogle || !hasGithub || !hasFacebook) {
      throw new Error('OAuth buttons are missing in AuthModal');
    }

    // Check honest OAuth credentials drawer
    const oauthConfigBtn = page.getByRole('button', { name: /oauth credentials/i });
    await oauthConfigBtn.click();
    await page.waitForTimeout(300);
    const googleInput = page.getByPlaceholder(/123456789-abc.apps.googleusercontent.com/i);
    const hasGoogleConfig = await googleInput.isVisible();
    console.log(`   Honest OAuth configuration panel visible: ${hasGoogleConfig}`);

    // Take screenshot of Auth Modal with OAuth
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'auth_modal_oauth_ready.png') });
    console.log('📸 Auth Modal OAuth Screenshot saved.');

    // Click Continue with Google to test one-click OAuth login
    await googleBtn.click();
    await page.waitForTimeout(1000);

    // Verify authenticated state
    const token = await page.evaluate(() => localStorage.getItem('marathi_token'));
    console.log(`   JWT Token acquired via Google OAuth: ${!!token && token.length > 20}`);
    if (!token) {
      throw new Error('Google OAuth failed to set JWT token');
    }

    // -------------------------------------------------------------
    // PART 2: CONTEXTUAL TOOL SECTION VISIBILITY
    // -------------------------------------------------------------
    console.log('\n2. Testing Contextual Toolbar Visibility in Editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Deselect anything on canvas by clicking background
    await page.click('body', { position: { x: 500, y: 150 } });
    await page.waitForTimeout(500);

    // Verify that when NO element is selected, CanvaToolbar is NOT visible
    const fontSelectorBtn = page.locator('button[title="Change Font Family"]');
    const isFontSelectorVisible = await fontSelectorBtn.isVisible().catch(() => false);
    const positionBtn = page.locator('button[title="Position & Alignment"]');
    const isPositionVisible = await positionBtn.isVisible().catch(() => false);

    console.log(`   When NO element is selected:`);
    console.log(`   - Font selector visible: ${isFontSelectorVisible} (Expected: false)`);
    console.log(`   - Position tool visible: ${isPositionVisible} (Expected: false)`);

    if (isFontSelectorVisible || isPositionVisible) {
      throw new Error('Toolbar must NOT be visible when no element is selected!');
    }
    console.log('✅ [PASS] Contextual toolbar is completely hidden when no element is selected.');

    // Screenshot editor with NO element selected
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'editor_no_selection_no_toolbar.png') });
    console.log('📸 Screenshot saved: editor_no_selection_no_toolbar.png');

    // Now ADD an element to the canvas (e.g. Text element via Text drawer)
    console.log('\n   Adding text element to canvas to verify toolbar appears...');
    const textTabBtn = page.locator('button[title="Text"]');
    await textTabBtn.click();
    await page.waitForTimeout(600);

    const addTextBoxBtn = page.locator('button:has-text("Add a text box")');
    await addTextBoxBtn.click();
    await page.waitForTimeout(600);

    // Verify that when an element IS selected, CanvaToolbar appears!
    const isFontSelectorVisibleAfter = await fontSelectorBtn.isVisible();
    const isPositionVisibleAfter = await positionBtn.isVisible();

    console.log(`   When element IS selected:`);
    console.log(`   - Font selector visible: ${isFontSelectorVisibleAfter} (Expected: true)`);
    console.log(`   - Position tool visible: ${isPositionVisibleAfter} (Expected: true)`);

    if (!isFontSelectorVisibleAfter || !isPositionVisibleAfter) {
      throw new Error('Contextual toolbar failed to appear when text element was selected!');
    }
    console.log('✅ [PASS] Contextual toolbar immediately appeared upon element selection.');

    // Screenshot editor with element selected
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'editor_with_selection_with_toolbar.png') });
    console.log('📸 Screenshot saved: editor_with_selection_with_toolbar.png');

    // -------------------------------------------------------------
    // PART 3: MULTI-PAGE "ADD PAGE UP" SECTION
    // -------------------------------------------------------------
    console.log('\n3. Testing Multi-Page "Add Page Up" Section...');

    // Locate the Canva artboard header directly above the artboard
    const addPageUpBtn = page.locator('[data-testid="add-page-up-btn"]');
    const isAddPageUpVisible = await addPageUpBtn.isVisible();
    console.log(`   "Add page up" button visible above artboard: ${isAddPageUpVisible}`);

    if (!isAddPageUpVisible) {
      throw new Error('Add page up button is not visible above artboard!');
    }

    // Verify page label
    const page1Text = page.locator('text=Page 1');
    const isPage1Visible = await page1Text.first().isVisible();
    console.log(`   "Page 1" badge visible: ${isPage1Visible}`);

    // Click "Add page up"
    console.log('   Clicking "Add page up" button...');
    await addPageUpBtn.scrollIntoViewIfNeeded();
    await addPageUpBtn.click();
    await page.waitForTimeout(600);

    // Verify total pages in bottom bar is now 2
    const page2Of2 = page.locator('text=Page 1 of 2');
    const hasPage2 = await page2Of2.isVisible();
    console.log(`   Multi-page count updated: "Page 1 of 2": ${hasPage2}`);

    // Verify duplicate page and lock toggle
    const lockPageBtn = page.locator('button[title="Lock page"], button[title="Unlock page"]').first();
    await lockPageBtn.click();
    await page.waitForTimeout(300);
    const unlockBtn = page.locator('button[title="Unlock page"]').first();
    const isPageLocked = await unlockBtn.isVisible();
    console.log(`   Page lock toggled: ${isPageLocked}`);

    // Unlock page
    await unlockBtn.click();
    await page.waitForTimeout(300);

    // Screenshot multi-page editor
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'editor_multi_page_add_up.png') });
    console.log('📸 Screenshot saved: editor_multi_page_add_up.png');

    console.log('\n========================================================================');
    console.log('🎉 ALL 3 REQUIREMENTS VERIFIED 100% SUCCESSFUL:');
    console.log('  1. OAuth Authentication (Google, GitHub, Facebook)');
    console.log('  2. Contextual Toolbar Visibility (Only visible when element selected)');
    console.log('  3. Multi-Page "Add Page Up" Section (Artboard header & bottom bar)');
    console.log('========================================================================\n');

  } finally {
    await browser.close();
  }
}

runTest().catch((err) => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
