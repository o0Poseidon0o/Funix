const express =require('express');
const router=express.Router();
const roles = require('../../controllers/roles/rolesController');


router.post('/add',roles.addRoles);

module.exports=router;