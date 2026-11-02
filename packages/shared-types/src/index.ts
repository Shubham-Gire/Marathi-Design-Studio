export interface User {
  id: number;
  email: string;
  fullName: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  isPro?: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface TemplateCategory {
  id: number;
  nameEn: string;
  nameMr: string;
  slug: string;
  iconName?: string;
  sortOrder?: number;
}

export interface Template {
  id: number;
  titleEn: string;
  titleMr: string;
  descriptionMr?: string;
  width: number;
  height: number;
  canvasJson: string;
  thumbnailUrl?: string;
  isPremium: boolean;
  categorySlug: string;
}

export interface Project {
  id: number;
  userId: number;
  title: string;
  width: number;
  height: number;
  canvasJson: string;
  thumbnailData?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: number;
  userId: number;
  originalFilename: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  createdAt: string;
}

export interface DesignElement {
  id: number;
  nameEn: string;
  nameMr: string;
  category: string;
  tags?: string;
  svgData?: string;
  assetUrl?: string;
  isPremium: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
}

export interface LibraryStats {
  libraryType: 'TEMPLATES' | 'ELEMENTS';
  totalSizeBytes: number;
  maxSizeBytes: number;
  usagePercent: number;
  remainingBytes: number;
  totalAssetsCount: number;
  isWithinLimit: boolean;
}

export interface StorageSummary {
  templates: LibraryStats;
  elements: LibraryStats;
  auditTimestamp: string;
}

export interface Plan {
  id: number;
  name: string;
  priceMonthly: number;
  maxProjects: number;
  unlimitedAi: boolean;
  premiumTemplates: boolean;
}

export interface Subscription {
  id: number;
  userId: number;
  planId: number;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  startDate: string;
  endDate: string;
}

export interface AiCopyResponse {
  headlines: string[];
  callToAction: string;
  bodySuggestions: string[];
}

export interface AiBriefResponse {
  title: string;
  headerText: string;
  subText: string;
  footerText: string;
  recommendedFont: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
}
