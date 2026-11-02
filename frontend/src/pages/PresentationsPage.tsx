import React, { useState } from 'react';
import {
  Presentation,
  Plus,
  Play,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Layout,
  Type,
  Image,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  body: string;
  background: string;
  textColor: string;
}

export const PresentationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      title: 'महाराष्ट्राचा व्यापार व डिजिटल क्रांती',
      subtitle: 'मराठी डिझाईन स्टुडिओ सादरीकरण',
      body: 'स्थानिक उद्योजक, दुकानदार व स्टार्टअप्ससाठी खास तयार केलेले आधुनिक सादरीकरण मंच.',
      background: 'bg-gradient-to-br from-orange-600 to-amber-700',
      textColor: 'text-white',
    },
    {
      id: 2,
      title: 'आमचे ध्येय व उद्दिष्टे (Mission & Vision)',
      subtitle: 'Key Goals for 2026',
      body: '१. प्रत्येक व्यवसायाला स्वतःचे दर्जेदार मराठी ब्रँडिंग मिळवून देणे.\n२. शून्य तांत्रिक अडचणीत आकर्षक पोस्टर्स व व्हिडिओ तयार करणे.\n३. उच्च दर्जाच्या देवनागरी फॉन्ट्सचा विनामूल्य वापर उपलब्ध करणे.',
      background: 'bg-gradient-to-br from-slate-900 to-indigo-950',
      textColor: 'text-white',
    },
    {
      id: 3,
      title: 'उत्कृष्ट निकाल व बाजारपेठ वाढ',
      subtitle: 'Market Growth & Results',
      body: 'गेल्या ६ महिन्यांत ५०,०००+ हून अधिक पोस्टर्स, लग्नपत्रिका व सण शुभेच्छा पत्रके यशस्वीरित्या तयार झाली.',
      background: 'bg-gradient-to-br from-purple-900 to-slate-900',
      textColor: 'text-white',
    },
  ]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

  const activeSlide = slides[activeSlideIndex] || slides[0];

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now(),
      title: 'नवीन स्लाइड शीर्षक (Slide Title)',
      subtitle: 'उपशीर्षक किंवा तारीख',
      body: 'येथे तुमचे मुख्य मुद्दे किंवा सादरीकरणाचा तपशील लिहा.',
      background: 'bg-gradient-to-br from-slate-800 to-slate-900',
      textColor: 'text-white',
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleDuplicateSlide = (index: number) => {
    const target = slides[index];
    const duplicated: Slide = {
      ...target,
      id: Date.now(),
      title: `${target.title} (प्रत)`,
    };
    const next = [...slides];
    next.splice(index + 1, 0, duplicated);
    setSlides(next);
    setActiveSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const next = slides.filter((_, i) => i !== index);
    setSlides(next);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const handleUpdateSlide = (field: keyof Slide, value: string) => {
    const next = [...slides];
    next[activeSlideIndex] = { ...next[activeSlideIndex], [field]: value };
    setSlides(next);
  };

  if (isPresenting) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none text-white p-8">
        <button
          onClick={() => setIsPresenting(false)}
          className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors cursor-pointer"
        >
          Exit Presenter Mode (Esc)
        </button>

        <div className="max-w-4xl text-center space-y-6">
          <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">
            Slide {activeSlideIndex + 1} of {slides.length}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">{activeSlide.title}</h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium">{activeSlide.subtitle}</p>
          <div className="text-lg md:text-xl text-slate-200 whitespace-pre-line leading-relaxed max-w-2xl mx-auto pt-4">
            {activeSlide.body}
          </div>
        </div>

        {/* Presenter Navigation Controls */}
        <div className="absolute bottom-8 flex items-center gap-4">
          <button
            onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
            disabled={activeSlideIndex === 0}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm font-bold">
            {activeSlideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={() => setActiveSlideIndex(Math.min(slides.length - 1, activeSlideIndex + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900">Marathi Presentations & Pitch Decks</h1>
            <p className="text-xs text-slate-500">Design dynamic slide presentations with Devanagari typography</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPresenting(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Present (Full Screen)</span>
          </button>
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
          >
            <span>Open in Canvas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Slide Thumbnails Rail */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-slate-500">Slides ({slides.length})</span>
              <button
                onClick={handleAddSlide}
                className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slide</span>
              </button>
            </div>

            <div className="space-y-3">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    idx === activeSlideIndex
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>#{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateSlide(idx);
                        }}
                        className="p-1 hover:text-slate-900"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {slides.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSlide(idx);
                          }}
                          className="p-1 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={`h-16 rounded-lg ${s.background} p-2 flex flex-col justify-center text-white`}>
                    <span className="text-[10px] font-bold truncate">{s.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Active Slide Canvas */}
        <main className="flex-1 p-8 flex items-center justify-center overflow-auto">
          <div className="w-full max-w-4xl aspect-video rounded-3xl shadow-2xl p-10 flex flex-col justify-center space-y-6 text-center select-text relative overflow-hidden transition-all bg-gradient-to-br from-slate-900 to-slate-950 text-white">
            <input
              type="text"
              value={activeSlide.title}
              onChange={(e) => handleUpdateSlide('title', e.target.value)}
              className="w-full text-3xl md:text-5xl font-black bg-transparent border-none text-center outline-hidden focus:ring-1 focus:ring-orange-400 rounded-lg py-1"
            />
            <input
              type="text"
              value={activeSlide.subtitle}
              onChange={(e) => handleUpdateSlide('subtitle', e.target.value)}
              className="w-full text-lg md:text-xl font-semibold text-orange-400 bg-transparent border-none text-center outline-hidden focus:ring-1 focus:ring-orange-400 rounded-lg py-1"
            />
            <textarea
              rows={4}
              value={activeSlide.body}
              onChange={(e) => handleUpdateSlide('body', e.target.value)}
              className="w-full max-w-2xl mx-auto text-sm md:text-base text-slate-300 bg-transparent border-none text-center outline-hidden focus:ring-1 focus:ring-orange-400 rounded-lg resize-none p-2"
            />
          </div>
        </main>
      </div>
    </div>
  );
};
