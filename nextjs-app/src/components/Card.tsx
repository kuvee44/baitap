import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
