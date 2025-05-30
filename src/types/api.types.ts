// Generic API response interface
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

// Error response
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
  status: number;
}

// Authentication
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  refreshToken?: string;
}

// User
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Dashboard
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  conversionRate: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any; // Allow additional properties
}

export interface TimeSeriesDataPoint extends ChartDataPoint {
  date: string;
}

// Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  timezone: string;
}