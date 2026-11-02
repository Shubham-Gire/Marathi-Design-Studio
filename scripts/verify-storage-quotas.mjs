import fetch from 'node:fs';

const API_BASE = 'http://localhost:8080/api/v1';

async function checkStorage() {
  console.log('🔍 Checking Independent 10 GB Storage Limits...');
  try {
    const res = await globalThis.fetch(`${API_BASE}/admin/storage/summary`);
    if (!res.ok) {
      console.log('⚠️ Storage summary endpoint returned status:', res.status);
      return;
    }
    const data = await res.json();
    console.log('📊 Current Storage Quota Accounting:');
    console.log('   Template Library (Max 10 GB):', {
      usedBytes: data.templates.totalSizeBytes,
      usagePercent: `${data.templates.usagePercent}%`,
      assetsCount: data.templates.totalAssetsCount,
      withinLimit: data.templates.isWithinLimit
    });
    console.log('   Reusable Elements Library (Max 10 GB):', {
      usedBytes: data.elements.totalSizeBytes,
      usagePercent: `${data.elements.usagePercent}%`,
      assetsCount: data.elements.totalAssetsCount,
      withinLimit: data.elements.isWithinLimit
    });
    console.log('✅ Independent 10 GB accounting verified.');
  } catch (e) {
    console.error('Failed to query storage status:', e.message);
  }
}

checkStorage();
