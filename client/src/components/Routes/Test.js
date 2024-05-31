import React, { useEffect } from 'react';
import { useAuth } from '../context/Auth';

const Test = () => {
  // You can useTailwind CSS classes directly within your JSX

  return (
<div className="flex items-center justify-center bg-gray-200 min-h-screen responsive-container">
  <div className="p-8 rounded shadow-lg bg-red-500 text-white shadow-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
    <h1 className="text-2xl font-bold mb-4">Page not found</h1>
    <p className="text-white">Sorry, the page you are looking for does not exist.</p>
  </div>
</div>

  );
};

export default Test;
