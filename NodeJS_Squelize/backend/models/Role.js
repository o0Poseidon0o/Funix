const {DataTypes } = require('sequelize'); 
const sequelize=require('../database/database');

const Role=sequelize.define('Role',{
    id_role:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        
    },
    role_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'tb_roles',
    timestamps:false
}
);

module.exports=Role;