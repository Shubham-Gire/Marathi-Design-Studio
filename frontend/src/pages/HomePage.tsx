import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Template, TemplateCategory, Project } from '../types';
import { TemplateCard } from '../components/TemplateCard';
import { CanvaCreateModal } from '../components/canva/CanvaCreateModal';
import {
  Search,
  Sparkles,
  PlusCircle,
  Plus,
  Crown,
  Layers,
  ArrowRight,
  LayoutTemplate,
  Presentation,
  Share2,
  Video,
  Printer,
  FileText,
  PenTool,
  FileSpreadsheet,
  Globe,
  Maximize2,
  UploadCloud,
  MoreHorizontal,
  Home,
  Folder,
  Star,
  Trash2,
  Settings,
  HardDrive,
  Clock,
  ExternalLink,
  ChevronRight,
  Copy,
  Download,
  MoreVertical,
  Check,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface RecentDesign {
  id: string;
  title: string;
  type: string;
  typeBadge: string;
  editedTime: string;
  width: number;
  height: number;
  thumbnailBg: string;
  thumbnailIllustration: string;
  previewUrl?: string;
  templateId?: number;
}

const RECENT_DESIGNS: RecentDesign[] = [
  {
    id: 'recent-1',
    title: 'Shiv Jayanti Mahotsav 2026 Poster',
    type: 'poster',
    typeBadge: 'Poster (Portrait)',
    editedTime: 'Edited 10 hours ago',
    width: 1080,
    height: 1350,
    thumbnailBg: 'from-orange-600 via-amber-600 to-red-700',
    thumbnailIllustration: '🚩 शिवजयंती उत्सव २०२६',
    previewUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=400&q=70',
    templateId: 1,
  },
  {
    id: 'recent-2',
    title: 'Diwali Mega Offer 50% Off Banner',
    type: 'social',
    typeBadge: 'Instagram Post (1:1)',
    editedTime: 'Edited 1 day ago',
    width: 1080,
    height: 1080,
    thumbnailBg: 'from-amber-600 via-yellow-600 to-amber-700',
    thumbnailIllustration: '✨ दिवाळी महाधमाका ५०% सूट',
    previewUrl: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=400&q=70',
    templateId: 2,
  },
  {
    id: 'recent-3',
    title: 'Ganesh Festival Invitation Card',
    type: 'invitation',
    typeBadge: 'Invitation Card (5:7)',
    editedTime: 'Edited 3 days ago',
    width: 1200,
    height: 1680,
    thumbnailBg: 'from-red-700 via-rose-700 to-amber-700',
    thumbnailIllustration: '🌺 श्री गणेशोत्सव निमंत्रण',
    previewUrl: 'https://images.unsplash.com/photo-1567591414240-e2b26090c29f?auto=format&fit=crop&w=400&q=70',
    templateId: 3,
  },
  {
    id: 'recent-4',
    title: 'Corporate Q3 Business Pitch Deck',
    type: 'presentation',
    typeBadge: 'Presentation (16:9)',
    editedTime: 'Edited 4 days ago',
    width: 1920,
    height: 1080,
    thumbnailBg: 'from-slate-900 via-blue-900 to-indigo-900',
    thumbnailIllustration: '📊 Maharashtra Tech Summit Q3',
    previewUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=70',
  },
  {
    id: 'recent-5',
    title: 'Maharashtra Tourism Social Reel',
    type: 'video',
    typeBadge: 'Reel Cover (9:16)',
    editedTime: 'Edited 1 week ago',
    width: 1080,
    height: 1920,
    thumbnailBg: 'from-teal-800 via-emerald-800 to-slate-900',
    thumbnailIllustration: '🌿 निसर्गरम्य कोकण व सह्याद्री',
    previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=70',
  },
  {
    id: 'recent-6',
    title: 'Grand Opening Announcement Flyer',
    type: 'flyer',
    typeBadge: 'Flyer (A4)',
    editedTime: 'Edited 2 weeks ago',
    width: 2480,
    height: 3508,
    thumbnailBg: 'from-rose-800 via-red-800 to-amber-800',
    thumbnailIllustration: '🎉 भव्य शुभारंभ सोहळा',
    previewUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=70',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, openPricingModal } = useAuth();

  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Canva Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalCategory, setCreateModalCategory] = useState<string>('social');

  // Hero Toggle ('home' | 'templates')
  const [heroTab, setHeroTab] = useState<'home' | 'templates'>('home');

  // Hidden Upload Ref
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedCategory, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, tmpls] = await Promise.all([
        api.getCategories(),
        api.getTemplates(selectedCategory || undefined, searchTerm || undefined),
      ]);
      setCategories(cats);
      setTemplates(tmpls);

      if (user) {
        try {
          const projs = await api.getProjects();
          setUserProjects(projs);
        } catch (projErr) {
          console.error('Could not load user projects:', projErr);
        }
      } else {
        setUserProjects([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/templates?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      loadData();
    }
  };

  const handleOpenCreateModal = (category: string = 'social') => {
    setCreateModalCategory(category);
    setIsCreateModalOpen(true);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      navigate('/editor?title=' + encodeURIComponent(file.name.replace(/\.[^/.]+$/, '')));
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. PERSISTENT LEFT NAVIGATION RAIL (Images 4 & 5) */}
      {/* ------------------------------------------------------------- */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 p-4 space-y-6">
        {/* + Create a design CTA Button */}
        <div>
          <button
            onClick={() => handleOpenCreateModal('social')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8b3dff] to-[#a855f7] hover:from-[#7a2fe0] hover:to-[#9333ea] text-white font-extrabold text-sm shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create a design</span>
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold bg-purple-50 text-[#8b3dff] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => navigate('/templates')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <LayoutTemplate className="w-4 h-4 text-slate-500" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => navigate('/brand-kit')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Palette className="w-4 h-4 text-purple-600" />
            <span>Brand Kit</span>
          </button>

          <button
            onClick={() => navigate('/ai-studio')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Studio</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Folder className="w-4 h-4 text-slate-500" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => navigate('/dashboard?filter=starred')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>Starred Designs</span>
          </button>

          <button
            onClick={() => navigate('/dashboard?filter=trash')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
            <span>Trash</span>
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </button>
        </nav>

        {/* 10 GB Storage Indicator & 100% Free Forever Notice */}
        <div className="mt-auto pt-4 border-t border-slate-200 space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-purple-600" />
                Cloud Storage
              </span>
              <span className="font-mono text-[11px] text-purple-700">1.2 / 10 GB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" style={{ width: '12%' }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">12% utilized • 100% Free Forever</span>
          </div>

          <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/60 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-purple-950">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>100% Free Design Studio</span>
            </div>
            <p className="text-[10px] text-purple-800 leading-tight">
              All templates, Devanagari calligraphy fonts, AI tools, and 10 GB cloud storage are free forever.
            </p>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Hidden File Upload Input */}
        <input
          ref={fileUploadInputRef}
          type="file"
          accept="image/*"
          onChange={handleUploadFile}
          className="hidden"
        />

        {/* ------------------------------------------------------------- */}
        {/* 2A. CANVA HERO BANNER (Images 4 & 5: Deep Aura Gradient, 13 Icons) */}
        {/* ------------------------------------------------------------- */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1d0d38] via-[#2d1757] to-[#0c324b] text-white p-6 sm:p-10 shadow-xl border border-purple-500/20">
          
          {/* Ambient Glowing Rings / Aura Effect */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            
            {/* Top Toggle Switch: [ Home / For you ] [ Templates ] */}
            <div className="inline-flex p-1 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xs mb-2">
              <button
                onClick={() => setHeroTab('home')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  heroTab === 'home'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                For you
              </button>
              <button
                onClick={() => setHeroTab('templates')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  heroTab === 'templates'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                Templates
              </button>
            </div>

            {/* Main Headline (Image 4) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              What will you design today?
            </h1>

            {/* Subheading focusing on Marathi & English design platform */}
            <h2 className="text-xs sm:text-sm text-purple-200/80 font-medium max-w-2xl mx-auto">
              Create Stunning Marathi & English Designs with authentic calligraphy, bilingual layouts, and AI copy generation.
            </h2>

            {/* Glowing Central Search Bar (Images 4 & 5) */}
            <div className="pt-2 max-w-2xl mx-auto">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 border border-purple-200/40 focus-within:ring-2 focus-within:ring-purple-400 transition-all"
              >
                <div className="pl-3.5 pr-2 text-purple-600">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your content or Canva templates..."
                  className="w-full px-2 py-2 text-xs sm:text-sm text-slate-900 bg-transparent focus:outline-none placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#8b3dff] to-[#a855f7] hover:from-[#7a2fe0] hover:to-[#9333ea] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {/* --------------------------------------------------------- */}
            {/* 13 Circular Quick Tool Icons (Images 4 & 5) */}
            {/* --------------------------------------------------------- */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
                
                {/* 1. Templates */}
                <button
                  onClick={() => navigate('/templates')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-xs">
                    <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Templates</span>
                </button>

                {/* 2. Presentation */}
                <button
                  onClick={() => handleOpenCreateModal('presentations')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-xs">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Presentation</span>
                </button>

                {/* 3. Social media */}
                <button
                  onClick={() => handleOpenCreateModal('social')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-xs">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Social media</span>
                </button>

                {/* 4. Video */}
                <button
                  onClick={() => navigate('/video-editor')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-xs">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Video</span>
                </button>

                {/* 5. Printables */}
                <button
                  onClick={() => handleOpenCreateModal('printables')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                    <Printer className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Printables</span>
                </button>

                {/* 6. Doc */}
                <button
                  onClick={() => navigate('/documents')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Doc</span>
                </button>

                {/* 7. Whiteboard */}
                <button
                  onClick={() => navigate('/whiteboards')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Whiteboard</span>
                </button>

                {/* 8. Sheet */}
                <button
                  onClick={() => navigate('/spreadsheets')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all shadow-xs">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Sheet</span>
                </button>

                {/* 9. Website */}
                <button
                  onClick={() => navigate('/websites')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-xs">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Website</span>
                </button>

                {/* 10. Magic Layers */}
                <button
                  onClick={() => navigate('/ai-studio')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Magic Studio</span>
                </button>

                {/* 11. Custom size */}
                <button
                  onClick={() => handleOpenCreateModal('custom')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-500/20 border border-slate-400/40 text-slate-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-500 group-hover:text-white transition-all shadow-xs">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Custom size</span>
                </button>

                {/* 12. Upload */}
                <button
                  onClick={() => fileUploadInputRef.current?.click()}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xs">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">Upload</span>
                </button>

                {/* 13. More */}
                <button
                  onClick={() => navigate('/apps')}
                  className="group flex flex-col items-center gap-1.5 min-w-[64px] cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-fuchsia-500 group-hover:text-white transition-all shadow-xs">
                    <MoreHorizontal className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 group-hover:text-white">More</span>
                </button>

              </div>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 2B. CONTINUE DESIGNING (Recent Designs Grid - Images 4 & 5) */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Continue designing</h2>
              <p className="text-xs text-slate-500">Pick up right where you left off</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-bold text-[#8b3dff] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>See all {userProjects.length > 0 ? userProjects.length : RECENT_DESIGNS.length} designs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {userProjects.length > 0 ? (
              userProjects.slice(0, 6).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => navigate(`/editor?projectId=${proj.id}`)}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[#8b3dff] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
                    {proj.thumbnailData ? (
                      <img
                        src={proj.thumbnailData}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-purple-700 via-indigo-700 to-slate-900 flex items-center justify-center p-4 text-center">
                        <span className="text-xs font-bold text-white drop-shadow-sm">
                          {proj.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <button className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-md pointer-events-auto">
                        Open in Editor
                      </button>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                      {proj.width} × {proj.height}
                    </span>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#8b3dff] transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{proj.updatedAt ? new Date(proj.updatedAt).toLocaleDateString() : 'Recent'}</span>
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Saved Project</span>
                      <span className="text-purple-600 font-bold group-hover:underline">Edit</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              RECENT_DESIGNS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.templateId) {
                      navigate(`/editor?templateId=${item.templateId}`);
                    } else {
                      navigate(`/editor?w=${item.width}&h=${item.height}&title=${encodeURIComponent(item.title)}`);
                    }
                  }}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[#8b3dff] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  {/* Visual Thumbnail */}
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
                    {item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${item.thumbnailBg} flex items-center justify-center p-4 text-center`}>
                        <span className="text-xs font-bold text-white drop-shadow-sm">
                          {item.thumbnailIllustration}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay Button: pointer-events-none on wrapper, auto on button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <button className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-md pointer-events-auto">
                        Open in Editor
                      </button>
                    </div>

                    {/* Format Pill */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                      {item.typeBadge}
                    </span>
                  </div>

                  {/* Card Meta */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#8b3dff] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.editedTime}</span>
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono">{item.width} × {item.height}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editor?w=${item.width}&h=${item.height}&title=${encodeURIComponent(item.title)}`);
                        }}
                        className="hover:text-slate-700 p-0.5"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 2C. BROWSE TEMPLATES BY CATEGORY (Live Marketplace) */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Browse Templates by Category
              </h2>
              <p className="text-xs text-slate-500">
                Over {templates.length} editable designs for festivals, weddings, and local businesses
              </p>
            </div>
            <button
              onClick={() => navigate('/templates')}
              className="text-xs font-bold text-[#8b3dff] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Category Chips Rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === ''
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Templates
            </button>
            {[
              { slug: 'festivals', name: 'Festivals & Events' },
              { slug: 'business', name: 'Business & Ads' },
              { slug: 'offers', name: 'Sales & Offers' },
              { slug: 'birthday', name: 'Birthdays' },
              { slug: 'wedding', name: 'Weddings & Invitations' },
              { slug: 'social', name: 'Social Media & Status' },
              { slug: 'education', name: 'Education & Quotes' },
            ].map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          {loading ? (
            <div className="py-20 text-center text-sm font-semibold text-slate-500">
              Loading templates...
            </div>
          ) : templates.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
              <p className="text-slate-600 font-bold text-sm">No templates found in this category.</p>
              <button
                onClick={() => { setSelectedCategory(''); setSearchTerm(''); }}
                className="mt-3 text-xs font-bold text-orange-600 hover:underline cursor-pointer"
              >
                View all templates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.slice(0, 8).map((tmpl) => (
                <TemplateCard key={tmpl.id} template={tmpl} />
              ))}
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 2D. VALUE PROPOSITIONS & TYPOGRAPHY FOCUS */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Marathi Design Studio?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Engineered with zero-ligature-detachment Devanagari typography, modern Latin fonts, and authentic bilingual layouts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg font-serif mb-4">
                अ/A
              </div>
              <h4 className="font-extrabold text-base text-slate-900 mb-2">Devanagari & Latin Typography</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamlessly type in Marathi and English with licensed fonts like Mukta, Inter, Poppins, AMS Calligraphy, and Noto Sans without ligature clipping.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 mb-2">AI-Powered Copywriter</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate high-converting headlines, festive greetings, and advertising slogans in Marathi and English instantly.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900 mb-2">High-Resolution Exports</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download your finished designs in crystal-clear PNG, JPEG, and 300 DPI print-ready PDF formats ready for printing and social media.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-900 rounded-2xl text-slate-400 py-8 px-6 text-center text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">M</span>
              <span className="font-bold text-white">Marathi Design Studio</span>
              <span>— Cloud graphic design platform for Maharashtra and beyond</span>
            </div>
            <div>
              © 2026 Marathi Design Studio. All rights reserved. English interface with bilingual canvas content.
            </div>
          </div>
        </footer>

      </main>

      {/* ------------------------------------------------------------- */}
      {/* 3. CANVA CREATE MODAL (Image 3) */}
      {/* ------------------------------------------------------------- */}
      <CanvaCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialCategory={createModalCategory}
        onSelectDimensions={(width, height, title) => {
          setIsCreateModalOpen(false);
          navigate(`/editor?w=${width}&h=${height}&title=${encodeURIComponent(title || 'Untitled Design')}`);
        }}
      />
    </div>
  );
};
