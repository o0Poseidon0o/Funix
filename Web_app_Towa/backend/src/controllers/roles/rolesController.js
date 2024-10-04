const Roles = require("../../models/Roles/modelRoles");
const { Op } = require("sequelize");

// Hiển thị tất cả Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll(); // Lấy tất cả các Roles từ cơ sở dữ liệu

    if (roles.length === 0) {
      return res.status(404).json({ message: "Không có Role nào." });
    }

    res.status(200).json(roles); // Trả về danh sách Roles
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};
// Thêm Role
const addRoles = async (req, res) => {
  const { id_roles, name_role } = req.body;
  try {
    if (!id_roles || !name_role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRoles = await Roles.create({
      id_roles,
      name_role,
    });

    return res
      .status(201)
      .json({ message: "Roles created successfully", roles: newRoles });
  } catch (error) {
    return res.status(500).json({ message: "Error creating roles", error });
  }
};

// Xóa Role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params; // Nhận ID từ URL
    const role = await Roles.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Không tìm thấy Role!" });
    }

    await role.destroy(); // Xóa role

    res.json({ message: "Xóa Role thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};
// Sửa Role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params; // Nhận ID từ URL
    const { name_role } = req.body; // Nhận thông tin cần sửa từ body

    const role = await Roles.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Không tìm thấy Role!" });
    }

    // Cập nhật thông tin role
    role.name_role = name_role || role.name_role;
    await role.save();

    res.json({ message: "Cập nhật Role thành công!", role });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};

// Tìm kiếm Role
const searchRole = async (req, res) => {
  try {
    const { name } = req.query; // Lấy tham số tìm kiếm từ query string

    if (!name) {
      return res.status(400).json({ message: "Vui lòng cung cấp tên Role." });
    }

    // Tìm kiếm trong cơ sở dữ liệu
    const roles = await Roles.findAll({
      where: {
        name_role: {
          [Op.like]: `%${name}%`, // Tìm kiếm với chuỗi giống nhau
        },
      },
    });

    // Nếu không tìm thấy Role nào
    if (roles.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy Role nào." });
    }

    // Trả về danh sách các Role tìm được
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};

module.exports = { addRoles, deleteRole, updateRole, searchRole, getAllRoles };
