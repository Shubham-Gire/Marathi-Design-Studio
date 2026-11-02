import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Template, TemplateCategory } from '../types';
import { TemplateCard } from '../components/TemplateCard';
import { Search, Filter } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'FREE' | 'PRO'>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, tmpls] = await Promise.all([
        api.getCategories(),
        api.getTemplates(selectedCategory || undefined, searchTerm || undefined)
      ]);
      setCategories(cats);
      setTemplates(tmpls);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const filteredTemplates = templates.filter((t) => {
    if (tierFilter === 'FREE') return t.planTier === 'FREE';
    if (tierFilter === 'PRO') return t.planTier === 'PRO';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Design Template Library
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Browse professionally designed Marathi, English, and bilingual templates for festivals, businesses, events, and social media.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <form onSubmit={handleSearch} className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates (e.g. Festival, Birthday, Sale, Invitation, Business)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </form>

          {/* Tier Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => setTierFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                tierFilter === 'ALL' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTierFilter('FREE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                tierFilter === 'FREE' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => setTierFilter('PRO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                tierFilter === 'PRO' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Pro
            </button>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === ''
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Categories ({templates.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-orange-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.slug.charAt(0).toUpperCase() + cat.slug.slice(1)} ({cat.nameMr})
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm font-semibold text-slate-500">
            Loading templates...
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 font-bold text-sm">No templates found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((tmpl) => (
              <TemplateCard key={tmpl.id} template={tmpl} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
