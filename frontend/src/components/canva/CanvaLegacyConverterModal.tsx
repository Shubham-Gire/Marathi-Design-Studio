import React, { useState } from 'react';
import {
  X,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import {
  krutiDevToUnicode,
  unicodeToKrutiDev,
  shivajiToUnicode,
  detectDevanagariEncoding
} from '../../utils/devanagariConverter';

interface CanvaLegacyConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
  onApplyToCanvas?: (convertedText: string) => void;
}

export const CanvaLegacyConverterModal: React.FC<CanvaLegacyConverterModalProps> = ({
  isOpen,
  onClose,
  initialText = '',
  onApplyToCanvas,
}) => {
  const [sourceText, setSourceText] = useState(initialText);
  const [conversionType, setConversionType] = useState<'kruti_to_unicode' | 'unicode_to_kruti' | 'shivaji_to_unicode'>('kruti_to_unicode');
  const [convertedText, setConvertedText] = useState('');
  const [previousText, setPreviousText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Auto-detect encoding on initial open or text change
  React.useEffect(() => {
    if (initialText) {
      setSourceText(initialText);
      const encoding = detectDevanagariEncoding(initialText);
      if (encoding === 'krutidev') {
        setConversionType('kruti_to_unicode');
      } else if (encoding === 'unicode') {
        setConversionType('unicode_to_kruti');
      } else if (encoding === 'shivaji') {
        setConversionType('shivaji_to_unicode');
      }
    }
  }, [initialText, isOpen]);

  // Handle Escape key to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConvert = () => {
    setPreviousText(convertedText);
    let result = '';
    if (conversionType === 'kruti_to_unicode') {
      result = krutiDevToUnicode(sourceText);
    } else if (conversionType === 'unicode_to_kruti') {
      result = unicodeToKrutiDev(sourceText);
    } else if (conversionType === 'shivaji_to_unicode') {
      result = shivajiToUnicode(sourceText);
    }
    setConvertedText(result);
  };

  const handleApply = () => {
    if (onApplyToCanvas && convertedText) {
      onApplyToCanvas(convertedText);
      onClose();
    }
  };

  const handleCopy = () => {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  const handleRevert = () => {
    if (previousText !== null) {
      setConvertedText(previousText);
    }
  };

  const sourceEncoding = detectDevanagariEncoding(sourceText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#18191b] border border-[#2e3034] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200 text-xs">
        
        {/* 1. MODAL HEADER */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#28292d] bg-[#141517]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Legacy Marathi & Devanagari Font Converter</h3>
              <p className="text-[11px] text-gray-400">Convert Kruti Dev, Shree Lipi, and Shivaji legacy fonts to Standard Unicode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#25272b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. BODY CONTENT */}
        <div className="p-5 space-y-4">
          
          {/* Conversion Mode Pills */}
          <div className="flex items-center gap-2 bg-[#121315] p-1 rounded-xl border border-[#2b2d31]">
            <button
              onClick={() => setConversionType('kruti_to_unicode')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-center ${
                conversionType === 'kruti_to_unicode'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Kruti Dev → Unicode
            </button>
            <button
              onClick={() => setConversionType('unicode_to_kruti')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-center ${
                conversionType === 'unicode_to_kruti'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Unicode → Kruti Dev
            </button>
            <button
              onClick={() => setConversionType('shivaji_to_unicode')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all text-center ${
                conversionType === 'shivaji_to_unicode'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Shivaji → Unicode
            </button>
          </div>

          {/* Safety Notice (Zero corruption guarantee) */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5 text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div className="space-y-0.5">
              <p className="font-bold text-[11px]">Non-Destructive Encoding Safeguard</p>
              <p className="text-[10px] text-gray-300">
                Original text is strictly preserved before conversion. Default fonts for new Marathi typing remain true Unicode (Mukta, SakalBharati, Baloo).
              </p>
            </div>
          </div>

          {/* Side by Side Editor Panes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Left: Source Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                <span>Source Text</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#222428] text-gray-300">
                  Detected: {sourceEncoding.toUpperCase()}
                </span>
              </div>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste legacy Kruti Dev / Shivaji text here..."
                rows={5}
                className="w-full bg-[#1e2024] border border-[#343538] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none font-sans"
              />
            </div>

            {/* Right: Converted Output */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                <span>Converted Output (Unicode)</span>
                {convertedText && (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <FileCheck className="w-3 h-3" /> Ready
                  </span>
                )}
              </div>
              <textarea
                value={convertedText}
                readOnly
                placeholder="Converted Unicode text will appear here..."
                rows={5}
                className="w-full bg-[#141517] border border-[#2b2d31] rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none resize-none font-sans"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleConvert}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Convert Now</span>
              </button>
              {previousText !== null && (
                <button
                  onClick={handleRevert}
                  className="px-3 py-2 bg-[#222428] hover:bg-[#2c2f35] text-gray-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-[#343538]"
                  title="Revert to previous conversion"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Revert</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!convertedText}
                className="px-3 py-2 bg-[#222428] hover:bg-[#2c2f35] disabled:opacity-40 text-gray-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-[#343538]"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>

              {onApplyToCanvas && (
                <button
                  onClick={handleApply}
                  disabled={!convertedText}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Apply to Selected Text
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
