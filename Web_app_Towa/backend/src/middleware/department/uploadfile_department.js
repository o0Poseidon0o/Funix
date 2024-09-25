// middleware/multer.js
const multer = require("multer");

// Sử dụng memory storage
const storage = multer.memoryStorage();

// Lọc file (chỉ chấp nhận các file Excel)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
