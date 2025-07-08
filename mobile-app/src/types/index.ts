
// Common Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  organizationId?: string;
  preferences: UserPreferences;
  biometricEnabled: boolean;
  pushNotificationsEnabled: boolean;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SECURITY_ANALYST = 'SECURITY_ANALYST',
  DEVELOPER = 'DEVELOPER',
  AUDITOR = 'AUDITOR',
  VIEWER = 'VIEWER',
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationPreferences;
  dashboard: DashboardPreferences;
}

export interface NotificationPreferences {
  vulnerabilityAlerts: boolean;
  scanCompletions: boolean;
  systemUpdates: boolean;
  securityAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface DashboardPreferences {
  defaultView: 'overview' | 'projects' | 'vulnerabilities';
  widgets: string[];
  refreshInterval: number;
}

// Organization Types
export interface Organization extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  plan: SubscriptionPlan;
  status: OrganizationStatus;
  settings: OrganizationSettings;
}

export enum SubscriptionPlan {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export interface OrganizationSettings {
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo?: string;
  };
  security: {
    requireBiometric: boolean;
    sessionTimeout: number;
    allowedIpRanges?: string[];
  };
  features: {
    aiAnalysis: boolean;
    symbolicExecution: boolean;
    realTimeMonitoring: boolean;
    customReports: boolean;
  };
}

// Project Types
export interface Project extends BaseEntity {
  name: string;
  description?: string;
  organizationId: string;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  repository?: RepositoryInfo;
  configuration: ProjectConfiguration;
  metrics: ProjectMetrics;
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
}

export enum ProjectVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  INTERNAL = 'INTERNAL',
}

export interface RepositoryInfo {
  url: string;
  branch: string;
  lastCommit?: string;
  provider: 'github' | 'gitlab' | 'bitbucket';
}

export interface ProjectConfiguration {
  scanSettings: ScanSettings;
  notifications: ProjectNotificationSettings;
  integrations: ProjectIntegrations;
}

export interface ScanSettings {
  automated: boolean;
  schedule?: string;
  depth: 'basic' | 'comprehensive' | 'deep';
  targets: string[];
}

export interface ProjectNotificationSettings {
  channels: ('email' | 'slack' | 'discord' | 'webhook')[];
  triggers: ('vulnerability_found' | 'scan_completed' | 'high_severity')[];
}

export interface ProjectIntegrations {
  ci_cd?: {
    platform: string;
    webhookUrl: string;
    enabled: boolean;
  };
  monitoring?: {
    provider: string;
    apiKey: string;
    enabled: boolean;
  };
}

export interface ProjectMetrics {
  totalScans: number;
  vulnerabilitiesFound: number;
  criticalIssues: number;
  lastScanDate?: string;
  securityScore: number;
}

// Vulnerability Types
export interface Vulnerability extends BaseEntity {
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  type: VulnerabilityType;
  status: VulnerabilityStatus;
  projectId: string;
  location: VulnerabilityLocation;
  impact: VulnerabilityImpact;
  recommendation: string;
  cweId?: string;
  owasp?: string;
  confidence: number;
  aiGenerated: boolean;
}

export enum VulnerabilitySeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFO = 'INFO',
}

export enum VulnerabilityType {
  REENTRANCY = 'REENTRANCY',
  INTEGER_OVERFLOW = 'INTEGER_OVERFLOW',
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  DENIAL_OF_SERVICE = 'DENIAL_OF_SERVICE',
  FRONT_RUNNING = 'FRONT_RUNNING',
  TIMESTAMP_DEPENDENCE = 'TIMESTAMP_DEPENDENCE',
  UNCHECKED_EXTERNAL_CALLS = 'UNCHECKED_EXTERNAL_CALLS',
  IMPROPER_INPUT_VALIDATION = 'IMPROPER_INPUT_VALIDATION',
  WEAK_RANDOMNESS = 'WEAK_RANDOMNESS',
  LOGIC_ERROR = 'LOGIC_ERROR',
}

export enum VulnerabilityStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
  ACCEPTED_RISK = 'ACCEPTED_RISK',
}

export interface VulnerabilityLocation {
  file: string;
  line: number;
  column: number;
  function?: string;
  contract?: string;
}

export interface VulnerabilityImpact {
  financial: 'none' | 'low' | 'medium' | 'high' | 'critical';
  reputation: 'none' | 'low' | 'medium' | 'high' | 'critical';
  operational: 'none' | 'low' | 'medium' | 'high' | 'critical';
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  BiometricSetup: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Projects: undefined;
  Security: undefined;
  Reports: undefined;
  Settings: undefined;
};

export type DashboardStackParamList = {
  Overview: undefined;
  TenantSelector: undefined;
  Analytics: undefined;
};

export type ProjectsStackParamList = {
  ProjectsList: undefined;
  ProjectDetails: { projectId: string };
  CreateProject: undefined;
  ScanResults: { projectId: string; scanId: string };
};

export type SecurityStackParamList = {
  VulnerabilityList: undefined;
  VulnerabilityDetails: { vulnerabilityId: string };
  SecurityScan: { projectId?: string };
  ThreatMonitoring: undefined;
};

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

// Notification Types
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: any;
  type: NotificationType;
  priority: NotificationPriority;
  scheduledAt?: string;
  expiresAt?: string;
}

export enum NotificationType {
  VULNERABILITY_ALERT = 'VULNERABILITY_ALERT',
  SCAN_COMPLETED = 'SCAN_COMPLETED',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE',
  SECURITY_ALERT = 'SECURITY_ALERT',
  REMINDER = 'REMINDER',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// Offline Types
export interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
  retryCount: number;
  maxRetries: number;
}

export interface SyncStatus {
  isOnline: boolean;
  lastSyncAt?: string;
  pendingActions: number;
  isSyncing: boolean;
  syncProgress: number;
}

// Analytics Types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

export interface UserSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  deviceInfo: DeviceInfo;
  appVersion: string;
}

export interface DeviceInfo {
  platform: 'ios' | 'android';
  osVersion: string;
  deviceModel: string;
  appVersion: string;
  buildNumber: string;
}

// File Types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  uri: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    weights: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
