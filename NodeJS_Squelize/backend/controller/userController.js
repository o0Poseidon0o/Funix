const bcrypt = require('bcrypt');
const User = require('../models/User');

// Hàm thêm người dùng
async function addUser(req, res) {
  
  const { id_user, username, email, password_user, id_role } = req.body;

  if (!id_user || !username || !email || !password_user || !id_role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password_user, 10);
    await User.create({ 
      id_user, 
      username, 
      email, 
      password_user: hashedPassword, 
      id_role: id_role 
    });
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
}

module.exports = { addUser };
