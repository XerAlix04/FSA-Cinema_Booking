import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Nếu không có token, chuyển hướng người dùng về trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép hiển thị component con (trang được bảo vệ)
  return children;
};

export default ProtectedRoute;