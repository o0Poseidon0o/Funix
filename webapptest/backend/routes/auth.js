
const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);

module.exports = router;

// const express = require('express');

// Đây là dòng lệnh import thư viện express. Express là một framework phổ biến cho Node.js giúp xây dựng các ứng dụng web và API dễ dàng hơn. Nó cung cấp các phương thức để xử lý các yêu cầu HTTP, định tuyến, và middleware.
// const { login } = require('../controllers/authController');:

// Dòng này import hàm login từ module authController nằm trong thư mục controllers. Cú pháp { login } là cách để chỉ định và import các thành phần cụ thể từ module. Trong trường hợp này, chúng ta chỉ cần hàm login từ module đó.
// Module authController chứa logic xử lý yêu cầu đăng nhập, và hàm login là chức năng cụ thể để xử lý yêu cầu POST đến endpoint /login.
// const router = express.Router();:

// Tạo một đối tượng router mới từ express.Router(). Router trong Express cho phép bạn định nghĩa các route cho một phần cụ thể của ứng dụng mà không cần phải quản lý tất cả các route trong file app.js chính.
// Đây là cách để tổ chức các route một cách có cấu trúc, tách biệt và dễ quản lý hơn.
// router.post('/login', login);:

// Định nghĩa một route POST cho endpoint /login. Khi có một yêu cầu POST gửi đến /login, Express sẽ gọi hàm login mà bạn đã import từ authController.
// router.post là phương thức của express.Router để chỉ định rằng route này chỉ xử lý các yêu cầu POST. Nếu có yêu cầu khác như GET, PUT, DELETE gửi đến cùng endpoint, chúng sẽ không được xử lý bởi route này.
// module.exports = router;:

// Xuất đối tượng router để có thể sử dụng trong các file khác. Khi bạn export router, bạn cho phép các phần khác của ứng dụng (như app.js) có thể import và sử dụng các route đã định nghĩa.
// Ví dụ, trong app.js, bạn sẽ import và sử dụng router này để gán các route cho ứng dụng Express của bạn.
// Tóm tắt:
// Import Express: Đưa thư viện Express vào dự án.
// Import Controller: Lấy hàm login từ module xử lý logic đăng nhập.
// Tạo Router: Khởi tạo một router mới để định nghĩa các route.
// Định nghĩa Route: Gán hàm login để xử lý các yêu cầu POST gửi đến /login.
// Export Router: Xuất router để sử dụng trong các phần khác của ứng dụng.
// Đoạn mã này là một phần của cấu trúc tổ chức route trong ứng dụng ExpressJS, giúp tách biệt các phần khác nhau của ứng dụng, làm cho mã nguồn dễ đọc và bảo trì hơn.