import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Search,
  Sparkles,
  BarChart2,
  Heart,
  Camera,
  Video,
  Printer,
  FileText,
  Grid,
  Table,
  Globe,
  Crop,
  UploadCloud,
  MoreHorizontal,
  ChevronRight,
  Play,
  ArrowRight
} from 'lucide-react';

interface CanvaCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDimensions?: (width: number, height: number, title?: string) => void;
  initialCategory?: string;
}

export interface DesignPreset {
  id: string;
  name: string;
  category: string;
  platform?: 'popular' | 'whatsapp' | 'instagram' | 'facebook' | 'linkedin';
  width: number;
  height: number;
  unit: string;
  aspect: string;
  mockupType: 'phone-post' | 'phone-story' | 'phone-reel' | 'phone-bio' | 'desktop-header' | 'video-thumb' | 'doc-a4';
  accentColor: string;
  badge?: string;
  tag?: string;
}

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    id: 'fb-post',
    name: 'Facebook Post',
    category: 'social',
    platform: 'facebook',
    width: 940,
    height: 788,
    unit: 'px',
    aspect: 'aspect-[940/788]',
    mockupType: 'phone-post',
    accentColor: '#1877f2',
    tag: 'Social media',
  },
  {
    id: 'ig-story',
    name: 'Instagram Story',
    category: 'social',
    platform: 'instagram',
    width: 1080,
    height: 1920,
    unit: 'px',
    aspect: 'aspect-[9/16]',
    mockupType: 'phone-story',
    accentColor: '#e1306c',
    tag: '9:16 Vertical',
  },
  {
    id: 'ig-post-portrait',
    name: 'Instagram Post (4:5, Portrait)',
    category: 'social',
    platform: 'instagram',
    width: 1080,
    height: 1350,
    unit: 'px',
    aspect: 'aspect-[4/5]',
    mockupType: 'phone-post',
    accentColor: '#c13584',
    tag: '4:5 High-reach',
  },
  {
    id: 'ig-reel',
    name: 'Instagram Reel',
    category: 'social',
    platform: 'instagram',
    width: 1080,
    height: 1920,
    unit: 'px',
    aspect: 'aspect-[9/16]',
    mockupType: 'phone-reel',
    accentColor: '#833ab4',
    tag: 'Viral video',
  },
  {
    id: 'link-in-bio',
    name: 'Link in Bio',
    category: 'social',
    platform: 'popular',
    width: 800,
    height: 1200,
    unit: 'px',
    aspect: 'aspect-[2/3]',
    mockupType: 'phone-bio',
    accentColor: '#10b981',
    tag: 'Bio Landing',
  },
  {
    id: 'linkedin-banner',
    name: 'LinkedIn Background Photo',
    category: 'social',
    platform: 'linkedin',
    width: 1584,
    height: 396,
    unit: 'px',
    aspect: 'aspect-[4/1]',
    mockupType: 'desktop-header',
    accentColor: '#0a66c2',
    tag: '1584 × 396 px',
  },
  {
    id: 'yt-thumb',
    name: 'YouTube Thumbnail',
    category: 'social',
    platform: 'popular',
    width: 1280,
    height: 720,
    unit: 'px',
    aspect: 'aspect-[16/9]',
    mockupType: 'video-thumb',
    accentColor: '#ff0000',
    tag: '1280 × 720 px',
  },
  {
    id: 'wa-status',
    name: 'WhatsApp Status',
    category: 'social',
    platform: 'whatsapp',
    width: 1080,
    height: 1920,
    unit: 'px',
    aspect: 'aspect-[9/16]',
    mockupType: 'phone-story',
    accentColor: '#25d366',
    tag: 'Status 24h',
  },
];

