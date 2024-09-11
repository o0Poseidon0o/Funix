// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      const { token, role } = response.data;
      
      // Lưu token vào localStorage hoặc sessionStorage
      localStorage.setItem('token', token);
      setRole(role);

      // Xử lý phân quyền theo role
      if (role === 'admin') {
        // Redirect to admin page
      } else if (role === 'user') {
        // Redirect to user page
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      {role && <p>Logged in as: {role}</p>}
    </div>
  );
};

export default Login;
