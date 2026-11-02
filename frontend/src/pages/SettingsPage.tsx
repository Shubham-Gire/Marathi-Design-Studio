import React, { useState } from 'react';
import {
  Settings,
  User,
  Key,
  Shield,
  Bell,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || 'Sachin Tendulkar');
  const [email] = useState(user?.email || 'sachin@example.com');
  const [phone, setPhone] = useState('9820000001');
  const [apiKeyGemini, setApiKeyGemini] = useState('');
  const [apiKeyStability, setApiKeyStability] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-800">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account & Studio Settings</h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage your user profile, security preferences, and external integration API keys.
              </p>
            </div>
          </div>

          {savedSuccess && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings Saved</span>
            </span>
          )}
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-orange-600" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm shadow-orange-600/30 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>

        {/* API Credentials Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Key className="w-4 h-4 text-orange-600" />
            <span>External API Keys (Self-Hosted Integrations)</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Google Gemini API Key (GEMINI_API_KEY)
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyGemini}
                onChange={(e) => setApiKeyGemini(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono text-slate-800 focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Stability AI Key (STABILITY_API_KEY)
              </label>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKeyStability}
                onChange={(e) => setApiKeyStability(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono text-slate-800 focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
