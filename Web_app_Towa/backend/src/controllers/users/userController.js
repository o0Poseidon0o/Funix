const User = require("../../models/Users/User");
const Department = require("../../models/Departments/departments");
const Role = require("../../models/Roles/modelRoles");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// Thêm người dùng
const addUser = async (req, res) => {
  const { id_users, username, email_user, password_user, id_departments, id_roles } = req.body;
   // Kiểm tra nếu có file ảnh, nếu có lưu đường dẫn vào CSDL
   const avatar = req.file ? `../../uploads/avatars/${req.file.filename}` : '../../uploads/avatars/default.jpg';

  try {
    // Kiểm tra các giá trị đầu vào
    if (!id_users || !username || !email_user || !password_user || !id_departments || !id_roles) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Kiểm tra giá trị của id_users
    if (!Number.isInteger(Number(id_users)) || Number(id_users) <= 0) {
      return res.status(400).json({ message: "Invalid user ID. ID must be a positive integer." });
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_user)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Kiểm tra xem ID đã tồn tại hay chưa
    const existingUser = await User.findOne({ where: { id_users } });
    if (existingUser) {
      return res.status(400).json({ message: "User ID already exists." });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password_user, 10);

    // Kiểm tra tồn tại bộ phận và vai trò
    const departmentExists = await Department.findOne({ where: { id_departments } });
    const roleExists = await Role.findOne({ where: { id_roles } });

    if (!departmentExists) {
      return res.status(400).json({ message: "Invalid department ID." });
    }
    if (!roleExists) {
      return res.status(400).json({ message: "Invalid role ID." });
    }

    // Thêm người dùng
    const newUser = await User.create({
      id_users,
      avatar,
      username,
      email_user,
      password_user: hashedPassword,
      id_departments,
      id_roles,
    });

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
};

// Sửa người dùng
const updateUser = async (req, res) => {
  const { id_users } = req.params;
  const { username, email_user, password_user, id_departments, id_roles } = req.body;
  const avatar = req.file ? `/uploads${req.file.filename}` : null;

  try {
    const user = await User.findByPk(id_users);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mã hóa mật khẩu nếu có thay đổi
    const hashedPassword = password_user ? await bcrypt.hash(password_user, 10) : user.password_user;

    await user.update({
      avatar: avatar || user.avatar,
      username: username || user.username,
      email_user: email_user || user.email_user,
      password_user: hashedPassword,
      id_departments: id_departments || user.id_departments,
      id_roles: id_roles || user.id_roles,
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { id_users } = req.params;

  try {
    const user = await User.findByPk(id_users);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Tìm kiếm người dùng
const searchUsers = async (req, res) => {
  const { username, email_user } = req.query;

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          username && { username: { [Op.like]: `%${username}%` } },
          email_user && { email_user: { [Op.like]: `%${email_user}%` } },
        ].filter(Boolean),
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Error searching users", error: error.message });
  }
};
// Lấy tất cả thông tin người dùng
const getAllUser = async (req, res) => {
  try {
    // Lấy tất cả người dùng cùng thông tin bộ phận và vai trò
    const users = await User.findAll({
      include: [
        { model: Department, attributes: ['department_name'], as: 'Department' }, // Alias cho Department
        { model: Role, attributes: ['name_role'], as: 'Role' } // Alias cho Role, sửa 'role_name' thành 'name_role'
      ]
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Trả về thông tin tất cả người dùng
    res.status(200).json({
      message: "Users information retrieved successfully",
      users: users.map(user => ({
        id_users: user.id_users,
        username: user.username,
        email_user: user.email_user,
        avatar: user.avatar,
        department_name: user.Department ? user.Department.department_name : "No department",
        role_name: user.Role ? user.Role.name_role : "No role" // Sử dụng 'name_role' để lấy tên vai trò
      }))
    });
  } catch (error) {
    console.error("Error retrieving user info:", error);
    res.status(500).json({ message: "Error retrieving user info", error: error.message });
  }
};





module.exports = {
  addUser,
  updateUser,
  deleteUser,
  searchUsers,
  getAllUser,
};
