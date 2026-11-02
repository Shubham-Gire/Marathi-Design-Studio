export interface User {
  id: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: string;
  planTier: 'FREE' | 'PRO' | 'BUSINESS';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface TemplateCategory {
  id: number;
  slug: string;
  nameMr: string;
  iconName?: string;
  displayOrder: number;
}

export interface Template {
  id: number;
  titleMr: string;
  descriptionMr: string;
  categorySlug: string;
  planTier: 'FREE' | 'PRO';
  width: number;
  height: number;
  thumbnailUrl?: string;
  canvasJson: string;
  tags?: string;
  isPublished: boolean;
  createdAt: string;
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
  mimeType: string;
  fileSizeBytes: number;
  storagePath?: string;
  url?: string;
  createdAt: string;
}

export interface AiCopyResponse {
  headlines: string[];
  slogans: string[];
  invitations: string[];
}

export interface AiBriefResponse {
  title: string;
  headerText: string;
  subText: string;
  footerText: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  recommendedFont: string;
  recommendedCategory: string;
  suggestions: string[];
}

export interface AiImproveResponse {
  original: string;
  shortVariant: string;
  standardVariant: string;
  detailedVariant: string;
}

export interface Plan {
  id: string;
  nameMr: string;
  priceInr: number;
  billingCycle: string;
  maxProjects: number;
  maxStorageMb: number;
  dailyAiLimit: number;
  premiumTemplates: boolean;
}

export interface Subscription {
  id: number;
  userId: number;
  planId: string;
  status: string;
  razorpayPaymentId?: string;
  isMockPayment: boolean;
  startsAt: string;
  expiresAt: string;
}

export interface DesignElement {
  id: number;
  title: string;
  category: string;
  elementType: string;
  svgData?: string;
  assetUrl?: string;
  thumbnailUrl?: string;
  tags?: string;
  isPremium: boolean;
  fileSizeBytes: number;
  sha256Hash?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultFill?: string;
  defaultStroke?: string;
  createdAt: string;
}

export interface AssetInfo {
  id: number;
  name: string;
  category: string;
  fileSizeBytes: number;
  formattedSize: string;
  sha256Hash: string;
  createdAt: string;
}

export interface LibraryStats {
  libraryType: string;
  usedBytes: number;
  maxLimitBytes: number;
  remainingBytes: number;
  usedGb: number;
  maxGb: number;
  usagePercentage: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  warningMessage?: string;
  assetCount: number;
  largestAssets: AssetInfo[];
}

export interface StorageSummary {
  templates: LibraryStats;
  elements: LibraryStats;
  totalUsedBytes: number;
  totalLimitBytes: number;
  totalUsedGb: number;
  totalLimitGb: number;
}

