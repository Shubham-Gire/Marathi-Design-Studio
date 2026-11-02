import React, { useState } from 'react';
import {
  Video,
  Play,
  Pause,
  Upload,
  Scissors,
  Volume2,
  VolumeX,
  Type,
  Music,
  Download,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import { IntegrationSetupModal, IntegrationDetails } from '../components/IntegrationSetupModal';

export const VideoEditorPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(4.2);
  const [duration] = useState(15.0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState<IntegrationDetails | null>(null);

  const videoTimelineTracks = [
    { id: 1, title: 'Video Clip (गणेशोत्सव आगमन विशेष)', color: 'bg-orange-500', duration: '0:00 - 0:15' },
    { id: 2, title: 'Devanagari Headline Overlay (|| बाप्पा मोरया ||)', color: 'bg-purple-600', duration: '0:02 - 0:10' },
    { id: 3, title: 'Traditional Dhol Tasha Audio Track', color: 'bg-emerald-600', duration: '0:00 - 0:15' },
  ];

  const handleOpenAiVideo = () => {
    setActiveIntegration({
      name: 'Runway Gen-3 / Sora AI Video Synthesizer',
      category: 'AI Video & Motion',
      description: 'Generate animated marketing reels and transition effects directly from text prompts.',
      status: 'Requires external API',
      requiredCredentials: ['RUNWAY_API_KEY'],
      docLink: 'https://runwayml.com',
      setupInstructions: [
        'Obtain an enterprise API key from RunwayML or OpenAI Sora.',
        'Configure RUNWAY_API_KEY in your server environment.',
        'Rendered clips will be imported directly to this timeline.'
      ]
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#141517] text-white select-none overflow-hidden">
      {/* Top Header */}
      <header className="bg-[#1e2023] border-b border-[#2d2e30] px-6 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-600 text-white">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black text-white">Marathi Video & Reels Studio</h1>
            <p className="text-xs text-gray-400">Assemble video reels, animated Marathi text overlays, and audio tracks</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAiVideo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 font-bold text-xs border border-purple-500/30 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Motion Synthesis</span>
          </button>
          <button
            onClick={() => alert('Local video rendered! High-definition MP4 export hook ready for FFmpeg backend encoding.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export MP4 Video</span>
          </button>
        </div>
      </header>

      {/* Main Video Viewport & Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0f1011] relative">
        <div className="w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-3xl border border-[#2d2e30] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Animated Mock Reel Overlay */}
          <div className="relative z-10 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-600 text-white shadow-md">
              ९:१६ रील फॉरमॅट
            </span>
            <h2 className="text-3xl font-black font-serif text-white tracking-tight drop-shadow-md">
              || गणपती बाप्पा मोरया ||
            </h2>
            <p className="text-sm font-semibold text-amber-300 drop-shadow-sm">
              भव्य आगमन सोहळा २०२६
            </p>
          </div>

          {/* Playhead Center Overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
          </button>
        </div>
      </main>

      {/* Bottom Timeline Controls */}
      <footer className="h-64 bg-[#18191b] border-t border-[#2d2e30] p-4 flex flex-col justify-between">
        {/* Playback Controls Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2d2e30]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-[#252627] hover:bg-[#2f3032] text-gray-300 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-xs font-mono font-bold text-gray-300">
              0:0{currentTime.toFixed(1)} / 0:{duration.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252627] hover:bg-[#2f3032] text-xs font-bold text-gray-300 cursor-pointer">
              <Scissors className="w-3.5 h-3.5 text-orange-400" />
              <span>Split Clip (S)</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252627] hover:bg-[#2f3032] text-xs font-bold text-gray-300 cursor-pointer">
              <Type className="w-3.5 h-3.5 text-purple-400" />
              <span>Add Devanagari Caption</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252627] hover:bg-[#2f3032] text-xs font-bold text-gray-300 cursor-pointer">
              <Music className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Music Track</span>
            </button>
          </div>
        </div>

        {/* Multi-Track Timeline Visualizer */}
        <div className="space-y-2 py-2 overflow-y-auto">
          {videoTimelineTracks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-2 rounded-xl bg-[#202124] border border-[#2d2e30]"
            >
              <span className="w-44 text-xs font-bold text-gray-300 truncate">{t.title}</span>
              <div className="flex-1 h-7 rounded-lg bg-[#141517] relative overflow-hidden flex items-center px-3">
                <div
                  className={`h-full ${t.color} rounded-md opacity-80 flex items-center px-2 text-[10px] font-black text-white`}
                  style={{ width: '85%' }}
                >
                  {t.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </footer>

      <IntegrationSetupModal
        isOpen={!!activeIntegration}
        onClose={() => setActiveIntegration(null)}
        integration={activeIntegration}
      />
    </div>
  );
};
