import {
  AuthResponse,
  User,
  TemplateCategory,
  Template,
  Project,
  MediaAsset,
  AiCopyResponse,
  AiBriefResponse,
  AiImproveResponse,
  Plan,
  Subscription,
  DesignElement,
  StorageSummary
} from '../types';
import { CANVA_IMPORTED_TEMPLATES } from '../config/templates';
import { CANVA_ELEMENTS } from '../config/canvaElements';

const BASE_URL = '/api/v1';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('marathi_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = 'An error occurred. Please try again.';
    try {
      const data = await res.json();
      if (data.error) errorMsg = data.error;
      else if (data.message) errorMsg = data.message;
    } catch {
      // not json
    }
    throw new Error(errorMsg);
  }
  if (res.status === 204) {
    return {} as T;
  }
  return res.json();
}

export const api = {
  // Auth
  async register(data: { email: string; password: string; fullName: string; phoneNumber?: string }): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse<AuthResponse>(res);
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse<AuthResponse>(res);
  },

  async oauthLogin(provider: string, data?: { email?: string; fullName?: string; avatarUrl?: string; token?: string }): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/auth/oauth/${encodeURIComponent(provider.toLowerCase())}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data || {})
    });
    return handleResponse<AuthResponse>(res);
  },

  async getMe(): Promise<User> {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<User>(res);
  },

  // Templates
  async getCategories(): Promise<TemplateCategory[]> {
    const res = await fetch(`${BASE_URL}/categories`);
    return handleResponse<TemplateCategory[]>(res);
  },

  async getTemplates(category?: string, search?: string): Promise<Template[]> {
    let backendTemplates: Template[] = [];
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all' && category !== 'canva') params.set('category', category);
      if (search) params.set('search', search);
      const res = await fetch(`${BASE_URL}/templates?${params.toString()}`);
      if (res.ok) {
        backendTemplates = await res.json();
      }
    } catch (e) {
      console.warn('Backend templates fetch notice (fallback active):', e);
    }

    let userSavedTemplates: Template[] = [];
    try {
      const saved = localStorage.getItem('canva_user_templates');
      if (saved) {
        userSavedTemplates = JSON.parse(saved);
      }
    } catch {}

    const allMerged = [...CANVA_IMPORTED_TEMPLATES, ...userSavedTemplates, ...backendTemplates];
    const seen = new Set<number>();
    const unique = allMerged.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });

    return unique.filter((t) => {
      const matchCat =
        !category ||
        category === 'all' ||
        (category === 'canva' && (t.tags?.includes('Canva') || t.id >= 1000)) ||
        (category === 'my-templates' && userSavedTemplates.some((u) => u.id === t.id)) ||
        t.categorySlug.toLowerCase() === category.toLowerCase();

      const matchSearch =
        !search ||
        t.titleMr.toLowerCase().includes(search.toLowerCase()) ||
        (t.descriptionMr && t.descriptionMr.toLowerCase().includes(search.toLowerCase())) ||
        (t.tags && t.tags.toLowerCase().includes(search.toLowerCase()));

      return matchCat && matchSearch;
    });
  },

  async getTemplate(id: number): Promise<Template> {
    const numId = Number(id);
    const foundCanva = CANVA_IMPORTED_TEMPLATES.find((t) => t.id === numId);
    if (foundCanva) return foundCanva;

    try {
      const saved = localStorage.getItem('canva_user_templates');
      if (saved) {
        const userSaved: Template[] = JSON.parse(saved);
        const match = userSaved.find((t) => t.id === numId);
        if (match) return match;
      }
    } catch {}

    const res = await fetch(`${BASE_URL}/templates/${id}`);
    return handleResponse<Template>(res);
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${BASE_URL}/projects`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<Project[]>(res);
  },

  async getProject(id: number): Promise<Project> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<Project>(res);
  },

  async createProject(data: { title: string; width: number; height: number; canvasJson: string; thumbnailData?: string }): Promise<Project> {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<Project>(res);
  },

  async updateProject(id: number, data: { title?: string; canvasJson?: string; thumbnailData?: string }): Promise<Project> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<Project>(res);
  },

  async duplicateProject(id: number): Promise<Project> {
    const res = await fetch(`${BASE_URL}/projects/${id}/duplicate`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<Project>(res);
  },

  async deleteProject(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<void>(res);
  },

  // Media
  async getUserMedia(): Promise<MediaAsset[]> {
    const res = await fetch(`${BASE_URL}/media`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<MediaAsset[]>(res);
  },

  async uploadMedia(file: File): Promise<MediaAsset> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BASE_URL}/media/upload`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    return handleResponse<MediaAsset>(res);
  },

  async deleteMedia(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/media/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<void>(res);
  },

  // AI
  async generateCopy(topic: string, tone?: string, category?: string): Promise<AiCopyResponse> {
    const res = await fetch(`${BASE_URL}/ai/generate-copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ topic, tone, category })
    });
    return handleResponse<AiCopyResponse>(res);
  },

  async designAssistant(brief: string): Promise<AiBriefResponse> {
    const res = await fetch(`${BASE_URL}/ai/design-assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ brief })
    });
    return handleResponse<AiBriefResponse>(res);
  },

  async improveText(text: string): Promise<AiImproveResponse> {
    const res = await fetch(`${BASE_URL}/ai/improve-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ text })
    });
    return handleResponse<AiImproveResponse>(res);
  },

  // Billing
  async getPlans(): Promise<Plan[]> {
    const res = await fetch(`${BASE_URL}/billing/plans`);
    return handleResponse<Plan[]>(res);
  },

  async getSubscription(): Promise<Subscription | null> {
    const res = await fetch(`${BASE_URL}/billing/subscription`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<Subscription | null>(res);
  },

  async mockActivatePlan(planId: string): Promise<{ success: boolean; message: string; subscription: Subscription }> {
    const res = await fetch(`${BASE_URL}/billing/mock-activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ planId })
    });
    return handleResponse<{ success: boolean; message: string; subscription: Subscription }>(res);
  },

  async cancelSubscription(): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/billing/cancel`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  // Design Elements Library
  async getDesignElements(category?: string, search?: string, isPremium?: boolean): Promise<DesignElement[]> {
    let backendElements: DesignElement[] = [];
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all' && !['canva', 'festive', 'badges', 'frames'].includes(category)) {
        params.set('category', category);
      }
      if (search) params.set('search', search);
      if (isPremium !== undefined) params.set('isPremium', String(isPremium));
      const res = await fetch(`${BASE_URL}/elements?${params.toString()}`);
      if (res.ok) {
        backendElements = await res.json();
      }
    } catch (e) {
      console.warn('Backend elements fetch notice:', e);
    }

    // Convert CANVA_ELEMENTS into DesignElement structure
    const canvaMapped: DesignElement[] = CANVA_ELEMENTS.map((el, idx) => ({
      id: 5000 + idx,
      title: el.title,
      category: el.category,
      elementType: el.elementType,
      svgData: el.svgData,
      defaultWidth: el.defaultWidth,
      defaultHeight: el.defaultHeight,
      defaultFill: el.defaultFill,
      defaultStroke: el.defaultStroke,
      tags: el.tags.join(', ') + ', canva, graphic',
      isPremium: false,
      fileSizeBytes: el.svgData.length,
      createdAt: new Date().toISOString()
    }));

    const combined = [...canvaMapped, ...backendElements];
    const seen = new Set<number>();
    const unique = combined.filter((el) => {
      if (seen.has(el.id)) return false;
      seen.add(el.id);
      return true;
    });

    return unique.filter((el) => {
      const matchCat =
        !category ||
        category === 'all' ||
        (category === 'canva' && el.id >= 5000) ||
        el.category.toLowerCase() === category.toLowerCase();

      const matchSearch =
        !search ||
        el.title.toLowerCase().includes(search.toLowerCase()) ||
        (el.tags && el.tags.toLowerCase().includes(search.toLowerCase()));

      return matchCat && matchSearch;
    });
  },

  async getDesignElementCategories(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/elements/categories`);
    return handleResponse<string[]>(res);
  },

  // Admin Storage Accounting & Management (10 GB Templates + 10 GB Elements)
  async getStorageSummary(): Promise<StorageSummary> {
    const res = await fetch(`${BASE_URL}/admin/storage/summary`, {
      headers: { ...getAuthHeader() }
    });
    return handleResponse<StorageSummary>(res);
  },

  async createDesignElement(data: Partial<DesignElement>): Promise<DesignElement> {
    const res = await fetch(`${BASE_URL}/admin/elements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<DesignElement>(res);
  },

  async deleteDesignElement(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/admin/elements/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  async deleteTemplate(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/admin/templates/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  async runStorageCleanup(): Promise<{ success: boolean; reclaimedBytes: number; message: string }> {
    const res = await fetch(`${BASE_URL}/admin/storage/cleanup`, {
      method: 'POST',
      headers: { ...getAuthHeader() }
    });
    return handleResponse<{ success: boolean; reclaimedBytes: number; message: string }>(res);
  }
};
