import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Rocket,
  Plus,
  Trash2,
  ExternalLink,
  Settings,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { IntegrationSetupModal, IntegrationDetails } from '../components/IntegrationSetupModal';

interface WebSection {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'footer';
  headline: string;
  subtext: string;
  buttonLabel?: string;
  background: string;
}

export const WebsitesPage: React.FC = () => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [siteTitle, setSiteTitle] = useState('महाराष्ट्र रिटेल मार्ट (Maharashtra Retail Mart)');
  const [customDomain, setCustomDomain] = useState('shop.maharashtra.in');
  const [activeIntegration, setActiveIntegration] = useState<IntegrationDetails | null>(null);

  const [sections, setSections] = useState<WebSection[]>([
    {
      id: '1',
      type: 'hero',
      headline: 'महाराष्ट्रातील सर्वात विश्वासार्ह ऑनलाइन खरेदी केंद्र',
      subtext: 'ताजी फळे, किराणा, मसाले आणि घरगुती उत्पादने थेट आपल्या दारी २४ तासांत.',
      buttonLabel: 'आता खरेदी करा (Shop Now)',
      background: 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700',
    },
    {
      id: '2',
      type: 'features',
      headline: 'आमची प्रमुख वैशिष्ट्ये (Why Choose Us)',
      subtext: '१००% अस्सल स्थानिक उत्पादने, जलद होम डिलिव्हरी आणि सर्वोत्तम सवलती.',
      background: 'bg-white text-slate-900',
    },
    {
      id: '3',
      type: 'cta',
      headline: 'आजच नोंदणी करा आणि मिळवा ₹५०० चे गिफ्ट व्हाउचर',
      subtext: 'मर्यादित कालावधी ऑफर! लगेच सदस्य व्हा.',
      buttonLabel: 'मोफत खाते उघडा',
      background: 'bg-slate-900 text-white',
    },
  ]);

  const handlePublish = () => {
    setActiveIntegration({
      name: 'Vercel / Cloudflare Custom Domain Hosting',
      category: 'Website Hosting & CDN',
      description: 'Deploy lightning-fast responsive landing pages with free SSL and edge CDN globally.',
      status: 'Requires configuration',
      requiredCredentials: ['VERCEL_TOKEN', 'CLOUDFLARE_API_KEY'],
      docLink: 'https://vercel.com/docs',
      setupInstructions: [
        'Create a Vercel or Cloudflare account.',
        'Obtain a deployment API token.',
        'Configure VERCEL_TOKEN in your environment.',
        `Link your custom domain (${customDomain}) via CNAME records.`
      ]
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900">Marathi Website & Landing Page Builder</h1>
            <p className="text-xs text-slate-500">Design responsive bilingual websites, portfolios, and store fronts</p>
          </div>
        </div>

        {/* Viewport Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-2 rounded-lg ${deviceView === 'desktop' ? 'bg-white shadow-xs text-orange-600' : 'text-slate-500'}`}
            title="Desktop Preview"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-2 rounded-lg ${deviceView === 'tablet' ? 'bg-white shadow-xs text-orange-600' : 'text-slate-500'}`}
            title="Tablet Preview"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-2 rounded-lg ${deviceView === 'mobile' ? 'bg-white shadow-xs text-orange-600' : 'text-slate-500'}`}
            title="Mobile Preview"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Publish Action Button */}
        <button
          onClick={handlePublish}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm shadow-orange-600/30 transition-all cursor-pointer"
        >
          <Rocket className="w-4 h-4" />
          <span>Publish Website</span>
        </button>
      </header>

      {/* Main Responsive Canvas Preview */}
      <main className="flex-1 py-8 px-4 flex justify-center overflow-y-auto">
        <div
          className={`bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col ${
            deviceView === 'desktop'
              ? 'w-full max-w-5xl'
              : deviceView === 'tablet'
              ? 'w-[768px]'
              : 'w-[375px]'
          }`}
        >
          {/* Mock Browser Header */}
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="font-mono text-[11px] text-slate-600 font-bold truncate max-w-[200px]">
              https://{customDomain}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{deviceView}</span>
          </div>

          {/* Rendered Website Sections */}
          <div className="divide-y divide-slate-100 select-text">
            {sections.map((sec) => (
              <section
                key={sec.id}
                className={`p-10 md:p-16 flex flex-col items-center justify-center text-center space-y-5 ${sec.background}`}
              >
                <h2 className="text-2xl md:text-4xl font-black font-serif tracking-tight max-w-2xl">
                  {sec.headline}
                </h2>
                <p className="text-sm md:text-base max-w-xl opacity-90 leading-relaxed font-medium">
                  {sec.subtext}
                </p>
                {sec.buttonLabel && (
                  <button className="px-6 py-3 rounded-2xl bg-white text-orange-600 font-extrabold text-sm shadow-md hover:bg-slate-50 transition-colors">
                    {sec.buttonLabel}
                  </button>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <IntegrationSetupModal
        isOpen={!!activeIntegration}
        onClose={() => setActiveIntegration(null)}
        integration={activeIntegration}
      />
    </div>
  );
};
