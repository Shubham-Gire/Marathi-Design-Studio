import React, { useState } from 'react';
import {
  Share2,
  Calendar,
  Clock,
  Send,
  MessageCircle,
  Globe,
  Radio,
  Plus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { IntegrationSetupModal, IntegrationDetails } from '../components/IntegrationSetupModal';

interface ScheduledPost {
  id: number;
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'X';
  date: string;
  time: string;
  caption: string;
  status: 'Scheduled' | 'Draft' | 'Published';
}

export const SocialMediaPage: React.FC = () => {
  const [activeIntegration, setActiveIntegration] = useState<IntegrationDetails | null>(null);

  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: 1,
      platform: 'Instagram',
      date: '2026-10-24',
      time: '18:00',
      caption: '|| गणपती बाप्पा मोरया! आगमन सोहळ्यानिमित्त भव्य ५०% सूट || #Ganeshotsav #Maharashtra #Offer',
      status: 'Scheduled',
    },
    {
      id: 2,
      platform: 'Facebook',
      date: '2026-10-25',
      time: '10:30',
      caption: 'नवीन उन्हाळी स्पेशल ऑफर! आमच्या ज्यूस सेंटरला आजच भेट द्या आणि मिळवा मोफत आईस्क्रीम.',
      status: 'Draft',
    },
    {
      id: 3,
      platform: 'LinkedIn',
      date: '2026-10-26',
      time: '09:00',
      caption: 'Scaling digital design & graphic automation for regional MSMEs across Maharashtra.',
      status: 'Draft',
    },
  ]);

  const handleConnectPlatform = (platform: string) => {
    setActiveIntegration({
      name: `${platform} Official Publishing API`,
      category: 'Social Media Publishing',
      description: `Connect your official ${platform} business account for automated post scheduling and real-time reach analytics.`,
      status: 'Requires provider approval',
      requiredCredentials: [`${platform.toUpperCase()}_APP_ID`, `${platform.toUpperCase()}_APP_SECRET`],
      docLink: 'https://developers.facebook.com',
      setupInstructions: [
        `Register a developer app on the ${platform} Developer Portal.`,
        'Obtain OAuth 2.0 app authorization credentials.',
        `Set ${platform.toUpperCase()}_APP_ID in your environment variables.`,
        'Complete the publisher review process.'
      ]
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-600">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Social Media Planner & Content Calendar
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Schedule your Marathi flyers, festival greetings, and marketing campaigns directly to social networks.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleConnectPlatform('Instagram')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm shadow-orange-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Post</span>
          </button>
        </div>

        {/* Connected Channel Accounts Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Instagram */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Instagram</span>
                <span className="text-[11px] text-amber-600 font-semibold">Setup Required</span>
              </div>
            </div>
            <button
              onClick={() => handleConnectPlatform('Instagram')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Connect
            </button>
          </div>

          {/* Facebook */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Facebook Page</span>
                <span className="text-[11px] text-amber-600 font-semibold">Setup Required</span>
              </div>
            </div>
            <button
              onClick={() => handleConnectPlatform('Facebook')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Connect
            </button>
          </div>

          {/* LinkedIn */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-700 text-white">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">LinkedIn</span>
                <span className="text-[11px] text-amber-600 font-semibold">Setup Required</span>
              </div>
            </div>
            <button
              onClick={() => handleConnectPlatform('LinkedIn')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Connect
            </button>
          </div>

          {/* X / Twitter */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 text-white">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">X (Twitter)</span>
                <span className="text-[11px] text-amber-600 font-semibold">Setup Required</span>
              </div>
            </div>
            <button
              onClick={() => handleConnectPlatform('Twitter')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Content Calendar Schedule Queue */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <h2 className="text-base font-extrabold text-slate-900">Upcoming Scheduled Publications</h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">{posts.length} Posts queued</span>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800">
                      {post.platform}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {post.date} at {post.time}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 font-serif line-clamp-2">
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      post.status === 'Scheduled'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {post.status}
                  </span>
                  <button
                    onClick={() => handleConnectPlatform(post.platform)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                  >
                    Review & Publish
                  </button>
                </div>
              </div>
            ))}
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
