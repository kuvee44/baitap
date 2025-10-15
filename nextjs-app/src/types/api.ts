// API Types và Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form data types
export interface CreateUserData {
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: number;
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
