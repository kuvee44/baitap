import { User, CreateUserData, UpdateUserData, ApiResponse, PaginatedResponse } from '@/types/api';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Generic API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Lỗi không xác định'
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// User API service
export const userApi = {
  // Lấy danh sách users với pagination và filter
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);

    const endpoint = `/api/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<PaginatedResponse<User>>(endpoint);
    
    if (!response.success) {
      throw new Error(response.error || 'Lỗi khi tải danh sách người dùng');
    }
    
    return response.data!;
  },

  // Lấy thông tin user theo ID
  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/api/users/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Lỗi khi tải thông tin người dùng');
    }
    
    return response.data!;
  },

  // Tạo user mới
  async createUser(userData: CreateUserData): Promise<User> {
    const response = await apiClient.post<User>('/api/users', userData);
    
    if (!response.success) {
      throw new Error(response.error || 'Lỗi khi tạo người dùng');
    }
    
    return response.data!;
  },

  // Cập nhật user
  async updateUser(userData: UpdateUserData): Promise<User> {
    const { id, ...updateData } = userData;
    const response = await apiClient.put<User>(`/api/users/${id}`, updateData);
    
    if (!response.success) {
      throw new Error(response.error || 'Lỗi khi cập nhật người dùng');
    }
    
    return response.data!;
  },

  // Xóa user
  async deleteUser(id: number): Promise<User> {
    const response = await apiClient.delete<User>(`/api/users/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Lỗi khi xóa người dùng');
    }
    
    return response.data!;
  }
};

// Export API client for custom requests
export { apiClient };
