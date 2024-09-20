const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
  // Logic cho trang Manager
  res.json({ message: 'Welcome to the Manager page' });
});

module.exports = router;
