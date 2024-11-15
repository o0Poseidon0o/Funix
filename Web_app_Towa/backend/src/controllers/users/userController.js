const User = require("../../models/Users/User");
const Department = require("../../models/Departments/departments"); // Đảm bảo import mô hình Department
const Role = require("../../models/Roles/modelRoles"); // Đảm bảo import mô hình Role
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// Thêm người dùng
const addUser = async (req, res) => {
  const { id_users, username, email_user, password_user, id_departments, id_roles } = req.body;
  const avatar = req.file ? `/upload/avatars/${req.file.filename}` : null; // Lấy đường dẫn của avatar

  try {
    // Kiểm tra giá trị đầu vào
    console.log("Request body:", req.body); // In toàn bộ thông tin từ body
    console.log("Avatar file:", req.file); // In thông tin file upload (nếu có)
    // Kiểm tra giá trị của id_users
    if (!id_users) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Kiểm tra xem ID đã tồn tại hay chưa
    const existingUser = await User.findOne({ where: { id_users } });
    if (existingUser) {
      return res.status(400).json({ message: 'User ID already exists.' });
    }

    // Kiểm tra định dạng ID
    if (!Number.isInteger(Number(id_users)) || Number(id_users) <= 0) {
      return res.status(400).json({ message: 'Invalid user ID. ID must be a positive integer.' });
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_user)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password_user, 10);

    // Kiểm tra tồn tại bộ phận và vai trò
    const departmentExists = await Department.findOne({ where: { id_departments } });
    const roleExists = await Role.findOne({ where: { id_roles } });

    if (!departmentExists) {
      return res.status(400).json({ message: 'Invalid department ID.' });
    }
    if (!roleExists) {
      return res.status(400).json({ message: 'Invalid role ID.' });
    }

    // Thêm người dùng
    const newUser = await User.create({
      id_users, // ID nhập vào
      avatar,
      username,
      email_user,
      password_user: hashedPassword, // Sử dụng mật khẩu đã mã hóa
      id_departments,
      id_roles,
    });
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
};


module.exports = { addUser };



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
