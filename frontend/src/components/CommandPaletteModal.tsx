import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Command,
  LayoutTemplate,
  Type,
  Square,
  Circle,
  Upload,
  Download,
  Palette,
  Sparkles,
  Presentation,
  FileText,
  PenTool,
  Table,
  Video,
  Globe,
  Share2,
  Settings,
  HelpCircle,
  Crown,
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Actions' | 'Tools & Editors' | 'Navigation' | 'Settings';
  shortcut?: string;
  icon: React.ElementType;
  action: () => void;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction?: (actionId: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onExecuteAction,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Actions
    {
      id: 'add-text',
      title: 'Add Text Box',
      category: 'Actions',
      shortcut: 'T',
      icon: Type,
      action: () => {
        if (onExecuteAction) onExecuteAction('add-text');
        else navigate('/editor');
      },
    },
    {
      id: 'add-rectangle',
      title: 'Add Rectangle Shape',
      category: 'Actions',
      shortcut: 'R',
      icon: Square,
      action: () => {
        if (onExecuteAction) onExecuteAction('add-rectangle');
        else navigate('/editor');
      },
    },
    {
      id: 'add-circle',
      title: 'Add Circle Shape',
      category: 'Actions',
      shortcut: 'C',
      icon: Circle,
      action: () => {
        if (onExecuteAction) onExecuteAction('add-circle');
        else navigate('/editor');
      },
    },
    {
      id: 'download-design',
      title: 'Download / Export Design (PNG, PDF, JPEG)',
      category: 'Actions',
      shortcut: 'Ctrl+Shift+E',
      icon: Download,
      action: () => {
        if (onExecuteAction) onExecuteAction('download-design');
        else navigate('/editor');
      },
    },
    {
      id: 'open-layers',
      title: 'Open Layers Panel',
      category: 'Actions',
      icon: Layers,
      action: () => {
        if (onExecuteAction) onExecuteAction('open-layers');
        else navigate('/editor');
      },
    },
    {
      id: 'ai-prompt',
      title: 'Open AI Creative Studio Prompt',
      category: 'Actions',
      icon: Sparkles,
      action: () => navigate('/ai-studio'),
    },

    // Tools & Editors
    {
      id: 'open-editor',
      title: 'Design Editor (Canvas Workspace)',
      category: 'Tools & Editors',
      icon: LayoutTemplate,
      action: () => navigate('/editor'),
    },
    {
      id: 'open-presentations',
      title: 'Presentations & Slide Deck Maker',
      category: 'Tools & Editors',
      icon: Presentation,
      action: () => navigate('/presentations'),
    },
    {
      id: 'open-documents',
      title: 'Documents & Rich Text Editor',
      category: 'Tools & Editors',
      icon: FileText,
      action: () => navigate('/documents'),
    },
    {
      id: 'open-whiteboards',
      title: 'Whiteboard & Mind Mapping Canvas',
      category: 'Tools & Editors',
      icon: PenTool,
      action: () => navigate('/whiteboards'),
    },
    {
      id: 'open-spreadsheets',
      title: 'Spreadsheets & Dynamic Charts',
      category: 'Tools & Editors',
      icon: Table,
      action: () => navigate('/spreadsheets'),
    },
    {
      id: 'open-video',
      title: 'Video Editor & Timeline',
      category: 'Tools & Editors',
      icon: Video,
      action: () => navigate('/video-editor'),
    },
    {
      id: 'open-websites',
      title: 'Websites & Landing Pages Builder',
      category: 'Tools & Editors',
      icon: Globe,
      action: () => navigate('/websites'),
    },

    // Navigation
    {
      id: 'nav-templates',
      title: 'Browse Marathi & English Templates',
      category: 'Navigation',
      icon: LayoutTemplate,
      action: () => navigate('/templates'),
    },
    {
      id: 'nav-projects',
      title: 'My Designs & Projects',
      category: 'Navigation',
      icon: LayoutTemplate,
      action: () => navigate('/dashboard'),
    },
    {
      id: 'nav-brand-kit',
      title: 'Brand Kit (Logos, Colors, Fonts)',
      category: 'Navigation',
      icon: Palette,
      action: () => navigate('/brand-kit'),
    },
    {
      id: 'nav-social',
      title: 'Social Media Content Calendar & Planner',
      category: 'Navigation',
      icon: Share2,
      action: () => navigate('/social-media'),
    },
    {
      id: 'nav-apps',
      title: 'Apps & Integrations Marketplace',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigate('/apps'),
    },

    // Settings
    {
      id: 'nav-pricing',
      title: 'Pricing & Subscription Plans',
      category: 'Settings',
      icon: Crown,
      action: () => navigate('/pricing'),
    },
    {
      id: 'nav-settings',
      title: 'Account Settings & API Keys',
      category: 'Settings',
      icon: Settings,
      action: () => navigate('/settings'),
    },
    {
      id: 'nav-help',
      title: 'Help Center & Documentation',
      category: 'Settings',
      icon: HelpCircle,
      action: () => navigate('/help'),
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.id.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search actions, tools, templates..."
            className="w-full bg-transparent border-none outline-hidden text-base font-semibold text-slate-800 placeholder-slate-400"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-sm font-semibold text-slate-400">
              No matching commands or tools found for "{query}".
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-orange-50 text-orange-950 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        <span>{cmd.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">{cmd.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {cmd.shortcut && (
                      <kbd className="px-2 py-0.5 text-xs font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 rounded-md">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-orange-600' : 'text-slate-300'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-medium px-4">
          <span>Use ↑ and ↓ arrows to navigate, Enter to select</span>
          <span>Marathi Design Studio</span>
        </div>
      </div>
    </div>
  );
};
