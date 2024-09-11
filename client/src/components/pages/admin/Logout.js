import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage
    sessionStorage.removeItem("dauth");

    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;
