const {DataTypes} = require('sequelize');
const squelize = require('../../config/database');
const Roles = require('../Roles/modelRoles')// Do co khoa ngoai o bang Role
const Departments= require('../Departments/departments') // Co khoa ngoai o bang departments

const User=squelize.define('User',{
  id_users:{
    type:DataTypes.INTEGER,
    primaryKey:true,
  },
  username:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email_user:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password_user:{
    type:DataTypes.STRING,
    allowNull:false
  },
  id_departments:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:Departments,
      key:'id_departments'
    }
  },
  id_role:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:Role,
      key:'id_roles'
    }
  }
},{
  tableName:'tb_users',
  timestamps:false
})

User.belongsTo (Roles,{foreignKey:'id_roles'});
User.belongsTo(Departments,{foreignKey:'id_departments'})
module.exports=User;