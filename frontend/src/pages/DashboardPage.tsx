import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Project, MediaAsset } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  PlusCircle,
  Copy,
  Trash2,
  Edit3,
  Image,
  ArrowUpRight,
  FolderOpen,
  Sparkles,
  Star,
  RotateCcw,
  Upload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, isPro } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get('tab') as 'projects' | 'media') || 'projects';
  const filter = (searchParams.get('filter') as 'all' | 'starred' | 'trash') || 'all';

  const [projects, setProjects] = useState<Project[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [starredIds, setStarredIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('marathi_starred_projects');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [trashedIds, setTrashedIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('marathi_trashed_projects');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projList, mediaList] = await Promise.all([
        api.getProjects(),
        api.getUserMedia()
      ]);
      setProjects(projList);
      setMediaAssets(mediaList);
    } catch (e) {
      console.error(e);
      showToast('Error loading designs or assets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (projectId: number) => {
    try {
      const duplicated = await api.duplicateProject(projectId);
      setProjects([duplicated, ...projects]);
      showToast('Design duplicated successfully!');
    } catch (err: any) {
      showToast(err.message || 'Error duplicating project.', 'error');
    }
  };

  const handleToggleStar = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: number[];
    if (starredIds.includes(projectId)) {
      updated = starredIds.filter(id => id !== projectId);
      showToast('Removed from Starred');
    } else {
      updated = [...starredIds, projectId];
      showToast('Added to Starred Designs ⭐');
    }
    setStarredIds(updated);
    localStorage.setItem('marathi_starred_projects', JSON.stringify(updated));
  };

  const handleMoveToTrash = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = [...trashedIds, projectId];
    setTrashedIds(updated);
    localStorage.setItem('marathi_trashed_projects', JSON.stringify(updated));
    showToast('Design moved to Trash. You can restore it anytime.');
  };

  const handleRestoreFromTrash = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = trashedIds.filter(id => id !== projectId);
    setTrashedIds(updated);
    localStorage.setItem('marathi_trashed_projects', JSON.stringify(updated));
    showToast('Design restored to active projects!');
  };

  const handlePermanentDelete = async (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this design permanently? This cannot be undone.')) return;
    try {
      await api.deleteProject(projectId);
      setProjects(projects.filter(p => p.id !== projectId));
      const updatedTrash = trashedIds.filter(id => id !== projectId);
      setTrashedIds(updatedTrash);
      localStorage.setItem('marathi_trashed_projects', JSON.stringify(updatedTrash));
      showToast('Design permanently deleted.');
    } catch (err: any) {
      showToast(err.message || 'Error deleting design permanently.', 'error');
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const asset = await api.uploadMedia(file);
      setMediaAssets([asset, ...mediaAssets]);
      showToast(`Uploaded "${file.name}" successfully!`);
    } catch (err: any) {
      showToast(err.message || 'Error uploading file.', 'error');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const setTabAndFilter = (tab: 'projects' | 'media', newFilter: 'all' | 'starred' | 'trash' = 'all') => {
    setSearchParams({ tab, filter: newFilter });
  };

  // Filter projects depending on active view
  const activeProjects = projects.filter(p => !trashedIds.includes(p.id));
  const starredProjects = activeProjects.filter(p => starredIds.includes(p.id));
  const trashedProjects = projects.filter(p => trashedIds.includes(p.id));

  let displayedProjects = activeProjects;
  if (filter === 'starred') displayedProjects = starredProjects;
  if (filter === 'trash') displayedProjects = trashedProjects;

  const projectCount = activeProjects.length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xl animate-fade-in border border-slate-700 text-xs font-bold">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Welcome & Quota Bar */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Welcome back, {user?.fullName || 'Creator'}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                100% Free Forever
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Control center for all your saved graphic designs, marketing flyers, and media assets.
            </p>
          </div>

          {/* Free Unlimited Designs Indicator */}
          <div className="w-full md:w-auto flex flex-col md:items-end gap-2">
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-purple-700">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Saved Designs: {projectCount} (Unlimited Free Creation)</span>
              </span>
            </div>
            <div className="w-full md:w-56 h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all"
                style={{ width: `${Math.min(100, Math.max(15, projectCount * 10))}%` }}
              />
            </div>

            <button
              onClick={() => navigate('/editor')}
              className="mt-2 w-full md:w-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Design</span>
            </button>
          </div>
        </div>

        {/* Primary Tabs: My Designs vs Uploaded Media */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTabAndFilter('projects', 'all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>My Designs ({activeProjects.length})</span>
            </button>
            <button
              onClick={() => setTabAndFilter('media')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Uploaded Media ({mediaAssets.length})</span>
            </button>
          </div>

          {/* Sub-Filters for Projects */}
          {activeTab === 'projects' && (
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setTabAndFilter('projects', 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({activeProjects.length})
              </button>
              <button
                onClick={() => setTabAndFilter('projects', 'starred')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'starred'
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-slate-600 hover:text-amber-600'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Starred ({starredProjects.length})</span>
              </button>
              <button
                onClick={() => setTabAndFilter('projects', 'trash')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'trash'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-slate-600 hover:text-red-600'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                <span>Trash ({trashedProjects.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div>
            {loading ? (
              <div className="py-20 text-center text-sm font-semibold text-slate-500">
                Loading designs...
              </div>
            ) : displayedProjects.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-10">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {filter === 'starred' ? (
                    <Star className="w-7 h-7 text-amber-500 fill-amber-400" />
                  ) : filter === 'trash' ? (
                    <Trash2 className="w-7 h-7 text-slate-400" />
                  ) : (
                    <PlusCircle className="w-7 h-7" />
                  )}
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {filter === 'starred'
                    ? 'No starred designs yet'
                    : filter === 'trash'
                    ? 'Trash is empty'
                    : 'No designs created yet'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  {filter === 'starred'
                    ? 'Click the star icon on any design card to bookmark it here.'
                    : filter === 'trash'
                    ? 'Deleted items will appear here for recovery.'
                    : 'Select a pre-made template or start designing from a blank canvas.'}
                </p>
                {filter === 'all' && (
                  <button
                    onClick={() => navigate('/templates')}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                  >
                    Browse Templates
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProjects.map((proj) => {
                  const isStarred = starredIds.includes(proj.id);
                  const isTrashed = trashedIds.includes(proj.id);

                  return (
                    <div
                      key={proj.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Thumbnail */}
                      <div
                        onClick={() => {
                          if (!isTrashed) navigate(`/editor?projectId=${proj.id}`);
                        }}
                        className={`aspect-square bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100 relative group ${
                          !isTrashed ? 'cursor-pointer' : ''
                        }`}
                      >
                        {proj.thumbnailData ? (
                          <img
                            src={proj.thumbnailData}
                            alt={proj.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="p-4 text-center">
                            <p className="font-extrabold text-slate-800 text-sm">{proj.title}</p>
                          </div>
                        )}

                        {/* Star Button in top-right */}
                        {!isTrashed && (
                          <button
                            onClick={(e) => handleToggleStar(proj.id, e)}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xs shadow-xs hover:scale-110 transition-all cursor-pointer z-10"
                            title={isStarred ? 'Unstar' : 'Star design'}
                            aria-label="Star design"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isStarred
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-slate-400 hover:text-amber-500'
                              }`}
                            />
                          </button>
                        )}

                        {!isTrashed && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-md flex items-center gap-1">
                              <span>Open in Editor</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details & Actions */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm truncate flex-1" title={proj.title}>
                            {proj.title}
                          </h4>
                          {isStarred && (
                            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                              Starred
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {proj.width} × {proj.height} px • Revision v{proj.version}
                        </p>

                        <div className="flex items-center justify-between gap-1 mt-3 pt-3 border-t border-slate-100">
                          {!isTrashed ? (
                            <>
                              <button
                                onClick={() => navigate(`/editor?projectId=${proj.id}`)}
                                className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDuplicate(proj.id)}
                                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                                  title="Duplicate"
                                  aria-label="Duplicate project"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleMoveToTrash(proj.id, e)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                  title="Move to Trash"
                                  aria-label="Move to Trash"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => handleRestoreFromTrash(proj.id, e)}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore</span>
                              </button>
                              <button
                                onClick={(e) => handlePermanentDelete(proj.id, e)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                                title="Delete Permanently"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete Forever</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && (
          <div>
            {/* Direct Upload Button Bar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Your Uploaded Brand Assets & Logos</h3>
                <p className="text-xs text-slate-500">Upload high-res PNG, JPG, or SVG assets to use across any design.</p>
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Asset</span>
                </button>
              </div>
            </div>

            {mediaAssets.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-10">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Image className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">No photos or logos uploaded yet</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Upload your brand logos, photo cutouts, and festive graphics here or directly in the editor.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  Upload First Asset
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mediaAssets.map((asset) => (
                  <div key={asset.id} className="bg-white rounded-2xl border border-slate-200 p-2 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 mb-2">
                      <img
                        src={asset.url || `/api/v1/media/file/${asset.id}`}
                        alt={asset.originalFilename}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-slate-800 truncate" title={asset.originalFilename}>
                      {asset.originalFilename}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {(asset.fileSizeBytes / 1024).toFixed(0)} KB
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
