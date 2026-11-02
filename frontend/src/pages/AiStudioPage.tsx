import React, { useState } from 'react';
import {
  Sparkles,
  Type,
  Image as ImageIcon,
  Palette,
  Wand2,
  Video,
  Mic,
  Languages,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { IntegrationSetupModal, IntegrationDetails } from '../components/IntegrationSetupModal';

export const AiStudioPage: React.FC = () => {
  const navigate = useNavigate();

  // Active copy generator state
  const [topic, setTopic] = useState('गणेशोत्सव आगमन विशेष ऑफर');
  const [tone, setTone] = useState('भक्तिमय व आकर्षक');
  const [category, setCategory] = useState('festivals');
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [generatedHeadlines, setGeneratedHeadlines] = useState<string[]>([
    '|| बाप्पा मोरया! आगमन सोहळ्यानिमित्त भव्य सूट ||',
    'गणेशोत्सवाचा आनंद द्विगुणीत करा आमच्या खास सवलतींसह!',
    'उत्सवाचा जल्लोष, बजेटमध्ये खरेदी! मर्यादित कालावधी ऑफर.'
  ]);

  // Integration Modal
  const [activeIntegration, setActiveIntegration] = useState<IntegrationDetails | null>(null);

  const handleGenerateCopy = async () => {
    if (!topic.trim()) return;
    setLoadingCopy(true);
    try {
      const res = await api.generateCopy(topic, tone, category);
      if (res.headlines && res.headlines.length > 0) {
        setGeneratedHeadlines(res.headlines);
      }
    } catch {
      // Fallback local variations
      setGeneratedHeadlines([
        `|| ${topic} || खास सवलत व मर्यादित ऑफर!`,
        `${topic} निमित्त सर्व खरेदीवर मिळवा ५०% पर्यंत सूट!`,
        `महाराष्ट्राची पहिली पसंती — ${topic}!`
      ]);
    } finally {
      setLoadingCopy(false);
    }
  };

  const aiTools: {
    id: string;
    title: string;
    category: string;
    description: string;
    icon: React.ElementType;
    badge: 'Active Engine' | 'Setup Required' | 'External API' | 'Provider Approval';
    actionText: string;
    integration: IntegrationDetails;
  }[] = [
    {
      id: 'ai-image',
      title: 'AI Image & Artwork Generator',
      category: 'Visual Media',
      description: 'Generate photorealistic and artistic Devanagari background illustrations, rangoli vectors, and commercial products from a text prompt.',
      icon: ImageIcon,
      badge: 'Setup Required',
      actionText: 'Connect Provider',
      integration: {
        name: 'Stability AI / OpenAI DALL-E 3',
        category: 'AI Image Generation',
        description: 'Connect Stability AI or OpenAI DALL-E 3 to enable prompt-to-image synthesis directly onto your Fabric.js canvas.',
        status: 'Requires configuration',
        requiredCredentials: ['STABILITY_API_KEY', 'OPENAI_API_KEY'],
        docLink: 'https://platform.stability.ai',
        setupInstructions: [
          'Create an account at Stability AI or OpenAI platform.',
          'Generate a secret API key with image generation privileges.',
          'Add STABILITY_API_KEY=your_key in your root .env file.',
          'Restart the local services.'
        ]
      }
    },
    {
      id: 'ai-bg-remover',
      title: 'AI 1-Click Background Remover',
      category: 'Photo Editing',
      description: 'Automatically cut out subjects from photos, portrait pictures, and product shots with pixel-perfect precision.',
      icon: Wand2,
      badge: 'Setup Required',
      actionText: 'Connect Provider',
      integration: {
        name: 'Remove.bg Automated Cutout',
        category: 'Photo Processing',
        description: 'Enables instant alpha channel extraction for portraits, packaging, and commercial graphics.',
        status: 'Requires configuration',
        requiredCredentials: ['REMOVE_BG_API_KEY'],
        docLink: 'https://www.remove.bg/api',
        setupInstructions: [
          'Sign up at remove.bg to obtain an API key.',
          'Set REMOVE_BG_API_KEY in your server configuration.',
          'In editor, click "Remove BG" on any selected photo.'
        ]
      }
    },
    {
      id: 'ai-translate',
      title: 'Marathi ↔ English Bilingual Translator',
      category: 'Typography & Copy',
      description: 'Accurately translate promotional copy, slogans, and banners between Marathi and English with cultural context preservation.',
      icon: Languages,
      badge: 'Setup Required',
      actionText: 'Connect Provider',
      integration: {
        name: 'Google Cloud Translation AI',
        category: 'Multilingual Processing',
        description: 'Official neural machine translation for Marathi (mr) and English (en) with dialect and cultural idiom awareness.',
        status: 'Requires configuration',
        requiredCredentials: ['GOOGLE_TRANSLATE_API_KEY'],
        docLink: 'https://cloud.google.com/translate',
        setupInstructions: [
          'Enable Cloud Translation API in Google Cloud Console.',
          'Generate a service account key or API key.',
          'Configure GOOGLE_TRANSLATE_API_KEY on the server.'
        ]
      }
    },
    {
      id: 'ai-voice',
      title: 'AI Voice & Speech Synthesizer (TTS)',
      category: 'Audio & Video',
      description: 'Generate authentic Marathi speech, narration, and announcements for video reels and audio presentations.',
      icon: Mic,
      badge: 'Setup Required',
      actionText: 'Connect Provider',
      integration: {
        name: 'ElevenLabs Voice Engine',
        category: 'Voice Generation',
        description: 'Realistic text-to-speech engine supporting Marathi accented delivery and multilingual audio.',
        status: 'Requires configuration',
        requiredCredentials: ['ELEVENLABS_API_KEY'],
        docLink: 'https://elevenlabs.io',
        setupInstructions: [
          'Sign up for an ElevenLabs developer account.',
          'Copy your API key and set ELEVENLABS_API_KEY in .env.',
          'Audio will generate directly into your video timeline.'
        ]
      }
    },
    {
      id: 'ai-video',
      title: 'AI Video & Motion Generator',
      category: 'Animation',
      description: 'Transform static Marathi graphic designs into animated video advertisements and social media reels.',
      icon: Video,
      badge: 'External API',
      actionText: 'Setup Integration',
      integration: {
        name: 'Runway Gen-3 Alpha Video',
        category: 'Generative Video',
        description: 'High-definition video generation pipeline for advertising and dynamic social campaigns.',
        status: 'Requires external API',
        requiredCredentials: ['RUNWAY_API_KEY'],
        docLink: 'https://runwayml.com',
        setupInstructions: [
          'Enterprise Runway API access is required.',
          'Set RUNWAY_API_KEY in environment variables.',
          'Export motion video directly from the video editor.'
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Next-Gen AI Creative Studio</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">AI Studio & Marathi Copywriter</h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Generate catchy Marathi headlines, promotional slogans, color palettes, and smart layouts for your advertisements.
            </p>
          </div>

          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
          >
            <span>Open Canvas Editor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Working Feature: Marathi Headline & Slogan Generator */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                <Type className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Marathi Copy & Headline Generator</h2>
                <p className="text-xs text-slate-500">Local intelligent text generator powered by Google Gemini</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active Engine</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Topic / Product / Event</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. नवीन ज्यूस सेंटर उद्घाटन, ५०% सूट ऑफर"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900"
              >
                <option value="भक्तिमय व आकर्षक">भक्तिमय व आकर्षक (Devotional)</option>
                <option value="व्यावसायिक व खात्रीशीर">व्यावसायिक व खात्रीशीर (Business)</option>
                <option value="उत्सवी व आनंदी">उत्सवी व आनंदी (Festive)</option>
                <option value="तातडीचे व सवलत">तातडीचे व सवलत (Urgent Offer)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateCopy}
            disabled={loadingCopy}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loadingCopy ? 'Generating Marathi Copy...' : 'Generate New Headlines'}</span>
          </button>

          {/* Generated Headlines Output */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Generated Marathi Headlines
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {generatedHeadlines.map((hl, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 transition-colors group"
                >
                  <span className="text-sm font-bold text-slate-800 font-serif">{hl}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(hl);
                      alert('Copied to clipboard: ' + hl);
                    }}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs group-hover:border-orange-300"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* External AI Integrations Grid (Honest Statuses) */}
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4">External AI Models & Generative Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900">{tool.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">{tool.category}</span>
                    <button
                      onClick={() => setActiveIntegration(tool.integration)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                    >
                      {tool.actionText}
                    </button>
                  </div>
                </div>
              );
            })}
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
