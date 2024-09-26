// controllers/departmentController.js
const Departments = require('../../models/Departments/departments');
const {Op} = require('sequelize');
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

// Hàm xử lý tìm kiếm
const searchDepartments = async (req, res) => {
    try {
        const { name } = req.query; // Lấy tham số tìm kiếm từ query string

        if (!name) {
            return res.status(400).json({ message: "Vui lòng cung cấp tên phòng ban." });
        }

        // Tìm kiếm trong cơ sở dữ liệu
        const departments = await Departments.findAll({
            where: {
                department_name: {
                    [Op.like]: `%${name}%` // Tìm kiếm với chuỗi giống nhau
                }
            }
        });

        // Nếu không tìm thấy phòng ban nào
        if (departments.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy phòng ban nào." });
        }

        // Trả về danh sách các phòng ban tìm được
        res.status(200).json(departments);

    } catch (error) {
        
        res.status(500).json({ message: "Có lỗi xảy ra!", error });
    }
};


// Xóa phòng ban
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Nhận ID từ URL

        const department = await Departments.findByPk(id);

        if (!department) {
            return res.status(404).json({ message: "Không tìm thấy phòng ban!" });
        }

        await department.destroy(); // Xóa phòng ban

        res.json({ message: "Xóa phòng ban thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Có lỗi xảy ra!", error });
    }
};

// Sửa phòng ban
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Nhận ID từ URL
        const { department_name, department_content } = req.body; // Nhận thông tin cần sửa từ body

        const department = await Departments.findByPk(id);

        if (!department) {
            return res.status(404).json({ message: "Không tìm thấy phòng ban!" });
        }

        // Cập nhật thông tin phòng ban
        department.department_name = department_name || department.department_name;
        department.department_content = department_content || department.department_content;

        await department.save();

        res.json({ message: "Cập nhật phòng ban thành công!", department });
    } catch (error) {
        res.status(500).json({ message: "Có lỗi xảy ra!", error });
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

module.exports = { addDepartment,uploadDepartmentsFromExcel,searchDepartments,deleteDepartment,updateDepartment }; 
