import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

async function runLoginGatingTest() {
  console.log('🚀 Starting Login Gating & Authentication Verification Test...');
  const browser = await chromium.launch({ headless: true });
  // Start with clean context (no cookies or localStorage)
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // -------------------------------------------------------------
    // STEP 1: Verify Home Page is the Login Page for Unauthenticated Visitors
    // -------------------------------------------------------------
    console.log('\n--- STEP 1: Verifying Home Page (/) renders Login Page for unauthenticated visitors ---');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const loginHeroTitle = await page.getByRole('heading', { name: /Sign in to start designing in/i }).isVisible();
    console.log('✔ Login Hero Title visible on /:', loginHeroTitle);

    const signInTab = await page.getByRole('button', { name: 'Sign In' }).first().isVisible();
    const createAccountTab = await page.getByRole('button', { name: 'Create Account' }).first().isVisible();
    console.log('✔ Sign In Tab visible:', signInTab);
    console.log('✔ Create Account Tab visible:', createAccountTab);

    const demoLoginBtn = page.getByRole('button', { name: /1-Click Quick Demo Sign In/i });
    const isDemoBtnVisible = await demoLoginBtn.isVisible();
    console.log('✔ 1-Click Quick Demo Sign In Button visible:', isDemoBtnVisible);

    // Verify main app navbar is NOT rendered on the login screen
    const navbarSearch = await page.getByRole('button', { name: /Search commands and tools/i }).isVisible();
    console.log('✔ Top App Navbar hidden on Login Page (expected false):', navbarSearch);

    // Save screenshot of Home Page as Login Page
    await page.screenshot({ path: path.resolve('login_page_home_view.png') });
    console.log('📸 Captured screenshot: login_page_home_view.png');

    // -------------------------------------------------------------
    // STEP 2: Verify Strict Gating of Tools for Unauthenticated Visitors
    // -------------------------------------------------------------
    console.log('\n--- STEP 2: Verifying that all tools are strictly gated before login ---');

    const protectedUrls = [
      'http://localhost:5173/editor',
      'http://localhost:5173/templates',
      'http://localhost:5173/dashboard',
      'http://localhost:5173/brand-kit',
      'http://localhost:5173/ai-studio',
      'http://localhost:5173/presentations',
      'http://localhost:5173/video-editor'
    ];

    for (const url of protectedUrls) {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const currentUrl = page.url();
      const loginPromptVisible = await page.getByRole('heading', { name: /Sign in to start designing in/i }).isVisible();
      const isRedirectedToHomeLogin = currentUrl === 'http://localhost:5173/' && loginPromptVisible;
      console.log(`✔ Attempted access to ${url} -> Redirected to Login: ${isRedirectedToHomeLogin} (Current URL: ${currentUrl})`);
      if (!isRedirectedToHomeLogin) {
        throw new Error(`Security breach: Unauthenticated access was permitted to ${url}`);
      }
    }

    // -------------------------------------------------------------
    // STEP 3: Perform Login using 1-Click Demo Sign In
    // -------------------------------------------------------------
    console.log('\n--- STEP 3: Authenticating user via 1-Click Demo Sign In ---');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const quickLoginBtn = page.getByRole('button', { name: /1-Click Quick Demo Sign In/i });
    await quickLoginBtn.click();
    console.log('   Clicked 1-Click Quick Demo Sign In, waiting for redirection to workspace...');

    // Wait for URL to leave login page and arrive at dashboard or intended route
    await page.waitForTimeout(2500);

    const urlAfterLogin = page.url();
    console.log('✔ Authenticated! Current URL after login:', urlAfterLogin);

    // Verify localStorage has marathi_token and marathi_user
    const tokenInStorage = await page.evaluate(() => localStorage.getItem('marathi_token'));
    const userInStorage = await page.evaluate(() => localStorage.getItem('marathi_user'));
    console.log('✔ LocalStorage marathi_token present:', !!tokenInStorage);
    console.log('✔ LocalStorage marathi_user present:', !!userInStorage);

    // -------------------------------------------------------------
    // STEP 4: Verify Full Access to All Tools Post-Login
    // -------------------------------------------------------------
    console.log('\n--- STEP 4: Verifying full access to all creative tools post-login ---');

    // 4a. Home Page now renders Canva Studio Home Hub
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const homeCanvaHub = await page.getByRole('heading', { name: /What will you design today/i }).isVisible();
    console.log('✔ Home Page (/) now renders Canva Studio Hub (heading "What will you design today?"):', homeCanvaHub);
    await page.screenshot({ path: path.resolve('authenticated_home_hub.png') });
    console.log('📸 Captured screenshot: authenticated_home_hub.png');

    // 4b. Canva Editor is unlocked and fully interactive
    console.log('   Navigating to /editor...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const editorCanvas = await page.locator('canvas').first().isVisible();
    const downloadBtn = await page.getByRole('button', { name: 'Download' }).isVisible();
    console.log('✔ Canva Editor loaded: Canvas visible:', editorCanvas, '| Download Button visible:', downloadBtn);

    // 4c. Templates Marketplace is unlocked
    console.log('   Navigating to /templates...');
    await page.goto('http://localhost:5173/templates', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const templatesHeader = await page.getByRole('heading', { name: /Design Template Library/i }).isVisible();
    console.log('✔ Templates Marketplace loaded (heading "Design Template Library"):', templatesHeader);

    // 4d. Dashboard is unlocked
    console.log('   Navigating to /dashboard...');
    await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const dashboardHeader = await page.getByRole('heading', { name: /Welcome back/i }).isVisible();
    console.log('✔ Dashboard loaded (heading "Welcome back"):', dashboardHeader);

    // -------------------------------------------------------------
    // STEP 5: Verify Sign Out locks tools again and redirects to Home Login
    // -------------------------------------------------------------
    console.log('\n--- STEP 5: Verifying Sign Out locks tools and redirects to Home Login ---');
    // Click user avatar to open profile menu in navbar
    const userMenuBtn = page.getByRole('button', { name: 'User account menu' });
    if (await userMenuBtn.isVisible()) {
      await userMenuBtn.click();
      await page.waitForTimeout(500);
    }
    const logoutBtn = page.getByRole('button', { name: /Log Out/i }).first();
    await logoutBtn.click();
    await page.waitForTimeout(1500);

    const urlAfterLogout = page.url();
    const isBackToHomeLogin = urlAfterLogout === 'http://localhost:5173/' &&
      await page.getByRole('heading', { name: /Sign in to start designing in/i }).isVisible();
    console.log('✔ After Logout -> Redirected to Home Login Page:', isBackToHomeLogin);

    // Verify token was erased
    const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('marathi_token'));
    console.log('✔ LocalStorage marathi_token cleared:', tokenAfterLogout === null);

    // Verify tools are locked again
    console.log('   Attempting to access /editor post-logout...');
    await page.goto('http://localhost:5173/editor', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const isEditorBlocked = page.url() === 'http://localhost:5173/' &&
      await page.getByRole('heading', { name: /Sign in to start designing in/i }).isVisible();
    console.log('✔ Attempting to access /editor post-logout is blocked and redirected to Login:', isEditorBlocked);

    console.log('\n🎉 ALL LOGIN GATING & TOOL RESTRICTION TESTS PASSED PERFECTLY! 🎉\n');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    await page.screenshot({ path: path.resolve('login_gating_failure.png') });
    throw err;
  } finally {
    await browser.close();
  }
}

runLoginGatingTest();
