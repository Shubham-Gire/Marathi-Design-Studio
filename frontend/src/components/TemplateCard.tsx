import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Template } from '../types';
import { Crown, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    navigate(`/editor?templateId=${template.id}`);
  };

  // Extract a preview background from canvas JSON if available
  let previewBg = '#ffffff';
  let previewText = template.titleMr;
  try {
    const parsed = JSON.parse(template.canvasJson);
    if (parsed.objects && parsed.objects[0] && parsed.objects[0].fill) {
      previewBg = parsed.objects[0].fill;
    }
  } catch (e) {}

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Template Visual Preview */}
      <div 
        onClick={handleUseTemplate}
        style={{ backgroundColor: previewBg }}
        className="relative aspect-square w-full flex items-center justify-center p-6 cursor-pointer overflow-hidden border-b border-slate-100 group-hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

        <div className="relative text-center p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-white/60 shadow-md max-w-[85%]">
          <p className="text-sm md:text-base font-extrabold text-slate-900 line-clamp-2">
            {previewText}
          </p>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">
            {template.descriptionMr}
          </p>
        </div>

        {/* Free Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm">
            Free
          </span>
        </div>
      </div>

      {/* Info & Action Bar */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h4 className="font-bold text-slate-900 text-sm truncate" title={template.titleMr}>
            {template.titleMr}
          </h4>
          <span className="text-[11px] font-medium text-slate-400 shrink-0">
            {template.width} × {template.height}
          </span>
        </div>

        <button
          onClick={handleUseTemplate}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 group-hover:bg-orange-600 text-slate-700 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
        >
          <span>Customize Template</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
