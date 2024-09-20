import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [id_user, setIdUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password_user, setPasswordUser] = useState('');
  const [id_role, setIdRole] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Kiểm tra xem các trường có rỗng không
    if (!id_user || !username || !email || !password_user || !id_role) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/addUser', {
        id_user,
        username,
        email,
        password_user, // Đảm bảo tên trường khớp với backend
        id_role
      });

      alert(response.data.message);
      // Reset form sau khi thêm thành công
      setIdUser('');
      setUsername('');
      setEmail('');
      setPasswordUser('');
      setIdRole('');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user: ' + error.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleAddUser}>
        <input 
          type="text" 
          placeholder="User ID" 
          value={id_user} 
          onChange={(e) => setIdUser(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password_user} 
          onChange={(e) => setPasswordUser(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Role ID" 
          value={id_role} 
          onChange={(e) => setIdRole(e.target.value)} 
          required 
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AdminPage;
