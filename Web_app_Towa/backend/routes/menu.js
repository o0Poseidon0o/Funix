const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
import pool from '../config/database';


// Route để lấy dữ liệu menu
router.get('/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tb_menu');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching menu data:', error.message); // Log thêm chi tiết lỗi
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
