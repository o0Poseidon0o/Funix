const express = require('express');
const router = express.Router();
const departmentController=require('../../controllers/departmentController/adddepartmentController');
const upload =require('../../middleware/department/uploadfile_department')

// router thêm phòng ban cái này để đưa đến server.js để RestAPI được lấy ở controller
router.post('/add',departmentController.addDepartment);
router.post('/upload/:fieldName', (req, res, next) => {
    const fieldName = req.params.fieldName; // Lấy tên trường từ URL
    upload.single(fieldName)(req, res, next); // Gọi middleware multer với tên trường tùy biến
}, departmentController.uploadDepartmentsFromExcel);

module.exports=router;