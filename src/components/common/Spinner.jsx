import React from 'react';

export const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };
  const colorClasses = { primary: 'border-primary', white: 'border-white' };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
    </div>
  );
};