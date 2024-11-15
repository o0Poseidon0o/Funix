const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const path = require('path');

// Khởi tạo Express
const app = express();
const port = 3000;

// Cấu hình Multer để lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/avatars'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file
    }
});
const upload = multer({ storage: storage });

// Khởi tạo kết nối tới PostgreSQL
const pool = new Pool({
    user: 'postgres',  // Thay đổi với username của bạn
    host: '10.10.10.51',
    database: 'datatowa', // Tên cơ sở dữ liệu của bạn
    password: 'P@ssw0rd', // Thay đổi với password của bạn
    port: 5432,
});

// Endpoint upload ảnh
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { filename, path: filePath } = req.file;

        // Lưu thông tin ảnh vào PostgreSQL
        const result = await pool.query(
            'INSERT INTO images (filename, path, create_at) VALUES ($1, $2, NOW()) RETURNING *',
            [filename, filePath]
        );

        res.json({
            success: true,
            message: 'Image uploaded successfully!',
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to upload image.' });
    }
});


// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
