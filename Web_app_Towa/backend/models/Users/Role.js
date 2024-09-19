const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Role = sequelize.define("tb_roles", {
  id_roles: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name_role: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports =Role;
