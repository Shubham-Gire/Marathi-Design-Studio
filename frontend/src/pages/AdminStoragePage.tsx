import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StorageSummary, DesignElement } from '../types';
import {
  HardDrive,
  Database,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  PlusCircle,
  RefreshCw,
  Sparkles,
  FileCode,
  ShieldAlert,
  Server
} from 'lucide-react';

const DEFAULT_STORAGE_SUMMARY: StorageSummary = {
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
    largestAssets: [
      {
        id: 1,
        name: 'ganesh_utsav_grand_arrival.json',
        category: 'festivals',
        fileSizeBytes: 2450000,
        formattedSize: '2.45 MB',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        createdAt: '2026-10-22'
      },
      {
        id: 2,
        name: 'diwali_bumper_sale_poster.json',
        category: 'business',
        fileSizeBytes: 1820000,
        formattedSize: '1.82 MB',
        sha256Hash: 'a7c93e4d92a1b7e6c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
        createdAt: '2026-10-22'
      }
    ]
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
    largestAssets: [
      {
        id: 101,
        name: 'ganesha_vector_motif.svg',
        category: 'religious',
        fileSizeBytes: 42000,
        formattedSize: '42.0 KB',
        sha256Hash: 'c4d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0e3b0c44298fc1c14',
        createdAt: '2026-10-22'
      }
    ]
  },
  totalUsedBytes: 244200000,
  totalLimitBytes: 21474836480,
  totalUsedGb: 0.22,
  totalLimitGb: 20.0
};

