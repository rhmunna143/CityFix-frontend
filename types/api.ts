export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PageMeta;
  errors?: Array<{ message: string }>;
}

export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}

export type Role = 'CITIZEN' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';

export type ComplaintStatus =
  | 'SUBMITTED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED';

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';
export type PaymentPurpose = 'PRIORITY_FEE' | 'SERVICE_CHARGE';

export interface User {
  id: string;
  name: string;
  email: string;
  googleId: string | null;
  role: Role;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slaHours?: number;
  basePrice?: string; // Decimal as string
  departmentId?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface Complaint {
  id: string;
  referenceCode: string;
  citizenId: string;
  categoryId: string;
  departmentId: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  status: ComplaintStatus;
  isPriority: boolean;
  slaDeadline: string;
  isSlaBreached: boolean;
  resolutionNote: string | null;
  reopenCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category?: {
    id: string;
    name: string;
    basePrice?: string;
  };
  department?: {
    id: string;
    name: string;
  };
}

export interface Payment {
  id: string;
  userId: string;
  complaintId: string;
  purpose: PaymentPurpose;
  amount: string; // Decimal string
  currency: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseData {
  user: User;
  tokens: AuthTokens;
}

export interface PaymentInitiateData {
  payment: Payment;
  sessionUrl: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceId: string | null;
  details: any;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
