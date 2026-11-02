import React, { useState } from 'react';
import {
  Crown,
  Check,
  Zap,
  Sparkles,
  Building,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Heart,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IntegrationSetupModal, IntegrationDetails } from '../components/IntegrationSetupModal';

export const PricingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeIntegration, setActiveIntegration] = useState<IntegrationDetails | null>(null);

  const handleOpenRazorpaySetup = () => {
    setActiveIntegration({
      name: 'Razorpay Payment Gateway (Optional Donations & Commercial Plugins)',
      category: 'Payments & Merchant Processing',
      description: 'Optional integration for community sponsorships or commercial print fulfillment.',
      status: 'Requires configuration',
      requiredCredentials: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'],
      docLink: 'https://razorpay.com/docs/payments/subscriptions',
      setupInstructions: [
        'Complete KYC on Razorpay merchant dashboard.',
        'Generate API Key ID and Key Secret in API & Webhooks section.',
        'Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in root .env file.',
        'Production checkout will process optional patron donations.'
      ]
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 uppercase tracking-wider">
            100% Free Open Platform
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Free Design Studio for Every Marathi Creator
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Marathi Design Studio is completely free forever. All 35+ authentic Devanagari fonts, festival templates, AI slogans, 300 DPI high-res exports, and dual 10 GB storage libraries are unlocked with zero subscription fees.
          </p>

          {/* 100% Free Website Announcement */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 shadow-xs">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Pledge: Zero paywalls, zero subscription fees, unlimited designs and exports forever.</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Creator Plan (Primary) */}
          <div className="bg-gradient-to-b from-orange-50 to-white rounded-3xl p-8 border-2 border-orange-500 shadow-xl flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white shadow-md">
              Full Platform Unlocked
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">सर्वसमावेशक (Community Plan)</h3>
                  <p className="text-xs text-slate-500 mt-1">For all creators, designers, and local businesses</p>
                </div>
                <div className="p-2 rounded-xl bg-orange-600 text-white">
                  <Crown className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-mono">₹०</span>
                <span className="text-xs font-bold text-slate-500">/ Free Forever</span>
              </div>

              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Unlimited</strong> Saved Designs & Projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All Authentic Marathi Festival & Business Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>35+ Devanagari Fonts & Calligraphy Presets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent PNG, JPEG & Multi-Page PDF Export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>High-Resolution 300 DPI Print Export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dual 10 GB Storage (Templates & Elements)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full AI Marathi Copywriter & Slogan Generator</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-orange-100">
              <button
                onClick={() => navigate('/editor')}
                className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Start Designing for Free</span>
              </button>
            </div>
          </div>

          {/* Education & Mandal Plan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">मंडळ व शिक्षण (Education & Mandals)</h3>
                  <p className="text-xs text-slate-400 mt-1">For schools, cultural groups, and festival committees</p>
                </div>
                <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
                  <Heart className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-mono">₹०</span>
                <span className="text-xs font-bold text-slate-400">/ 100% Free Grant</span>
              </div>

              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Ganeshotsav, Shiv Jayanti & Diwali Event Graphics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Student Presentations & Multi-Page Slide Decks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Official Invitations (लग्नपत्रिका, निमंत्रण)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Social Media & WhatsApp Status Banners</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100">
              <button
                onClick={() => navigate('/templates')}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm transition-colors cursor-pointer"
              >
                Browse Festival Templates
              </button>
            </div>
          </div>

          {/* Enterprise & Self-Hosted */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">स्वतंत्र होस्टिंग (Self-Hosted)</h3>
                  <p className="text-xs text-slate-400 mt-1">For print shops, agencies, and enterprise IT</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                  <Building className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 font-mono">Open</span>
                <span className="text-xs font-bold text-slate-400">/ Source Architecture</span>
              </div>

              <ul className="space-y-3 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Deploy with Docker Compose on your private servers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom Fonts, Logos & Brand Asset Libraries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Independent MySQL Data Isolation & Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Razorpay/UPI Payment Gateway Hook for Print Orders</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 space-y-2">
              <button
                onClick={handleOpenRazorpaySetup}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-colors cursor-pointer"
              >
                Payment Gateway Configuration
              </button>
            </div>
          </div>
        </div>
      </div>

      <IntegrationSetupModal
        isOpen={!!activeIntegration}
        onClose={() => setActiveIntegration(null)}
        integration={activeIntegration}
      />
    </div>
  );
};
