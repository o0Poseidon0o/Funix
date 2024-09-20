const {DataTypes } = require('sequelize'); 
const squelize=require('../database/database');
const Role =require('./Role');




const User=squelize.define('User',{
    id_user:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password_user:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_role:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Role,
            key:'id_role'
        }
    }
},{
    tableName:'tb_users',
    timestamps:false
})

User.belongsTo(Role,{foreignKey:'id_role'});

module.exports=User;