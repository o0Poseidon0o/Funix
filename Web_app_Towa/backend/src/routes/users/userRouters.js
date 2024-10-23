const express = require('express');
const router = express.Router();
const user = require('../../controllers/users/userController')



router.post ('/add',user.addUser)

module.exports = router;
