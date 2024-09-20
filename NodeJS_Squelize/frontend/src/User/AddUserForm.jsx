import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [id_user, setIdUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [plainPassword, setPlainPassword] = useState('');
  const [id_role, setIdRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/addUser', {
        id_user,
        username,
        email,
        plainPassword,
        id_role
      });
      alert(response.data.message);
    } catch (error) {
      alert('Failed to add user: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="ID User" value={id_user} onChange={(e) => setIdUser(e.target.value)} required />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={plainPassword} onChange={(e) => setPlainPassword(e.target.value)} required />
      <input type="text" placeholder="Role ID" value={id_role} onChange={(e) => setIdRole(e.target.value)} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