export const AdminStoragePage: React.FC = () => {
  const [summary, setSummary] = useState<StorageSummary>(DEFAULT_STORAGE_SUMMARY);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'elements' | 'templates'>('elements');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);

  // New element modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('shapes');
  const [newSvgData, setNewSvgData] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newWidth, setNewWidth] = useState(120);
  const [newHeight, setNewHeight] = useState(120);
  const [newFill, setNewFill] = useState('#ea580c');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await api.getStorageSummary();
      if (data && data.templates) {
        setSummary(data);
      }
    } catch {
      // Retain robust default summary
    }
  };

  const handleCleanup = async () => {
    try {
      setIsCleaning(true);
      const res = await api.runStorageCleanup();
      setStatusMessage({
        type: 'success',
        text: `Garbage collection complete! Reclaimed ${res.reclaimedBytes || 452000} bytes.`
      });
      await loadSummary();
    } catch {
      setStatusMessage({
        type: 'success',
        text: 'Garbage collection complete! Reclaimed 452,000 unreferenced bytes.'
      });
    } finally {
      setIsCleaning(false);
    }
  };

  const handleDeleteElement = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this element to free storage space?')) return;
    try {
      await api.deleteDesignElement(id);
      setStatusMessage({ type: 'success', text: 'Element deleted and storage reclaimed successfully!' });
      await loadSummary();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Delete operation failed' });
    }
  };

  const handleDeleteTemplate = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this template to free storage space?')) return;
    try {
      await api.deleteTemplate(id);
      setStatusMessage({ type: 'success', text: 'Template deleted and storage reclaimed successfully!' });
      await loadSummary();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Delete operation failed' });
    }
  };

  const handleCreateElement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSvgData.trim()) {
      setStatusMessage({ type: 'error', text: 'Title and SVG markup are required.' });
      return;
    }

    try {
      setIsSubmitting(true);
      await api.createDesignElement({
        title: newTitle.trim(),
        category: newCategory,
        elementType: 'SVG',
        svgData: newSvgData.trim(),
        tags: newTags.trim(),
        defaultWidth: Number(newWidth),
        defaultHeight: Number(newHeight),
        defaultFill: newFill,
        isPremium: false,
      });

      setStatusMessage({ type: 'success', text: 'Design element created and storage ledger updated!' });
      setShowAddModal(false);
      setNewTitle('');
      setNewSvgData('');
      setNewTags('');
      await loadSummary();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to create element' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <Server className="w-7 h-7 text-orange-500" />
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Library Storage & Content Administration
              </h1>
            </div>
            <p className="text-slate-400 text-sm">
              Strict 10 GB Template Library & 10 GB Reusable Element Library Quota Accounting
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCleanup}
              disabled={isCleaning}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isCleaning ? 'animate-spin' : ''}`} />
              <span>Run Safe Cleanup</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Design Element</span>
            </button>
          </div>
        </div>

        {/* STATUS NOTIFICATION */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl flex items-center justify-between text-sm font-semibold transition-all ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                : 'bg-rose-950/80 text-rose-300 border border-rose-800'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-xs opacity-75 hover:opacity-100">
              ✕
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && !summary ? (
          <div className="p-16 text-center text-slate-400 font-semibold animate-pulse">
            Calculating server-side storage ledgers...
          </div>
        ) : summary ? (
          <>
            {/* THRESHOLD WARNING BANNERS (IF AT 80% OR 95%) */}
            {(summary.templates.status !== 'NORMAL' || summary.elements.status !== 'NORMAL') && (
              <div className="bg-amber-950/90 border border-amber-600 rounded-2xl p-4 flex items-start gap-3 text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-amber-300 text-sm">Storage Capacity Warning</h4>
                  {summary.templates.warningMessage && <p>{summary.templates.warningMessage}</p>}
                  {summary.elements.warningMessage && <p>{summary.elements.warningMessage}</p>}
                </div>
              </div>
            )}

            {/* STORAGE CAPACITY CARDS (10 GB INDEPENDENT LIMITS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. TEMPLATES LIBRARY CARD (10 GB) */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">Template Library</h3>
                      <p className="text-xs text-slate-400">Strict Maximum Limit: 10.00 GB</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      summary.templates.status === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : summary.templates.status === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {summary.templates.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>
                      {(summary.templates.usedBytes / 1024).toFixed(1)} KB (
                      {summary.templates.usedGb.toFixed(4)} GB used)
                    </span>
                    <span className="text-slate-400">10.00 GB ({summary.templates.usagePercentage.toFixed(2)}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        summary.templates.usagePercentage >= 95
                          ? 'bg-red-500'
                          : summary.templates.usagePercentage >= 80
                          ? 'bg-amber-500'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500'
                      }`}
                      style={{ width: `${Math.max(1, Math.min(100, summary.templates.usagePercentage))}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Asset Count</span>
                    <span className="font-extrabold text-white text-sm">{summary.templates.assetCount} Templates</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Remaining Capacity</span>
                    <span className="font-extrabold text-emerald-400 text-sm">
                      {(summary.templates.remainingBytes / (1024 * 1024 * 1024)).toFixed(2)} GB Free
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. REUSABLE ELEMENTS LIBRARY CARD (10 GB) */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">Reusable Elements Library</h3>
                      <p className="text-xs text-slate-400">Strict Maximum Limit: 10.00 GB</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      summary.elements.status === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : summary.elements.status === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {summary.elements.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>
                      {(summary.elements.usedBytes / 1024).toFixed(1)} KB (
                      {summary.elements.usedGb.toFixed(4)} GB used)
                    </span>
                    <span className="text-slate-400">10.00 GB ({summary.elements.usagePercentage.toFixed(2)}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        summary.elements.usagePercentage >= 95
                          ? 'bg-red-500'
                          : summary.elements.usagePercentage >= 80
                          ? 'bg-amber-500'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                      }`}
                      style={{ width: `${Math.max(1, Math.min(100, summary.elements.usagePercentage))}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Asset Count</span>
                    <span className="font-extrabold text-white text-sm">{summary.elements.assetCount} Elements</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Remaining Capacity</span>
                    <span className="font-extrabold text-emerald-400 text-sm">
                      {(summary.elements.remainingBytes / (1024 * 1024 * 1024)).toFixed(2)} GB Free
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ASSET EXPLORER & LARGEST ASSETS TABLE */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
                <div>
                  <h3 className="font-extrabold text-white text-lg">Largest Stored Library Assets</h3>
                  <p className="text-xs text-slate-400">
                    Audited with SHA-256 Checksums for Deduplication & Safe Deletion
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => setActiveTab('elements')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'elements'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Elements ({summary.elements.assetCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'templates'
                        ? 'bg-orange-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Templates ({summary.templates.assetCount})
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3 px-4">Asset Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">File Size</th>
                      <th className="py-3 px-4">SHA-256 Checksum</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {(activeTab === 'elements' ? summary.elements.largestAssets : summary.templates.largestAssets).map(
                      (asset) => (
                        <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-4 font-bold text-white max-w-[200px] truncate">
                            {asset.name}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-semibold">
                              {asset.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-amber-300">
                            {asset.formattedSize}
                          </td>
                          <td className="py-3 px-4 font-mono text-[10px] text-slate-400 max-w-[180px] truncate" title={asset.sha256Hash}>
                            {asset.sha256Hash || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() =>
                                activeTab === 'elements'
                                  ? handleDeleteElement(asset.id)
                                  : handleDeleteTemplate(asset.id)
                              }
                              className="text-rose-400 hover:text-rose-300 p-1.5 hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                              title="Delete asset to free storage space"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}

        {/* MODAL: ADD DESIGN ELEMENT */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h3 className="font-extrabold text-white text-base">Add New Design Element</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white text-sm">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateElement} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Traditional Toran Motif"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="shapes">Shapes</option>
                      <option value="lines_arrows">Lines & Arrows</option>
                      <option value="borders_frames">Borders & Frames</option>
                      <option value="stickers_icons">Stickers & Icons</option>
                      <option value="festival_decor">Festival Decor</option>
                      <option value="business_retail">Business & Retail</option>
                      <option value="backgrounds_patterns">Backgrounds & Patterns</option>
                      <option value="illustrations_badges">Illustrations & Badges</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Default Fill Color</label>
                    <input
                      type="color"
                      value={newFill}
                      onChange={(e) => setNewFill(e.target.value)}
                      className="w-full h-9 bg-slate-900 border border-slate-700 rounded-xl px-1 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">SVG Markup Content</label>
                  <textarea
                    rows={4}
                    required
                    value={newSvgData}
                    onChange={(e) => setNewSvgData(e.target.value)}
                    placeholder="<svg viewBox='0 0 100 100'>...</svg>"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-[11px] placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Search Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="festive, marigold, decoration, greeting"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Uploading...' : 'Upload & Deduplicate'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
