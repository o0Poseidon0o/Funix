const multer = require('multer');
const path = require('path');

// Thiết lập nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../upload/avatars');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Tạo middleware upload
const uploadavatar = multer({ storage: storage });

module.exports = uploadavatar;
