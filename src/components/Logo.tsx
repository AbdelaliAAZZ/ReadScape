import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  withText = true,
  className = '' 
}) => {
  // Define size dimensions
  const dimensions = {
    small: { container: 'w-7 h-7', inner: 'inset-1', text: 'text-lg' },
    medium: { container: 'w-8 h-8', inner: 'inset-1', text: 'text-xl' },
    large: { container: 'w-10 h-10', inner: 'inset-1.5', text: 'text-2xl' },
  };

  const { container, inner, text } = dimensions[size];

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <div className="flex items-center">
        <div className={`relative ${container} mr-2 overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg"></div>
          <div className={`absolute ${inner} bg-white dark:bg-gray-900 rounded-md flex items-center justify-center font-bold`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">R</span>
          </div>
        </div>
        {withText && (
          <span className={`font-bold ${text} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400`}>
            ReadScape
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo; 