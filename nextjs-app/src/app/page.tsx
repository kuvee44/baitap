'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal';
import Form from '@/components/Form';
import Accordion from '@/components/Accordion';
import Table from '@/components/Table';
import UserTable from '@/components/UserTable';
import Dashboard from '@/components/Dashboard';
import AdvancedSearch from '@/components/AdvancedSearch';

export default function Home() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Sample data for accordion
  const accordionItems = [
    {
      id: '1',
      title: 'React là gì?',
      content: 'React là một thư viện JavaScript để xây dựng giao diện người dùng, đặc biệt là cho các ứng dụng web. React được phát triển bởi Facebook và hiện tại được sử dụng rộng rãi trong việc phát triển frontend.'
    },
    {
      id: '2',
      title: 'Next.js là gì?',
      content: 'Next.js là một framework React mạnh mẽ cung cấp các tính năng như Server-Side Rendering (SSR), Static Site Generation (SSG), API routes, và nhiều tối ưu hóa khác để xây dựng ứng dụng web hiện đại.'
    },
    {
      id: '3',
      title: 'TypeScript có lợi ích gì?',
      content: 'TypeScript cung cấp kiểu dữ liệu tĩnh cho JavaScript, giúp phát hiện lỗi sớm hơn, cải thiện khả năng đọc code, và cung cấp IntelliSense tốt hơn trong các IDE.'
    }
  ];

  // Sample data for table
  const tableColumns = [
    { key: 'id', title: 'ID', width: '10%' },
    { key: 'name', title: 'Tên', width: '30%' },
    { key: 'email', title: 'Email', width: '40%' },
    { key: 'role', title: 'Vai trò', width: '20%' }
  ];

  const tableData = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Admin' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'User' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', role: 'Moderator' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', role: 'User' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Header 
        title="Bài tập React Next.js" 
        subtitle="Học cách tạo component và sử dụng state" 
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Counter Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Counter Component</h2>
            <div className="text-6xl font-bold text-blue-600 mb-8">{count}</div>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleDecrement} variant="danger" size="lg">
                Giảm
              </Button>
              <Button onClick={handleReset} variant="secondary" size="lg">
                Reset
              </Button>
              <Button onClick={handleIncrement} variant="primary" size="lg">
                Tăng
              </Button>
            </div>
            <div className="mt-6">
              <Button onClick={handleOpenModal} variant="primary" size="md">
                Mở Modal Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Các Component Mẫu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="React Component"
              description="Học cách tạo và sử dụng React component với TypeScript và props."
              image="https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=React"
            />
            <Card
              title="Next.js Framework"
              description="Sử dụng Next.js để xây dựng ứng dụng React với routing và SSR."
              image="https://via.placeholder.com/300x200/059669/FFFFFF?text=Next.js"
            />
            <Card
              title="Tailwind CSS"
              description="Styling component với Tailwind CSS để tạo giao diện đẹp và responsive."
              image="https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Tailwind"
            />
          </div>
        </section>

        {/* Accordion Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Câu hỏi thường gặp</h2>
            <Accordion items={accordionItems} allowMultiple={true} />
          </div>
        </section>

        {/* Dashboard */}
        <section className="mb-12">
          <Dashboard />
        </section>

        {/* Advanced Search */}
        <section className="mb-12">
          <AdvancedSearch 
            onSearch={(filters) => {
              console.log('Search filters:', filters);
              // Implement search logic here
            }}
            onReset={() => {
              console.log('Reset search');
              // Implement reset logic here
            }}
          />
        </section>

        {/* API Integration Demo */}
        <section className="mb-12">
          <UserTable />
        </section>

        {/* Static Table Section (for comparison) */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Dữ liệu tĩnh (để so sánh)</h2>
            <p className="text-gray-600 text-center mb-6">Click vào hàng để xem chi tiết</p>
            <Table 
              columns={tableColumns} 
              data={tableData} 
              onRowClick={handleUserClick}
            />
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Form liên hệ</h2>
            <div className="max-w-2xl mx-auto">
              <Form />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Tính năng đã học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">React Component với TypeScript</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">useState Hook</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Props và Interface</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Modal Component</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Form Handling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Accordion Component</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Data Table</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">API Integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">CRUD Operations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Loading States</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Error Handling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Responsive Design</span>
              </div>
            </div>
        </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedUser ? `Chi tiết người dùng: ${selectedUser.name}` : "Modal Demo"}
        size="md"
      >
        {selectedUser ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID:</label>
              <p className="text-lg">{selectedUser.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên:</label>
              <p className="text-lg">{selectedUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <p className="text-lg">{selectedUser.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vai trò:</label>
              <p className="text-lg">{selectedUser.role}</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Chào mừng đến với Modal Demo!</h3>
            <p className="text-gray-600">
              Đây là một Modal component được tạo bằng React và TypeScript.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Counter hiện tại:</strong> {count}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
