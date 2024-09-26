const Roles = require("../../models/Roles/modelRoles");
const { Op } = require("sequelize");

// add thêm Role
const addRoles = async (req, res) => {
  const { id_roles, name_role } = req.body;
  try {
    // Kiem tra cos thieu gia tri can thiet
    if (!id_roles || !name_role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // tao phan quyen
    const newRoles = await Roles.create({
      id_roles,
      name_role,
    });
    // Tra ve phan hoi thanh cong
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

    const roles = await Roles.findByPk(id);

    if (!roles) {
      return res.status(404).json({ message: "Không tìm thấy phòng ban!" });
    }

    await roles.destroy(); // Xóa role

    res.json({ message: "Xóa phòng ban thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};

// Sửa Role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params; // Nhận ID từ URL
    const { name_role } = req.body; // Nhận thông tin cần sửa từ body

    const Role = await Roles.findByPk(id);

    if (!Role) {
      return res.status(404).json({ message: "Không tìm thấy phòng ban!" });
    }

    // Cập nhật thông tin phòng ban
    Role.name_role = name_role || Roles.name_role;

    await Role.save();

    res.json({ message: "Cập nhật phòng ban thành công!", department });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};

// tìm kiếm role
const searchRole = async (req, res) => {
  try {
    const { name } = req.query; // Lấy tham số tìm kiếm từ query string

    if (!name) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp tên phòng ban." });
    }

    // Tìm kiếm trong cơ sở dữ liệu
    const departments = await Departments.findAll({
      where: {
        department_name: {
          [Op.like]: `%${name}%`, // Tìm kiếm với chuỗi giống nhau
        },
      },
    });

    // Nếu không tìm thấy phòng ban nào
    if (departments.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy phòng ban nào." });
    }

    // Trả về danh sách các phòng ban tìm được
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error });
  }
};

module.exports = { addRoles, deleteRole, updateRole, searchRole };
