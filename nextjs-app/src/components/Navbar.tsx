'use client';

import React, { useState } from 'react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ReactApp</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trang chủ
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Giới thiệu
            </a>
            <a href="#components" className="text-gray-700 hover:text-blue-600 transition-colors">
              Components
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Liên hệ
            </a>
            <Button variant="primary" size="sm">
              Đăng nhập
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                Trang chủ
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                Giới thiệu
              </a>
              <a href="#components" className="text-gray-700 hover:text-blue-600 transition-colors">
                Components
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Liên hệ
              </a>
              <Button variant="primary" size="sm" className="w-full">
                Đăng nhập
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
