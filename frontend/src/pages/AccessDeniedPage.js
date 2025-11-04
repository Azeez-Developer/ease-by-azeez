// src/pages/AccessDeniedPage.js
import React from 'react';
import './AccessDeniedPage.css';

const AccessDeniedPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="access-denied text-center">
      <h1>403 - Access Denied</h1>
      <p>
        {user.name
          ? `Sorry, ${user.name}. You do not have permission to view this page.`
          : `You do not have permission to view this page.`}
      </p>
      <a href="/" className="btn-home">Go Back Home</a>
    </div>
  );
};

export default AccessDeniedPage;
