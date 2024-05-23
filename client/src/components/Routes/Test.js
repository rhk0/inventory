import React, { useEffect } from 'react';
import { useAuth } from '../context/Auth';

const Test = () => {
  // You can useTailwind CSS classes directly within your JSX

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-700">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default Test;
