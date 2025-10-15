# Hướng dẫn tích hợp API trong Next.js

## Tổng quan

Dự án này đã được tích hợp hoàn chỉnh với API, bao gồm:

### 1. API Routes (Server-side)
- **GET /api/users** - Lấy danh sách người dùng với pagination và filter
- **GET /api/users/[id]** - Lấy thông tin người dùng theo ID
- **POST /api/users** - Tạo người dùng mới
- **PUT /api/users/[id]** - Cập nhật thông tin người dùng
- **DELETE /api/users/[id]** - Xóa người dùng

### 2. Client-side Integration
- **Service Layer** (`src/services/api.ts`) - Quản lý API calls
- **Custom Hooks** (`src/hooks/useUsers.ts`, `src/hooks/useApi.ts`) - Quản lý state và side effects
- **Components** - UI components với loading states và error handling

## Cấu trúc thư mục

```
src/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts          # GET, POST /api/users
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE /api/users/[id]
│   └── page.tsx                  # Trang chính với UserTable
├── components/
│   ├── UserTable.tsx            # Component chính tích hợp API
│   ├── Loading.tsx              # Component loading
│   ├── Error.tsx                # Component error
│   └── ...                      # Các component khác
├── hooks/
│   ├── useUsers.ts              # Hook quản lý users
│   └── useApi.ts                # Generic API hook
├── services/
│   └── api.ts                   # API service layer
└── types/
    └── api.ts                   # TypeScript interfaces
```

## Cách sử dụng

### 1. Sử dụng UserTable Component

```tsx
import UserTable from '@/components/UserTable';

export default function UsersPage() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
```

### 2. Sử dụng Custom Hooks

```tsx
import { useUsers, useUserMutation } from '@/hooks/useUsers';

export default function MyComponent() {
  // Lấy danh sách users
  const { users, loading, error, refetch } = useUsers({
    page: 1,
    limit: 10,
    search: 'tên tìm kiếm',
    role: 'Admin'
  });

  // CRUD operations
  const { createUser, updateUser, deleteUser, loading: mutationLoading } = useUserMutation();

  const handleCreate = async () => {
    const result = await createUser({
      name: 'Tên người dùng',
      email: 'email@example.com',
      role: 'User'
    });
    
    if (result) {
      refetch(); // Refresh danh sách
    }
  };

  return (
    <div>
      {loading && <p>Đang tải...</p>}
      {error && <p>Lỗi: {error}</p>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 3. Sử dụng API Service trực tiếp

```tsx
import { userApi } from '@/services/api';

export default function MyComponent() {
  const handleFetchUsers = async () => {
    try {
      const response = await userApi.getUsers({ page: 1, limit: 10 });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleFetchUsers}>Tải danh sách</button>;
}
```

## Tính năng chính

### 1. UserTable Component
- ✅ Hiển thị danh sách người dùng với pagination
- ✅ Tìm kiếm theo tên hoặc email
- ✅ Lọc theo vai trò
- ✅ Thêm người dùng mới
- ✅ Sửa thông tin người dùng
- ✅ Xóa người dùng
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design

### 2. API Features
- ✅ RESTful API design
- ✅ Pagination support
- ✅ Search và filter
- ✅ Data validation
- ✅ Error handling
- ✅ TypeScript support
- ✅ Mock data (có thể thay thế bằng database thật)

### 3. State Management
- ✅ Custom hooks cho API calls
- ✅ Loading states
- ✅ Error states
- ✅ Optimistic updates
- ✅ Cache management

## Mở rộng

### 1. Thêm API endpoint mới

```tsx
// src/app/api/posts/route.ts
export async function GET() {
  // Implementation
}

export async function POST(request: NextRequest) {
  // Implementation
}
```

### 2. Thêm service mới

```tsx
// src/services/api.ts
export const postApi = {
  async getPosts() {
    // Implementation
  },
  async createPost(data: CreatePostData) {
    // Implementation
  }
};
```

### 3. Thêm hook mới

```tsx
// src/hooks/usePosts.ts
export const usePosts = () => {
  // Implementation
};
```

## Kết nối Database

Để kết nối với database thật, bạn có thể:

1. **Cài đặt database driver** (ví dụ: Prisma, Mongoose)
2. **Thay thế mock data** trong API routes
3. **Cấu hình environment variables**
4. **Thêm database migration**

Ví dụ với Prisma:

```bash
npm install prisma @prisma/client
npx prisma init
```

```tsx
// src/app/api/users/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ success: true, data: users });
}
```

## Testing

Bạn có thể test API bằng:

1. **Browser**: Truy cập trực tiếp `/api/users`
2. **Postman/Insomnia**: Import API endpoints
3. **Unit tests**: Test components và hooks
4. **Integration tests**: Test API routes

## Kết luận

Dự án đã được tích hợp hoàn chỉnh với API, cung cấp:
- Full CRUD operations
- Modern React patterns (hooks, TypeScript)
- Professional UI/UX
- Scalable architecture
- Error handling và loading states

Bạn có thể sử dụng code này làm foundation cho các dự án lớn hơn!
