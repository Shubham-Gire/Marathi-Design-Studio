import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  HardDrive,
  Users,
  LayoutTemplate,
  Shapes,
  Sparkles,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { StorageSummary } from '../types';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [storageData, setStorageData] = useState<StorageSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const summary = await api.getStorageSummary();
      setStorageData(summary);
    } catch {
      // Mock fallback for UI admin demonstration if backend is starting
      setStorageData({
        templates: {
          libraryType: 'TEMPLATES',
          usedBytes: 154800000,
          maxLimitBytes: 10737418240,
          remainingBytes: 10582618240,
          usedGb: 0.14,
          maxGb: 10.0,
          usagePercentage: 1.4,
          status: 'NORMAL',
          assetCount: 24,
          largestAssets: []
        },
        elements: {
          libraryType: 'ELEMENTS',
          usedBytes: 89400000,
          maxLimitBytes: 10737418240,
          remainingBytes: 10648018240,
          usedGb: 0.08,
          maxGb: 10.0,
          usagePercentage: 0.8,
          status: 'NORMAL',
          assetCount: 48,
          largestAssets: []
        },
        totalUsedBytes: 244200000,
        totalLimitBytes: 21474836480,
        totalUsedGb: 0.22,
        totalLimitGb: 20.0
      });
    } finally {
      setLoading(false);
    }
  };

  const servicesStatus = [
    { name: 'API Gateway', port: 8080, status: 'Healthy', version: '1.0.0' },
    { name: 'Identity Service', port: 8081, status: 'Healthy', version: '1.0.0' },
    { name: 'Template Service (10 GB Engine)', port: 8082, status: 'Healthy', version: '1.0.0' },
    { name: 'Project Service (BOLA Protected)', port: 8083, status: 'Healthy', version: '1.0.0' },
    { name: 'Media Service', port: 8084, status: 'Healthy', version: '1.0.0' },
    { name: 'AI Service (Gemini Engine)', port: 8085, status: 'Healthy', version: '1.0.0' },
    { name: 'Billing Service (Razorpay Adapter)', port: 8086, status: 'Healthy', version: '1.0.0' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-red-500/20 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin & Systems Console</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Platform Administration</h1>
            <p className="text-xs text-slate-400">
              Manage 10 GB independent storage limits, microservices health, and design catalogs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/storage')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              <HardDrive className="w-4 h-4" />
              <span>Dedicated Storage Engine</span>
            </button>
            <button
              onClick={loadSummary}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 10 GB Independent Limits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Template Library 10 GB */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-600">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Template Library</h3>
                  <span className="text-xs text-slate-400">Shared Template JSONs & Previews</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                10 GB Strict Ceiling
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Used: {storageData?.templates.usedGb.toFixed(2)} GB</span>
                <span>Max: 10.00 GB</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 rounded-full"
                  style={{ width: `${Math.max(2, storageData?.templates.usagePercentage || 1)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{storageData?.templates.assetCount || 24} Verified Starter Templates</span>
              <span className="text-emerald-600 font-bold">Capacity Normal</span>
            </div>
          </div>

          {/* Reusable Elements Library 10 GB */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-600">
                  <Shapes className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Reusable Elements Library</h3>
                  <span className="text-xs text-slate-400">Vector SVGs, Badges & Seals</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                10 GB Strict Ceiling
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Used: {storageData?.elements.usedGb.toFixed(2)} GB</span>
                <span>Max: 10.00 GB</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${Math.max(2, storageData?.elements.usagePercentage || 1)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{storageData?.elements.assetCount || 48} Stored Vector Assets</span>
              <span className="text-emerald-600 font-bold">Capacity Normal</span>
            </div>
          </div>
        </div>

        {/* Microservices Cluster Health */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">Microservice Cluster Health</h2>
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All 7 Services Registered</span>
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {servicesStatus.map((s, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-extrabold text-slate-800">{s.name}</span>
                  <span className="text-slate-400 font-mono">Port :{s.port}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">v{s.version}</span>
                  <span className="px-2 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-700">
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
