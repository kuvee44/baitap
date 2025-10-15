import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse, PaginatedResponse } from '@/types/api';

// Mock data - trong thực tế bạn sẽ kết nối với database
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

// GET /api/users - Lấy danh sách users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    // Filter users
    let filteredUsers = users;
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Pagination
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const response: PaginatedResponse<User> = {
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Lỗi khi tải danh sách người dùng'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/users - Tạo user mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    // Validation
    if (!name || !email || !role) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Vui lòng điền đầy đủ thông tin'
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Email đã tồn tại'
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create new user
    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      role,
      avatar: `https://via.placeholder.com/100x100/6366F1/FFFFFF?text=${name.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    const response: ApiResponse<User> = {
      success: true,
      data: newUser,
      message: 'Tạo người dùng thành công'
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Lỗi khi tạo người dùng'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
