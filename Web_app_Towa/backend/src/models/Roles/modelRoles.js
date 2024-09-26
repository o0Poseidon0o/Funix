const {DataTypes}=require('sequelize');
const squelize = require('../../config/database');


const Roles =squelize.define('Roles',{
    id_roles:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    name_role:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'tb_roles',
    timestamps:false
})
module.exports= Roles;