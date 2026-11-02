import React from 'react';
import { X, AlertCircle, Key, ExternalLink, ShieldCheck, Terminal, CheckCircle2 } from 'lucide-react';

export type IntegrationStatus =
  | 'Implemented'
  | 'Requires configuration'
  | 'Requires external API'
  | 'Requires provider approval'
  | 'Planned'
  | 'Blocked';

export interface IntegrationDetails {
  name: string;
  category: string;
  description: string;
  status: IntegrationStatus;
  requiredCredentials: string[];
  docLink?: string;
  setupInstructions: string[];
  configFields?: { label: string; placeholder: string; envVar: string }[];
}

interface IntegrationSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: IntegrationDetails | null;
}

export const IntegrationSetupModal: React.FC<IntegrationSetupModalProps> = ({
  isOpen,
  onClose,
  integration,
}) => {
  if (!isOpen || !integration) return null;

  const getStatusBadge = (status: IntegrationStatus) => {
    switch (status) {
      case 'Implemented':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Implemented & Ready</span>
          </span>
        );
      case 'Requires configuration':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Requires Configuration</span>
          </span>
        );
      case 'Requires external API':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Key className="w-3.5 h-3.5" />
            <span>Requires External API</span>
          </span>
        );
      case 'Requires provider approval':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Requires Provider Approval</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-white text-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">
                {integration.name}
              </h3>
              {getStatusBadge(integration.status)}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Category: <span className="font-bold text-slate-700">{integration.category}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Description */}
          <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {integration.description}
          </div>

          {/* Honest Status Notice */}
          {integration.status !== 'Implemented' && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold block mb-1">Integration Setup Required</span>
                This third-party service is not currently active. Marathi Design Studio never simulates fake operations.
                To activate this feature, configure the required API credentials below or provide them in your server environment.
              </div>
            </div>
          )}

          {/* Required Credentials List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-orange-600" />
              <span>Required Environment Variables / Credentials</span>
            </h4>
            <div className="space-y-2">
              {integration.requiredCredentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800"
                >
                  <span className="text-orange-400 font-bold">{cred}</span>
                  <span className="text-[11px] text-slate-400 font-sans">Server Environment</span>
                </div>
              ))}
            </div>
          </div>

          {/* Setup Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-orange-600" />
              <span>Configuration Steps</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {integration.setupInstructions.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Reference Link */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500">
            <span>Implementation Hook: <code className="font-mono text-slate-700 font-bold">docs/INTEGRATIONS.md</code></span>
            {integration.docLink && (
              <a
                href={integration.docLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold"
              >
                <span>Provider Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert(`Ready to connect: ${integration.name}. You can add your API credentials in your server environment file (.env) to complete the hook.`);
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/30 transition-all cursor-pointer"
          >
            Configure Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
