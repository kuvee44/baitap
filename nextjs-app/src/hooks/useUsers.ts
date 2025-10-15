import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserData, UpdateUserData, PaginatedResponse } from '@/types/api';
import { userApi } from '@/services/api';

// Hook để quản lý danh sách users
export const useUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Bắt đầu với loading = true
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userApi.getUsers({
        page: params?.page || 1,
        limit: params?.limit || 10,
        search: params?.search,
        role: params?.role
      });
      
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit, params?.search, params?.role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refetch = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    pagination,
    refetch
  };
};

// Hook để quản lý user đơn lẻ
export const useUser = (id: number | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) {
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const userData = await userApi.getUserById(id);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser
  };
};

// Hook để quản lý CRUD operations
export const useUserMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = useCallback(async (userData: CreateUserData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await userApi.createUser(userData);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tạo người dùng');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userData: UpdateUserData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userApi.updateUser(userData);
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi cập nhật người dùng');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: number): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const deletedUser = await userApi.deleteUser(id);
      return deletedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi xóa người dùng');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createUser,
    updateUser,
    deleteUser
  };
};
