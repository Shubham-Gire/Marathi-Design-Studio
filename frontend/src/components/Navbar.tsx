import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Palette,
  Crown,
  LogOut,
  PlusCircle,
  Search,
  Command,
  ChevronDown,
  LayoutTemplate,
  Presentation,
  FileText,
  PenTool,
  Table,
  Video,
  Globe,
  Share2,
  Sparkles,
  Settings,
  HelpCircle,
  HardDrive,
  ShieldAlert,
  Menu,
  X,
  Files
} from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { user, logout, openAuthModal, openPricingModal, isPro } = useAuth();
  const navigate = useNavigate();
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="text-2xl font-bold font-serif">M</span>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
              Marathi Design Studio
            </span>
            <span className="hidden sm:block text-[11px] font-medium text-orange-600 -mt-1">
              Cloud Graphic Design Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <Link to="/templates" className="hover:text-orange-600 transition-colors">
            Templates
          </Link>
          <Link to="/brand-kit" className="hover:text-orange-600 transition-colors">
            Brand Kit
          </Link>
          <Link to="/ai-studio" className="flex items-center gap-1 hover:text-orange-600 transition-colors text-purple-600 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio</span>
          </Link>

          {/* Tools & Modules Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsToolsDropdownOpen(true)}
            onMouseLeave={() => setIsToolsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-orange-600 transition-colors py-2 cursor-pointer">
              <span>Creative Modules</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isToolsDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-100">
                <Link
                  to="/presentations"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <Presentation className="w-4 h-4 text-orange-600" />
                  <span>Presentations & Pitch Decks</span>
                </Link>
                <Link
                  to="/documents"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Documents & Proposals</span>
                </Link>
                <Link
                  to="/whiteboards"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <PenTool className="w-4 h-4 text-purple-600" />
                  <span>Infinite Whiteboards</span>
                </Link>
                <Link
                  to="/spreadsheets"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <Table className="w-4 h-4 text-emerald-600" />
                  <span>Spreadsheets & Charts</span>
                </Link>
                <Link
                  to="/video-editor"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <Video className="w-4 h-4 text-red-600" />
                  <span>Video & Reels Timeline</span>
                </Link>
                <Link
                  to="/websites"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Websites & Landing Pages</span>
                </Link>
                <Link
                  to="/social-media"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <Share2 className="w-4 h-4 text-pink-600" />
                  <span>Social Media Planner</span>
                </Link>
                <Link
                  to="/pdf-tools"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600"
                >
                  <Files className="w-4 h-4 text-rose-600" />
                  <span>PDF Tools & Merge</span>
                </Link>
                <Link
                  to="/apps"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-orange-600 border-t border-slate-100 mt-1 pt-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Apps & Integrations</span>
                </Link>
              </div>
            )}
          </div>

          <Link to="/pricing" className="hover:text-orange-600 transition-colors">
            Pricing
          </Link>
          <Link to="/admin" className="hover:text-orange-600 transition-colors text-slate-500">
            Admin
          </Link>
        </nav>

        {/* Right CTA / Controls */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-semibold transition-colors cursor-pointer"
              title="Search commands and tools (/ or Ctrl+E)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.2 bg-white border border-slate-200 rounded-md text-[10px] font-mono font-bold text-slate-600">
                /
              </kbd>
            </button>
          )}

          {/* Create Design CTA */}
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm shadow-orange-600/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Design</span>
          </button>

          {/* User Account State */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                aria-label="User account menu"
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[11px] text-slate-400">Signed in as:</p>
                  <p className="font-bold text-slate-800 truncate">{user.fullName || user.email}</p>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block mt-0.5">
                    100% Free Plan (All Features Unlocked)
                  </span>
                </div>

                <div className="p-1 space-y-0.5">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <span>My Designs & Projects</span>
                  </Link>
                  <Link
                    to="/brand-kit"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Brand Kit</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Account Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Help Center</span>
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin Console</span>
                  </Link>
                </div>

                <div className="p-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/', { replace: true });
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Navigation Toggle (WCAG AA & UI/UX Audit) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer ml-1"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-orange-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 shadow-2xl p-4 max-h-[85vh] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl font-bold text-slate-800 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
            >
              <span>Home</span>
            </Link>
            <Link
              to="/templates"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl font-bold text-slate-800 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
            >
              <span>Templates</span>
            </Link>
            <Link
              to="/brand-kit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl font-bold text-slate-800 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
            >
              <span>Brand Kit</span>
            </Link>
            <Link
              to="/ai-studio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Studio</span>
            </Link>

            <div className="pt-2 border-t border-slate-100 font-bold text-xs text-slate-400 uppercase tracking-wider px-3">
              Creative Modules
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1">
              <Link
                to="/presentations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Presentation className="w-3.5 h-3.5 text-orange-600" />
                <span>Presentations</span>
              </Link>
              <Link
                to="/documents"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Documents</span>
              </Link>
              <Link
                to="/whiteboards"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <PenTool className="w-3.5 h-3.5 text-purple-600" />
                <span>Whiteboards</span>
              </Link>
              <Link
                to="/spreadsheets"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Table className="w-3.5 h-3.5 text-emerald-600" />
                <span>Spreadsheets</span>
              </Link>
              <Link
                to="/video-editor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Video className="w-3.5 h-3.5 text-red-600" />
                <span>Reels & Video</span>
              </Link>
              <Link
                to="/websites"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Websites</span>
              </Link>
              <Link
                to="/social-media"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-600" />
                <span>Social Media</span>
              </Link>
              <Link
                to="/pdf-tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Files className="w-3.5 h-3.5 text-rose-600" />
                <span>PDF Tools</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs">
              <Link
                to="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-bold text-slate-600 hover:text-orange-600"
              >
                Free Platform Details
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-bold text-slate-400 hover:text-orange-600"
              >
                Admin
              </Link>
            </div>

            {user && (
              <div className="pt-2 border-t border-slate-100 px-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                    navigate('/', { replace: true });
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out ({user.email})</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
