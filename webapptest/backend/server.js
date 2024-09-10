const express = require('express');
const cors = require('cors'); // Import cors
const pool = require('./database/database'); // Đảm bảo đường dẫn đúng
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Sử dụng middleware cors để cho phép tất cả các nguồn gốc gửi yêu cầu
app.use(cors());

// Sử dụng middleware express.json() để phân tích JSON request body
app.use(express.json());

// Đăng ký người dùng
app.post('/register', async (req, res) => {
    console.log('Request body:', req.body); // Thêm dòng này để debug
  const { username, password } = req.body;

  try {
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thực hiện truy vấn để thêm người dùng vào cơ sở dữ liệu
    const result = await pool.query(
      'INSERT INTO users (username, password_user) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    // Trả về thông tin người dùng vừa được tạo
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error:', err); // Thêm dòng này để debug
    // Xử lý lỗi nếu có
    res.status(500).json({ error: err.message });
  }
});

// Đăng nhập người dùng
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu dựa trên tên người dùng
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    // Kiểm tra mật khẩu và tạo JWT token nếu đăng nhập thành công
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    // Xử lý lỗi nếu có
    res.status(500).json({ error: err.message });
  }
});

// Khởi động server trên cổng 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
