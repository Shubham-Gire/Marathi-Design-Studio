import React, { useState, useRef, useEffect } from 'react';
import {
  Keyboard,
  Languages,
  X,
  Sparkles,
  ArrowUp,
  Delete,
  CornerDownLeft,
  Copy,
  Check,
  Minimize2,
  Maximize2
} from 'lucide-react';
import {
  INSCRIPT_ROWS,
  transliterateText,
  QUICK_MARATHI_PHRASES
} from '../../utils/marathiTransliteration';

interface CanvaMarathiKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertText: (text: string) => void;
  selectedText?: string;
}

export const CanvaMarathiKeyboard: React.FC<CanvaMarathiKeyboardProps> = ({
  isOpen,
  onClose,
  onInsertText,
  selectedText = '',
}) => {
  const [activeTab, setActiveTab] = useState<'inscript' | 'phonetic' | 'phrases'>('phonetic');
  const [phoneticInput, setPhoneticInput] = useState('');
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const phoneticInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'phonetic') {
      setTimeout(() => phoneticInputRef.current?.focus(), 100);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // Real-time phonetic transliteration result
  const transliteratedResult = transliterateText(phoneticInput);

  const handleKeyClick = (char: string) => {
    onInsertText(char);
  };

  const handleInsertPhonetic = () => {
    if (transliteratedResult.trim()) {
      onInsertText(transliteratedResult);
      setPhoneticInput('');
    }
  };

  // 12 Test Conjuncts specifically requested by User:
  // क्ष, ज्ञ, त्र, श्र, स्त्र, क्र, प्र, ग्र, द्य, क्त, ळ, ऱ
  const TEST_CONJUNCTS = [
    'क्ष', 'ज्ञ', 'त्र', 'श्र', 'स्त्र', 'क्र', 'प्र', 'ग्र', 'द्य', 'क्त', 'ळ', 'ऱ'
  ];

  return (
    <div
      role="dialog"
      data-testid="canva-marathi-keyboard"
      className={`canva-marathi-keyboard fixed bottom-12 right-6 z-50 bg-[#18191b] border border-[#2e3034] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-gray-200 backdrop-blur-xl transition-all duration-200 select-none ${
        isMinimized ? 'w-80' : 'w-[95vw] max-w-[680px]'
      }`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* 1. HEADER */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#28292d] bg-[#141517] rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs">
            म
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Marathi Typography & Typing Studio</span>
              <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/50">
                Unicode
              </span>
            </h4>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#25272b] transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-300 transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3 space-y-3">
          {/* 2. MODE SELECTOR PILLS */}
          <div className="flex items-center justify-between gap-2 border-b border-[#25272a] pb-2.5">
            <div className="flex items-center gap-1 bg-[#121315] p-0.5 rounded-xl border border-[#2b2d31]">
              <button
                onClick={() => setActiveTab('phonetic')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'phonetic'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                <span>Phonetic (इंग्रजी → मराठी)</span>
              </button>
              <button
                onClick={() => setActiveTab('inscript')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'inscript'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>InScript Keyboard</span>
              </button>
              <button
                onClick={() => setActiveTab('phrases')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'phrases'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Phrases</span>
              </button>
            </div>
          </div>

          {/* 3. TEST CONJUNCTS FAST PICKER (Every requested conjunct is 1-click ready) */}
          <div className="bg-[#121315] px-2.5 py-1.5 rounded-xl border border-[#282a2e] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider shrink-0">
              Conjuncts:
            </span>
            {TEST_CONJUNCTS.map((cj) => (
              <button
                key={cj}
                onClick={() => handleKeyClick(cj)}
                className="px-2 py-1 bg-[#1e2024] hover:bg-[#2b2d33] hover:text-purple-300 border border-[#343538] hover:border-purple-500 rounded-lg text-xs font-bold text-gray-200 transition-all cursor-pointer shrink-0"
                title={`Insert ${cj}`}
              >
                {cj}
              </button>
            ))}
          </div>

          {/* 4. TAB 1: PHONETIC TRANSLITERATION ASSISTANT */}
          {activeTab === 'phonetic' && (
            <div className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 flex items-center justify-between">
                  <span>Type in English / Roman phonetic (e.g. namaskar, chhatrapati shivaji maharaj, pune)</span>
                  <span className="text-purple-400">Live Marathi Unicode Preview</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    ref={phoneticInputRef}
                    type="text"
                    value={phoneticInput}
                    onChange={(e) => setPhoneticInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleInsertPhonetic();
                      }
                    }}
                    placeholder="Type words like 'namaskar', 'maharashtra', 'swagatam'..."
                    className="flex-1 bg-[#202226] border border-[#35373b] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleInsertPhonetic}
                    disabled={!transliteratedResult.trim()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:hover:bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-md"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>Insert</span>
                  </button>
                </div>
              </div>

              {/* Real-time Result Card */}
              {phoneticInput && (
                <div className="bg-[#121315] border border-purple-500/40 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block mb-0.5">Marathi Output:</span>
                    <span className="text-base font-bold text-white tracking-wide">{transliteratedResult}</span>
                  </div>
                  <button
                    onClick={handleInsertPhonetic}
                    className="px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-600/50 text-purple-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add to Canvas →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 5. TAB 2: INSCRIPT VIRTUAL KEYBOARD */}
          {activeTab === 'inscript' && (
            <div className="space-y-1.5">
              {INSCRIPT_ROWS.map((row, rowIdx) => (
                <div key={rowIdx} className="flex items-center gap-1 justify-center">
                  {row.map((k) => {
                    const charToInsert = isShiftActive ? k.shift : k.normal;
                    const isMatra = k.type === 'matra';
                    return (
                      <button
                        key={k.key}
                        onClick={() => handleKeyClick(charToInsert)}
                        className={`min-w-[34px] sm:min-w-[40px] h-9 px-1 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer border shadow-xs ${
                          isMatra
                            ? 'bg-[#1d222d] border-[#364257] hover:bg-[#283245] text-sky-300'
                            : 'bg-[#202226] border-[#343538] hover:bg-[#2c2f35] text-gray-100 hover:text-white'
                        }`}
                        title={`${k.key.toUpperCase()} → ${charToInsert}`}
                      >
                        <span className="text-[13px] leading-tight">{charToInsert}</span>
                        <span className="text-[9px] text-gray-500 font-mono -mt-0.5 leading-none">
                          {isShiftActive ? k.shift : k.key}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Functional Controls Row: Shift, Space, Backspace */}
              <div className="flex items-center gap-2 justify-center pt-1.5">
                <button
                  onClick={() => setIsShiftActive(!isShiftActive)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isShiftActive
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                      : 'bg-[#202226] hover:bg-[#2c2f35] text-gray-300 border-[#343538]'
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Shift {isShiftActive ? '(Active)' : ''}</span>
                </button>

                <button
                  onClick={() => handleKeyClick(' ')}
                  className="flex-1 max-w-[240px] py-2 bg-[#202226] hover:bg-[#2c2f35] text-gray-300 border border-[#343538] rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Spacebar (जागा)
                </button>

                <button
                  onClick={() => handleKeyClick('।')}
                  className="px-3 py-2 bg-[#202226] hover:bg-[#2c2f35] text-gray-300 border border-[#343538] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  title="Full stop (Danda)"
                >
                  ।
                </button>
                <button
                  onClick={() => handleKeyClick('॥')}
                  className="px-3 py-2 bg-[#202226] hover:bg-[#2c2f35] text-gray-300 border border-[#343538] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  title="Double Danda"
                >
                  ॥
                </button>
              </div>
            </div>
          )}

          {/* 6. TAB 3: QUICK MARATHI PHRASES (1-CLICK INSERTION) */}
          {activeTab === 'phrases' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto scrollbar-thin">
              {QUICK_MARATHI_PHRASES.map((ph, idx) => (
                <div
                  key={idx}
                  onClick={() => onInsertText(ph.text)}
                  className="p-2.5 bg-[#141517] hover:bg-[#222428] border border-[#2b2d31] hover:border-purple-500 rounded-xl cursor-pointer transition-all group flex items-start justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-bold text-purple-400 block mb-0.5">{ph.label}</span>
                    <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed">{ph.text}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInsertText(ph.text);
                      setCopiedIndex(idx);
                      setTimeout(() => setCopiedIndex(null), 1200);
                    }}
                    className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-purple-600/30 transition-colors shrink-0"
                    title="Insert"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
