const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Role = sequelize.define(
  "Role",
  {
    id_roles: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name_role: {
      type: DataTypes.INTEGER,
      name_role: DataTypes.STRING,
    },
  },
  {
    tableName: "tb_roles",
    timestamps: false,
  }
);

module.exports = Role;
