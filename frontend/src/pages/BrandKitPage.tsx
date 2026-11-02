import React, { useState, useRef, useEffect } from 'react';
import { Palette, Plus, Trash2, Check, Sparkles, Image, Type, ShieldCheck, ArrowRight, Save, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FONT_LIBRARY } from '../config/fontLibrary';

interface BrandColor {
  id: string;
  name: string;
  hex: string;
}

export const BrandKitPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [brandName, setBrandName] = useState('Maharashtra Graphics');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<BrandColor[]>([
    { id: '1', name: 'Saffron Primary', hex: '#ea580c' },
    { id: '2', name: 'Golden Marigold', hex: '#f59e0b' },
    { id: '3', name: 'Royal Velvet', hex: '#7c3aed' },
    { id: '4', name: 'Charcoal Slate', hex: '#1e293b' },
  ]);
  const [newColorHex, setNewColorHex] = useState('#2563eb');
  const [newColorName, setNewColorName] = useState('Ocean Blue');

  const [headingFont, setHeadingFont] = useState('Mukta');
  const [bodyFont, setBodyFont] = useState('Inter');
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Load saved brand kit on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('marathi_brand_kit');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.brandName) setBrandName(parsed.brandName);
        if (parsed.logoUrl) setLogoUrl(parsed.logoUrl);
        if (Array.isArray(parsed.colors) && parsed.colors.length > 0) setColors(parsed.colors);
        if (parsed.headingFont) setHeadingFont(parsed.headingFont);
        if (parsed.bodyFont) setBodyFont(parsed.bodyFont);
      }
    } catch (e) {
      console.error('Failed to load brand kit:', e);
    }
  }, []);

  const handleSaveBrandKit = () => {
    const brandData = {
      brandName,
      logoUrl,
      colors,
      headingFont,
      bodyFont,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('marathi_brand_kit', JSON.stringify(brandData));
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddColor = () => {
    if (!newColorHex) return;
    setColors([
      ...colors,
      {
        id: Date.now().toString(),
        name: newColorName || 'Brand Color',
        hex: newColorHex,
      },
    ]);
    setNewColorName('');
  };

  const handleRemoveColor = (id: string) => {
    setColors(colors.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xl animate-fade-in border border-slate-700 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Brand Kit saved and synced to your editor workspace!</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Brand Kit</h1>
              <p className="text-xs text-slate-500 font-medium">
                Keep all your Marathi & English logos, official color palettes, and fonts consistent across every design.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveBrandKit}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Brand Kit</span>
            </button>
            <button
              onClick={() => {
                handleSaveBrandKit();
                navigate('/editor');
              }}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>Apply to New Design</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand Details */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-600" />
            <span>Brand Identity</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Brand / Business Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Brand Logos (PNG, SVG, Transparent)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/png,image/svg+xml,image/jpeg,image/webp"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                {logoUrl ? (
                  <div className="flex items-center gap-3">
                    <img src={logoUrl} alt="Brand Logo" className="h-10 w-10 object-contain rounded-lg border border-slate-200" />
                    <span className="text-xs font-bold text-slate-700">Change Logo</span>
                  </div>
                ) : (
                  <>
                    <Image className="w-5 h-5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">Upload primary logo file</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Official Color Palette */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Official Brand Colors</h2>
              <p className="text-xs text-slate-500">Colors will appear directly in your canvas color pickers</p>
            </div>
            <span className="text-xs font-bold text-slate-400">{colors.length} Colors configured</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colors.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center gap-2 group relative"
              >
                <div
                  className="w-full h-20 rounded-xl shadow-inner border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-center w-full">
                  <span className="text-xs font-extrabold text-slate-800 block truncate">{c.name}</span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">{c.hex}</span>
                </div>
                <button
                  onClick={() => handleRemoveColor(c.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-white shadow-xs transition-opacity"
                  title="Remove Color"
                  aria-label={`Remove color ${c.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Add Color Card */}
            <div className="p-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col justify-center items-center gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                  aria-label="Pick color value"
                />
                <input
                  type="text"
                  placeholder="Color Name"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  className="w-24 text-xs font-semibold px-2 py-1 border border-slate-200 rounded-lg bg-white"
                  aria-label="Color name"
                />
              </div>
              <button
                onClick={handleAddColor}
                className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Color</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Fonts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Type className="w-5 h-5 text-orange-600" />
              <span>Brand Typography</span>
            </h2>
            <p className="text-xs text-slate-500">Default fonts applied to your headings and subheadings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heading Font */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-500">Brand Title & Headings</span>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  Primary
                </span>
              </div>
              <select
                value={headingFont}
                onChange={(e) => setHeadingFont(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-sm text-slate-800"
              >
                <optgroup label="AMS Marathi Calligraphy">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'ams').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Shivaji Series">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'shivaji').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Millennium Series">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'millennium').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Classic DTP (Pankaj, Richa, Varsha, Saroj, Vimal)">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'dtp').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Kruti Dev Series">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'kruti').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Modern & Google Fonts">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'modern').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="English & Latin">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'latin').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
              </select>
              <div
                className="p-3 bg-white rounded-xl border border-slate-200 text-lg font-bold text-slate-800"
                style={{ fontFamily: headingFont }}
              >
                || मराठी डिझाईन स्टुडिओ || Professional Graphic Design
              </div>
            </div>

            {/* Body Font */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-500">Body & Paragraphs</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                  Secondary
                </span>
              </div>
              <select
                value={bodyFont}
                onChange={(e) => setBodyFont(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-sm text-slate-800"
              >
                <optgroup label="Devanagari Readable & Clean">
                  {FONT_LIBRARY.filter(f => f.script === 'devanagari' || f.script === 'both').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
                <optgroup label="English & Latin">
                  {FONT_LIBRARY.filter(f => f.subCategory === 'latin').map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </optgroup>
              </select>
              <div
                className="p-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-700"
                style={{ fontFamily: bodyFont }}
              >
                सर्वोत्तम दर्जाची ग्राफिक्स तयार करा, प्रिंट करा आणि सोशल मीडियावर सहज शेअर करा.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
