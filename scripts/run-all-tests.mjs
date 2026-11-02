import { execSync } from 'child_process';

console.log('====================================================');
console.log('MARATHI DESIGN STUDIO — MASTER TEST RUNNER');
console.log('====================================================\n');

try {
  console.log('1. Running Backend Microservices E2E Test Suite...');
  execSync('node tests/backend-e2e-test.mjs', { stdio: 'inherit' });
  console.log('✅ Backend test suite passed.\n');

  console.log('2. Running Frontend Comprehensive Canva Platform E2E Tests...');
  execSync('node tests/e2e/comprehensive-canva-platform-test.mjs', { stdio: 'inherit' });
  console.log('✅ Frontend Canva platform test suite passed.\n');

  console.log('3. Running 10 GB Storage & Elements Workflow Verification...');
  execSync('node tests/e2e/storage-elements-workflow-test.mjs', { stdio: 'inherit' });
  console.log('✅ Storage & elements workflow test suite passed.\n');

  console.log('4. Running Canva Poster Edit Area & Advanced Controls Test...');
  execSync('node tests/e2e/edit-area-functionality-test.mjs', { stdio: 'inherit' });
  console.log('✅ Edit area functionality test suite passed.\n');

  console.log('5. Running Canva Screenshots Feature Verification Test (HUD, 12 Tiles, Combos, Brand Kit, Timer)...');
  execSync('node tests/e2e/canva-screenshots-features-test.mjs', { stdio: 'inherit' });
  console.log('✅ Canva screenshots feature verification suite passed.\n');

  console.log('6. Running Canva Audio Drawer, Background Drawer & Home Dashboard E2E Verification...');
  execSync('node tests/e2e/canva-audio-background-dashboard-test.mjs', { stdio: 'inherit' });
  console.log('✅ Canva audio, background & home dashboard test suite passed.\n');

  console.log('7. Running OAuth Authentication, Contextual Toolbar & Multi-Page "Add Page Up" E2E Test...');
  execSync('node tests/e2e/oauth-contextual-toolbar-multipage-test.mjs', { stdio: 'inherit' });
  console.log('✅ OAuth, contextual toolbar & multi-page test suite passed.\n');

  console.log('8. Running Comprehensive 100+ Font Suite Verification (AMS, Shivaji, Millennium, DTP, Kruti Dev, Font Selector & Drawer)...');
  execSync('node tests/e2e/comprehensive-font-suite-test.mjs', { stdio: 'inherit' });
  console.log('✅ Comprehensive 100+ font suite test passed.\n');

  console.log('9. Running Artboard Header Fix, Pinned Stage Controls & Node.js Calligraphy/Stencils Studio Verification...');
  execSync('node tests/e2e/artboard-header-and-calligraphy-tools-test.mjs', { stdio: 'inherit' });
  console.log('✅ Artboard header fix & Calligraphy studio test passed.\n');

  console.log('10. Running Canva Dark Theme Visual Design Editor & Contextual Toolbar Test...');
  execSync('node tests/e2e/canva-dark-theme-visual-editor-test.mjs', { stdio: 'inherit' });
  console.log('✅ Canva dark theme visual design editor test passed.\n');

  console.log('11. Running Canva Guest Landing Page & Mega-Menus Verification Test...');
  execSync('node tests/e2e/canva-guest-landing-test.mjs', { stdio: 'inherit' });
  console.log('✅ Canva guest landing page test passed.\n');

  console.log('12. Running Strict Login Gating & Authentication Verification Test...');
  execSync('node tests/e2e/login-gating-test.mjs', { stdio: 'inherit' });
  console.log('✅ Login gating test passed.\n');

  console.log('====================================================');
  console.log('🎉 ALL INTEGRATION AND ACCEPTANCE TESTS PASSED 100%!');
  console.log('====================================================');
} catch (e) {
  console.error('❌ Test execution encountered an error:', e.message);
  process.exit(1);
}
