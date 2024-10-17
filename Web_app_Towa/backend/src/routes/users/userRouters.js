const express = require('express');
const router = express.Router();
const user = require('../../controllers/users/userController')
const uploadavatar= require('../../middleware/Users/uploadAvatar')


router.post ('/add',uploadavatar.single('avatar'),user.addUser)

module.exports = router;