export const CanvaCreateModal: React.FC<CanvaCreateModalProps> = ({
  isOpen,
  onClose,
  onSelectDimensions,
  initialCategory = 'social',
}) => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  // Custom Size Form
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(1080);
  const [customUnit, setCustomUnit] = useState<'px' | 'in' | 'mm' | 'cm'>('px');

  if (!isOpen) return null;

  const handleLaunchPreset = (preset: DesignPreset) => {
    if (onSelectDimensions) {
      onSelectDimensions(preset.width, preset.height, preset.name);
    } else {
      navigate(`/editor?w=${preset.width}&h=${preset.height}&title=${encodeURIComponent(preset.name)}`);
    }
    onClose();
  };

  const handleLaunchCustomSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSelectDimensions) {
      onSelectDimensions(customWidth, customHeight, `Custom ${customWidth}x${customHeight}`);
    } else {
      navigate(`/editor?w=${customWidth}&h=${customHeight}&title=Custom+Design`);
    }
    onClose();
  };

  // Filter presets
  const filteredPresets = DESIGN_PRESETS.filter((p) => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlatform =
      activePlatformFilter === 'popular' ||
      p.platform === activePlatformFilter ||
      activePlatformFilter === 'all';
    return matchSearch && matchPlatform;
  });

  // Category sidebar items (Matching Canva Image 3)
  const SIDEBAR_CATEGORIES = [
    { id: 'for-you', label: 'For you', icon: Sparkles },
    { id: 'presentations', label: 'Presentations', icon: BarChart2 },
    { id: 'social', label: 'Social media', icon: Heart, badge: 'Popular' },
    { id: 'photo-editor', label: 'Photo editor', icon: Camera },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'printables', label: 'Printables', icon: Printer },
    { id: 'docs', label: 'Docs', icon: FileText },
    { id: 'whiteboards', label: 'Whiteboards', icon: Grid },
    { id: 'sheets', label: 'Sheets', icon: Table },
    { id: 'websites', label: 'Websites', icon: Globe },
    { id: 'custom-size', label: 'Custom size', icon: Crop },
    { id: 'upload', label: 'Upload', icon: UploadCloud },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none animate-in fade-in duration-150">
      
      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-5xl h-[680px] bg-[#18191b] border border-[#2d2e30] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-200">
        
        {/* TOP HEADER & SEARCH (Matching Canva Image 3) */}
        <div className="px-6 py-4 border-b border-[#2d2e30] flex items-center justify-between gap-4 shrink-0 bg-[#1e2023]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white">Create a design</h2>
          </div>

          {/* Central Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What would you like to create?"
              className="w-full bg-[#121315] border border-[#343538] focus:border-[#8b3dff] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (Sidebar + Presets Grid) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT CATEGORY SIDEBAR (Matching Canva Image 3) */}
          <aside className="w-56 bg-[#18191b] border-r border-[#2d2e30] p-3 space-y-1 overflow-y-auto shrink-0 scrollbar-none">
            {SIDEBAR_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#8b3dff] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{cat.label}</span>
                  </div>
                  {cat.badge && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-extrabold">
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* RIGHT PRESETS CANVAS / GRID */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#121315]">
            
            {/* If Custom Size is selected */}
            {activeCategory === 'custom-size' ? (
              <div className="max-w-md mx-auto py-8">
                <h3 className="text-base font-extrabold text-white mb-2">Custom Dimensions</h3>
                <p className="text-xs text-gray-400 mb-6">
                  Set specific width, height, and measurement unit for your print or digital design.
                </p>

                <form onSubmit={handleLaunchCustomSize} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 block mb-1">Width</label>
                      <input
                        type="number"
                        min={50}
                        max={8000}
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                        className="w-full bg-[#1e2023] border border-[#343538] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#8b3dff]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 block mb-1">Height</label>
                      <input
                        type="number"
                        min={50}
                        max={8000}
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Number(e.target.value))}
                        className="w-full bg-[#1e2023] border border-[#343538] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#8b3dff]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-400 block mb-1">Unit</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['px', 'in', 'mm', 'cm'] as const).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setCustomUnit(u)}
                          className={`py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
                            customUnit === u ? 'bg-[#8b3dff] text-white' : 'bg-[#1e2023] text-gray-400 hover:text-white'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8b3dff] hover:bg-[#7a2fe0] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all mt-4 cursor-pointer"
                  >
                    Create new design
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* SUB-FILTER CHIPS (Popular, WhatsApp, Instagram, Facebook, LinkedIn) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
                  {[
                    { id: 'popular', label: 'Popular' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'instagram', label: 'Instagram' },
                    { id: 'facebook', label: 'Facebook' },
                    { id: 'linkedin', label: 'LinkedIn' },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setActivePlatformFilter(chip.id)}
                      className={`px-3.5 py-1.5 rounded-full transition-colors capitalize ${
                        activePlatformFilter === chip.id
                          ? 'bg-[#8b3dff] text-white font-black shadow-sm'
                          : 'bg-[#1e2023] text-gray-400 hover:text-white hover:bg-[#252627]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* SECTION TITLE */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white">Popular Formats</h3>
                  <span className="text-[11px] text-gray-500 font-bold">{filteredPresets.length} presets</span>
                </div>

                {/* 4-COLUMN CARD GRID WITH MOCKUPS (Matching Canva Image 3) */}
                <div className="grid grid-cols-4 gap-4">
                  {filteredPresets.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleLaunchPreset(preset)}
                      className="group bg-[#1e2023] border border-[#2d2e30] hover:border-[#8b3dff] rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.03] shadow-sm hover:shadow-xl"
                    >
                      {/* Realistic Mockup Canvas Preview */}
                      <div className="h-44 bg-[#121315] rounded-xl flex items-center justify-center p-3 relative overflow-hidden mb-3">
                        
                        {/* Device / Post Frame Visual */}
                        <div
                          className={`w-28 rounded-lg bg-white border border-gray-200 shadow-md p-1.5 flex flex-col justify-between overflow-hidden transition-transform group-hover:scale-105 ${preset.aspect}`}
                        >
                          {/* Mini Header */}
                          <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                            <div className="w-8 h-1 bg-gray-200 rounded-full" />
                          </div>

                          {/* Mini Graphic Center */}
                          <div className="my-auto rounded bg-gradient-to-tr from-pink-500/20 to-purple-500/20 p-2 flex flex-col items-center justify-center">
                            {preset.mockupType === 'phone-reel' && (
                              <div className="w-6 h-6 rounded-full bg-white/90 text-purple-700 flex items-center justify-center shadow">
                                <Play className="w-3 h-3 fill-current ml-0.5" />
                              </div>
                            )}
                            {preset.mockupType === 'phone-bio' && (
                              <div className="space-y-1 w-full">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 mx-auto" />
                                <div className="w-full h-1 bg-gray-300 rounded" />
                                <div className="w-3/4 h-1 bg-gray-200 mx-auto rounded" />
                              </div>
                            )}
                            {preset.mockupType === 'video-thumb' && (
                              <div className="w-6 h-4 rounded bg-red-600 text-white flex items-center justify-center shadow">
                                <Play className="w-2.5 h-2.5 fill-current" />
                              </div>
                            )}
                            {preset.mockupType === 'phone-post' && (
                              <div className="w-full h-12 rounded bg-gradient-to-r from-orange-400 to-amber-300 flex items-center justify-center">
                                <span className="text-[7px] font-black text-white uppercase">Design</span>
                              </div>
                            )}
                            {preset.mockupType === 'phone-story' && (
                              <div className="w-full h-20 rounded bg-gradient-to-b from-rose-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-[7px] font-black text-white">Story</span>
                              </div>
                            )}
                            {preset.mockupType === 'desktop-header' && (
                              <div className="w-full h-6 rounded bg-blue-600 flex items-center justify-center">
                                <span className="text-[6px] font-black text-white">Banner</span>
                              </div>
                            )}
                          </div>

                          {/* Mini Footer */}
                          <div className="flex items-center gap-1 pt-0.5">
                            <div className="w-2 h-2 rounded-xs bg-gray-200" />
                            <div className="flex-1 h-1 bg-gray-100 rounded-full" />
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                          <span className="px-3 py-1.5 bg-[#8b3dff] text-white text-[11px] font-extrabold rounded-lg shadow-lg flex items-center gap-1">
                            <span>Use Size</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div>
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-400 transition-colors">
                          {preset.name}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                          <span>{preset.width} × {preset.height} px</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-gray-400 font-mono">
                            {preset.tag || preset.category}
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
