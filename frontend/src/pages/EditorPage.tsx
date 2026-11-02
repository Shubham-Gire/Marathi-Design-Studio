import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { CanvasEditor } from '../components/CanvasEditor';

export const EditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const templateIdParam = searchParams.get('templateId');
  const projectIdParam = searchParams.get('projectId');
  const widthParam = searchParams.get('w');
  const heightParam = searchParams.get('h');
  const titleQueryParam = searchParams.get('title');

  const [loading, setLoading] = useState(true);
  const [initialJson, setInitialJson] = useState<string | undefined>(undefined);
  const [initialTitle, setInitialTitle] = useState<string>(titleQueryParam || 'Untitled Design');
  const [projectId, setProjectId] = useState<number | undefined>(undefined);

  useEffect(() => {
    loadEditorState();
  }, [templateIdParam, projectIdParam]);

  const loadEditorState = async () => {
    setLoading(true);
    try {
      if (projectIdParam) {
        const proj = await api.getProject(Number(projectIdParam));
        setInitialJson(proj.canvasJson);
        setInitialTitle(proj.title);
        setProjectId(proj.id);
      } else if (templateIdParam) {
        const tmpl = await api.getTemplate(Number(templateIdParam));
        setInitialJson(tmpl.canvasJson);
        setInitialTitle(tmpl.titleMr);
      } else if (titleQueryParam) {
        setInitialTitle(titleQueryParam);
      }
    } catch (e) {
      console.error('Failed to load canvas data:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-100 text-sm font-bold text-slate-500">
        Loading canvas editor...
      </div>
    );
  }

  return (
    <CanvasEditor
      initialCanvasJson={initialJson}
      initialTitle={initialTitle}
      projectId={projectId}
      initialWidth={widthParam ? Number(widthParam) : undefined}
      initialHeight={heightParam ? Number(heightParam) : undefined}
    />
  );
};
