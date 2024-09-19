import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = ({ element, roles, ...rest }) => {
  const token = localStorage.getItem('token');

  // Giải mã token để lấy role nếu token tồn tại
  let userRole = '';
  if (token) {
    const decodedToken = jwtDecode(token); // Giải mã token
    userRole = decodedToken.role; // Lấy role từ payload của token
  }

  return (
    <Route
      {...rest}
      element={
        token && roles.includes(userRole)
          ? element
          : <Navigate to="/" />
      }
    />
  );
};

export default PrivateRoute;
