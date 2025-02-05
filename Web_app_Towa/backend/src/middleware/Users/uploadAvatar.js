const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Thiết lập nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/avtars');
    fs.mkdirSync(uploadPath, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Sử dụng id_users làm tên file, nếu có trong body request
    const fileExtension = path.extname(file.originalname); // Lấy phần mở rộng của file
    const filename = `${req.body.id_users}${fileExtension}`; // Đổi tên file theo id_users
    cb(null, filename); // Gửi tên file mới
  },
});

// Kiểm tra loại file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Giới hạn dung lượng file tải lên (ví dụ 5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
