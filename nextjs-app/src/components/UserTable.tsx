import React, { useState } from 'react';
import { User, CreateUserData } from '@/types/api';
import { useUsers, useUserMutation } from '@/hooks/useUsers';
import { useToast } from '@/hooks/useToast';
import Loading from './Loading';
import Error from './Error';
import Button from './Button';
import Modal from './Modal';
import Form from './Form';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';

interface UserTableProps {
  className?: string;
}

const UserTable: React.FC<UserTableProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null
  });
  const [sortField, setSortField] = useState<'name' | 'email' | 'role' | 'id'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { users, loading, error, pagination, refetch } = useUsers({
    page: currentPage,
    limit: 5,
    search: searchTerm,
    role: selectedRole
  });

  // Fallback cho pagination
  const safePagination = pagination || {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0
  };

  const { loading: mutationLoading, createUser, updateUser, deleteUser } = useUserMutation();
  const { toasts, removeToast, success, error: showError } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1);
  };

  const handleCreateUser = async (formData: any) => {
    const userData: CreateUserData = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    };

    const result = await createUser(userData);
    if (result) {
      setIsCreateModalOpen(false);
      refetch();
      success('Thành công!', 'Đã tạo người dùng mới');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (formData: any) => {
    if (!selectedUser) return;

    const result = await updateUser({
      id: selectedUser.id,
      name: formData.name,
      email: formData.email,
      role: formData.role
    });

    if (result) {
      setIsEditModalOpen(false);
      setSelectedUser(null);
      refetch();
      success('Thành công!', 'Đã cập nhật thông tin người dùng');
    }
  };

  const handleDeleteUser = (user: User) => {
    setDeleteConfirm({ isOpen: true, user });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.user) return;

    const result = await deleteUser(deleteConfirm.user.id);
    if (result) {
      setDeleteConfirm({ isOpen: false, user: null });
      refetch();
      success('Thành công!', 'Đã xóa người dùng');
    }
  };

  const handleSort = (field: 'name' | 'email' | 'role' | 'id') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading && (!users || users.length === 0)) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
        <Loading size="lg" text="Đang tải danh sách người dùng..." />
      </div>
    );
  }

  if (error && (!users || users.length === 0)) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
        <Error message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Quản lý người dùng
        </h2>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          variant="primary"
          disabled={mutationLoading}
        >
          {mutationLoading ? 'Đang tạo...' : 'Thêm người dùng'}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedRole}
            onChange={handleRoleFilter}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả vai trò</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  {sortField === 'id' && (
                    <span className="text-blue-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Tên</span>
                  {sortField === 'name' && (
                    <span className="text-blue-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  {sortField === 'email' && (
                    <span className="text-blue-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center space-x-1">
                  <span>Vai trò</span>
                  {sortField === 'role' && (
                    <span className="text-blue-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-600">{user.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    {user.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'Moderator' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <Button 
                      onClick={() => handleEditUser(user)}
                      variant="secondary"
                      size="sm"
                    >
                      Sửa
                    </Button>
                    <Button 
                      onClick={() => handleDeleteUser(user)}
                      variant="danger"
                      size="sm"
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {safePagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            variant="secondary"
            size="sm"
          >
            Trước
          </Button>
          
          <span className="px-4 py-2 text-gray-600">
            Trang {currentPage} / {safePagination.totalPages}
          </span>
          
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === safePagination.totalPages || loading}
            variant="secondary"
            size="sm"
          >
            Sau
          </Button>
        </div>
      )}

      {/* Loading overlay for mutations */}
      {mutationLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <Loading text="Đang xử lý..." />
          </div>
        </div>
      )}

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Thêm người dùng mới"
        size="md"
      >
        <Form
          onSubmit={handleCreateUser}
          fields={[
            { name: 'name', label: 'Tên', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { 
              name: 'role', 
              label: 'Vai trò', 
              type: 'select', 
              required: true,
              options: [
                { value: 'Admin', label: 'Admin' },
                { value: 'User', label: 'User' },
                { value: 'Moderator', label: 'Moderator' }
              ]
            }
          ]}
          submitText="Tạo người dùng"
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Sửa thông tin người dùng"
        size="md"
      >
        {selectedUser && (
          <Form
            onSubmit={handleUpdateUser}
            initialValues={{
              name: selectedUser.name,
              email: selectedUser.email,
              role: selectedUser.role
            }}
            fields={[
              { name: 'name', label: 'Tên', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { 
                name: 'role', 
                label: 'Vai trò', 
                type: 'select', 
                required: true,
                options: [
                  { value: 'Admin', label: 'Admin' },
                  { value: 'User', label: 'User' },
                  { value: 'Moderator', label: 'Moderator' }
                ]
              }
            ]}
            submitText="Cập nhật"
          />
        )}
      </Modal>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, user: null })}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc muốn xóa người dùng "${deleteConfirm.user?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
        loading={mutationLoading}
      />
    </div>
  );
};

export default UserTable;
