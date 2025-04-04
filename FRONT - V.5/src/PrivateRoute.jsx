import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './IsAuthenticated.jsx';

function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/Login" replace />;
  }
  return children;
}

export default PrivateRoute;