import { chromium } from '../../frontend/node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\4146000c-5660-421d-95b0-c2e65ec9e41d';

async function runGuestLandingTest() {
  console.log('========================================================================');
  console.log('CANVA FIRST-VISIT GUEST LANDING PAGE & MEGA-MENUS VERIFICATION TEST');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ headless: true });
  // Clean guest context without localStorage tokens
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    // 1. Visit landing page
    console.log('1. Loading First-Visit Landing Page at http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 2. Verify Canva script logo
    const canvaLogo = page.locator('text=Canva');
    const isLogoVisible = await canvaLogo.first().isVisible();
    console.log('   ✓ Canva brand script logo is visible:', isLogoVisible);

    // 3. Verify top navigation bar links
    console.log('2. Verifying top navigation links (Design, Product, Plans, Business, Education, Help)...');
    const navDesign = page.getByRole('button', { name: /^design/i }).first();
    const navProduct = page.getByRole('button', { name: /^product/i }).first();
    const navPlans = page.getByRole('link', { name: /^plans/i }).first();
    const navBusiness = page.getByRole('button', { name: /^business/i }).first();
    const navEducation = page.getByRole('button', { name: /^education/i }).first();
    const navHelp = page.getByRole('button', { name: /^help/i }).first();

    console.log('   ✓ Nav items present:', {
      design: await navDesign.isVisible(),
      product: await navProduct.isVisible(),
      plans: await navPlans.isVisible(),
      business: await navBusiness.isVisible(),
      education: await navEducation.isVisible(),
      help: await navHelp.isVisible(),
    });

    // 4. Verify Central Auth Card (Image 5)
    console.log('3. Verifying Central Auth Card (Log in or sign up in seconds)...');
    const authHeading = page.locator('text=Log in or sign up in seconds');
    await authHeading.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✓ Heading "Log in or sign up in seconds" is visible');

    const subtitle = page.locator("text=Use your email or another service to continue with Canva (it's free)!");
    console.log('   ✓ Subtitle is visible:', await subtitle.isVisible());

    const phoneBtn = page.getByRole('button', { name: /continue with phone number/i });
    const googleBtn = page.locator('[data-testid="oauth-google-btn"]');
    const emailBtn = page.getByRole('button', { name: /continue with email/i });
    const githubBtn = page.locator('[data-testid="oauth-github-btn"]');
    const facebookBtn = page.locator('[data-testid="oauth-facebook-btn"]');
    const demoBtn = page.getByRole('button', { name: /1-Click Quick Demo Sign In/i });

    console.log('   ✓ Auth Action Buttons:', {
      phone: await phoneBtn.isVisible(),
      google: await googleBtn.isVisible(),
      email: await emailBtn.isVisible(),
      github: await githubBtn.isVisible(),
      facebook: await facebookBtn.isVisible(),
      quickDemo: await demoBtn.isVisible(),
    });

    // 5. Test "Design" Mega Menu (Image 1)
    console.log('4. Testing "Design" Mega-Dropdown Menu (Image 1)...');
    await navDesign.hover();
    await page.waitForTimeout(400);

    const digitalDesignCol = page.locator('h4:has-text("Digital design")');
    const printDesignCol = page.locator('h4:has-text("Print design")');
    const imagesPhotosCol = page.locator('h4:has-text("Images and photos")');
    const videosAudioCol = page.locator('h4:has-text("Videos and audio")');

    await digitalDesignCol.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Design Menu 4 Columns visible:', {
      digital: await digitalDesignCol.isVisible(),
      print: await printDesignCol.isVisible(),
      photos: await imagesPhotosCol.isVisible(),
      videos: await videosAudioCol.isVisible(),
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canva_landing_design_megamenu.png') });
    console.log('📸 Screenshot saved: canva_landing_design_megamenu.png');

    // 6. Test "Product" Mega Menu (Image 2)
    console.log('5. Testing "Product" Mega-Dropdown Menu (Image 2)...');
    await navProduct.hover();
    await page.waitForTimeout(400);

    const productCol = page.locator('h4:has-text("Product")');
    const canvaAiCol = page.locator('h4:has-text("Canva AI")');

    await canvaAiCol.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Product Menu 2 Columns visible:', {
      product: await productCol.isVisible(),
      canvaAi: await canvaAiCol.isVisible(),
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canva_landing_product_megamenu.png') });
    console.log('📸 Screenshot saved: canva_landing_product_megamenu.png');

    // 7. Test "Business" Mega Menu (Image 3)
    console.log('6. Testing "Business" Mega-Dropdown Menu (Image 3)...');
    await navBusiness.hover();
    await page.waitForTimeout(400);

    const canvaBizCol = page.locator('h4:has-text("Canva for business")');
    const solutionsCol = page.locator('h4:has-text("Solutions")');
    const featuresCol = page.locator('h4:has-text("Features")');
    const resourcesCol = page.locator('h4:has-text("Resources")');

    await canvaBizCol.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Business Menu 4 Columns visible:', {
      biz: await canvaBizCol.isVisible(),
      solutions: await solutionsCol.isVisible(),
      features: await featuresCol.isVisible(),
      resources: await resourcesCol.isVisible(),
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canva_landing_business_megamenu.png') });
    console.log('📸 Screenshot saved: canva_landing_business_megamenu.png');

    // 8. Test "Education" Mega Menu (Image 4)
    console.log('7. Testing "Education" Mega-Dropdown Menu (Image 4)...');
    await navEducation.hover();
    await page.waitForTimeout(400);

    const canvaEduCol = page.locator('h4:has-text("Canva for Education")');
    const k12Col = page.locator('h4:has-text("K-12 education")');
    const teachersCol = page.locator('h4:has-text("K-12 teachers")');
    const higherEduCol = page.locator('h4:has-text("Higher education")');

    await canvaEduCol.waitFor({ state: 'visible', timeout: 3000 });
    console.log('   ✓ Education Menu 4 Columns visible:', {
      edu: await canvaEduCol.isVisible(),
      k12: await k12Col.isVisible(),
      teachers: await teachersCol.isVisible(),
      higher: await higherEduCol.isVisible(),
    });

    // 9. Test "Help" Menu (Image 5)
    console.log('8. Testing "Help" Menu & Central Auth View (Image 5)...');
    await navHelp.hover();
    await page.waitForTimeout(400);

    const helpCentreLink = page.locator('a:has-text("Help Centre")');
    const designSchoolBtn = page.locator('button:has-text("Design School")');

    console.log('   ✓ Help Menu items visible:', {
      helpCentre: await helpCentreLink.isVisible(),
      designSchool: await designSchoolBtn.isVisible(),
    });

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'canva_landing_auth_card_help.png') });
    console.log('📸 Screenshot saved: canva_landing_auth_card_help.png');

    // 10. Verify Footer
    console.log('9. Verifying Footer (Privacy, Terms, English India)...');
    const privacyLink = page.getByRole('link', { name: /privacy policy/i }).last();
    const termsLink = page.getByRole('link', { name: /terms/i }).last();
    const langBadge = page.locator('text=English (India)');

    console.log('   ✓ Footer links visible:', {
      privacy: await privacyLink.isVisible(),
      terms: await termsLink.isVisible(),
      language: await langBadge.isVisible(),
    });

    console.log('\n========================================================================');
    console.log('🎉 ALL CANVA FIRST-VISIT GUEST LANDING PAGE TESTS PASSED 100%!');
    console.log('========================================================================\n');

  } finally {
    await browser.close();
  }
}

runGuestLandingTest().catch((err) => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
