import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {message}
      </div>
    </div>
  );
};

export default Error; 