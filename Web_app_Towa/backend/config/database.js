// backend/models/index.js
const { Sequelize } = require('sequelize');

// Tạo kết nối với PostgreSQL
const sequelize = new Sequelize('datatowa', 'postgres', 'P@ssw0rd', {
  host: '10.10.10.51',
  dialect: 'postgres',
});


module.exports =sequelize;
