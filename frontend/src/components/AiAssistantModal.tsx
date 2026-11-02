import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, Copy, Check, ArrowRight, Wand2 } from 'lucide-react';
import { AiCopyResponse, AiBriefResponse, AiImproveResponse } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTextToCanvas?: (text: string, fontSize?: number, color?: string, fontWeight?: string) => void;
  onApplyDesignProposal?: (proposal: AiBriefResponse) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddTextToCanvas,
  onApplyDesignProposal
}) => {
  const { user, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<'copy' | 'assistant' | 'improve'>('copy');
  
  // Copy tab state
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('festivals');
  const [copyResult, setCopyResult] = useState<AiCopyResponse | null>(null);

  // Assistant tab state
  const [brief, setBrief] = useState('');
  const [briefResult, setBriefResult] = useState<AiBriefResponse | null>(null);

  // Improve tab state
  const [textToImprove, setTextToImprove] = useState('');
  const [improveResult, setImproveResult] = useState<AiImproveResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGenerateCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      openAuthModal('login');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await api.generateCopy(topic, 'engaging', category);
      setCopyResult(res);
    } catch (err: any) {
      setError(err.message || 'Error generating AI copy.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      openAuthModal('login');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await api.designAssistant(brief);
      setBriefResult(res);
    } catch (err: any) {
      setError(err.message || 'Error generating design proposal.');
    } finally {
      setLoading(false);
    }
  };

  const handleImproveText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      openAuthModal('login');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await api.improveText(textToImprove);
      setImproveResult(res);
    } catch (err: any) {
      setError(err.message || 'Error improving text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-slate-900">
              AI Copy & Design Assistant
            </h3>
            <p className="text-xs text-slate-500">
              Generate Marathi, English, and bilingual headlines, slogans, and layout proposals
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('copy')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'copy'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Copy & Headlines
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'assistant'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Design Generator (Brief)
          </button>
          <button
            onClick={() => setActiveTab('improve')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'improve'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Text Polisher (Rewrite)
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        {/* TAB 1: COPY GENERATOR */}
        {activeTab === 'copy' && (
          <div>
            <form onSubmit={handleGenerateCopy} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic or Business Name (e.g. Diwali Sweets, Restaurant Grand Opening, Real Estate Launch)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Diwali Sale 50% discount..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="festivals">Festivals & Celebrations</option>
                    <option value="business">Business & Advertising</option>
                    <option value="offers">Shop Offers & Discounts</option>
                    <option value="birthday">Birthday Wishes & Greetings</option>
                    <option value="wedding">Wedding & Event Invitations</option>
                    <option value="social">Social Media Posts</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>{loading ? 'Generating...' : 'Generate Copy'}</span>
                  </button>
                </div>
              </div>
            </form>

            {copyResult && (
              <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-1">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Headlines
                  </h4>
                  <div className="space-y-2">
                    {copyResult.headlines.map((h, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-800">
                        <span className="font-semibold">{h}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleCopyClipboard(h, `h-${i}`)}
                            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 cursor-pointer"
                            title="Copy to clipboard"
                          >
                            {copiedIndex === `h-${i}` ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          {onAddTextToCanvas && (
                            <button
                              onClick={() => { onAddTextToCanvas(h, 48, '#0f172a', 'bold'); onClose(); }}
                              className="px-2.5 py-1 bg-orange-600 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Add to Canvas
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Slogans & Taglines
                  </h4>
                  <div className="space-y-2">
                    {copyResult.slogans.map((s, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-800">
                        <span>{s}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleCopyClipboard(s, `s-${i}`)}
                            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 cursor-pointer"
                          >
                            {copiedIndex === `s-${i}` ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          {onAddTextToCanvas && (
                            <button
                              onClick={() => { onAddTextToCanvas(s, 32, '#ea580c', 'normal'); onClose(); }}
                              className="px-2.5 py-1 bg-orange-600 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Add to Canvas
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DESIGN ASSISTANT */}
        {activeTab === 'assistant' && (
          <div>
            <form onSubmit={handleGenerateAssistant} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe your design brief in Marathi or English
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Create a summer festival flyer for fresh mango shakes with a Buy 1 Get 1 Free offer..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Analyzing design...' : 'Generate Poster Layout'}</span>
              </button>
            </form>

            {briefResult && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">{briefResult.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
                    Font: {briefResult.recommendedFont}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs">
                  <p className="font-bold text-slate-800">Headline: {briefResult.headerText}</p>
                  <p className="text-slate-600">Subtext: {briefResult.subText}</p>
                  <p className="text-slate-500 italic">Footer: {briefResult.footerText}</p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-700">Palette:</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: briefResult.backgroundColor }} title="Background" />
                    <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: briefResult.accentColor }} title="Accent" />
                    <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: briefResult.textColor }} title="Text" />
                  </div>
                </div>

                {onApplyDesignProposal && (
                  <button
                    onClick={() => { onApplyDesignProposal(briefResult); onClose(); }}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>Apply Proposal to Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TEXT REWRITE */}
        {activeTab === 'improve' && (
          <div>
            <form onSubmit={handleImproveText} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter original text to polish
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. We have opened a new clothing showroom with 20% discount..."
                  value={textToImprove}
                  onChange={(e) => setTextToImprove(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Wand2 className="w-4 h-4" />
                <span>{loading ? 'Polishing...' : 'Get Polished Variations'}</span>
              </button>
            </form>

            {improveResult && (
              <div className="mt-6 space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Short Headline Variant:</p>
                  <p className="font-semibold text-slate-800">{improveResult.shortVariant}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Standard Marketing Variant:</p>
                  <p className="font-semibold text-slate-800">{improveResult.standardVariant}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Formal Invitation Variant:</p>
                  <p className="font-semibold text-slate-800">{improveResult.detailedVariant}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
