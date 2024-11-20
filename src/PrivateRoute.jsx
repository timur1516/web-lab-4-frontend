import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('isLoggedIn');

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoute;