import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowGuest = false }) => {
  const { isAuthenticated, isGuest } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isGuest && !allowGuest) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute; 