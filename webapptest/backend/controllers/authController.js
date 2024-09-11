// Import các module cần thiết
const pool = require('../database/database'); // Kết nối đến cơ sở dữ liệu PostgreSQL
const bcrypt = require('bcryptjs'); // Thư viện để mã hóa và kiểm tra mật khẩu
const jwt = require('jsonwebtoken'); // Thư viện để tạo JSON Web Token (JWT) cho việc xác thực

// Hàm login xử lý yêu cầu đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body; // Lấy dữ liệu từ body của request (username và password)

  try {
    // Truy vấn cơ sở dữ liệu để lấy thông tin người dùng và vai trò của họ
    const userResult = await pool.query(
      `SELECT u.id, u.password_user, r.name_role FROM users u 
       JOIN tb_role1 r ON u.id_role = r.id_role WHERE u.username = $1`,
      [username]
    );
    
    // Kiểm tra xem người dùng có tồn tại không
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' }); // Trả về lỗi nếu không tìm thấy người dùng
    }

    const user = userResult.rows[0]; // Lấy thông tin người dùng đầu tiên (vì truy vấn chỉ trả về 1 dòng)

    // So sánh mật khẩu từ yêu cầu với mật khẩu đã được mã hóa trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password_user);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Trả về lỗi nếu mật khẩu không khớp
    }

    // Nếu mật khẩu đúng, tạo JWT để xác thực
    const token = jwt.sign(
      { id: user.id, role: user.name_role }, // Payload chứa thông tin id và vai trò của người dùng
      'your_jwt_secret', // Khóa bí mật để mã hóa token (thay bằng chuỗi bảo mật của bạn)
      { expiresIn: '1h' } // Thời gian hết hạn của token là 1 giờ
    );

    // Trả về token và vai trò của người dùng cho front-end
    return res.json({ token, role: user.name_role });
  } catch (err) {
    // Xử lý nếu có lỗi trong quá trình thực hiện
    console.error(err);
    return res.status(500).json({ message: 'Server error' }); // Trả về lỗi máy chủ
  }
};

// Xuất hàm login để sử dụng trong các route
module.exports = { login };

// pool.query:

// Đây là phương thức để thực hiện truy vấn SQL tới cơ sở dữ liệu PostgreSQL. Trong trường hợp này, câu truy vấn tìm kiếm người dùng dựa trên username và trả về id, password_user, và name_role từ bảng users và tb_role1.
// Kiểm tra người dùng có tồn tại:

// Nếu userResult.rows.length === 0, điều đó có nghĩa là không tìm thấy người dùng có username tương ứng, và một lỗi với mã trạng thái 404 sẽ được trả về (User not found).
// Mã hóa và so sánh mật khẩu:

// Sử dụng bcrypt.compare để so sánh mật khẩu đã được mã hóa (lưu trong cơ sở dữ liệu) với mật khẩu do người dùng cung cấp trong yêu cầu đăng nhập. Nếu mật khẩu không khớp, trả về mã trạng thái 400 (Invalid credentials).
// Tạo JWT:

// Khi người dùng cung cấp đúng thông tin đăng nhập, sử dụng jwt.sign để tạo ra một token chứa id và role của người dùng. Token này sẽ được sử dụng để xác thực các yêu cầu tiếp theo từ người dùng.
// Token có thời gian hết hạn là 1 giờ (expiresIn: '1h').
// Trả về token và vai trò:

// Trả về một đối tượng JSON chứa token và role của người dùng để front-end có thể lưu trữ và sử dụng cho các yêu cầu tiếp theo.
// Xử lý lỗi:

// Nếu có lỗi xảy ra trong quá trình thực hiện, ví dụ như lỗi kết nối cơ sở dữ liệu, thông báo lỗi với mã trạng thái 500 (Server error) sẽ được trả về.