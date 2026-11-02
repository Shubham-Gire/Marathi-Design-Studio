import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UploadCloud,
  Lock,
  Unlock,
  Trash2,
  ArrowUp,
  ArrowDown,
  Square,
  Circle,
  Triangle,
  Star,
  Crown,
  Layers,
  Image as ImageIcon,
  Plus,
  BarChart2,
  Table as TableIcon,
  Video,
  Music,
  Columns3,
  Languages,
  QrCode,
  Folder,
  Boxes,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  Palette,
  Check,
  Mic,
  Type,
  User,
  Mail,
  FileSpreadsheet,
  Film,
  Smile,
  SlidersHorizontal,
  LayoutGrid,
  LayoutTemplate,
  Award,
  Shield,
  Flame,
  ArrowRight,
  GripVertical,
  Heart
} from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
import { CanvaTabId } from './CanvaDock';
import { Template, DesignElement } from '../../types';
import { api } from '../../services/api';
import { CANVA_IMPORTED_TEMPLATES } from '../../config/templates';
import { CANVA_ELEMENTS, CanvaElement } from '../../config/canvaElements';
import { CALLIGRAPHY_PRESETS, CalligraphyItem } from '../../config/calligraphyPresets';
import { MARATHI_FONTS } from '../../config/marathiFonts';
import { STOCK_PHOTOS } from '../../config/stockPhotos';
import {
  CLIENT_STENCILS,
  STENCIL_THEMES,
  clientTransliterate,
  CalligraphyStencil
} from '../../config/marathiCalligraphyStencils';

export interface FontCombination {
  id: string;
  name: string;
  badge?: string;
  title: string;
  subtitle?: string;
  titleFont: string;
  subtitleFont?: string;
  titleSize: number;
  subtitleSize?: number;
  titleColor: string;
  subtitleColor?: string;
  titleWeight: string;
  subtitleWeight?: string;
  letterSpacing?: number;
  shadow?: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  cardBg: string;
  accentColor: string;
}

// Curated Canva-style Font Combinations (Matching Canva Image 4 + authentic Marathi cultural typography)
export const CURATED_FONT_COMBINATIONS: FontCombination[] = [
  {
    id: 'creating-magic',
    name: 'Creating Magic',
    badge: 'Popular',
    title: 'MAGIC',
    subtitle: 'creating',
    titleFont: 'Montserrat',
    subtitleFont: 'Mukta',
    titleSize: 52,
    subtitleSize: 24,
    titleColor: '#38bdf8',
    subtitleColor: '#e0f2fe',
    titleWeight: '900',
    subtitleWeight: 'bold',
    letterSpacing: 4,
    shadow: { color: 'rgba(56, 189, 248, 0.75)', blur: 18, offsetX: 0, offsetY: 0 },
    cardBg: 'linear-gradient(135deg, #090d16 0%, #172554 100%)',
    accentColor: '#38bdf8',
  },
  {
    id: 'thank-you',
    name: 'Thank you!',
    badge: 'Sticker',
    title: 'Thank you!',
    subtitle: 'for your kindness',
    titleFont: 'Baloo 2',
    subtitleFont: 'Poppins',
    titleSize: 46,
    subtitleSize: 18,
    titleColor: '#f97316',
    subtitleColor: '#fed7aa',
    titleWeight: '900',
    subtitleWeight: 'normal',
    shadow: { color: '#7c2d12', blur: 0, offsetX: 3, offsetY: 3 },
    cardBg: 'linear-gradient(135deg, #431407 0%, #7c2d12 100%)',
    accentColor: '#fb923c',
  },
  {
    id: 'golden-hour',
    name: 'GOLDEN HOUR',
    badge: 'Luxury',
    title: 'GOLDEN HOUR',
    subtitle: 'HAUTE COUTURE',
    titleFont: 'Cinzel',
    subtitleFont: 'Montserrat',
    titleSize: 38,
    subtitleSize: 14,
    titleColor: '#fbbf24',
    subtitleColor: '#fef08a',
    titleWeight: 'bold',
    subtitleWeight: '500',
    letterSpacing: 6,
    shadow: { color: 'rgba(251, 191, 36, 0.4)', blur: 10, offsetX: 0, offsetY: 2 },
    cardBg: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
    accentColor: '#fbbf24',
  },
  {
    id: 'player-one',
    name: 'player one',
    badge: 'Cyberpunk',
    title: 'player one',
    subtitle: 'LEVEL UP // PRESS START',
    titleFont: 'Press Start 2P',
    subtitleFont: 'Montserrat',
    titleSize: 32,
    subtitleSize: 12,
    titleColor: '#22c55e',
    subtitleColor: '#86efac',
    titleWeight: '900',
    subtitleWeight: 'bold',
    letterSpacing: 2,
    shadow: { color: 'rgba(34, 197, 94, 0.8)', blur: 14, offsetX: 0, offsetY: 0 },
    cardBg: 'linear-gradient(135deg, #052e16 0%, #022c22 100%)',
    accentColor: '#22c55e',
  },
  {
    id: 'happy-birthday',
    name: 'Happy BIRTHDAY',
    badge: 'Celebration',
    title: 'BIRTHDAY',
    subtitle: 'Happy',
    titleFont: 'Mukta',
    subtitleFont: 'Baloo 2',
    titleSize: 48,
    subtitleSize: 26,
    titleColor: '#f43f5e',
    subtitleColor: '#fbcfe8',
    titleWeight: '900',
    subtitleWeight: 'bold',
    cardBg: 'linear-gradient(135deg, #4c0519 0%, #831843 100%)',
    accentColor: '#f43f5e',
  },
  {
    id: 'free-dreams',
    name: 'FREE DREAMS',
    badge: 'Retro',
    title: 'FREE DREAMS',
    subtitle: 'COLLECTIVE MEMORIES',
    titleFont: 'Yatra One',
    subtitleFont: 'Mukta',
    titleSize: 36,
    subtitleSize: 13,
    titleColor: '#a855f7',
    subtitleColor: '#e9d5ff',
    titleWeight: 'bold',
    subtitleWeight: '600',
    letterSpacing: 3,
    shadow: { color: 'rgba(168, 85, 247, 0.5)', blur: 12, offsetX: 0, offsetY: 2 },
    cardBg: 'linear-gradient(135deg, #2e1065 0%, #3b0764 100%)',
    accentColor: '#c084fc',
  },
  {
    id: 'business-journal',
    name: 'BUSINESS JOURNAL',
    badge: 'Editorial',
    title: 'BUSINESS JOURNAL',
    subtitle: 'PUNE FINANCIAL REVIEW',
    titleFont: 'Playfair Display',
    subtitleFont: 'Montserrat',
    titleSize: 34,
    subtitleSize: 12,
    titleColor: '#f8fafc',
    subtitleColor: '#94a3b8',
    titleWeight: 'bold',
    subtitleWeight: '600',
    letterSpacing: 2,
    cardBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    accentColor: '#38bdf8',
  },
  {
    id: 'ganesh-invocation',
    name: '॥ श्री गणेशाय नमः ॥',
    badge: 'Royal AMS',
    title: '॥ श्री गणेशाय नमः ॥',
    subtitle: 'शुभ कार्यारंभ • मंगल आशिर्वाद',
    titleFont: 'AMS Aaditya',
    subtitleFont: 'Mukta',
    titleSize: 40,
    subtitleSize: 16,
    titleColor: '#f59e0b',
    subtitleColor: '#fed7aa',
    titleWeight: 'bold',
    subtitleWeight: 'bold',
    shadow: { color: '#92400e', blur: 4, offsetX: 1, offsetY: 2 },
    cardBg: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
    accentColor: '#f59e0b',
  },
  {
    id: 'marathi-birthday',
    name: 'वाढदिवसाच्या हार्दिक शुभेच्छा',
    badge: 'Celebration',
    title: 'हार्दिक शुभेच्छा',
    subtitle: 'वाढदिवसाच्या',
    titleFont: 'AMS Manthan',
    subtitleFont: 'Baloo 2',
    titleSize: 42,
    subtitleSize: 22,
    titleColor: '#ef4444',
    subtitleColor: '#fecaca',
    titleWeight: 'bold',
    subtitleWeight: 'bold',
    cardBg: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)',
    accentColor: '#ef4444',
  },
  {
    id: 'rajeshahi-that',
    name: 'राजेशाही थाट',
    badge: 'Shivaji Era',
    title: 'राजेशाही थाट',
    subtitle: 'मराठी स्वाभिमान व संस्कृती',
    titleFont: 'AMS Gaurav',
    subtitleFont: 'Gotu',
    titleSize: 44,
    subtitleSize: 16,
    titleColor: '#f59e0b',
    subtitleColor: '#fef3c7',
    titleWeight: 'bold',
    subtitleWeight: '600',
    shadow: { color: '#78350f', blur: 6, offsetX: 0, offsetY: 3 },
    cardBg: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)',
    accentColor: '#fbbf24',
  },
];

// Sample Canva-style Logo Templates (Image 2)
export const LOGO_TEMPLATES = [
  {
    id: 'logo-miles',
    title: 'Miles & Mensah',
    subtitle: 'Floral & Botanical Studio',
    category: 'Logos',
    isPro: true,
    initials: 'M&M',
    accent: '#10b981',
    bg: '#064e3b',
  },
  {
    id: 'logo-aurora',
    title: 'Aurora Luxury',
    subtitle: 'Fine Gold & Diamond Jewelry',
    category: 'Logos',
    isPro: true,
    initials: '✦ A ✦',
    accent: '#f59e0b',
    bg: '#1c1917',
  },
  {
    id: 'logo-rimberio',
    title: 'Rimberio Solar',
    subtitle: 'Clean Energy & Power Solutions',
    category: 'Business',
    isPro: false,
    initials: '⚡ R',
    accent: '#06b6d4',
    bg: '#082f49',
  },
  {
    id: 'logo-home',
    title: 'Home Realty',
    subtitle: 'Residential & Commercial Estates',
    category: 'Business',
    isPro: false,
    initials: '⌂ H',
    accent: '#8b5cf6',
    bg: '#2e1065',
  },
  {
    id: 'logo-suvarna',
    title: 'सुवर्ण पेढी',
    subtitle: 'पुणेरी शुद्ध सुवर्ण अलंकार',
    category: 'Logos',
    isPro: true,
    initials: '॥ सु ॥',
    accent: '#eab308',
    bg: '#451a03',
  },
  {
    id: 'logo-punekar',
    title: 'Punekar Tech',
    subtitle: 'Cloud & AI Software Systems',
    category: 'Business',
    isPro: false,
    initials: 'PT',
    accent: '#3b82f6',
    bg: '#0f172a',
  },
  {
    id: 'logo-sahyadri',
    title: 'सह्याद्री ॲग्रो',
    subtitle: 'सेंद्रिय शेती व अस्सल मसाले',
    category: 'Offers',
    isPro: false,
    initials: '🌱',
    accent: '#22c55e',
    bg: '#14532d',
  },
  {
    id: 'logo-swarajya',
    title: 'स्वराज्य प्रतिष्ठान',
    subtitle: 'सामाजिक व सांस्कृतिक प्रबोधन',
    category: 'Festivals',
    isPro: true,
    initials: '🚩',
    accent: '#ea580c',
    bg: '#431407',
  },
];

export interface AudioTrackItem {
  id: string;
  title: string;
  author: string;
  category: 'upbeat' | 'calm' | 'marathi' | 'soft' | 'festive';
  duration: string;
  durationSec: number;
  isPro: boolean;
  tempo: string;
  type: 'instrumental' | 'vocal';
}

