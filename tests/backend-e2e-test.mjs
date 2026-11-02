// Comprehensive automated end-to-end integration and security test suite
// for Marathi Design Studio Microservices

const BASE_URL = 'http://localhost:8080/api/v1';

async function runTests() {
  console.log('=================================================================');
  console.log('MARATHI DESIGN STUDIO - AUTOMATED INTEGRATION & SECURITY TEST SUITE');
  console.log('=================================================================\n');

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

  try {
    // TEST 1: Register User A
    const userAEmail = `user_a_${Date.now()}@example.com`;
    console.log(`Test 1: Registering User A (${userAEmail})...`);
    const regResA = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userAEmail,
        password: 'Password123!',
        fullName: 'सचिन रमेश तेंडुलकर',
        phoneNumber: '9820000001'
      })
    });
    const regDataA = await regResA.json();
    assert(regResA.status === 201 && regDataA.success && regDataA.accessToken, 'User A registered successfully with JWT');
    const tokenA = regDataA.accessToken;
    const userIdA = regDataA.user.id;

    // TEST 2: Register User B
    const userBEmail = `user_b_${Date.now()}@example.com`;
    console.log(`Test 2: Registering User B (${userBEmail})...`);
    const regResB = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userBEmail,
        password: 'Password123!',
        fullName: 'गणेश विठ्ठल जोशी',
        phoneNumber: '9820000002'
      })
    });
    const regDataB = await regResB.json();
    assert(regResB.status === 201 && regDataB.success && regDataB.accessToken, 'User B registered successfully with JWT');
    const tokenB = regDataB.accessToken;
    const userIdB = regDataB.user.id;

    // TEST 3: Login User A
    console.log('Test 3: Logging in User A...');
    const loginResA = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userAEmail,
        password: 'Password123!'
      })
    });
    const loginDataA = await loginResA.json();
    assert(loginResA.status === 200 && loginDataA.accessToken, 'User A logged in successfully');

    // TEST 4: Fetch Template Catalog & Categories
    console.log('Test 4: Browsing Marathi template catalog...');
    const tmplRes = await fetch(`${BASE_URL}/templates`);
    const templates = await tmplRes.json();
    assert(tmplRes.status === 200 && templates.length >= 20, `Retrieved ${templates.length} authentic Marathi seed templates (>=20 requirement met)`);

    const catRes = await fetch(`${BASE_URL}/categories`);
    const categories = await catRes.json();
    assert(catRes.status === 200 && categories.length >= 8, `Retrieved ${categories.length} Marathi categories`);

    // TEST 5: Create a Marathi Design Project for User A
    console.log('Test 5: User A creating a new design project...');
    const sampleCanvasJson = JSON.stringify({
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          fill: '#ea580c'
        },
        {
          type: 'textbox',
          left: 100,
          top: 200,
          text: '|| गणपती बाप्पा मोरया ||',
          fontSize: 60,
          fontFamily: 'Mukta',
          fill: '#ffffff'
        }
      ]
    });

    const createProjRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        title: 'माझी पहिली गणेशोत्सव पोस्ट',
        width: 1080,
        height: 1080,
        canvasJson: sampleCanvasJson,
        thumbnailData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      })
    });
    const projA = await createProjRes.json();
    assert(createProjRes.status === 201 && projA.id && projA.userId === userIdA, 'User A design project saved in cloud');

    // TEST 6: User A can read and update their own project
    console.log('Test 6: User A retrieving and updating their own project...');
    const getProjRes = await fetch(`${BASE_URL}/projects/${projA.id}`, {
      headers: { Authorization: `Bearer ${tokenA}` }
    });
    const fetchedProjA = await getProjRes.json();
    assert(getProjRes.status === 200 && fetchedProjA.title === 'माझी पहिली गणेशोत्सव पोस्ट', 'User A restored saved design project accurately');

    const updateProjRes = await fetch(`${BASE_URL}/projects/${projA.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        title: 'गणेशोत्सव आगमन विशेष पोस्ट २०२६',
        canvasJson: sampleCanvasJson
      })
    });
    const updatedProj = await updateProjRes.json();
    assert(updateProjRes.status === 200 && updatedProj.title === 'गणेशोत्सव आगमन विशेष पोस्ट २०२६' && updatedProj.version === 2, 'Project updated and version counter incremented to 2');

    // TEST 7: SECURITY TEST - User B attempts to access User A's private design (Broken Object-Level Authorization check)
    console.log("Test 7: SECURITY AUDIT - User B attempting to access User A's private design...");
    const maliciousGetRes = await fetch(`${BASE_URL}/projects/${projA.id}`, {
      headers: { Authorization: `Bearer ${tokenB}` }
    });
    assert(maliciousGetRes.status === 403, `BOLA Protection PASSED: User B denied access to User A's project (HTTP 403 Forbidden)`);

    const maliciousUpdateRes = await fetch(`${BASE_URL}/projects/${projA.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenB}`
      },
      body: JSON.stringify({ title: 'Hacked by User B' })
    });
    assert(maliciousUpdateRes.status === 403, `BOLA Protection PASSED: User B prevented from modifying User A's project (HTTP 403 Forbidden)`);

    // TEST 8: Free Plan Quota Enforcement (Max 5 projects)
    console.log('Test 8: Testing Free-tier quota enforcement (Max 5 projects)...');
    // User B currently has 0 projects. Create 5 projects:
    for (let i = 1; i <= 5; i++) {
      const pRes = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenB}`
        },
        body: JSON.stringify({
          title: `प्रोजेक्ट क्रमांक ${i}`,
          width: 1080,
          height: 1080,
          canvasJson: sampleCanvasJson
        })
      });
      assert(pRes.status === 201, `Created project ${i} within Free quota`);
    }

    // 6th project attempt MUST be rejected by server!
    const sixthProjRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenB}`
      },
      body: JSON.stringify({
        title: 'सहावा प्रोजेक्ट (मर्यादा उल्लंघन)',
        width: 1080,
        height: 1080,
        canvasJson: sampleCanvasJson
      })
    });
    assert(sixthProjRes.status === 403, `Server-Side Quota Enforcement PASSED: 6th project rejected on Free Plan (HTTP 403 Forbidden)`);

    // TEST 9: AI Generation with Authentication & Daily Quota
    console.log('Test 9: Testing AI Marathi Copy Generation...');
    const aiRes = await fetch(`${BASE_URL}/ai/generate-copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        topic: 'गणेशोत्सव सण आगमन',
        tone: 'भक्तिमय',
        category: 'festivals'
      })
    });
    const aiData = await aiRes.json();
    assert(aiRes.status === 200 && aiData.headlines && aiData.headlines.length > 0, `AI Generated ${aiData.headlines.length} Marathi headlines`);
    console.log('   Sample AI headline:', aiData.headlines[0]);

    // TEST 10: AI Design Assistant from Brief
    console.log('Test 10: Testing AI Design Assistant from Marathi Brief...');
    const briefRes = await fetch(`${BASE_URL}/ai/design-assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        brief: 'माझ्या ज्यूस सेंटरसाठी उन्हाळी ऑफरची पोस्ट तयार करा'
      })
    });
    const briefData = await briefRes.json();
    assert(briefRes.status === 200 && briefData.headerText && briefData.backgroundColor, 'AI Design Assistant generated layout, colors, and typography proposal');
    console.log('   Proposed Title:', briefData.title);
    console.log('   Proposed Header:', briefData.headerText);

    // TEST 11: Billing & Entitlements - Mock Upgrade to Pro Plan
    console.log('Test 11: Testing Mock Development Upgrade to Pro Plan...');
    const upgradeRes = await fetch(`${BASE_URL}/billing/mock-activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenB}`
      },
      body: JSON.stringify({ planId: 'PRO_MONTHLY' })
    });
    const upgradeData = await upgradeRes.json();
    assert(upgradeRes.status === 200 && upgradeData.isMockDevelopmentPayment && upgradeData.subscription.status === 'ACTIVE', 'Upgraded User B to Pro Tier via verified mock development payment');

    // TEST 12: Verify User B now has Pro Entitlement and can exceed Free Quota
    console.log('Test 12: Verifying User B can now create 6th project with Pro entitlement...');
    // Re-login User B to refresh JWT claims with PRO plan
    const reLoginB = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userBEmail, password: 'Password123!' })
    });
    const reLoginDataB = await reLoginB.json();
    const tokenBPro = reLoginDataB.accessToken;

    const proProjRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenBPro}`
      },
      body: JSON.stringify({
        title: 'सहावा प्रोजेक्ट (प्रो सदस्यासाठी मंजूर)',
        width: 1080,
        height: 1080,
        canvasJson: sampleCanvasJson
      })
    });
    assert(proProjRes.status === 201, 'Pro Entitlement Verified: 6th project successfully saved on Pro plan!');

    // TEST 13: Subscription Cancellation
    console.log('Test 13: Testing Subscription Cancellation...');
    const cancelRes = await fetch(`${BASE_URL}/billing/cancel`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenBPro}` }
    });
    const cancelData = await cancelRes.json();
    assert(cancelRes.status === 200 && cancelData.success, 'Subscription cancelled successfully');

    // SUMMARY
    console.log('\n=================================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('=================================================================');
    if (failed === 0) {
      console.log('🎉 ALL INTEGRATION AND SECURITY AUDIT CRITERIA PASSED 100%!');
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal test error:', error);
    process.exit(1);
  }
}

runTests();
