'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

export default function Home() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* Features Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Tính năng đã học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Tạo React Component với TypeScript</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span className="text-lg">Sử dụng useState Hook</span>
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
                <span className="text-lg">Styling với Tailwind CSS</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