export const AUDIO_TRACKS: AudioTrackItem[] = [
  // Upbeat
  {
    id: 'audio-upbeat-1',
    title: 'that feeling',
    author: 'Free Music Archive',
    category: 'upbeat',
    duration: '1:32',
    durationSec: 92,
    isPro: true,
    tempo: 'Upbeat (124 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-upbeat-2',
    title: 'Way You Make Me Feel',
    author: 'Beats Collective',
    category: 'upbeat',
    duration: '2:10',
    durationSec: 130,
    isPro: true,
    tempo: 'Upbeat (128 BPM)',
    type: 'vocal',
  },
  {
    id: 'audio-upbeat-3',
    title: "I'm Golden",
    author: 'Studio Waves',
    category: 'upbeat',
    duration: '1:45',
    durationSec: 105,
    isPro: false,
    tempo: 'Upbeat (118 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-upbeat-4',
    title: 'Electric Sunrise',
    author: 'Modern Pop',
    category: 'upbeat',
    duration: '2:04',
    durationSec: 124,
    isPro: true,
    tempo: 'Upbeat (130 BPM)',
    type: 'instrumental',
  },
  // Calm
  {
    id: 'audio-calm-1',
    title: 'Neptune',
    author: 'Ambient Horizon',
    category: 'calm',
    duration: '2:48',
    durationSec: 168,
    isPro: false,
    tempo: 'Calm (80 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-calm-2',
    title: 'We Move Through Shadows',
    author: 'Chill Lo-Fi Beats',
    category: 'calm',
    duration: '1:56',
    durationSec: 116,
    isPro: true,
    tempo: 'Calm (75 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-calm-3',
    title: 'Luna',
    author: 'Acoustic Calm Vibes',
    category: 'calm',
    duration: '2:15',
    durationSec: 135,
    isPro: false,
    tempo: 'Calm (82 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-calm-4',
    title: 'Gentle Rain Reflection',
    author: 'Nature & Piano Duo',
    category: 'calm',
    duration: '3:10',
    durationSec: 190,
    isPro: false,
    tempo: 'Calm (68 BPM)',
    type: 'instrumental',
  },
  // Marathi & Traditional
  {
    id: 'audio-marathi-1',
    title: 'Energetic Dhol Tasha Beat',
    author: 'Nashik Dhol Band',
    category: 'marathi',
    duration: '1:30',
    durationSec: 90,
    isPro: true,
    tempo: 'Festive (135 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-marathi-2',
    title: 'Royal Shehnai Celebration',
    author: 'Wedding Mangalashtak Group',
    category: 'marathi',
    duration: '2:15',
    durationSec: 135,
    isPro: false,
    tempo: 'Festive (95 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-marathi-3',
    title: 'Peaceful Bansuri Meditation',
    author: 'Divine Flute Collection',
    category: 'marathi',
    duration: '1:45',
    durationSec: 105,
    isPro: false,
    tempo: 'Calm (70 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-marathi-4',
    title: 'Ganesh Utsav Aarti Instrumental',
    author: 'Lalbaug Dhwaj Pathak',
    category: 'marathi',
    duration: '2:30',
    durationSec: 150,
    isPro: true,
    tempo: 'Festive (120 BPM)',
    type: 'instrumental',
  },
  // Soft background music for video
  {
    id: 'audio-soft-1',
    title: 'Soft Morning Acoustic',
    author: 'Coffeehouse Acoustic',
    category: 'soft',
    duration: '2:22',
    durationSec: 142,
    isPro: false,
    tempo: 'Soft (88 BPM)',
    type: 'instrumental',
  },
  {
    id: 'audio-soft-2',
    title: 'Inspiring Corporate Journey',
    author: 'Enterprise Music Lab',
    category: 'soft',
    duration: '2:00',
    durationSec: 120,
    isPro: false,
    tempo: 'Soft (100 BPM)',
    type: 'instrumental',
  },
];

export const BACKGROUND_LANDSCAPES = [
  {
    id: 'bg-mountains',
    title: 'Snowy Mountain Peak',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'bg-sahyadri',
    title: 'Sahyadri Western Ghats',
    url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'bg-desert',
    title: 'Desert Sunset Horizon',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'bg-sea',
    title: 'Arabian Sea Coast Sunset',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'bg-road',
    title: 'Country Dirt Road & Open Sky',
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=70',
  },
];

export const BACKGROUND_PATTERNS = [
  {
    id: 'pat-petals',
    title: 'Pink Petals & Blossoms',
    url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'pat-leaves',
    title: 'Tropical Palm Leaves',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'pat-golden-stems',
    title: 'Delicate Golden Stems',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'pat-rangoli',
    title: 'Traditional Marathi Rangoli',
    url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'pat-khun',
    title: 'Paithani & Khun Silk Motif',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=70',
  },
];

export const BACKGROUND_GRADIENTS = [
  { id: 'kesari', name: 'Kesari Sunrise', css: 'from-orange-700 via-orange-500 to-amber-500' },
  { id: 'royal-blue', name: 'Royal Maratha', css: 'from-slate-950 via-blue-900 to-blue-600' },
  { id: 'maroon', name: 'Maroon Velvet', css: 'from-red-950 via-rose-900 to-red-800' },
  { id: 'gold', name: 'Golden Haldi', css: 'from-amber-600 via-amber-500 to-yellow-400' },
  { id: 'studio-silver', name: 'Studio Silver', css: 'from-slate-900 via-zinc-800 to-slate-700' },
  { id: 'sunset-dusk', name: 'Sunset Dusk', css: 'from-purple-950 via-purple-700 to-rose-500' },
  { id: 'midnight-neon', name: 'Midnight Neon', css: 'from-slate-950 via-indigo-950 to-cyan-600' },
  { id: 'emerald-forest', name: 'Emerald Forest', css: 'from-emerald-950 via-emerald-800 to-teal-500' },
];

export const BACKGROUND_ABSTRACTS = [
  {
    id: 'abs-holo',
    title: '3D Holographic Waves',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'abs-watercolor',
    title: 'Soft Watercolor Wash',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'abs-nebula',
    title: 'Cosmic Dark Nebula',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=70',
  },
  {
    id: 'abs-paper',
    title: 'Textured Handmade Paper',
    url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300&q=70',
  },
];

interface CanvaDrawerProps {
  activeTab: CanvaTabId;
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  canvasDimensions?: { width: number; height: number };
  onAddText: (text: string, size?: number, weight?: string, family?: string, color?: string, shadow?: any) => void;
  onUpdateText?: (prop: string, val: any) => void;
  onAddCalligraphy: (item: CalligraphyItem) => void;
  onAddShape: (type: 'rect' | 'circle' | 'triangle' | 'star' | 'line' | 'arrow', color?: string) => void;
  onAddBannerBadge: (type: 'banner' | 'badge' | 'seal') => void;
  onAddDesignElement?: (element: DesignElement) => void;
  userMedia: any[];
  onUploadMedia: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  onAddImageToCanvas: (url: string) => void;
  onOpenAiModal: () => void;
  canvasBackgroundColor: string;
  onSetCanvasBackground: (color: string) => void;
  onSetGradientBackground: (gradientType: string) => void;
  canvasObjects: fabric.Object[];
  selectedObject: fabric.Object | null;
  onSelectCanvasObject: (obj: fabric.Object) => void;
  onReorderObject: (obj: fabric.Object, direction: 'up' | 'down') => void;
  onDeleteObject: (obj: fabric.Object) => void;
  onToggleLockObject: (obj: fabric.Object) => void;
  isDrawingMode: boolean;
  onToggleDrawingMode: () => void;
  brushColor: string;
  onSetBrushColor: (c: string) => void;
  brushWidth: number;
  onSetBrushWidth: (w: number) => void;
  // Extended Canva Tool Callbacks
  onAddChart?: (type: 'bar' | 'pie' | 'line' | 'donut', data: { label: string; value: number; color: string }[]) => void;
  onAddTable?: (rows: number, cols: number, theme: string) => void;
  onAddFrame?: (frameType: string) => void;
  onAddLayout?: (layoutType: string) => void;
  onAddQrCode?: (text: string, color: string) => void;
  onSelectBrandPalette?: (colors: string[]) => void;
  onOpenIntegration?: (details: any) => void;
  onAddFontCombination?: (combo: FontCombination) => void;
  onSwitchTab?: (tab: CanvaTabId) => void;
  onSetBackgroundImage?: (url: string) => void;
  onAddAudioTrack?: (track: any) => void;
  onSaveAsTemplate?: () => void;
}

