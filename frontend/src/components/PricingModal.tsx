import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { X, Check, Crown, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

export const PricingModal: React.FC = () => {
  const { isPricingModalOpen, closePricingModal, user, refreshUser, openAuthModal, isPro } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isPricingModalOpen) return null;

  const handleMockUpgrade = async (planId: string) => {
    if (!user) {
      closePricingModal();
      openAuthModal('login');
      return;
    }
    setLoadingPlan(planId);
    setMessage(null);
    try {
      const res = await api.mockActivatePlan(planId);
      setMessage(res.message);
      await refreshUser();
    } catch (err: any) {
      setMessage(err.message || 'Upgrade failed.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleCancelSub = async () => {
    setLoadingPlan('cancel');
    try {
      await api.cancelSubscription();
      setMessage('Subscription cancelled. You are now on the Free plan.');
      await refreshUser();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto select-none">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 my-8">
        
        {/* Close button */}
        <button
          onClick={closePricingModal}
          className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Free Website Application</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Marathi Design Studio is <span className="text-orange-600">Free For Everyone</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            All templates, authentic Devanagari calligraphy fonts, AI tools, 300 DPI exports, and 10 GB cloud storage are available to everyone at zero cost.
          </p>
        </div>

        {/* Development Mode Notice Banner */}
        <div className="mb-6 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold">[Development & Testing Mode]:</span> Mock upgrade buttons below activate Pro features instantly for local testing without real payment charges.
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage(null)} className="text-green-600 hover:text-green-800 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          
          {/* FREE PLAN */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Free Plan</h3>
              <p className="text-xs text-slate-500 mt-1">For individuals and beginners</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                <span className="text-xs text-slate-500"> / forever</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>5 Saved Cloud Designs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Free Marathi & English Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>20 MB Media Asset Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>5 AI Copy Requests / day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>PNG, JPEG, PDF Export</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              {!isPro ? (
                <div className="w-full py-2.5 text-center text-xs font-bold text-slate-500 bg-slate-200 rounded-xl">
                  Current Active Plan
                </div>
              ) : (
                <button
                  onClick={handleCancelSub}
                  disabled={loadingPlan === 'cancel'}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-700 hover:text-red-600 border border-slate-300 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                >
                  {loadingPlan === 'cancel' ? 'Switching...' : 'Downgrade to Free'}
                </button>
              )}
            </div>
          </div>

          {/* PRO PLAN (RECOMMENDED) */}
          <div className="relative bg-gradient-to-b from-orange-500/10 via-white to-white rounded-2xl p-6 border-2 border-orange-500 shadow-xl shadow-orange-500/10 flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900">Pro Plan</h3>
                <Crown className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs text-slate-500 mt-1">For shops, creators & event planners</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-extrabold text-slate-900">₹299</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>100 Saved Cloud Designs</span>
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>All Premium & Pro Templates</span>
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>1 GB Media Storage</span>
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>50 AI Copy Generations / day</span>
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Unlimited High-Res & Print PDF Exports</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              {isPro ? (
                <div className="w-full py-2.5 text-center text-xs font-bold text-green-700 bg-green-100 rounded-xl flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>You are a Pro Member!</span>
                </div>
              ) : (
                <button
                  onClick={() => handleMockUpgrade('PRO_MONTHLY')}
                  disabled={loadingPlan === 'PRO_MONTHLY'}
                  className="w-full py-3 text-center text-xs font-extrabold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md shadow-orange-600/30 transition-all cursor-pointer"
                >
                  {loadingPlan === 'PRO_MONTHLY' ? 'Activating...' : 'Select Pro Plan (Mock Test)'}
                </button>
              )}
            </div>
          </div>

          {/* BUSINESS PLAN */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900">Business</h3>
                <Zap className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-xs text-slate-500 mt-1">For agencies and marketing teams</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-extrabold text-slate-900">₹799</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>500 Cloud Designs & Projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>5 GB High-Speed Asset Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>200 Daily AI Generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Priority Support & Custom Brand Kits</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleMockUpgrade('BUSINESS_MONTHLY')}
                disabled={loadingPlan === 'BUSINESS_MONTHLY'}
                className="w-full py-2.5 text-center text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                {loadingPlan === 'BUSINESS_MONTHLY' ? 'Activating...' : 'Select Business Plan (Mock Test)'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
