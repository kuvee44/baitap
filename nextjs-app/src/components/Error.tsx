import React from 'react';
import Button from './Button';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
}

const Error: React.FC<ErrorProps> = ({ 
  message = 'Đã xảy ra lỗi', 
  onRetry, 
  className = '',
  variant = 'error'
}) => {
  const variantClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconClasses = {
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  };

  return (
    <div className={`rounded-lg border p-6 ${variantClasses[variant]} ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${iconClasses[variant]}`}>
          {variant === 'error' && (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {variant === 'warning' && (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
          {variant === 'info' && (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">
            {variant === 'error' && 'Có lỗi xảy ra'}
            {variant === 'warning' && 'Cảnh báo'}
            {variant === 'info' && 'Thông báo'}
          </h3>
          <p className="mt-1">{message}</p>
        </div>
      </div>
      
      {onRetry && (
        <div className="mt-4">
          <Button onClick={onRetry} variant="primary" size="sm">
            Thử lại
          </Button>
        </div>
      )}
    </div>
  );
};

export default Error;
