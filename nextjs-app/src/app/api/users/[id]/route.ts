import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse } from '@/types/api';

// Mock data - sẽ được import từ file chung trong thực tế
let users: User[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    role: 'Admin',
    avatar: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=A',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    role: 'User',
    avatar: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=B',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-16T09:00:00Z'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    role: 'Moderator',
    avatar: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=C',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    role: 'User',
    avatar: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=D',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z'
  }
];

// GET /api/users/[id] - Lấy thông tin user theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'ID không hợp lệ'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = users.find(u => u.id === id);
    
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Không tìm thấy người dùng'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Lỗi khi tải thông tin người dùng'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PUT /api/users/[id] - Cập nhật user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'ID không hợp lệ'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const body = await request.json();
    const { name, email, role } = body;

    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Không tìm thấy người dùng'
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Check if email already exists for other users
    if (email && email !== users[userIndex].email) {
      const existingUser = users.find(u => u.email === email && u.id !== id);
      if (existingUser) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Email đã tồn tại'
        };
        return NextResponse.json(response, { status: 409 });
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      updatedAt: new Date().toISOString()
    };

    const response: ApiResponse<User> = {
      success: true,
      data: users[userIndex],
      message: 'Cập nhật người dùng thành công'
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating user:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Lỗi khi cập nhật người dùng'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/users/[id] - Xóa user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'ID không hợp lệ'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Không tìm thấy người dùng'
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Remove user
    const deletedUser = users.splice(userIndex, 1)[0];

    const response: ApiResponse<User> = {
      success: true,
      data: deletedUser,
      message: 'Xóa người dùng thành công'
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Lỗi khi xóa người dùng'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