export const CanvaDrawer: React.FC<CanvaDrawerProps> = ({
  activeTab,
  isOpen,
  onClose,
  templates,
  onSelectTemplate,
  onSaveAsTemplate,
  onAddText,
  onUpdateText,
  onAddCalligraphy,
  onAddShape,
  onAddBannerBadge,
  onAddDesignElement,
  userMedia,
  onUploadMedia,
  isUploading,
  onAddImageToCanvas,
  onOpenAiModal,
  canvasBackgroundColor,
  onSetCanvasBackground,
  onSetGradientBackground,
  onSetBackgroundImage,
  onAddAudioTrack,
  canvasObjects,
  selectedObject,
  onSelectCanvasObject,
  onReorderObject,
  onDeleteObject,
  onToggleLockObject,
  isDrawingMode,
  onToggleDrawingMode,
  brushColor,
  onSetBrushColor,
  brushWidth,
  onSetBrushWidth,
  onAddChart,
  onAddTable,
  onAddFrame,
  onAddLayout,
  onAddQrCode,
  onSelectBrandPalette,
  onOpenIntegration,
  onAddFontCombination,
  onSwitchTab,
  canvasDimensions,
}) => {
  // Filters & State
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedTemplateCat, setSelectedTemplateCat] = useState<string>('all');
  const [sizeFilterMode, setSizeFilterMode] = useState<'same-size' | 'all-sizes'>('same-size');
  const [calligraphySearch, setCalligraphySearch] = useState('');
  const [fontSearch, setFontSearch] = useState('');
  const [fontTesterText, setFontTesterText] = useState('॥ श्री गणेशाय नमः ॥');
  const [selectedDrawerFontCategory, setSelectedDrawerFontCategory] = useState<string>('all');
  const [textTabMode, setTextTabMode] = useState<'fonts' | 'combinations' | 'calligraphy'>('fonts');

  // Elements State
  const [designElements, setDesignElements] = useState<DesignElement[]>([]);
  const [elementsSearch, setElementsSearch] = useState('');
  const [selectedElementCategory, setSelectedElementCategory] = useState<string>('all');
  const [loadingElements, setLoadingElements] = useState(false);

  // Brand Kit State
  const [brandKitTab, setBrandKitTab] = useState<'guidelines' | 'templates' | 'logos' | 'colors' | 'fonts' | 'photos'>('templates');
  const [selectedBrandKit, setSelectedBrandKit] = useState('Punekar Tech Brand Kit');

  // Interactive Chart Tool State
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'donut'>('bar');
  const [chartData, setChartData] = useState([
    { label: 'जानेवारी', value: 45, color: '#ea580c' },
    { label: 'फेब्रुवारी', value: 78, color: '#f59e0b' },
    { label: 'मार्च', value: 92, color: '#1e3a8a' },
    { label: 'एप्रिल', value: 64, color: '#059669' }
  ]);

  // Interactive Table Tool State
  const [tableRows, setTableRows] = useState(4);
  const [tableCols, setTableCols] = useState(3);
  const [tableTheme, setTableTheme] = useState('kesari');

  // QR Code Tool State
  const [qrText, setQrText] = useState('https://marathidesignstudio.com');
  const [qrColor, setQrColor] = useState('#000000');

  // Audio Drawer State
  const [audioSearch, setAudioSearch] = useState('');
  const [selectedAudioCategory, setSelectedAudioCategory] = useState<string>('all');
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [audioFilterDuration, setAudioFilterDuration] = useState<string>('all');
  const [audioFilterVocal, setAudioFilterVocal] = useState<string>('all');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [playingProgress, setPlayingProgress] = useState<number>(0);
  const [isAiVoiceModalOpen, setIsAiVoiceModalOpen] = useState(false);
  const [aiVoiceText, setAiVoiceText] = useState('शिवजयंतीच्या सर्व शिवभक्तांना हार्दिक शुभेच्छा!');
  const [aiVoiceSpeaker, setAiVoiceSpeaker] = useState('aarohi');
  const [aiVoiceSpeed, setAiVoiceSpeed] = useState(1.0);
  const [aiVoicePitch, setAiVoicePitch] = useState(1.0);
  const [isAiVoiceGenerating, setIsAiVoiceGenerating] = useState(false);
  const [aiVoiceSuccessMsg, setAiVoiceSuccessMsg] = useState<string | null>(null);
  const [audioToast, setAudioToast] = useState<string | null>(null);

  // Background Drawer State
  const [bgSearch, setBgSearch] = useState('');
  const [recentlyUsedBgs, setRecentlyUsedBgs] = useState<string[]>([
    '#ffffff',
    'kesari',
    '#0f172a',
    'royal-blue',
  ]);
  const bgPaletteColorInputRef = useRef<HTMLInputElement | null>(null);

  // Calligraphy & Vector Stencils Studio State (Node.js Tools Service)
  const [stencilCategory, setStencilCategory] = useState<string>('all');
  const [stencilTheme, setStencilTheme] = useState<string>('gold-foil');
  const [stencilSearch, setStencilSearch] = useState<string>('');
  const [transliterateInput, setTransliterateInput] = useState<string>('');
  const [transliteratedText, setTransliteratedText] = useState<string>('');
  const [stencilsList, setStencilsList] = useState<CalligraphyStencil[]>(CLIENT_STENCILS);
  const [isGeneratingCalligraphy, setIsGeneratingCalligraphy] = useState<boolean>(false);
  const [stencilToast, setStencilToast] = useState<string | null>(null);

  // Sync stencils from Node.js Tools Microservice (/api/v1/tools/calligraphy/catalog)
  useEffect(() => {
    let isMounted = true;
    const fetchToolsCatalog = async () => {
      try {
        const res = await fetch(`/api/v1/tools/calligraphy/catalog?theme=${stencilTheme}`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.stencils) && isMounted) {
            setStencilsList(data.stencils);
          }
        }
      } catch (err) {
        // Keeps client fallback
      }
    };
    fetchToolsCatalog();
    return () => { isMounted = false; };
  }, [stencilTheme]);

  useEffect(() => {
    if (activeTab === 'fonts') {
      setTextTabMode('fonts');
    }
  }, [activeTab]);

  const handleTransliterateChange = async (val: string) => {
    setTransliterateInput(val);
    const clientVal = clientTransliterate(val);
    setTransliteratedText(clientVal);

    if (val.trim()) {
      try {
        const res = await fetch('/api/v1/tools/transliterate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: val })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.marathi) {
            setTransliteratedText(data.marathi);
          }
        }
      } catch (e) {}
    }
  };

  const handleGenerateCalligraphyBanner = async () => {
    const textToGen = transliteratedText || transliterateInput || 'हार्दिक शुभेच्छा';
    setIsGeneratingCalligraphy(true);
    try {
      const res = await fetch('/api/v1/tools/calligraphy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToGen, theme: stencilTheme })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.svg && onAddDesignElement) {
          onAddDesignElement({
            id: Date.now(),
            title: textToGen,
            category: 'calligraphy',
            elementType: 'SVG',
            svgData: data.svg,
            isPremium: false,
            fileSizeBytes: 1024,
            defaultWidth: 600,
            defaultHeight: 220,
            createdAt: new Date().toISOString()
          });
          setStencilToast(`✨ Calligraphy generated for "${textToGen}"!`);
          setTimeout(() => setStencilToast(null), 3000);
        }
      }
    } catch (e) {
      if (onAddCalligraphy) {
        onAddCalligraphy({
          id: 'custom-calligraphy',
          category: 'honorific',
          titleMr: textToGen,
          badge: 'Custom',
          text: textToGen,
          fontFamily: 'AMS Aaditya',
          fontSize: 64,
          fill: '#FFB300'
        });
        setStencilToast(`✨ Calligraphy added for "${textToGen}"!`);
        setTimeout(() => setStencilToast(null), 3000);
      }
    } finally {
      setIsGeneratingCalligraphy(false);
    }
  };

  const handleAddStencil = (stencil: CalligraphyStencil) => {
    if (onAddDesignElement) {
      onAddDesignElement({
        id: Date.now(),
        title: stencil.title,
        category: stencil.category,
        elementType: 'SVG',
        svgData: stencil.svg,
        isPremium: false,
        fileSizeBytes: 2048,
        defaultWidth: Math.min(stencil.width || 450, 500),
        defaultHeight: Math.min(stencil.height || 300, 350),
        createdAt: new Date().toISOString()
      });
      setStencilToast(`Added "${stencil.title}" to canvas!`);
      setTimeout(() => setStencilToast(null), 3000);
    }
  };

  // Audio playback progress animation simulation
  useEffect(() => {
    let interval: any = null;
    if (playingTrackId) {
      interval = setInterval(() => {
        setPlayingProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 250);
    } else {
      setPlayingProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playingTrackId]);

  const togglePlayTrack = (trackId: string) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
      setPlayingProgress(0);
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          gain.gain.value = 0.04;
          osc.frequency.setValueAtTime(520, audioCtx.currentTime);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.12);
        }
      } catch (e) {
        // audio policy or test environment
      }
    }
  };

  const handleAddTrack = (track: any) => {
    if (onAddAudioTrack) {
      onAddAudioTrack(track);
    }
    setAudioToast(`Added "${track.title}" to project audio timeline`);
    setTimeout(() => setAudioToast(null), 3500);
  };

  const handleGenerateAiVoice = () => {
    setIsAiVoiceGenerating(true);
    setAiVoiceSuccessMsg(null);
    setTimeout(() => {
      setIsAiVoiceGenerating(false);
      setAiVoiceSuccessMsg(`Voiceover generated: "${aiVoiceText.slice(0, 32)}..." with ${aiVoiceSpeaker} voice!`);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(aiVoiceText);
          utterance.rate = aiVoiceSpeed;
          utterance.pitch = aiVoicePitch;
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.log('Speech preview notice:', err);
        }
      }
    }, 600);
  };

  const handleInsertAiVoiceToDesign = () => {
    const aiTrack = {
      id: `ai-voice-${Date.now()}`,
      title: `AI Voice: ${aiVoiceText.slice(0, 24)}...`,
      author: `AI Voice Studio (${aiVoiceSpeaker})`,
      category: 'marathi' as const,
      duration: '0:15',
      durationSec: 15,
      isPro: false,
      tempo: 'Voiceover',
      type: 'vocal' as const,
    };
    handleAddTrack(aiTrack);
    setIsAiVoiceModalOpen(false);
  };

  const handleApplyBackgroundLandscape = (url: string) => {
    if (onSetBackgroundImage) {
      onSetBackgroundImage(url);
    } else {
      onAddImageToCanvas(url);
    }
    setRecentlyUsedBgs((prev) => [url, ...prev.filter((u) => u !== url)].slice(0, 4));
  };

  const handleApplyBackgroundPattern = (url: string) => {
    if (onSetBackgroundImage) {
      onSetBackgroundImage(url);
    } else {
      onAddImageToCanvas(url);
    }
    setRecentlyUsedBgs((prev) => [url, ...prev.filter((u) => u !== url)].slice(0, 4));
  };

  const handleApplyBackgroundGradient = (gradId: string) => {
    onSetGradientBackground(gradId);
    setRecentlyUsedBgs((prev) => [gradId, ...prev.filter((g) => g !== gradId)].slice(0, 4));
  };

  const handleApplyBackgroundColor = (color: string) => {
    onSetCanvasBackground(color);
    setRecentlyUsedBgs((prev) => [color, ...prev.filter((c) => c !== color)].slice(0, 4));
  };

  useEffect(() => {
    if (activeTab === 'elements' && designElements.length === 0) {
      loadElements();
    }
  }, [activeTab]);

  const loadElements = async () => {
    try {
      setLoadingElements(true);
      const data = await api.getDesignElements();
      setDesignElements(data);
    } catch (e) {
      console.error('Failed to load design elements', e);
    } finally {
      setLoadingElements(false);
    }
  };

  // Size filtering: strictly match editor canvas size when sizeFilterMode === 'same-size'
  const matchesEditorSize = React.useCallback(
    (t: { width?: number; height?: number }) => {
      if (!canvasDimensions) return true;
      const w = t.width || 1080;
      const h = t.height || 1080;

      // 1. Exact match (within 5px threshold)
      if (Math.abs(w - canvasDimensions.width) < 5 && Math.abs(h - canvasDimensions.height) < 5) {
        return true;
      }

      // 2. Proportional aspect ratio match within 2.5% tolerance (e.g. 1:1, 4:5, 9:16)
      const editorRatio = canvasDimensions.width / canvasDimensions.height;
      const templateRatio = w / h;
      return Math.abs(editorRatio - templateRatio) < 0.025;
    },
    [canvasDimensions]
  );

  // Filter templates: merge with CANVA_IMPORTED_TEMPLATES if not already present
  const mergedTemplates = React.useMemo(() => {
    const list = [...templates];
    for (const ct of CANVA_IMPORTED_TEMPLATES) {
      if (!list.some((item) => item.id === ct.id)) {
        list.unshift(ct);
      }
    }
    return list;
  }, [templates]);

  // Filtered Canva Official Templates (Strictly respects editor size when sizeFilterMode === 'same-size')
  const filteredCanvaTemplates = React.useMemo(() => {
    return CANVA_IMPORTED_TEMPLATES.filter((ct) => {
      if (sizeFilterMode === 'same-size' && !matchesEditorSize(ct)) {
        return false;
      }

      const matchCat =
        selectedTemplateCat === 'all' ||
        selectedTemplateCat === 'canva' ||
        ct.categorySlug.toLowerCase() === selectedTemplateCat.toLowerCase();

      const matchSearch =
        !templateSearch ||
        ct.titleMr.toLowerCase().includes(templateSearch.toLowerCase()) ||
        (ct.descriptionMr && ct.descriptionMr.toLowerCase().includes(templateSearch.toLowerCase())) ||
        (ct.tags && ct.tags.toLowerCase().includes(templateSearch.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [sizeFilterMode, matchesEditorSize, selectedTemplateCat, templateSearch]);

  const filteredTemplates = React.useMemo(() => {
    return mergedTemplates.filter((t) => {
      // Exclude CANVA_IMPORTED_TEMPLATES from general list if already shown in Canva section
      if (CANVA_IMPORTED_TEMPLATES.some((ct) => ct.id === t.id)) {
        return false;
      }

      if (sizeFilterMode === 'same-size' && !matchesEditorSize(t)) {
        return false;
      }

      const matchCat =
        selectedTemplateCat === 'all' ||
        (selectedTemplateCat === 'canva' && (t.tags?.includes('Canva') || t.id >= 1000)) ||
        (selectedTemplateCat === 'my-templates' && (t.categorySlug === 'my-templates' || t.tags?.includes('Custom') || t.tags?.includes('Saved'))) ||
        t.categorySlug.toLowerCase() === selectedTemplateCat.toLowerCase();

      const matchSearch =
        !templateSearch ||
        t.titleMr.toLowerCase().includes(templateSearch.toLowerCase()) ||
        (t.descriptionMr && t.descriptionMr.toLowerCase().includes(templateSearch.toLowerCase())) ||
        (t.tags && t.tags.toLowerCase().includes(templateSearch.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [mergedTemplates, sizeFilterMode, matchesEditorSize, selectedTemplateCat, templateSearch]);

  // Filter Logo Templates
  const filteredLogoTemplates = LOGO_TEMPLATES.filter((lt) => {
    const matchCat = selectedTemplateCat === 'all' || lt.category.toLowerCase() === selectedTemplateCat.toLowerCase();
    const matchSearch =
      !templateSearch ||
      lt.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
      lt.subtitle.toLowerCase().includes(templateSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Filter Fonts
  const filteredFonts = MARATHI_FONTS.filter((f) => {
    const matchesSearch =
      !fontSearch ||
      f.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
      f.id.toLowerCase().includes(fontSearch.toLowerCase()) ||
      (f.badge && f.badge.toLowerCase().includes(fontSearch.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedDrawerFontCategory === 'all') return true;
    if (selectedDrawerFontCategory === 'popular') return f.category === 'popular';
    if (selectedDrawerFontCategory === 'marathi-standard') return f.category === 'marathi-standard';
    if (selectedDrawerFontCategory === 'calligraphy') return f.category === 'calligraphy';
    if (selectedDrawerFontCategory === 'handwritten') return f.category === 'handwritten';
    if (selectedDrawerFontCategory === 'decorative') return f.category === 'decorative';
    if (selectedDrawerFontCategory === 'professional') return f.category === 'professional';
    if (selectedDrawerFontCategory === 'serif') return f.category === 'serif';
    if (selectedDrawerFontCategory === 'sans-serif') return f.category === 'sans-serif';
    if (selectedDrawerFontCategory === 'legacy') return f.category === 'legacy';

    return true;
  });

  // Filter Font Combinations
  const filteredFontCombinations = CURATED_FONT_COMBINATIONS.filter((fc) => {
    return (
      !fontSearch ||
      fc.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
      fc.title.toLowerCase().includes(fontSearch.toLowerCase()) ||
      (fc.subtitle && fc.subtitle.toLowerCase().includes(fontSearch.toLowerCase()))
    );
  });

  // Handle Font Combination Insertion onto Canvas
  const handleInsertFontCombo = (combo: FontCombination) => {
    if (onAddFontCombination) {
      onAddFontCombination(combo);
    } else {
      if (combo.subtitle) {
        onAddText(combo.subtitle, combo.subtitleSize || 20, combo.subtitleWeight || 'normal', combo.subtitleFont || 'Mukta', combo.subtitleColor || '#38bdf8');
      }
      onAddText(combo.title, combo.titleSize, combo.titleWeight, combo.titleFont, combo.titleColor, combo.shadow);
    }
  };

  // 12 Vibrant Browse Categories Tiles (Matching Canva Image 3)
  const BROWSE_CATEGORIES = [
    { id: 'shapes', label: 'Shapes', gradient: 'from-rose-500 to-pink-600', icon: Square, targetTab: 'elements' as CanvaTabId },
    { id: 'graphics', label: 'Graphics', gradient: 'from-violet-600 to-purple-700', icon: Sparkles, targetTab: 'elements' as CanvaTabId },
    { id: 'animations', label: 'Animations', gradient: 'from-cyan-500 to-teal-600', icon: Film, targetTab: 'videos' as CanvaTabId },
    { id: 'photos', label: 'Photos', gradient: 'from-amber-500 to-orange-600', icon: ImageIcon, targetTab: 'photos' as CanvaTabId },
    { id: 'videos', label: 'Videos', gradient: 'from-emerald-500 to-green-600', icon: Video, targetTab: 'videos' as CanvaTabId },
    { id: 'audio', label: 'Audio', gradient: 'from-purple-600 to-indigo-700', icon: Music, targetTab: 'audio' as CanvaTabId },
    { id: 'charts', label: 'Charts', gradient: 'from-blue-500 to-cyan-600', icon: BarChart2, targetTab: 'charts' as CanvaTabId },
    { id: 'forms', label: 'Forms', gradient: 'from-fuchsia-600 to-pink-600', icon: Columns3, targetTab: 'layouts' as CanvaTabId },
    { id: 'sheets', label: 'Sheets', gradient: 'from-teal-500 to-emerald-700', icon: FileSpreadsheet, targetTab: 'tables' as CanvaTabId },
    { id: 'tables', label: 'Tables', gradient: 'from-indigo-600 to-violet-800', icon: TableIcon, targetTab: 'tables' as CanvaTabId },
    { id: 'frames', label: 'Frames', gradient: 'from-red-500 to-rose-600', icon: Circle, targetTab: 'frames' as CanvaTabId },
    { id: 'grids', label: 'Grids', gradient: 'from-amber-600 to-yellow-500', icon: LayoutGrid, targetTab: 'grids' as CanvaTabId },
  ];

  if (!isOpen) return null;

  return (
    <div className="relative w-[360px] bg-[#252627] text-gray-200 border-r border-[#343538] flex flex-col h-full overflow-hidden z-10 shrink-0 select-none">
      
      {/* Collapse Button Floating on Edge */}
      <button
        onClick={onClose}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-[#252627] border border-[#343538] text-gray-400 hover:text-white rounded-r-lg flex items-center justify-center shadow-lg z-30 transition-all cursor-pointer"
        title="Collapse panel"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* DRAWER CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* ========================================================= */}
        {/* 1. TEMPLATES TAB (Canva Official & Marathi Templates) */}
        {/* ========================================================= */}
        {activeTab === 'templates' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#8b3dff]" />
                <span>Design Templates (टेम्पलेट्स)</span>
              </h3>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                Canva + Unicode
              </span>
            </div>

            {/* Save Current Canvas As Template Action */}
            {onSaveAsTemplate && (
              <button
                type="button"
                onClick={onSaveAsTemplate}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#8b3dff] via-indigo-600 to-[#7025ea] hover:brightness-110 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer border border-purple-400/40"
                title="Save your current canvas artwork as an editable reusable template"
              >
                <Plus className="w-4 h-4 text-amber-300 stroke-[3]" />
                <span>Save Current Canvas as Template</span>
              </button>
            )}

            {/* Search Templates with Voice Mic Icon */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search templates (e.g. Canva, उद्घाटन, लग्न, सण, Business)..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="w-full bg-[#18191b] border border-[#343538] rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8b3dff]"
              />
              <button
                onClick={() => alert('Voice search activated. Say your template style (e.g. "Festival", "Wedding", "Grand Opening")...')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white hover:bg-[#252627] rounded-lg transition-colors cursor-pointer"
                title="Search by voice"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Template Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
              {[
                { id: 'all', label: 'All' },
                { id: 'canva', label: '★ Canva Official' },
                { id: 'festivals', label: 'Festivals' },
                { id: 'wedding', label: 'Wedding' },
                { id: 'business', label: 'Business' },
                { id: 'offers', label: 'Offers' },
                { id: 'my-templates', label: 'My Saved' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTemplateCat(cat.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors capitalize cursor-pointer ${
                    selectedTemplateCat === cat.id
                      ? 'bg-purple-600 text-white font-black shadow-sm'
                      : 'bg-[#18191b] text-gray-400 hover:text-white hover:bg-[#202124]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Active Canvas Size Matching Indicator Banner */}
            {canvasDimensions && (
              <div
                className="flex items-center justify-between p-2 rounded-xl bg-[#18191b] border border-[#2d2e30] text-xs select-none"
                data-testid="template-size-filter-banner"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <span className="font-bold text-gray-200 text-[11px] truncate">
                    Editor Size: <span className="text-purple-400 font-mono font-bold">{canvasDimensions.width} × {canvasDimensions.height} px</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSizeFilterMode(sizeFilterMode === 'same-size' ? 'all-sizes' : 'same-size')}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                    sizeFilterMode === 'same-size'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                      : 'bg-[#222428] text-gray-400 hover:text-white border border-[#343538]'
                  }`}
                  title="Toggle between showing only templates matching your canvas size, or all sizes"
                  data-testid="toggle-size-filter-btn"
                >
                  {sizeFilterMode === 'same-size' ? '✓ Same size only' : 'All sizes'}
                </button>
              </div>
            )}

            {/* FEATURED: Canva Official Editable Templates Spotlight (Filtered to Editor Size) */}
            {(selectedTemplateCat === 'all' || selectedTemplateCat === 'canva') && !templateSearch && filteredCanvaTemplates.length > 0 && (
              <div className="pt-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>Canva Official Templates</span>
                  </span>
                  <span className="text-[10px] text-purple-400 font-bold">{canvasDimensions?.width}×{canvasDimensions?.height} px</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {filteredCanvaTemplates.map((ct) => (
                    <div
                      key={ct.id}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({ type: 'template', template: ct }));
                      }}
                      onClick={() => onSelectTemplate(ct)}
                      className="group relative bg-[#18191b] border border-purple-500/40 hover:border-purple-400 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-md flex flex-col justify-between"
                      title={`Click to load "${ct.titleMr}" into editor`}
                    >
                      <div className="aspect-[4/5] bg-[#222428] overflow-hidden flex items-center justify-center relative">
                        {ct.thumbnailUrl ? (
                          <img
                            src={ct.thumbnailUrl}
                            alt={ct.titleMr}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="p-3 text-center">
                            <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                            <span className="text-[10px] text-gray-300 font-bold">{ct.titleMr}</span>
                          </div>
                        )}

                        {/* Canva Pro Badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9px] font-black shadow-md flex items-center gap-1">
                          <span>CANVA</span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-2 text-center transition-opacity pointer-events-none">
                          <span className="px-3 py-1.5 bg-[#8b3dff] text-white text-[11px] font-extrabold rounded-lg shadow-xl mb-1">
                            Edit Template
                          </span>
                          <span className="text-[9px] text-purple-200 font-semibold">Click to load on canvas</span>
                        </div>
                      </div>

                      <div className="p-2 bg-[#18191b]">
                        <p className="text-[11px] font-bold text-white truncate leading-tight">{ct.titleMr}</p>
                        <div className="flex items-center justify-between mt-1 text-[9px] text-gray-400">
                          <span className="text-purple-300 font-semibold">{ct.categorySlug}</span>
                          <span>{ct.width}×{ct.height}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Poster Templates Section */}
            {filteredTemplates.length > 0 && (
              <div className="pt-2 border-t border-[#343538] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Marathi & Bilingual Templates</span>
                  <span className="text-[10px] text-gray-500 font-bold">{filteredTemplates.length} templates</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {filteredTemplates.map((t) => (
                    <div
                      key={t.id}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({ type: 'template', template: t }));
                      }}
                      onClick={() => onSelectTemplate(t)}
                      className="group relative bg-[#18191b] border border-[#343538] hover:border-[#8b3dff] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between"
                      title={t.titleMr}
                    >
                      <div className="aspect-[3/4] bg-[#2e3034] overflow-hidden flex items-center justify-center relative">
                        {t.thumbnailUrl ? (
                          <img
                            src={t.thumbnailUrl}
                            alt={t.titleMr}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="p-3 text-center flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-purple-400/80 mb-1">M</span>
                            <span className="text-[10px] text-gray-300 font-extrabold line-clamp-2 px-1">
                              {t.titleMr}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                          <span className="px-3 py-1 bg-[#8b3dff] text-white text-[11px] font-bold rounded-lg shadow-md">
                            Use Template
                          </span>
                        </div>
                      </div>
                      <div className="p-2 bg-[#18191b]">
                        <p className="text-xs font-bold text-white truncate">{t.titleMr}</p>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-0.5">
                          <span className="truncate">{t.categorySlug}</span>
                          <span className="font-mono text-purple-300">{t.width}×{t.height}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state when no templates match the active canvas size */}
            {filteredCanvaTemplates.length === 0 && filteredTemplates.length === 0 && (
              <div className="p-6 border border-[#2d2e30] rounded-xl text-center bg-[#18191b]/50">
                <LayoutTemplate className="w-8 h-8 text-purple-400/60 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-200">
                  No templates found for {canvasDimensions?.width} × {canvasDimensions?.height} px
                </p>
                <p className="text-[11px] text-gray-400 mt-1 mb-3">
                  Click below to browse templates in all sizes.
                </p>
                <button
                  type="button"
                  onClick={() => setSizeFilterMode('all-sizes')}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Show All Template Sizes
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. LAYOUTS TAB */}
        {/* ========================================================= */}
        {activeTab === 'layouts' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Poster Layout Presets</h3>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full">
                Auto Grid
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Instantly arrange your canvas into proven high-converting flyer and poster layouts.
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <button
                onClick={() => onAddLayout && onAddLayout('hero')}
                className="p-3 bg-[#18191b] border border-[#343538] hover:border-orange-500 rounded-xl text-left transition-all hover:bg-[#202124]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-orange-500/20 border border-orange-500/40 rounded flex flex-col justify-between p-1">
                    <div className="w-full h-2 bg-orange-500 rounded-xs" />
                    <div className="w-3/4 h-3 bg-orange-400 mx-auto rounded-xs" />
                    <div className="w-full h-3 bg-orange-300 rounded-xs" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Hero Poster Layout</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Top emblem, large Marathi title, white card & details footer</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => onAddLayout && onAddLayout('split')}
                className="p-3 bg-[#18191b] border border-[#343538] hover:border-amber-500 rounded-xl text-left transition-all hover:bg-[#202124]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 border border-amber-500/40 rounded flex overflow-hidden">
                    <div className="w-1/2 h-full bg-slate-900" />
                    <div className="w-1/2 h-full bg-amber-100" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">50/50 Split Promotion</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Bilingual marketing split with center 50% discount badge</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => onAddLayout && onAddLayout('festive')}
                className="p-3 bg-[#18191b] border border-[#343538] hover:border-red-500 rounded-xl text-left transition-all hover:bg-[#202124]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-red-950 border border-red-500/40 rounded flex flex-col items-center justify-center p-1">
                    <div className="w-8 h-10 border border-yellow-300/60 rounded flex items-center justify-center">
                      <span className="text-[8px] text-yellow-300">॥ ॐ ॥</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Festive Mahotsav Layout</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Royal maroon backdrop with gold borders and sacred invocations</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. ELEMENTS TAB (Matching Canva Image 3 & 1) */}
        {/* ========================================================= */}
        {activeTab === 'elements' && (
          <div className="space-y-4">
            
            {/* Search Elements Input with Mic (Image 3) */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="+ Search elements"
                value={elementsSearch}
                onChange={(e) => setElementsSearch(e.target.value)}
                className="w-full bg-[#18191b] border border-[#343538] rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#8b3dff]"
              />
              <button
                onClick={() => alert('Voice search activated')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white hover:bg-[#252627] rounded-lg transition-colors cursor-pointer"
                title="Voice search"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Icon Strip (LinkedIn, GitHub, Instagram, WhatsApp, X, Avatar, Chevron) (Image 3) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => onAddShape('rect', '#0077b5')}
                className="w-10 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-[#0a66c2] shrink-0 transition-colors"
                title="LinkedIn Icon"
              >
                <LinkedinIcon className="w-5 h-5 fill-current" />
              </button>
              <button
                onClick={() => onAddShape('circle', '#24292e')}
                className="w-10 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-white shrink-0 transition-colors"
                title="GitHub Icon"
              >
                <GithubIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onAddShape('circle', '#e1306c')}
                className="w-10 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-[#e1306c] shrink-0 transition-colors"
                title="Instagram Icon"
              >
                <InstagramIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onAddShape('circle', '#25d366')}
                className="w-10 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-[#25d366] shrink-0 transition-colors"
                title="WhatsApp Icon"
              >
                <div className="font-bold text-xs">WA</div>
              </button>
              <button
                onClick={() => onAddShape('rect', '#000000')}
                className="w-10 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-white shrink-0 transition-colors"
                title="X / Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onAddShape('circle', '#4f46e5')}
                className="w-10 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-indigo-400 shrink-0 transition-colors"
                title="User Avatar"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert('More icon packs available')}
                className="w-8 h-10 rounded-xl bg-[#18191b] hover:bg-[#222428] border border-[#343538] flex items-center justify-center text-gray-400 hover:text-white shrink-0 transition-colors"
                title="More icons"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Recommended for you Strip (Image 3) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-300">Recommended for you</span>
                <button
                  onClick={() => alert('Browsing all recommended elements')}
                  className="text-[11px] text-gray-400 hover:text-white flex items-center gap-0.5"
                >
                  <span>See all</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => onAddShape('rect', '#ea580c')}
                  className="p-2.5 bg-[#18191b] hover:bg-[#222428] border border-[#343538] rounded-xl flex flex-col items-center justify-center text-orange-400 transition-colors"
                  title="Mail Element"
                >
                  <Mail className="w-5 h-5 mb-1" />
                  <span className="text-[10px] text-gray-300 font-bold">Mail</span>
                </button>
                <button
                  onClick={() => onAddShape('circle', '#0284c7')}
                  className="p-2.5 bg-[#18191b] hover:bg-[#222428] border border-[#343538] rounded-xl flex flex-col items-center justify-center text-sky-400 transition-colors"
                  title="Users Element"
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-[10px] text-gray-300 font-bold">Users</span>
                </button>
                <button
                  onClick={() => onAddShape('rect', '#10b981')}
                  className="p-2.5 bg-[#18191b] hover:bg-[#222428] border border-[#343538] rounded-xl flex flex-col items-center justify-center text-emerald-400 transition-colors"
                  title="Table Data"
                >
                  <TableIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] text-gray-300 font-bold">Grid</span>
                </button>
                <button
                  onClick={() => onAddShape('circle', '#eab308')}
                  className="p-2.5 bg-[#18191b] hover:bg-[#222428] border border-[#343538] rounded-xl flex flex-col items-center justify-center text-amber-400 transition-colors"
                  title="Star Element"
                >
                  <Star className="w-5 h-5 mb-1" />
                  <span className="text-[10px] text-gray-300 font-bold">Badge</span>
                </button>
              </div>
            </div>

            {/* BROWSE CATEGORIES - 12 Vibrant Gradient App Tiles (Exact Match from Image 3) */}
            <div>
              <span className="text-xs font-bold text-gray-300 block mb-2">Browse categories</span>
              <div className="grid grid-cols-2 gap-2">
                {BROWSE_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSwitchTab ? onSwitchTab(cat.targetTab) : null}
                      className={`h-14 p-2.5 rounded-xl bg-gradient-to-r ${cat.gradient} flex items-center justify-between text-white font-extrabold text-xs shadow-md hover:brightness-110 hover:scale-[1.02] transition-all cursor-pointer`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold">{cat.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-75" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Shapes */}
            <div>
              <p className="text-xs font-bold text-gray-400 mb-2">Shapes & Lines</p>
              <div className="grid grid-cols-6 gap-2">
                <button
                  onClick={() => onAddShape('rect')}
                  className="aspect-square bg-[#18191b] hover:bg-[#2e3034] rounded-xl flex items-center justify-center border border-[#343538] transition-colors"
                  title="Add Rectangle (R)"
                >
                  <Square className="w-5 h-5 text-orange-500" />
                </button>
                <button
                  onClick={() => onAddShape('circle')}
                  className="aspect-square bg-[#18191b] hover:bg-[#2e3034] rounded-xl flex items-center justify-center border border-[#343538] transition-colors"
                  title="Add Circle (C)"
                >
                  <Circle className="w-5 h-5 text-amber-500" />
                </button>
                <button
                  onClick={() => onAddShape('triangle')}
                  className="aspect-square bg-[#18191b] hover:bg-[#2e3034] rounded-xl flex items-center justify-center border border-[#343538] transition-colors"
                  title="Add Triangle"
                >
                  <Triangle className="w-5 h-5 text-indigo-500" />
                </button>
                <button
                  onClick={() => onAddShape('star')}
                  className="aspect-square bg-[#18191b] hover:bg-[#2e3034] rounded-xl flex items-center justify-center border border-[#343538] transition-colors"
                  title="Add Star"
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                </button>
                <button
                  onClick={() => onAddShape('line')}
                  className="aspect-square bg-[#18191b] hover:bg-[#2e3034] rounded-xl flex items-center justify-center border border-[#343538] transition-colors"
                  title="Add Line (L)"
                >
                  <div className="w-5 h-0.5 bg-sky-400 rotate-45" />
                </button>
                <button
                  onClick={() => onAddShape('arrow')}
                  className="aspect-square bg-[#18191b] hover:bg-[#2e3034] rounded-xl flex items-center justify-center border border-[#343538] transition-colors"
                  title="Add Arrow"
                >
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* Element Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
              {[
                { id: 'all', label: 'All Elements' },
                { id: 'canva', label: '★ Canva Graphics' },
                { id: 'festive', label: 'Festive & Toran' },
                { id: 'badges', label: 'Badges & Ribbons' },
                { id: 'frames', label: 'Frames & Borders' },
                { id: 'business', label: 'Business & Real Estate' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedElementCategory(c.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors capitalize cursor-pointer ${
                    selectedElementCategory === c.id
                      ? 'bg-purple-600 text-white font-black shadow-sm'
                      : 'bg-[#18191b] text-gray-400 hover:text-white hover:bg-[#202124]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* CANVA VECTOR ELEMENTS & GRAPHICS (Instant Drag & Drop and Click to Canvas) */}
            {(selectedElementCategory === 'all' || selectedElementCategory === 'canva' || ['festive', 'badges', 'frames', 'business'].includes(selectedElementCategory)) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Canva Vector Elements</span>
                  </span>
                  <span className="text-[10px] text-purple-400 font-bold">Click or Drag to Canvas</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {CANVA_ELEMENTS.filter((el) => {
                    const matchCat =
                      selectedElementCategory === 'all' ||
                      selectedElementCategory === 'canva' ||
                      el.category === selectedElementCategory;
                    const matchSearch =
                      !elementsSearch ||
                      el.title.toLowerCase().includes(elementsSearch.toLowerCase()) ||
                      el.tags.some((t) => t.toLowerCase().includes(elementsSearch.toLowerCase()));
                    return matchCat && matchSearch;
                  }).map((el) => {
                    const mappedEl: DesignElement = {
                      id: 7000 + Math.abs(el.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)),
                      title: el.title,
                      category: el.category,
                      elementType: el.elementType,
                      svgData: el.svgData,
                      defaultWidth: el.defaultWidth,
                      defaultHeight: el.defaultHeight,
                      defaultFill: el.defaultFill,
                      defaultStroke: el.defaultStroke,
                      tags: el.tags.join(', '),
                      isPremium: false,
                      fileSizeBytes: el.svgData.length,
                      createdAt: new Date().toISOString()
                    };

                    return (
                      <div
                        key={el.id}
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/json', JSON.stringify({ type: 'design-element', element: mappedEl }));
                        }}
                        onClick={() => onAddDesignElement && onAddDesignElement(mappedEl)}
                        className="group bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl p-3 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.03] shadow-sm relative overflow-hidden select-none"
                        title={`Click to add ${el.title} to canvas`}
                      >
                        {/* Type badge */}
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[8px] font-black uppercase border border-purple-500/30 pointer-events-none">
                          {el.elementType}
                        </div>

                        <div
                          className="w-16 h-16 flex items-center justify-center my-1 group-hover:scale-110 transition-transform duration-200 pointer-events-none"
                          dangerouslySetInnerHTML={{ __html: el.svgData }}
                        />

                        <span className="text-[10px] text-gray-200 font-bold truncate text-center w-full mt-1 pointer-events-none">
                          {el.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Festive Marathi Banners */}
            <div>
              <p className="text-xs font-bold text-gray-400 mb-2">Marathi Festive Badges</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onAddBannerBadge('banner')}
                  className="p-2.5 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 rounded-xl text-center transition-colors cursor-pointer"
                >
                  <span className="text-[11px] font-bold text-orange-300 block">महासेल बॅनर</span>
                </button>
                <button
                  onClick={() => onAddBannerBadge('badge')}
                  className="p-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 rounded-xl text-center transition-colors cursor-pointer"
                >
                  <span className="text-[11px] font-bold text-red-300 block">५०% सवलत</span>
                </button>
                <button
                  onClick={() => onAddBannerBadge('seal')}
                  className="p-2.5 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 rounded-xl text-center transition-colors cursor-pointer"
                >
                  <span className="text-[11px] font-bold text-amber-300 block">अस्सल शिक्का</span>
                </button>
              </div>
            </div>

            {/* Reusable Scalable Elements from Element Library */}
            <div>
              <p className="text-xs font-bold text-gray-400 mb-2">Devanagari Cultural Graphics</p>
              {loadingElements ? (
                <div className="py-6 text-center text-xs text-gray-400">Loading elements...</div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {designElements
                    .filter((el) => {
                      if (!elementsSearch) return true;
                      return (
                        el.title.toLowerCase().includes(elementsSearch.toLowerCase()) ||
                        (el.tags && el.tags.toLowerCase().includes(elementsSearch.toLowerCase()))
                      );
                    })
                    .slice(0, 18)
                    .map((el) => (
                    <div
                      key={el.id}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({ type: 'design-element', element: el }));
                      }}
                      onClick={() => onAddDesignElement && onAddDesignElement(el)}
                      className="aspect-square bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                      title={el.title}
                    >
                      {el.svgData ? (
                        <div
                          className="w-10 h-10 flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: el.svgData }}
                        />
                      ) : el.assetUrl ? (
                        <img src={el.assetUrl} alt={el.title} className="w-10 h-10 object-contain" />
                      ) : (
                        <Sparkles className="w-6 h-6 text-amber-500" />
                      )}
                      <span className="text-[10px] text-gray-300 font-bold truncate mt-1 text-center w-full">
                        {el.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CALLIGRAPHY & VECTOR STENCILS TAB (Node.js Tools Engine) */}
        {/* ========================================================= */}
        {activeTab === 'calligraphy' && (
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Calligraphy & Stencils (कॅलिग्राफी)</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                  Node.js Tools Engine
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Authentic Chhatrapati Shivaji Maharaj Rajmudra, Sacred Devanagari Invocations, and Festive Vector Badges.
              </p>
            </div>

            {/* Notification Toast */}
            {stencilToast && (
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{stencilToast}</span>
              </div>
            )}

            {/* English-to-Marathi Phonetic Transliteration Box */}
            <div className="bg-[#18191b] p-3 rounded-xl border border-[#343538] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Phonetic Typing (English to Marathi)</span>
                </span>
                <span className="text-[10px] text-purple-400 font-semibold">Live Transliterate</span>
              </div>

              <input
                type="text"
                value={transliterateInput}
                onChange={(e) => handleTransliterateChange(e.target.value)}
                placeholder="Type here (e.g. shubhechha, shivaji maharaj, abhinandan)..."
                className="w-full bg-[#252627] border border-[#343538] rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
              />

              {transliteratedText && (
                <div className="p-2.5 bg-[#252627] rounded-lg border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-semibold">Devanagari Result:</span>
                    <span className="text-base font-extrabold text-amber-300 tracking-wide">
                      {transliteratedText}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onAddText(transliteratedText, 56, 'bold', 'AMS Aaditya', '#FFB300')}
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      title="Add as editable text on canvas"
                    >
                      + Text
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerateCalligraphyBanner}
                      disabled={isGeneratingCalligraphy}
                      className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                      title="Generate high-res vector calligraphy stencil"
                    >
                      {isGeneratingCalligraphy ? 'Generating...' : '🎨 Stencil'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Color Themes Bar */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">
                Stencil Theme / Color Finish
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {STENCIL_THEMES.map((theme) => {
                  const isSelected = stencilTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setStencilTheme(theme.id)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/15 text-white shadow-xs'
                          : 'border-[#343538] bg-[#18191b] hover:bg-[#222428] text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/20"
                          style={{
                            background: `linear-gradient(135deg, ${theme.gradient.from}, ${theme.gradient.to})`
                          }}
                        />
                        <span className="truncate">{theme.name.replace('Royal ', '')}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'rajmudra', label: 'Rajmudra & Shivray' },
                { id: 'sacred', label: 'Sacred (देवस्थान)' },
                { id: 'greetings', label: 'Greetings (शुभेच्छा)' },
                { id: 'festivals', label: 'Festivals (सण)' },
                { id: 'borders_frames', label: 'Borders & Frames' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setStencilCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    stencilCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : 'bg-[#18191b] text-gray-400 hover:text-white hover:bg-[#252627]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Stencils */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={stencilSearch}
                onChange={(e) => setStencilSearch(e.target.value)}
                placeholder="Search calligraphy, rajmudra, ganesh..."
                className="w-full bg-[#18191b] border border-[#343538] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Stencils Gallery Grid */}
            <div className="grid grid-cols-1 gap-3 pt-1">
              {stencilsList
                .filter((s) => {
                  const matchCat = stencilCategory === 'all' || s.category === stencilCategory;
                  const matchQuery =
                    !stencilSearch ||
                    s.title.toLowerCase().includes(stencilSearch.toLowerCase()) ||
                    s.englishTitle.toLowerCase().includes(stencilSearch.toLowerCase()) ||
                    s.tags.some((t) => t.toLowerCase().includes(stencilSearch.toLowerCase()));
                  return matchCat && matchQuery;
                })
                .map((stencil) => (
                  <div
                    key={stencil.id}
                    onClick={() => handleAddStencil(stencil)}
                    className="p-3 bg-[#18191b] hover:bg-[#222428] border border-[#343538] hover:border-amber-500/80 rounded-xl cursor-pointer transition-all group flex flex-col items-center justify-between text-center relative overflow-hidden"
                  >
                    {/* Category pill */}
                    <div className="w-full flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded">
                        {stencil.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-gray-500 font-semibold group-hover:text-amber-400 transition-colors">
                        + Add to Canvas
                      </span>
                    </div>

                    {/* SVG preview */}
                    <div
                      className="w-full max-h-36 flex items-center justify-center py-2 transition-transform duration-200 group-hover:scale-105 pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: stencil.svg }}
                    />

                    {/* Title and metadata */}
                    <div className="w-full mt-2 pt-2 border-t border-[#2d2e30] flex items-center justify-between text-left">
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-bold text-white block truncate">
                          {stencil.title}
                        </span>
                        <span className="text-[10px] text-gray-400 block truncate">
                          {stencil.englishTitle}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddStencil(stencil);
                        }}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-[10px] rounded-lg transition-colors shrink-0 cursor-pointer"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* 4. UNIFIED TEXT & FONT ENGINE (All Features in One Simple Place) */}
        {/* ========================================================= */}
        {(activeTab === 'text' || activeTab === 'fonts') && (
          <div className="space-y-3.5">
            {/* Search fonts and combinations */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search fonts and combinations"
                value={fontSearch}
                onChange={(e) => setFontSearch(e.target.value)}
                className="w-full bg-[#18191b] border border-[#343538] rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#8b3dff]"
              />
              {fontSearch && (
                <button
                  type="button"
                  onClick={() => setFontSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Add Actions: Add Text Box & Heading Presets */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onAddText('शीर्षक किंवा संदेश येथे टाईप करा', 36, 'bold', 'Mukta', '#0f172a')}
                className="w-full py-2.5 px-4 bg-[#8b3dff] hover:bg-[#7a2fe0] text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Type className="w-4 h-4" />
                <span>Add a text box</span>
              </button>

              {/* Standard Heading Hierarchy */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => onAddText('शीर्षक येथे लिहा (Heading)', 52, 'bold', 'Mukta', '#0f172a')}
                  className="w-full py-2 px-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl text-left font-black text-sm text-white transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>Add a Bold Heading</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-purple-400 font-bold">52px</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAddText('उपशीर्षक येथे लिहा (Subheading)', 32, 'bold', 'Baloo 2', '#334155')}
                  className="w-full py-1.5 px-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl text-left font-bold text-xs text-gray-200 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>Add a Subheading</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-purple-400 font-bold">32px</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAddText('येथे सविस्तर मजकूर लिहा (Body text)', 20, 'normal', 'Noto Sans Devanagari', '#475569')}
                  className="w-full py-1.5 px-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl text-left text-[11px] text-gray-300 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>Add Little Bit of Body Text</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-purple-400 font-bold">20px</span>
                </button>
              </div>
            </div>

            {/* Sub-Navigation Tabs: 1-Click Toggle for All Features */}
            <div className="flex items-center gap-1 p-1 bg-[#141517] rounded-xl border border-[#343538]">
              <button
                type="button"
                onClick={() => setTextTabMode('fonts')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  textTabMode === 'fonts'
                    ? 'bg-[#8b3dff] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                <span>Fonts ({MARATHI_FONTS.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setTextTabMode('combinations')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  textTabMode === 'combinations'
                    ? 'bg-[#8b3dff] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Combinations</span>
              </button>
              <button
                type="button"
                onClick={() => setTextTabMode('calligraphy')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  textTabMode === 'calligraphy'
                    ? 'bg-[#8b3dff] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Calligraphy</span>
              </button>
            </div>

            {/* TAB 1: 100+ MARATHI & DEVANAGARI FONT LIBRARY */}
            {textTabMode === 'fonts' && (
              <div className="space-y-2.5">
                {/* Live Interactive Sample Text Input & 1-Click Presets */}
                <div className="space-y-1.5 bg-[#18191b] p-2.5 rounded-xl border border-[#343538]">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-gray-400">Live Preview:</span>
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                      {['॥ श्री गणेशाय नमः ॥', 'शुभ विवाह', 'महाराष्ट्र गौरव', 'वाढदिवस'].map((sample) => (
                        <button
                          key={sample}
                          type="button"
                          onClick={() => setFontTesterText(sample)}
                          className="px-1.5 py-0.5 rounded bg-[#202226] hover:bg-purple-950/60 border border-[#343538] hover:border-purple-500 text-gray-300 hover:text-white truncate cursor-pointer transition-colors"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={fontTesterText}
                    onChange={(e) => setFontTesterText(e.target.value)}
                    placeholder="Type words to preview all fonts..."
                    className="w-full bg-[#141517] border border-[#343538] rounded-lg px-2.5 py-1 text-xs text-purple-200 placeholder-gray-500 focus:outline-none focus:border-[#8b3dff]"
                  />
                </div>

                {/* Category Filter Pills (Exact 8 Categories from User) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-[10px]">
                  {[
                    { id: 'all', label: `All Fonts (${MARATHI_FONTS.length})` },
                    { id: 'calligraphy', label: `AMS Calligraphy (${MARATHI_FONTS.filter((f) => f.category === 'calligraphy').length})` },
                    { id: 'decorative', label: `Millennium & Wedding (${MARATHI_FONTS.filter((f) => f.category === 'decorative').length})` },
                    { id: 'legacy', label: `Legacy Kruti/Shivaji (${MARATHI_FONTS.filter((f) => f.category === 'legacy').length})` },
                    { id: 'professional', label: `Classic Suites (${MARATHI_FONTS.filter((f) => f.category === 'professional').length})` },
                    { id: 'popular', label: `Popular (${MARATHI_FONTS.filter((f) => f.category === 'popular').length})` },
                    { id: 'marathi-standard', label: `Marathi Standard (${MARATHI_FONTS.filter((f) => f.category === 'marathi-standard').length})` },
                    { id: 'serif', label: `Serif (${MARATHI_FONTS.filter((f) => f.category === 'serif').length})` },
                    { id: 'sans-serif', label: `Sans Serif (${MARATHI_FONTS.filter((f) => f.category === 'sans-serif').length})` },
                    { id: 'handwritten', label: `Handwritten (${MARATHI_FONTS.filter((f) => f.category === 'handwritten').length})` },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedDrawerFontCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-all cursor-pointer ${
                        selectedDrawerFontCategory === cat.id
                          ? 'bg-[#8b3dff] text-white shadow-xs'
                          : 'bg-[#18191b] border border-[#343538] text-gray-300 hover:bg-[#252627]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Font Cards List */}
                <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredFonts.map((font) => (
                    <div
                      key={font.id}
                      data-font-card="true"
                      onClick={() => {
                        if (selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'i-text' || selectedObject.type === 'text') && onUpdateText) {
                          onUpdateText('fontFamily', font.id);
                        } else {
                          onAddText(fontTesterText.trim() || font.sampleMr, 48, 'bold', font.id, '#ffffff');
                        }
                      }}
                      className="p-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl cursor-pointer transition-all hover:scale-[1.01] shadow-xs group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <span className="text-[11px] font-bold text-gray-300 group-hover:text-purple-300 truncate">
                          {font.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {font.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-950/70 text-purple-300 border border-purple-800/40">
                              {font.badge}
                            </span>
                          )}
                          {font.isUnicode ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800/40">
                              Unicode
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-amber-950/70 text-amber-300 border border-amber-800/40">
                              Legacy
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Live Rendered Font Preview */}
                      <div
                        className="text-lg text-white font-bold tracking-wide truncate py-1 select-none"
                        style={{ fontFamily: font.id }}
                      >
                        {fontTesterText.trim() || font.sampleMr}
                      </div>

                      {/* 1-Click Hover Indicator */}
                      <div className="absolute inset-0 bg-purple-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                        <span className="px-3 py-1 bg-[#8b3dff] text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1">
                          <Plus className="w-3.5 h-3.5" />
                          <span>
                            {selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'i-text' || selectedObject.type === 'text')
                              ? 'Apply to Selected Text'
                              : 'Add to Design'}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: CURATED FONT COMBINATIONS */}
            {textTabMode === 'combinations' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Curated Font Pairings</span>
                  <span className="text-[10px] text-gray-500 font-bold">{filteredFontCombinations.length} designs</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredFontCombinations.map((combo) => (
                    <div
                      key={combo.id}
                      onClick={() => handleInsertFontCombo(combo)}
                      style={{ background: combo.cardBg }}
                      className="group relative p-3 rounded-xl border border-white/10 hover:border-purple-400 overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[95px]"
                    >
                      {combo.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40 text-gray-300 self-start mb-1">
                          {combo.badge}
                        </span>
                      )}

                      <div className="my-auto">
                        {combo.subtitle && (
                          <p
                            className="text-[10px] uppercase font-bold tracking-wider leading-none"
                            style={{
                              color: combo.subtitleColor,
                              fontFamily: combo.subtitleFont,
                            }}
                          >
                            {combo.subtitle}
                          </p>
                        )}
                        <p
                          className="text-base font-black leading-tight mt-0.5"
                          style={{
                            color: combo.titleColor,
                            fontFamily: combo.titleFont,
                            letterSpacing: combo.letterSpacing ? `${combo.letterSpacing}px` : undefined,
                          }}
                        >
                          {combo.title}
                        </p>
                      </div>

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                        <span className="px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-lg shadow">
                          Insert
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CALLIGRAPHY PRESETS */}
            {textTabMode === 'calligraphy' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Devanagari Calligraphy Presets</span>
                  <span className="text-[10px] text-gray-500 font-bold">{CALLIGRAPHY_PRESETS.length} presets</span>
                </div>

                <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                  {CALLIGRAPHY_PRESETS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onAddCalligraphy(item)}
                      className="w-full p-2.5 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-orange-500 rounded-xl text-left flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-bold text-orange-400 group-hover:text-orange-300">
                          {item.titleMr}
                        </span>
                        <p className="text-sm font-black text-white mt-0.5 truncate" style={{ fontFamily: item.fontFamily }}>
                          {item.text}
                        </p>
                      </div>
                      <Plus className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Magic Write AI Copywriter (Clean & Accessible at Bottom) */}
            <button
              type="button"
              onClick={onOpenAiModal}
              className="w-full py-2 px-3 bg-[#18191b] hover:bg-[#222428] border border-purple-500/40 hover:border-purple-500 rounded-xl text-purple-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Magic Write (AI Devanagari Copywriter)</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. BRAND KIT TAB (Matching Canva Image 5) */}
        {/* ========================================================= */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            
            {/* Header: Brand Kit Dropdown & + All Assets Button (Image 5) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <select
                  value={selectedBrandKit}
                  onChange={(e) => setSelectedBrandKit(e.target.value)}
                  className="flex-1 bg-[#18191b] border border-[#343538] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Punekar Tech Brand Kit">Punekar Tech Brand Kit</option>
                  <option value="Royal Maratha Brand Kit">Royal Maratha Brand Kit</option>
                  <option value="Kolhapuri Spice Brand Kit">Kolhapuri Spice Brand Kit</option>
                  <option value="Konkan Coastal Brand Kit">Konkan Coastal Brand Kit</option>
                </select>
                <button
                  onClick={() => alert('Opening all brand asset repository')}
                  className="px-3 py-2 bg-[#8b3dff] hover:bg-[#7a2fe0] text-white font-bold text-xs rounded-xl shadow transition-colors shrink-0"
                >
                  + All assets
                </button>
              </div>

              {/* Search Brand Kit */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search in Brand Kit..."
                  className="w-full bg-[#18191b] border border-[#343538] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* "You're on your way!" Onboarding Progress Banner (1/3) (Image 5) */}
            <div className="p-3 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">You're on your way!</span>
                <span className="text-[10px] font-black text-purple-300">1 / 3</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full" />
              </div>
              <p className="text-[11px] text-gray-300 leading-snug">
                Upload fonts, logos, and color palettes to create consistent on-brand designs.
              </p>
              <button
                onClick={() => alert('Brand fonts upload dialog')}
                className="w-full py-1.5 bg-white text-gray-900 font-extrabold text-[11px] rounded-lg shadow hover:bg-gray-100 transition-colors"
              >
                + Add your brand fonts
              </button>
            </div>

            {/* Sub-Navigation Category Horizontal Pills (Image 5) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
              {[
                { id: 'templates', label: 'Brand Templates' },
                { id: 'logos', label: 'Logos' },
                { id: 'colors', label: 'Colors' },
                { id: 'fonts', label: 'Fonts' },
                { id: 'guidelines', label: 'Guidelines' },
                { id: 'photos', label: 'Photos' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setBrandKitTab(pill.id as any)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    brandKitTab === pill.id
                      ? 'bg-purple-600 text-white font-black'
                      : 'bg-[#18191b] text-gray-400 hover:text-white hover:bg-[#202124]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* All Brand Templates Empty State Card (Image 5) */}
            {brandKitTab === 'templates' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-300 block">All Brand Templates</span>
                <div className="p-6 border-2 border-dashed border-[#383a3e] rounded-xl flex flex-col items-center justify-center text-center bg-[#18191b]/50">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white mb-1">No Brand Templates yet</span>
                  <p className="text-[11px] text-gray-400 max-w-[200px] mb-3">
                    Turn your best flyer and poster designs into reusable brand templates.
                  </p>
                  <button
                    onClick={() => alert('Save current design as Brand Template')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                  >
                    + Add Brand Templates
                  </button>
                </div>
              </div>
            )}

            {/* Brand Colors Palettes */}
            {brandKitTab === 'colors' && (
              <div className="space-y-3 pt-1">
                <span className="text-xs font-bold text-gray-300 block">Brand Color Palettes</span>
                {[
                  { name: 'Royal Maratha', colors: ['#ea580c', '#f59e0b', '#1e3a8a', '#ffffff', '#0f172a'] },
                  { name: 'Pune Tech Minimal', colors: ['#0f172a', '#2563eb', '#64748b', '#f8fafc', '#10b981'] },
                  { name: 'Kolhapuri Spice', colors: ['#991b1b', '#ea580c', '#fef08a', '#450a0a', '#ffffff'] },
                  { name: 'Konkan Coastal', colors: ['#0284c7', '#0d9488', '#fef3c7', '#0f766e', '#ffffff'] }
                ].map((b, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectBrandPalette && onSelectBrandPalette(b.colors)}
                    className="p-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-orange-500 rounded-xl cursor-pointer transition-all"
                  >
                    <span className="text-xs font-bold text-white block mb-1.5">{b.name}</span>
                    <div className="flex items-center gap-1.5">
                      {b.colors.map((c) => (
                        <div key={c} style={{ backgroundColor: c }} className="w-6 h-6 rounded-md border border-white/10" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Brand Logos */}
            {brandKitTab === 'logos' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-300 block">Brand Logos</span>
                <div className="p-5 border-2 border-dashed border-[#383a3e] rounded-xl flex flex-col items-center justify-center text-center bg-[#18191b]/50">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-2">
                    <Crown className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white mb-1">Add official company logos</span>
                  <p className="text-[11px] text-gray-400 max-w-[200px] mb-3">
                    PNG, SVG, or EPS files with transparent backgrounds.
                  </p>
                  <button
                    onClick={() => alert('Upload logo dialog')}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                  >
                    + Add Logos
                  </button>
                </div>
              </div>
            )}
          </div>
        )}



        {/* ========================================================= */}
        {/* 7. UPLOADS TAB */}
        {/* ========================================================= */}
        {activeTab === 'uploads' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-white text-sm">Uploads</h3>
            
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#343538] hover:border-orange-500 rounded-2xl cursor-pointer bg-[#18191b] hover:bg-[#1f2022] transition-colors">
              <UploadCloud className="w-8 h-8 text-orange-500 mb-2" />
              <span className="text-xs font-bold text-white">Upload Media</span>
              <span className="text-[10px] text-gray-400 mt-1">PNG, JPG, SVG up to 25MB</span>
              <input type="file" onChange={onUploadMedia} accept="image/*" className="hidden" />
            </label>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {userMedia.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => onAddImageToCanvas(m.url)}
                  className="aspect-square bg-[#18191b] border border-[#343538] hover:border-orange-500 rounded-xl overflow-hidden cursor-pointer"
                >
                  <img src={m.url} alt="upload" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. PHOTOS TAB */}
        {/* ========================================================= */}
        {activeTab === 'photos' && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">Stock Photos</h3>
            <p className="text-xs text-gray-400">High-resolution Maharashtra cultural and business imagery.</p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {STOCK_PHOTOS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onAddImageToCanvas(p.url)}
                  className="group relative aspect-[4/3] bg-[#18191b] border border-[#343538] hover:border-purple-500 rounded-xl overflow-hidden cursor-pointer shadow-sm"
                >
                  <img src={p.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[10px] font-bold text-white bg-purple-600 px-2 py-1 rounded">Place</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 9. VIDEOS TAB */}
        {/* ========================================================= */}
        {activeTab === 'videos' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Video Studio</h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                Video Timeline
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Motion background loops and video clips for festive reels and digital signage.
            </p>

            <div className="space-y-2 pt-1">
              {[
                { title: 'Festive Fireworks Loop', duration: '0:15', category: 'Festivals' },
                { title: 'Dhol Tasha Rhythmic Energy', duration: '0:20', category: 'Cultural' },
                { title: 'Golden Haldi Particles', duration: '0:10', category: 'Wedding' },
                { title: 'Smooth Modern Gradient Flow', duration: '0:30', category: 'Business' }
              ].map((v, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#18191b] border border-[#343538] hover:border-amber-500 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{v.title}</h4>
                      <p className="text-[10px] text-gray-400">{v.category} • {v.duration}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (onOpenIntegration) {
                        onOpenIntegration({
                          name: 'FFmpeg Cloud Video Renderer',
                          category: 'Video Editing',
                          description: 'High-speed MP4 video rendering engine for animated poster export.',
                          status: 'Requires configuration',
                          requiredCredentials: ['FFMPEG_RENDER_SERVICE_URL'],
                          setupInstructions: ['Configure video transcoding microservice worker.']
                        });
                      }
                    }}
                    className="px-2.5 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded text-[10px] font-bold"
                  >
                    Add Clip
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 10. AUDIO TAB (Image 1: Equalizer, Chips, Voiceovers, Tracks) */}
        {/* ========================================================= */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            {/* Audio Search & Equalizer Filter Toggle */}
            <div className="relative flex items-center gap-1.5">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={audioSearch}
                  onChange={(e) => setAudioSearch(e.target.value)}
                  placeholder="Search audio"
                  className="w-full pl-9 pr-3 py-2 bg-[#18191b] border border-[#343538] rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#8b3dff] transition-all"
                />
                {audioSearch && (
                  <button
                    onClick={() => setAudioSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsEqualizerOpen(!isEqualizerOpen)}
                title="Audio Filters & Equalizer"
                className={`p-2 rounded-xl border transition-colors shrink-0 ${
                  isEqualizerOpen
                    ? 'bg-[#8b3dff] border-[#8b3dff] text-white'
                    : 'bg-[#18191b] border-[#343538] text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Equalizer Filter Panel */}
            {isEqualizerOpen && (
              <div className="p-3 bg-[#18191b] border border-[#343538] rounded-xl space-y-2.5 text-xs animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-300">Duration</span>
                  <div className="flex gap-1">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'short', label: '< 1m' },
                      { id: 'medium', label: '1-3m' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setAudioFilterDuration(d.id)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                          audioFilterDuration === d.id
                            ? 'bg-[#8b3dff] text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-300">Vocals</span>
                  <div className="flex gap-1">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'instrumental', label: 'Instrumental' },
                      { id: 'vocal', label: 'Vocals' },
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setAudioFilterVocal(v.id)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                          audioFilterVocal === v.id
                            ? 'bg-[#8b3dff] text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Filter Chips Strip (Image 1) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'soft', label: 'Soft background music for video' },
                { id: 'calm', label: 'Calm' },
                { id: 'upbeat', label: 'Upbeat' },
                { id: 'marathi', label: 'Festive & Marathi' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedAudioCategory(chip.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    selectedAudioCategory === chip.id
                      ? 'bg-[#8b3dff] text-white shadow-sm'
                      : 'bg-[#18191b] border border-[#343538] text-gray-300 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* "Voiceovers" Card Banner (Image 1) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900 border border-purple-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300 flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <span>Voiceovers</span>
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  </h4>
                  <p className="text-[10px] text-purple-200/70 line-clamp-1">
                    Generate realistic Marathi & English voiceovers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAiVoiceModalOpen(true)}
                className="px-3 py-1.5 bg-gradient-to-r from-[#8b3dff] to-[#a855f7] hover:from-[#7a2fe0] hover:to-[#9333ea] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0"
              >
                Generate AI voice
              </button>
            </div>

            {/* Audio Toast Notice */}
            {audioToast && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{audioToast}</span>
              </div>
            )}

            {/* Audio Track Sections */}
            <div className="space-y-4 pt-1">
              {[
                { key: 'upbeat', title: 'Upbeat' },
                { key: 'calm', title: 'Calm' },
                { key: 'marathi', title: 'Marathi & Traditional' },
                { key: 'soft', title: 'Soft Background Music' },
              ]
                .filter((sec) => selectedAudioCategory === 'all' || selectedAudioCategory === sec.key)
                .map((section) => {
                  const tracks = AUDIO_TRACKS.filter((t) => {
                    const matchSec = t.category === section.key;
                    const matchSearch =
                      !audioSearch ||
                      t.title.toLowerCase().includes(audioSearch.toLowerCase()) ||
                      t.author.toLowerCase().includes(audioSearch.toLowerCase());
                    const matchDuration =
                      audioFilterDuration === 'all' ||
                      (audioFilterDuration === 'short' && t.durationSec < 60) ||
                      (audioFilterDuration === 'medium' && t.durationSec >= 60 && t.durationSec <= 180);
                    const matchVocal =
                      audioFilterVocal === 'all' || t.type === audioFilterVocal;
                    return matchSec && matchSearch && matchDuration && matchVocal;
                  });

                  if (tracks.length === 0) return null;

                  return (
                    <div key={section.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-white text-xs tracking-tight">{section.title}</h4>
                        <button className="text-[11px] font-bold text-gray-400 hover:text-white transition-colors cursor-pointer">
                          See all
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {tracks.map((track) => {
                          const isPlaying = playingTrackId === track.id;
                          return (
                            <div
                              key={track.id}
                              onClick={() => handleAddTrack(track)}
                              className="group p-2.5 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-gray-500 rounded-xl flex items-center justify-between gap-2.5 transition-all cursor-pointer relative overflow-hidden"
                            >
                              {/* Playing progress background line */}
                              {isPlaying && (
                                <div
                                  className="absolute bottom-0 left-0 h-0.5 bg-[#8b3dff] transition-all"
                                  style={{ width: `${playingProgress}%` }}
                                />
                              )}

                              <div className="flex items-center gap-2.5 min-w-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayTrack(track.id);
                                  }}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    isPlaying
                                      ? 'bg-[#8b3dff] text-white shadow-sm'
                                      : 'bg-white/5 hover:bg-white/10 text-gray-300 group-hover:text-white'
                                  }`}
                                >
                                  {isPlaying ? (
                                    <Pause className="w-3.5 h-3.5" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 ml-0.5" />
                                  )}
                                </button>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h5 className="text-xs font-bold text-white truncate">{track.title}</h5>
                                  </div>
                                  <p className="text-[10px] text-gray-400 truncate">
                                    {track.author} • {track.tempo}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {/* Animated wave bars if playing */}
                                {isPlaying && (
                                  <div className="flex items-end gap-0.5 h-3">
                                    <span className="w-0.5 h-full bg-[#8b3dff] animate-pulse" />
                                    <span className="w-0.5 h-2 bg-purple-400 animate-pulse delay-75" />
                                    <span className="w-0.5 h-3 bg-indigo-400 animate-pulse delay-150" />
                                  </div>
                                )}
                                <span className="text-[10px] font-mono text-gray-400">{track.duration}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddTrack(track);
                                  }}
                                  title="Add to design"
                                  className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* AI Voiceover Generation Modal */}
        {isAiVoiceModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#1e1f22] border border-[#343538] rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#343538] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">AI Voiceover Studio</h3>
                    <p className="text-[10px] text-gray-400">Convert Marathi & English text to voice</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAiVoiceModalOpen(false)}
                  className="text-gray-400 hover:text-white text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* Text Input */}
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Voiceover Script (Devanagari / Latin)</label>
                <textarea
                  rows={3}
                  value={aiVoiceText}
                  onChange={(e) => setAiVoiceText(e.target.value)}
                  placeholder="Enter script text..."
                  className="w-full p-2.5 bg-[#18191b] border border-[#343538] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8b3dff]"
                />
              </div>

              {/* Quick Preset Prompts */}
              <div>
                <span className="text-[10px] font-bold text-gray-400 block mb-1">Quick Marathi Presets:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Shiv Jayanti', text: 'शिवजयंतीच्या सर्व शिवभक्तांना हार्दिक शुभेच्छा!' },
                    { label: 'Diwali 50% Off', text: 'दिवाळी महाधमाका ऑफर! सर्व वस्तूंवर ५०% पर्यंत भरघोस सूट!' },
                    { label: 'Ganesh Utsav', text: 'गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!' },
                    { label: 'Grand Opening', text: 'आमच्या नवीन शाखेच्या भव्य शुभारंभास आपले सहर्ष स्वागत आहे.' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAiVoiceText(preset.text)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 text-left truncate"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Actor Selector */}
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Speaker Voice</label>
                <select
                  value={aiVoiceSpeaker}
                  onChange={(e) => setAiVoiceSpeaker(e.target.value)}
                  className="w-full p-2 bg-[#18191b] border border-[#343538] rounded-xl text-xs text-white focus:outline-none focus:border-[#8b3dff]"
                >
                  <option value="aarohi">Aarohi — Warm & Expressive (Female)</option>
                  <option value="ajay">Ajay — Energetic Announcer (Male)</option>
                  <option value="radha">Radha — Classical & Traditional (Female)</option>
                  <option value="vikram">Vikram — Deep Corporate Narrator (Male)</option>
                </select>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Speed</span>
                    <span>{aiVoiceSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.4"
                    step="0.1"
                    value={aiVoiceSpeed}
                    onChange={(e) => setAiVoiceSpeed(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Pitch</span>
                    <span>{aiVoicePitch}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.1"
                    value={aiVoicePitch}
                    onChange={(e) => setAiVoicePitch(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Success Notification */}
              {aiVoiceSuccessMsg && (
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold">
                  {aiVoiceSuccessMsg}
                </div>
              )}

              {/* Honest Integration Notice (Rule 10) */}
              <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[10px] text-purple-200/80 flex items-center justify-between">
                <span>✓ Browser Speech Engine Active</span>
                <span className="text-gray-400 font-mono">Cloud TTS: Key in Settings</span>
              </div>

              {/* Modal CTAs */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleGenerateAiVoice}
                  disabled={isAiVoiceGenerating || !aiVoiceText.trim()}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
                >
                  {isAiVoiceGenerating ? 'Generating...' : 'Preview Voice'}
                </button>
                <button
                  onClick={handleInsertAiVoiceToDesign}
                  className="flex-1 py-2 bg-[#8b3dff] hover:bg-[#7a2fe0] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Add to Design
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 11. BACKGROUND TAB (Image 2: Color Wheel, Circles, Landscapes, Patterns, Gradients) */}
        {/* ========================================================= */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            {/* Search Backgrounds Bar (Image 2) */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={bgSearch}
                onChange={(e) => setBgSearch(e.target.value)}
                placeholder="Search backgrounds"
                className="w-full pl-9 pr-3 py-2 bg-[#18191b] border border-[#343538] rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#8b3dff] transition-all"
              />
              {bgSearch && (
                <button
                  onClick={() => setBgSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Color Palette Strip: Rainbow Wheel + Solid Color Circles (Image 2) */}
            <div>
              <p className="text-xs font-bold text-gray-300 mb-2">Color Palette</p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {/* Rainbow Color Wheel Button */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => bgPaletteColorInputRef.current?.click()}
                    title="Custom Color Wheel Picker"
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 via-green-500 to-blue-500 p-0.5 hover:scale-105 transition-transform flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <div className="w-full h-full bg-[#18191b] rounded-full flex items-center justify-center text-white">
                      <Palette className="w-3.5 h-3.5" />
                    </div>
                  </button>
                  <input
                    ref={bgPaletteColorInputRef}
                    type="color"
                    value={canvasBackgroundColor}
                    onChange={(e) => handleApplyBackgroundColor(e.target.value)}
                    className="hidden"
                  />
                </div>

                {/* Solid Color Circles Strip (Image 2) */}
                {[
                  '#ffffff',
                  '#000000',
                  '#2c3e6b',
                  '#fbc02d',
                  '#ef5350',
                  '#ec407a',
                  '#ea580c',
                  '#10b981',
                  '#7c3aed',
                  '#0284c7',
                  '#14b8a6',
                  '#f59e0b',
                  '#475569',
                  '#831843',
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleApplyBackgroundColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-7 h-7 rounded-full shrink-0 transition-transform hover:scale-110 shadow-xs border ${
                      color === '#ffffff' ? 'border-gray-400' : 'border-black/20'
                    } ${canvasBackgroundColor === color ? 'ring-2 ring-[#8b3dff] scale-105' : ''}`}
                  />
                ))}

                <button
                  onClick={() => bgPaletteColorInputRef.current?.click()}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white flex items-center justify-center shrink-0 text-xs"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* "Recently used" Section (Image 2) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-extrabold text-white">Recently used</h4>
                <span className="text-[10px] text-gray-400">{recentlyUsedBgs.length} items</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {recentlyUsedBgs.map((item, idx) => {
                  const isHex = item.startsWith('#');
                  const isUrl = item.startsWith('http');
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isHex) handleApplyBackgroundColor(item);
                        else if (isUrl) handleApplyBackgroundLandscape(item);
                        else handleApplyBackgroundGradient(item);
                      }}
                      className="h-14 rounded-xl border border-[#343538] hover:border-[#8b3dff] overflow-hidden transition-all hover:scale-105 flex items-center justify-center text-[10px] font-bold text-white shadow-xs relative"
                      style={{
                        backgroundColor: isHex ? item : undefined,
                        backgroundImage: isUrl ? `url(${item})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {!isHex && !isUrl && (
                        <span className="capitalize text-center px-1 truncate">{item.replace('-', ' ')}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* "Landscapes" Section (Image 2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white">Landscapes</h4>
                <button className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer">
                  <span>See all</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUND_LANDSCAPES.filter((l) => !bgSearch || l.title.toLowerCase().includes(bgSearch.toLowerCase()))
                  .slice(0, 4)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleApplyBackgroundLandscape(item.url)}
                      className="group relative h-20 rounded-xl overflow-hidden border border-[#343538] hover:border-[#8b3dff] transition-all hover:scale-[1.02] shadow-xs text-left"
                    >
                      <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-white line-clamp-1">{item.title}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* "Patterns" Section (Image 2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white">Patterns</h4>
                <button className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer">
                  <span>See all</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUND_PATTERNS.filter((p) => !bgSearch || p.title.toLowerCase().includes(bgSearch.toLowerCase()))
                  .slice(0, 4)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleApplyBackgroundPattern(item.url)}
                      className="group relative h-20 rounded-xl overflow-hidden border border-[#343538] hover:border-[#8b3dff] transition-all hover:scale-[1.02] shadow-xs text-left"
                    >
                      <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-white line-clamp-1">{item.title}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* "Gradients" Section (Image 2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white">Gradients</h4>
                <button className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer">
                  <span>See all</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUND_GRADIENTS.filter((g) => !bgSearch || g.name.toLowerCase().includes(bgSearch.toLowerCase()))
                  .map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleApplyBackgroundGradient(g.id)}
                      className={`h-12 rounded-xl bg-gradient-to-r ${g.css} border border-white/10 hover:border-white/40 flex items-center justify-center text-[11px] font-extrabold text-white shadow-xs transition-transform hover:scale-[1.02]`}
                    >
                      {g.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* "Abstract" Section (Image 2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white">Abstract</h4>
                <button className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer">
                  <span>See all</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUND_ABSTRACTS.filter((a) => !bgSearch || a.title.toLowerCase().includes(bgSearch.toLowerCase()))
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleApplyBackgroundLandscape(item.url)}
                      className="group relative h-20 rounded-xl overflow-hidden border border-[#343538] hover:border-[#8b3dff] transition-all hover:scale-[1.02] shadow-xs text-left"
                    >
                      <img src={item.thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-white line-clamp-1">{item.title}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 12. DRAW TAB */}
        {/* ========================================================= */}
        {activeTab === 'draw' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-white text-sm">Freehand Drawing</h3>
            
            <button
              onClick={onToggleDrawingMode}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm ${
                isDrawingMode
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-[#8b3dff] hover:bg-[#7a2fe0] text-white'
              }`}
            >
              {isDrawingMode ? 'Exit Drawing Mode' : 'Start Freehand Drawing'}
            </button>

            {isDrawingMode && (
              <div className="space-y-3 bg-[#18191b] p-3.5 rounded-xl border border-[#343538]">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                    <span>Brush Width</span>
                    <span>{brushWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={brushWidth}
                    onChange={(e) => onSetBrushWidth(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-300 block mb-1.5">Brush Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => onSetBrushColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-[#343538]"
                    />
                    <div className="grid grid-cols-5 gap-1 flex-1">
                      {['#ea580c', '#f59e0b', '#dc2626', '#0f172a', '#ffffff'].map((c) => (
                        <button
                          key={c}
                          onClick={() => onSetBrushColor(c)}
                          style={{ backgroundColor: c }}
                          className="h-6 rounded border border-gray-600"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 13. CHARTS TAB */}
        {/* ========================================================= */}
        {activeTab === 'charts' && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">Interactive Charts</h3>
            <p className="text-xs text-gray-400">Generate clean vector charts for proposals, reports, and presentations.</p>

            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'bar', label: 'Bar' },
                { id: 'pie', label: 'Pie' },
                { id: 'line', label: 'Line' },
                { id: 'donut', label: 'Donut' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setChartType(t.id as any)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    chartType === t.id ? 'bg-[#8b3dff] text-white' : 'bg-[#18191b] text-gray-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Chart Values Editor */}
            <div className="bg-[#18191b] p-3 rounded-xl border border-[#343538] space-y-2">
              <span className="text-[10px] text-gray-400 font-bold block">Chart Data Points</span>
              {chartData.map((d, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={d.label}
                    onChange={(e) => {
                      const next = [...chartData];
                      next[idx].label = e.target.value;
                      setChartData(next);
                    }}
                    className="flex-1 bg-[#252627] border border-[#343538] rounded px-2 py-1 text-xs text-white"
                  />
                  <input
                    type="number"
                    value={d.value}
                    onChange={(e) => {
                      const next = [...chartData];
                      next[idx].value = Number(e.target.value);
                      setChartData(next);
                    }}
                    className="w-16 bg-[#252627] border border-[#343538] rounded px-2 py-1 text-xs text-white text-right"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => onAddChart && onAddChart(chartType, chartData)}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Insert Chart onto Canvas
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 14. TABLES TAB */}
        {/* ========================================================= */}
        {activeTab === 'tables' && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">Table Generator</h3>
            <p className="text-xs text-gray-400">Insert customizable data tables for price lists, catalogs, and schedules.</p>

            <div className="bg-[#18191b] p-3 rounded-xl border border-[#343538] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Rows</span>
                <input
                  type="number"
                  min={2}
                  max={10}
                  value={tableRows}
                  onChange={(e) => setTableRows(Number(e.target.value))}
                  className="w-16 bg-[#252627] border border-[#343538] rounded px-2 py-1 text-xs text-white text-center font-bold"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Columns</span>
                <input
                  type="number"
                  min={2}
                  max={6}
                  value={tableCols}
                  onChange={(e) => setTableCols(Number(e.target.value))}
                  className="w-16 bg-[#252627] border border-[#343538] rounded px-2 py-1 text-xs text-white text-center font-bold"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-gray-300 block mb-1">Header Theme</span>
                <div className="grid grid-cols-3 gap-1">
                  {['kesari', 'royal', 'dark'].map((th) => (
                    <button
                      key={th}
                      onClick={() => setTableTheme(th)}
                      className={`py-1 rounded text-[11px] font-bold capitalize ${
                        tableTheme === th ? 'bg-orange-600 text-white' : 'bg-[#252627] text-gray-400'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onAddTable && onAddTable(tableRows, tableCols, tableTheme)}
              className="w-full py-2.5 bg-[#8b3dff] hover:bg-[#7a2fe0] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Insert Table onto Canvas
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 15. FRAMES & GRIDS TAB */}
        {/* ========================================================= */}
        {(activeTab === 'frames' || activeTab === 'grids') && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">Photo Frames & Mockups</h3>
            <p className="text-xs text-gray-400">Drag or drop photos into styled shape frames.</p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => onAddFrame && onAddFrame('circle')}
                className="p-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-orange-500 rounded-xl text-center flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center text-xs text-orange-400">
                  Circle
                </div>
                <span className="text-xs font-bold text-white">Profile Frame</span>
              </button>

              <button
                onClick={() => onAddFrame && onAddFrame('phone')}
                className="p-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-sky-500 rounded-xl text-center flex flex-col items-center gap-2"
              >
                <div className="w-10 h-14 rounded-lg border-2 border-sky-400 flex items-center justify-center text-[10px] text-sky-400">
                  Phone
                </div>
                <span className="text-xs font-bold text-white">Phone Mockup</span>
              </button>

              <button
                onClick={() => onAddFrame && onAddFrame('arch')}
                className="p-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-amber-500 rounded-xl text-center flex flex-col items-center gap-2"
              >
                <div className="w-12 h-14 rounded-t-full border-2 border-dashed border-amber-400 flex items-center justify-center text-[10px] text-amber-400">
                  Arch
                </div>
                <span className="text-xs font-bold text-white">Floral Arch</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 16. PROJECTS TAB */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">My Saved Projects</h3>
            <p className="text-xs text-gray-400">Insert pages from your previous designs.</p>
            <div className="p-4 bg-[#18191b] border border-[#343538] rounded-xl text-center">
              <Folder className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-300">All cloud projects accessible</p>
              <span className="text-[10px] text-gray-500 mt-1 block">Your designs autosave continuously.</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 17. APPS TAB & QR CODE GENERATOR */}
        {/* ========================================================= */}
        {activeTab === 'apps' && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-white text-sm">Apps & Integrations</h3>

            {/* Built-in QR Code Generator */}
            <div className="bg-[#18191b] p-3.5 rounded-xl border border-[#343538] space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <QrCode className="w-4 h-4 text-orange-500" />
                <span>QR Code Generator</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Generate instant scannable QR codes for UPI payments, website URLs, and wedding invitations.
              </p>
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter URL or UPI link..."
                className="w-full bg-[#252627] border border-[#343538] rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Code Color</span>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-7 h-7 rounded border border-[#343538] cursor-pointer"
                />
              </div>
              <button
                onClick={() => onAddQrCode && onAddQrCode(qrText, qrColor)}
                className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Place QR Code on Canvas
              </button>
            </div>

            {/* External Integration Apps with Honest Placeholders */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 block">External Cloud Integrations</span>
              {[
                { name: 'Google Drive Sync', desc: 'Direct asset import & backup', creds: ['GOOGLE_DRIVE_CLIENT_ID'] },
                { name: 'Instagram Direct Publish', desc: 'Schedule and auto-post flyers', creds: ['META_GRAPH_ACCESS_TOKEN'] },
                { name: 'Razorpay Payment Gateway', desc: 'Collect payments via poster QR', creds: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'] },
                { name: 'Dropbox Sync', desc: 'Sync high-res exports to folders', creds: ['DROPBOX_APP_KEY'] }
              ].map((app, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (onOpenIntegration) {
                      onOpenIntegration({
                        name: app.name,
                        category: 'Cloud Storage & Publishing',
                        description: app.desc,
                        status: 'Requires configuration',
                        requiredCredentials: app.creds,
                        setupInstructions: [
                          `Register application credentials for ${app.name}.`,
                          `Add ${app.creds.join(', ')} to your environment config.`,
                          'Authentication flow will verify tokens upon save.'
                        ]
                      });
                    }
                  }}
                  className="p-3 bg-[#18191b] hover:bg-[#202124] border border-[#343538] hover:border-purple-500 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{app.name}</h4>
                    <p className="text-[10px] text-gray-400">{app.desc}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 18. AI STUDIO TAB */}
        {/* ========================================================= */}
        {activeTab === 'ai' && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm">AI Design Studio</h3>
            <p className="text-xs text-gray-400">Devanagari copywriting, automated flyer proposals, and headline generation.</p>
            <button
              onClick={onOpenAiModal}
              className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:brightness-110 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Magic Assistant</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 19. LAYERS TAB */}
        {/* ========================================================= */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">Layers & Object Stack</h3>
              <span className="text-[10px] text-gray-400">Drag to reorder</span>
            </div>
            <div className="space-y-1.5">
              {canvasObjects.slice().reverse().map((obj, idx) => {
                const isSel = selectedObject === obj;
                const isLock = !!obj.lockMovementX;
                const name = (obj as any).text ? `Text: "${((obj as any).text).slice(0, 16)}..."` : (obj.type || 'Object');

                return (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', String(idx));
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const fromIdx = Number(e.dataTransfer.getData('text/plain'));
                      if (!isNaN(fromIdx) && fromIdx !== idx) {
                        onReorderObject(obj, fromIdx < idx ? 'down' : 'up');
                      }
                    }}
                    onClick={() => onSelectCanvasObject(obj)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer select-none ${
                      isSel ? 'bg-purple-900/30 border-purple-500 text-white' : 'bg-[#18191b] border-[#343538] text-gray-300 hover:bg-[#202124]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate flex-1">
                      <GripVertical className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 cursor-grab shrink-0" />
                      <span className="text-xs font-bold truncate">{name}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); onReorderObject(obj, 'up'); }}
                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        title="Bring Forward"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onReorderObject(obj, 'down'); }}
                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        title="Send Backward"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleLockObject(obj); }}
                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        title="Lock / Unlock"
                      >
                        {isLock ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteObject(obj); }}
                        className="p-1 hover:bg-red-500/20 rounded text-red-400"
                        title="Delete Layer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
