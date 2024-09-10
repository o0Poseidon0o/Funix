const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Tên người dùng PostgreSQL
  host: '10.10.10.51', // Địa chỉ IP của máy chủ PostgreSQL
  database: 'datatowa', // Tên cơ sở dữ liệu
  password: 'P@ssw0rd', // Mật khẩu của PostgreSQL
  port: 5432, // Cổng kết nối PostgreSQL
});

module.exports = pool;