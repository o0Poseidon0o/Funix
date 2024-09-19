const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Role = require('../../models/Users/Role');
; //Kết nối với Role.js trong Models có bảng tb_roles

const User = sequelize.define("tb_users", {
  id_users: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_departments: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_roles: {
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key: "id_roles",
    },
  },
});

User.belongsTo(Role, { foreignKey: "id_roles", as: "role" });
module.exports=Role; // export ra ngoài để dùng bên thư mục controllers đây là thư mục chức năng.
