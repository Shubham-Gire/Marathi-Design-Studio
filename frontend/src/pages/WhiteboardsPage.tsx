import React, { useState } from 'react';
import {
  PenTool,
  Plus,
  StickyNote,
  Square,
  Circle,
  Move,
  Trash2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Download
} from 'lucide-react';

interface WhiteboardNote {
  id: number;
  text: string;
  color: string;
  x: number;
  y: number;
}

export const WhiteboardsPage: React.FC = () => {
  const [notes, setNotes] = useState<WhiteboardNote[]>([
    {
      id: 1,
      text: 'गणेशोत्सव आगमन विशेष कॅम्पेन संकल्पना',
      color: 'bg-amber-100 border-amber-300 text-amber-900',
      x: 120,
      y: 100,
    },
    {
      id: 2,
      text: 'सोशल मीडिया रिल्स: ५ मराठी फॉन्ट्स टिप्स',
      color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
      x: 420,
      y: 100,
    },
    {
      id: 3,
      text: 'दिवाळी बंपर डिस्काउंट बॅनर डिझाईन',
      color: 'bg-purple-100 border-purple-300 text-purple-900',
      x: 270,
      y: 280,
    },
  ]);

  const [zoom, setZoom] = useState(1);

  const handleAddSticky = (colorStyle: string) => {
    const newNote: WhiteboardNote = {
      id: Date.now(),
      text: 'नवीन संकल्पना (New Note)...',
      color: colorStyle,
      x: 200 + Math.random() * 200,
      y: 150 + Math.random() * 150,
    };
    setNotes([...notes, newNote]);
  };

  const handleUpdateText = (id: number, text: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text } : n)));
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 select-none overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900">Marathi Infinite Whiteboard & Brainstorming</h1>
            <p className="text-xs text-slate-400">Collaborate, ideate, and plan campaigns with freeform sticky notes</p>
          </div>
        </div>

        {/* Sticky Note Palette */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddSticky('bg-amber-100 border-amber-300 text-amber-900')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 cursor-pointer"
          >
            <StickyNote className="w-3.5 h-3.5 text-amber-600" />
            <span>Yellow Note</span>
          </button>
          <button
            onClick={() => handleAddSticky('bg-emerald-100 border-emerald-300 text-emerald-900')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold border border-emerald-300 cursor-pointer"
          >
            <StickyNote className="w-3.5 h-3.5 text-emerald-600" />
            <span>Green Note</span>
          </button>
          <button
            onClick={() => handleAddSticky('bg-purple-100 border-purple-300 text-purple-900')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold border border-purple-300 cursor-pointer"
          >
            <StickyNote className="w-3.5 h-3.5 text-purple-600" />
            <span>Purple Note</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-600 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(Math.min(2.0, zoom + 0.1))}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Infinite Canvas Space with Dot Grid */}
      <main
        className="flex-1 relative overflow-auto cursor-crosshair bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{ left: `${note.x}px`, top: `${note.y}px` }}
            className={`absolute w-64 p-4 rounded-2xl shadow-lg border-2 ${note.color} transition-shadow hover:shadow-xl group`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Sticky Note</span>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              rows={4}
              value={note.text}
              onChange={(e) => handleUpdateText(note.id, e.target.value)}
              className="w-full bg-transparent border-none outline-hidden text-sm font-bold resize-none leading-relaxed select-text"
            />
          </div>
        ))}
      </main>
    </div>
  );
};
