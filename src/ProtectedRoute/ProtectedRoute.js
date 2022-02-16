import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { persistedState } from '../helpers';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = persistedState('token');

  return isAuthenticated? children: <Navigate to="/login" replace state={{ path: location.pathname }}/>;
}

export default ProtectedRoute;