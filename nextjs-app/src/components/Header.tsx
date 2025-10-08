import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-blue-600 text-white py-8 px-4 text-center">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-xl opacity-90">{subtitle}</p>}
    </header>
  );
};

export default Header;
