import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Image,
  Share2,
  Cloud,
  Mail,
  CreditCard,
  Printer,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Key
} from 'lucide-react';
import { IntegrationSetupModal, IntegrationDetails, IntegrationStatus } from '../components/IntegrationSetupModal';

interface AppCatalogItem {
  id: string;
  name: string;
  category: 'AI & Creative' | 'Stock Media' | 'Social Publishing' | 'Cloud Storage' | 'Payments & Billing' | 'Print & Fulfillment';
  description: string;
  status: IntegrationStatus;
  requiredCredentials: string[];
  docLink?: string;
  setupInstructions: string[];
  icon: React.ElementType;
}

export const AppsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<IntegrationDetails | null>(null);

  const apps: AppCatalogItem[] = [
    {
      id: 'gemini',
      name: 'Google Gemini 1.5 Pro AI',
      category: 'AI & Creative',
      description: 'Native Marathi intelligent copywriting, headline suggestions, and design layout assistant.',
      status: 'Implemented',
      requiredCredentials: ['GEMINI_API_KEY'],
      docLink: 'https://ai.google.dev',
      setupInstructions: [
        'Native integration already active in AiService.',
        'Configure GEMINI_API_KEY for cloud model updates.'
      ],
      icon: Sparkles,
    },
    {
      id: 'stability',
      name: 'Stability AI (Stable Diffusion)',
      category: 'AI & Creative',
      description: 'Prompt-to-image synthesis for high-resolution Marathi artwork and festive backgrounds.',
      status: 'Requires configuration',
      requiredCredentials: ['STABILITY_API_KEY'],
      docLink: 'https://platform.stability.ai',
      setupInstructions: [
        'Register at Stability AI developer platform.',
        'Copy API key and set STABILITY_API_KEY in .env.'
      ],
      icon: Sparkles,
    },
    {
      id: 'openai',
      name: 'OpenAI DALL-E 3 & GPT-4o',
      category: 'AI & Creative',
      description: 'Creative visual asset synthesis and advanced Marathi text polishing.',
      status: 'Requires configuration',
      requiredCredentials: ['OPENAI_API_KEY'],
      docLink: 'https://platform.openai.com',
      setupInstructions: [
        'Create OpenAI API key with model privileges.',
        'Set OPENAI_API_KEY in server environment.'
      ],
      icon: Sparkles,
    },
    {
      id: 'remove-bg',
      name: 'Remove.bg Automatic Cutout',
      category: 'AI & Creative',
      description: 'One-click AI background removal for photos, portraits, and product catalogs.',
      status: 'Requires configuration',
      requiredCredentials: ['REMOVE_BG_API_KEY'],
      docLink: 'https://www.remove.bg/api',
      setupInstructions: [
        'Obtain API token from remove.bg account.',
        'Set REMOVE_BG_API_KEY in .env.'
      ],
      icon: Sparkles,
    },
    {
      id: 'unsplash',
      name: 'Unsplash Stock Photography',
      category: 'Stock Media',
      description: 'Access 5+ million royalty-free commercial photographs directly in the canvas photos drawer.',
      status: 'Requires configuration',
      requiredCredentials: ['UNSPLASH_ACCESS_KEY'],
      docLink: 'https://unsplash.com/developers',
      setupInstructions: [
        'Create an application on Unsplash Developers.',
        'Set UNSPLASH_ACCESS_KEY in server environment.'
      ],
      icon: Image,
    },
    {
      id: 'pexels',
      name: 'Pexels Photos & 4K Videos',
      category: 'Stock Media',
      description: 'Free stock photos and royalty-free HD video clips for social media reels.',
      status: 'Requires configuration',
      requiredCredentials: ['PEXELS_API_KEY'],
      docLink: 'https://www.pexels.com/api',
      setupInstructions: [
        'Get a free API key from pexels.com/api.',
        'Set PEXELS_API_KEY in .env.'
      ],
      icon: Image,
    },
    {
      id: 'instagram',
      name: 'Instagram Graph API',
      category: 'Social Publishing',
      description: 'Schedule and auto-publish reels, stories, and carousel ads to Instagram Business accounts.',
      status: 'Requires provider approval',
      requiredCredentials: ['INSTAGRAM_APP_ID', 'INSTAGRAM_APP_SECRET'],
      docLink: 'https://developers.facebook.com',
      setupInstructions: [
        'Submit app for Meta App Review.',
        'Request instagram_content_publish permission.',
        'Set INSTAGRAM_APP_ID and secret in environment.'
      ],
      icon: Share2,
    },
    {
      id: 'facebook',
      name: 'Facebook Pages Publishing',
      category: 'Social Publishing',
      description: 'Direct publishing to Facebook business and community festival pages.',
      status: 'Requires provider approval',
      requiredCredentials: ['FACEBOOK_PAGE_ACCESS_TOKEN'],
      docLink: 'https://developers.facebook.com',
      setupInstructions: [
        'Generate Page Access Token with manage_pages scope.',
        'Set FACEBOOK_PAGE_ACCESS_TOKEN in .env.'
      ],
      icon: Share2,
    },
    {
      id: 'google-drive',
      name: 'Google Drive Cloud Export',
      category: 'Cloud Storage',
      description: 'Export and backup your finished designs and PDFs straight into your Google Drive.',
      status: 'Requires configuration',
      requiredCredentials: ['GOOGLE_CLIENT_ID', 'GOOGLE_DRIVE_API_KEY'],
      docLink: 'https://console.cloud.google.com',
      setupInstructions: [
        'Enable Google Drive API v3 in Google Cloud.',
        'Set GOOGLE_CLIENT_ID and API key in .env.'
      ],
      icon: Cloud,
    },
    {
      id: 'dropbox',
      name: 'Dropbox Sync',
      category: 'Cloud Storage',
      description: 'Save high-res print files and multi-page catalogs to Dropbox business folders.',
      status: 'Requires configuration',
      requiredCredentials: ['DROPBOX_APP_KEY'],
      docLink: 'https://www.dropbox.com/developers',
      setupInstructions: [
        'Create app in Dropbox App Console.',
        'Set DROPBOX_APP_KEY in server environment.'
      ],
      icon: Cloud,
    },
    {
      id: 'razorpay',
      name: 'Razorpay Payment Gateway',
      category: 'Payments & Billing',
      description: 'Native UPI, Debit/Credit Card, and NetBanking payments for Pro & Business subscriptions.',
      status: 'Requires configuration',
      requiredCredentials: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'],
      docLink: 'https://razorpay.com/docs',
      setupInstructions: [
        'Retrieve Merchant Key ID & Secret from Razorpay Dashboard.',
        'Configure in billing-service/application.yml or root .env.',
        'Development mock mode is currently functional.'
      ],
      icon: CreditCard,
    },
    {
      id: 'printful',
      name: 'Printful On-Demand Merch',
      category: 'Print & Fulfillment',
      description: 'Order printed t-shirts, mugs, posters, and banners directly from your canvas designs.',
      status: 'Requires external API',
      requiredCredentials: ['PRINTFUL_API_KEY'],
      docLink: 'https://www.printful.com/api',
      setupInstructions: [
        'Create a Printful store account.',
        'Generate API key and set PRINTFUL_API_KEY in .env.'
      ],
      icon: Printer,
    },
  ];

  const categories = [
    'all',
    'AI & Creative',
    'Stock Media',
    'Social Publishing',
    'Cloud Storage',
    'Payments & Billing',
    'Print & Fulfillment',
  ];

  const filteredApps = apps.filter((app) => {
    const matchesCat = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch =
      !search ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Apps & Integrations Marketplace
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Connect external AI tools, stock photography providers, social media platforms, and cloud storage.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps & services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Integrations' : cat}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    {app.status === 'Implemented' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Connected</span>
                      </span>
                    ) : app.status === 'Requires provider approval' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Provider Approval</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        <AlertCircle className="w-3 h-3" />
                        <span>Setup Required</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">{app.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{app.description}</p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">{app.category}</span>
                  <button
                    onClick={() => setActiveModalItem(app)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                  >
                    {app.status === 'Implemented' ? 'Configure' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <IntegrationSetupModal
        isOpen={!!activeModalItem}
        onClose={() => setActiveModalItem(null)}
        integration={activeModalItem}
      />
    </div>
  );
};
