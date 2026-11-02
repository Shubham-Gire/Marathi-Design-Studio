import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  Keyboard,
  FileQuestion,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { CanvaShortcutsModal } from '../components/canva/CanvaShortcutsModal';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const HelpCenterPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  const faqs: FaqItem[] = [
    {
      category: 'Fonts & Typography',
      q: 'How do I type and render Marathi (Devanagari) conjuncts and matras properly?',
      a: 'Marathi Design Studio natively supports Unicode Devanagari. You can type directly in Marathi using standard Google Input Tools, Windows Devanagari InScript keyboard, or copy and paste Marathi text. All matras, velanti, and jodayakshare render with sub-pixel precision across our authentic font collection (Mukta, Gotu, Hind, Noto Sans Devanagari).'
    },
    {
      category: 'Canvas & Export',
      q: 'Can I export designs with a transparent background for logos and stickers?',
      a: 'Yes! When you click Download or Export in the editor, choose PNG format and check the "Transparent Background" option. This will clear the canvas white fill and produce an alpha-channel transparent PNG.'
    },
    {
      category: 'Storage & Quotas',
      q: 'What are the 10 GB independent storage limits?',
      a: 'The platform enforces two strict independent 10 GB limits on shared assets: 10.00 GB for the Template Library and 10.00 GB for the Reusable Elements Library. Server-side byte accounting prevents overflow and maintains deduplicated assets via SHA-256.'
    },
    {
      category: 'Subscription & Plans',
      q: 'How do I upgrade from Free to Pro tier?',
      a: 'Click "Pricing & Plans" in the navigation bar. You can choose the Pro tier (₹२९९/month) to unlock unlimited projects, premium Marathi templates, and priority AI copywriting assistance.'
    },
    {
      category: 'Keyboard Shortcuts',
      q: 'Which keyboard shortcuts are supported?',
      a: 'We support standard Canva shortcuts: Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+C/V (Copy/Paste), Ctrl+D (Duplicate), Ctrl+G (Group), Ctrl+Shift+G (Ungroup), T (Text), R (Rectangle), C (Circle), L (Line), and ? to view the full hotkeys modal.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      !query ||
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 text-white shadow-lg text-center space-y-4">
          <h1 className="text-3xl font-black tracking-tight">Help Center & Knowledge Base</h1>
          <p className="text-sm text-orange-100 max-w-xl mx-auto leading-relaxed">
            Find answers to common questions about Marathi typography, canvas shortcuts, high-resolution exports, and plan limits.
          </p>

          <div className="max-w-lg mx-auto relative pt-2">
            <Search className="w-5 h-5 absolute left-3 top-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search help articles and guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-slate-900 font-semibold text-sm shadow-md focus:outline-hidden"
            />
          </div>
        </div>

        {/* Quick Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setIsShortcutsModalOpen(true)}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-orange-500 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-600 group-hover:scale-105 transition-transform">
                <Keyboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Keyboard Shortcuts Guide</h3>
                <p className="text-xs text-slate-400">View all hotkeys for canvas productivity</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
          </div>

          <div
            onClick={() => alert('Support ticket system ready: support@marathidesignstudio.com')}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between hover:border-orange-500 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-600 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Contact Support</h3>
                <p className="text-xs text-slate-400">Reach our technical and design assistance team</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 cursor-pointer"
                >
                  <span className="font-serif">{faq.q}</span>
                  {openIdx === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>

                {openIdx === idx && (
                  <p className="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-200 select-text">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CanvaShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
};
