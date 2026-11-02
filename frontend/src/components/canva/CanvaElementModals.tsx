import React, { useState } from 'react';
import { X, Link as LinkIcon, UserCheck, Clock, MessageSquarePlus, Check, Sparkles, Globe } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUrl?: string;
  onSave: (url: string) => void;
}

export const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  initialUrl = '',
  onSave,
}) => {
  const [url, setUrl] = useState(initialUrl);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-[#18191b] border border-[#2d2e30] rounded-2xl shadow-2xl p-5 text-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#28292d] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-sm text-white">Add Link</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Destination URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#222428] border border-[#343538] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#343538] hover:bg-[#222428] text-xs font-semibold text-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(url);
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Save Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AltTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAlt?: string;
  onSave: (alt: string) => void;
}

export const AltTextModal: React.FC<AltTextModalProps> = ({
  isOpen,
  onClose,
  initialAlt = '',
  onSave,
}) => {
  const [alt, setAlt] = useState(initialAlt);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-[#18191b] border border-[#2d2e30] rounded-2xl shadow-2xl p-5 text-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#28292d] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-sm text-white">Alternative Text</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Describe this element for people who use screen readers
            </label>
            <textarea
              rows={3}
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Modern duplex villa exterior with swimming pool"
              className="w-full bg-[#222428] border border-[#343538] rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#343538] hover:bg-[#222428] text-xs font-semibold text-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(alt);
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Save Alt Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ElementTimingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTiming?: { duration: number; delay: number };
  onSave: (timing: { duration: number; delay: number }) => void;
}

export const ElementTimingModal: React.FC<ElementTimingModalProps> = ({
  isOpen,
  onClose,
  initialTiming = { duration: 1.5, delay: 0 },
  onSave,
}) => {
  const [duration, setDuration] = useState(initialTiming.duration);
  const [delay, setDelay] = useState(initialTiming.delay);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-[#18191b] border border-[#2d2e30] rounded-2xl shadow-2xl p-5 text-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#28292d] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Element Animation Timing</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>Duration</span>
              <span className="font-bold text-purple-400">{duration}s</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={5.0}
              step={0.1}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>Start Delay</span>
              <span className="font-bold text-purple-400">{delay}s</span>
            </div>
            <input
              type="range"
              min={0}
              max={3.0}
              step={0.1}
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#343538] hover:bg-[#222428] text-xs font-semibold text-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave({ duration, delay });
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Apply Timing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (comment: string) => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-[#18191b] border border-[#2d2e30] rounded-2xl shadow-2xl p-5 text-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#28292d] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Add Design Comment</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add feedback, task notes, or revision request..."
            className="w-full bg-[#222428] border border-[#343538] rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            autoFocus
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#343538] hover:bg-[#222428] text-xs font-semibold text-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (comment.trim()) onSave(comment.trim());
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
