import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Your custom hook

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // User is logged in, render the component
  return children;
};

export default ProtectedRoute;