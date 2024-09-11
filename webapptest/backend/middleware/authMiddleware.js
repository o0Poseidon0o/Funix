// Import module jsonwebtoken để xử lý JWT (JSON Web Token)
const jwt = require('jsonwebtoken');

// Tạo middleware kiểm tra phân quyền, nhận tham số là role (vai trò người dùng cần phải có)
const authMiddleware = (role) => (req, res, next) => {
  // Lấy token từ header Authorization của request và loại bỏ phần 'Bearer ' khỏi chuỗi token
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    // Giải mã token và kiểm tra tính hợp lệ của nó bằng cách sử dụng khóa bí mật 'your_jwt_secret'
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Kiểm tra vai trò của người dùng trong token có khớp với vai trò yêu cầu không
    if (decoded.role !== role) {
      // Nếu vai trò không khớp, trả về mã lỗi 403 (Forbidden) với thông báo "Access denied"
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Nếu vai trò hợp lệ, gọi next() để tiếp tục xử lý yêu cầu
    next();
  } catch (err) {
    // Nếu token không hợp lệ hoặc xảy ra lỗi khi giải mã, trả về mã lỗi 401 (Unauthorized)
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Xuất module authMiddleware để sử dụng trong các route khác
module.exports = authMiddleware;

// const jwt = require('jsonwebtoken');

// Đây là dòng lệnh import thư viện jsonwebtoken để sử dụng các chức năng liên quan đến JWT. JWT là một chuỗi ký tự mã hóa dùng để xác thực giữa client và server mà không cần lưu trữ trạng thái trên server.
// const authMiddleware = (role) => (req, res, next) => {:

// Đây là một hàm middleware cho phép kiểm tra JWT và phân quyền người dùng dựa trên vai trò (role). Middleware nhận một tham số là role, nghĩa là chỉ cho phép người dùng có vai trò tương ứng được truy cập vào route.
// const token = req.header('Authorization').replace('Bearer ', '');:

// Lấy JWT từ header của yêu cầu HTTP (Authorization header). JWT thường được gửi với định dạng Bearer token, vì vậy, chúng ta dùng replace('Bearer ', '') để loại bỏ chuỗi Bearer và chỉ giữ lại token.
// const decoded = jwt.verify(token, 'your_jwt_secret');:

// jwt.verify() dùng để giải mã và kiểm tra tính hợp lệ của token bằng cách sử dụng khóa bí mật 'your_jwt_secret'. Nếu token hợp lệ, nó sẽ trả về một đối tượng decoded chứa thông tin mà token lưu trữ (ví dụ: id và role của người dùng).
// Nếu token không hợp lệ hoặc đã hết hạn, sẽ ném ra một lỗi mà bạn sẽ xử lý trong khối catch.
// if (decoded.role !== role) {:

// Kiểm tra vai trò (role) của người dùng trong token có khớp với vai trò được yêu cầu để truy cập route không. Nếu vai trò của người dùng không khớp, yêu cầu sẽ bị từ chối với mã trạng thái 403 (Forbidden).
// return res.status(403).json({ message: 'Access denied' });:

// Nếu vai trò của người dùng không khớp với vai trò yêu cầu, trả về phản hồi với mã trạng thái 403 và thông báo "Access denied". Điều này có nghĩa là người dùng không có quyền truy cập vào tài nguyên này.
// next();:

// Nếu vai trò của người dùng hợp lệ, gọi next() để tiếp tục xử lý yêu cầu. Đây là cơ chế của middleware trong ExpressJS, giúp chuyển tiếp yêu cầu đến hàm xử lý tiếp theo trong chuỗi.
// catch (err) {:

// Nếu có bất kỳ lỗi nào trong quá trình giải mã token (ví dụ như token không hợp lệ, hết hạn, hoặc không có token), khối catch này sẽ xử lý lỗi đó.
// return res.status(401).json({ message: 'Unauthorized' });:

// Nếu token không hợp lệ hoặc xảy ra lỗi khi kiểm tra token, trả về phản hồi với mã trạng thái 401 (Unauthorized), thông báo cho người dùng rằng họ không có quyền truy cập vì token không hợp lệ.
// Tóm tắt:
// Middleware này giúp kiểm tra quyền truy cập vào các route nhạy cảm dựa trên token JWT và vai trò người dùng. Nếu token hợp lệ và vai trò của người dùng khớp với vai trò được yêu cầu, middleware sẽ cho phép tiếp tục xử lý yêu cầu. Nếu không, yêu cầu sẽ bị từ chối với các mã lỗi tương ứng.