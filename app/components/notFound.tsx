import React from 'react';

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message = 'Asset not found' }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        {message}
      </div>
    </div>
  );
};

export default NotFound; 