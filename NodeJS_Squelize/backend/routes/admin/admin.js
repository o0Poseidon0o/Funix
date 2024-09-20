const express = require('express');
const router = express.Router();

// Middleware để kiểm tra quyền truy cập
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
  // Logic cho trang Admin
  res.json({ message: 'Welcome to the Admin page' });
});

module.exports = router;
