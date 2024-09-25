// controllers/departmentController.js
const Departments = require('../../models/Departments/departments');
const XLSX = require('xlsx');

const addDepartment = async (req, res) => {
    const { id_departments, department_name, department_content } = req.body;

    try {
        // Kiểm tra nếu thiếu các giá trị cần thiết
        if (!id_departments || !department_name || !department_content) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Tạo phòng ban mới
        const newDepartment = await Departments.create({
            id_departments,
            department_name,
            department_content
        });

        // Trả về phản hồi thành công
        return res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating department', error });
    }
};
// Hàm xử lý upload file Excel
const uploadDepartmentsFromExcel = async (req, res) => {
    try {
        // Đảm bảo file đã được upload
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Đọc file Excel từ bộ nhớ
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Lặp qua từng dòng dữ liệu và thêm vào database
        for (const row of sheet) {
            const { id_departments, department_name, department_content } = row;

            // Kiểm tra xem có đầy đủ dữ liệu không
            if (!id_departments || !department_name || !department_content) {
                return res.status(400).json({ message: 'Invalid data in Excel file' });
            }

            // Tạo phòng ban mới
            await Departments.create({
                id_departments,
                department_name,
                department_content
            });
        }

        // Phản hồi thành công
        return res.status(201).json({ message: 'Departments added successfully from Excel' });
    } catch (error) {
        return res.status(500).json({ message: 'Error processing Excel file', error });
    }
};

module.exports = { addDepartment,uploadDepartmentsFromExcel }; 
