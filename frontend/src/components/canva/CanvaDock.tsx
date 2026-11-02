import React from 'react';
import {
  LayoutTemplate,
  Columns3,
  Shapes,
  Type,
  Languages,
  UploadCloud,
  Image as ImageIcon,
  Video,
  Music,
  Palette,
  Brush,
  BarChart2,
  Table,
  Square,
  Grid,
  Crown,
  Folder,
  Boxes,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';

export type CanvaTabId =
  | 'templates'
  | 'layouts'
  | 'elements'
  | 'calligraphy'
  | 'text'
  | 'fonts'
  | 'uploads'
  | 'photos'
  | 'videos'
  | 'audio'
  | 'background'
  | 'draw'
  | 'charts'
  | 'tables'
  | 'frames'
  | 'grids'
  | 'brand'
  | 'projects'
  | 'apps'
  | 'ai'
  | 'layers';

interface CanvaDockProps {
  activeTab: CanvaTabId;
  isDrawerOpen: boolean;
  onSelectTab: (tab: CanvaTabId) => void;
}

// Authentic Canva Green Stylus Pen Icon for Tools/Draw
const ToolsDockIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 18.5 3 20l1.5-4L16.5 3.5z"
      stroke="#10b981"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 21c3-1.5 5.5-1.5 8.5 0"
      stroke="#10b981"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

interface DockItem {
  id: CanvaTabId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'templates', label: 'Designs', icon: LayoutTemplate },
  { id: 'layouts', label: 'Layouts', icon: Columns3, badge: 'Grid', badgeColor: 'bg-indigo-500' },
  { id: 'elements', label: 'Elements', icon: Shapes },
  { id: 'calligraphy', label: 'Stencils', icon: Award, badge: 'SVG', badgeColor: 'bg-orange-500' },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'fonts', label: 'Fonts', icon: Languages, badge: 'AMS', badgeColor: 'bg-orange-500' },
  { id: 'uploads', label: 'Uploads', icon: UploadCloud },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'videos', label: 'Videos', icon: Video, badge: 'Pro', badgeColor: 'bg-amber-500' },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'background', label: 'Background', icon: Palette },
  { id: 'draw', label: 'Tools', icon: ToolsDockIcon },
  { id: 'charts', label: 'Charts', icon: BarChart2, badge: 'New', badgeColor: 'bg-emerald-500' },
  { id: 'tables', label: 'Tables', icon: Table },
  { id: 'frames', label: 'Frames', icon: Square },
  { id: 'grids', label: 'Grids', icon: Grid },
  { id: 'brand', label: 'Brand Kit', icon: Crown, badge: 'VIP', badgeColor: 'bg-purple-600' },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'apps', label: 'Apps', icon: Boxes },
  { id: 'ai', label: 'AI Studio', icon: Sparkles, badge: 'AI', badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
  { id: 'layers', label: 'Layers', icon: Layers },
];

export const CanvaDock: React.FC<CanvaDockProps> = ({
  activeTab,
  isDrawerOpen,
  onSelectTab,
}) => {
  return (
    <aside className="w-[72px] bg-[#18191b] border-r border-[#2d2e30] flex flex-col items-center py-2 space-y-0.5 select-none z-20 shrink-0 overflow-y-auto scrollbar-none">
      {DOCK_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id && isDrawerOpen;

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`relative w-[62px] h-[54px] rounded-xl flex flex-col items-center justify-center gap-1 transition-all group shrink-0 ${
              isActive
                ? 'bg-[#252627] text-white font-extrabold shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 font-medium'
            }`}
            title={item.label}
          >
            {/* Active Left Indicator Pill */}
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b3dff] rounded-r-full" />
            )}

            {/* Badge */}
            {item.badge && (
              <span
                className={`absolute top-1 right-1 px-1 py-0.2 rounded-full text-[8px] font-black text-white ${item.badgeColor || 'bg-orange-500'} shadow-xs`}
              >
                {item.badge}
              </span>
            )}

            <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`} />
            <span className="text-[10px] leading-tight tracking-tight truncate max-w-[58px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};
