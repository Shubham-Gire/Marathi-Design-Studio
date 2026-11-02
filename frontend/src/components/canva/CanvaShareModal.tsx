import React, { useState } from 'react';
import { Share2, X, Copy, Check, Globe, Lock, Users, QrCode, Mail, Link as LinkIcon } from 'lucide-react';

interface CanvaShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  designTitle: string;
  projectId?: number;
}

export const CanvaShareModal: React.FC<CanvaShareModalProps> = ({
  isOpen,
  onClose,
  designTitle,
  projectId,
}) => {
  const [accessLevel, setAccessLevel] = useState<'view' | 'edit'>('view');
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'http://localhost:5173/editor';
  const shareUrl = projectId
    ? `${window.location.origin}/editor?projectId=${projectId}&access=${accessLevel}`
    : `${currentUrl}${currentUrl.includes('?') ? '&' : '?'}access=${accessLevel}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteEmail('');
    }, 2500);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-[#1e2023] text-white w-full max-w-md rounded-2xl shadow-2xl border border-[#343538] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#2b2d31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-base text-white">Share "{designTitle || 'Untitled'}"</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Invite Collaborators */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
              Add people, groups or team
            </label>
            <form onSubmit={handleInvite} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter colleague's email address..."
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#18191b] border border-[#343538] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                {inviteSent ? 'Invited!' : 'Invite'}
              </button>
            </form>
            {inviteSent && (
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Invitation link sent with collaboration access.</span>
              </p>
            )}
          </div>

          {/* Access Permissions Strip */}
          <div className="p-3 bg-[#18191b] border border-[#2d2e32] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {accessLevel === 'view' ? (
                <Globe className="w-4 h-4 text-emerald-400" />
              ) : (
                <Users className="w-4 h-4 text-purple-400" />
              )}
              <div>
                <span className="font-bold text-white block">Collaboration Link</span>
                <span className="text-[10px] text-gray-400">
                  {accessLevel === 'view' ? 'Anyone with the link can view' : 'Anyone with the link can edit'}
                </span>
              </div>
            </div>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value as any)}
              className="px-2 py-1 bg-[#25262a] border border-[#383a3e] rounded-lg text-xs font-semibold text-gray-200 focus:outline-none"
            >
              <option value="view">Can view</option>
              <option value="edit">Can edit</option>
            </select>
          </div>

          {/* Copy Link Input Bar */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase">Shareable Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-[#18191b] border border-[#343538] rounded-xl text-xs text-gray-300 font-mono truncate select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* QR Code toggle for mobile preview */}
          <div className="pt-2 border-t border-[#2b2d31]">
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{showQr ? 'Hide Mobile QR Code' : 'Show Mobile QR Code for Live Preview'}</span>
            </button>
            {showQr && (
              <div className="mt-2.5 p-3 bg-[#131416] border border-[#2b2d31] rounded-xl flex flex-col items-center">
                <img src={qrUrl} alt="Design Share QR Code" className="w-36 h-36 rounded-lg bg-white p-1.5 shadow-md" />
                <span className="text-[10px] text-gray-400 mt-2 text-center">
                  Scan with your phone camera to preview this design instantly on mobile.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#141517] border-t border-[#2b2d31] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2b2d33] hover:bg-[#34363d] text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
