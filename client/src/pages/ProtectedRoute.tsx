import React from 'react';
import { useAuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (user) {
    return children;
  } else {
    return <Navigate to='/authentication' />;
  }
};

export default ProtectedRoute;
