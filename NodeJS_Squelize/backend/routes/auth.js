const express = require('express');
const { login } = require('../controller/authController');
const router = express.Router();

// Route để đăng nhập
router.post('/login', login);

module.exports = router;
