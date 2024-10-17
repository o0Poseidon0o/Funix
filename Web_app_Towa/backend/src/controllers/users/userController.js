const User = require ("../../models/Users/User")
const { Op } = require('sequelize');

// Thêm người dùng
const addUser = async (req, res) => {
  const { id_users, username, email_user, password_user, id_departments, id_roles } = req.body;
  const avatar = req.file ? `/upload/avatars/${req.file.filename}` : null; // Lấy đường dẫn của avatar

  try {
    // Kiểm tra xem ID đã tồn tại hay chưa
    const existingUser = await User.findOne({ where: { id_users } });
    if (existingUser) {
      return res.status(400).json({ message: 'User ID already exists.' });
    }

    // Kiểm tra định dạng ID
    if (!Number.isInteger(Number(id_users)) || Number(id_users) <= 0) {
      return res.status(400).json({ message: 'Invalid user ID. ID must be a positive integer.' });
    }

    // Thêm người dùng
    const newUser = await User.create({
      id_users, // ID nhập vào
      avatar,
      username,
      email_user,
      password_user,
      id_departments,
      id_roles,
    });
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Sửa người dùng
const updateUser = async (req, res) => {
  const { id_users } = req.params;
  const { avatar, username, email_user, password_user, id_departments, id_role } = req.body;

  try {
    const user = await User.findByPk(id_users);
    if (user) {
      await user.update({
        avatar,
        username,
        email_user,
        password_user,
        id_departments,
        id_role,
      });
      res.status(200).json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { id_users } = req.params;

  try {
    const user = await User.findByPk(id_users);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Tìm kiếm người dùng
const searchUsers = async (req, res) => {
  const { username, email_user } = req.query;

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${username}%` } },
          { email_user: { [Op.like]: `%${email_user}%` } },
        ],
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  searchUsers,
};
