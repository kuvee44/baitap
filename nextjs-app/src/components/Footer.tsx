import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg mb-4">© 2024 Bài tập React Next.js</p>
        <p className="text-gray-400">Được tạo bởi sinh viên với Next.js và TypeScript</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
