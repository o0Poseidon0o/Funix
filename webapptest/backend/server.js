const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Cho phép tất cả các nguồn (localhost:3000)
app.use(cors());

// Nếu muốn giới hạn chỉ cho phép một số origin
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// const express = require('express');

// Dòng lệnh này import thư viện Express, một framework cho Node.js giúp xây dựng ứng dụng web và API. Bạn cần Express để tạo server và xử lý các yêu cầu HTTP.
// const cors = require('cors');:

// Import thư viện cors, một middleware giúp quản lý các vấn đề liên quan đến chính sách CORS (Cross-Origin Resource Sharing). CORS cho phép hoặc từ chối các yêu cầu từ các nguồn khác nhau (origin).
// const authRoutes = require('./routes/auth');:

// Import các route từ module auth trong thư mục routes. Module này chứa các định nghĩa route cho các yêu cầu liên quan đến xác thực (authentication), chẳng hạn như route đăng nhập.
// const app = express();:

// Tạo một đối tượng app từ express(). Đối tượng app đại diện cho ứng dụng Express của bạn, nơi bạn cấu hình các middleware, route, và xử lý các yêu cầu HTTP.
// app.use(cors());:

// Cấu hình CORS cho phép tất cả các nguồn (origins) gửi yêu cầu đến server của bạn. Khi bạn gọi app.use(cors()), nó sẽ thêm header CORS vào tất cả các phản hồi, cho phép bất kỳ nguồn nào (bao gồm localhost:3000 trong môi trường phát triển) gửi yêu cầu tới server của bạn.
// // Nếu muốn giới hạn chỉ cho phép một số origin:

// Đoạn mã này là một ví dụ bình luận về cách bạn có thể cấu hình CORS để chỉ cho phép các yêu cầu từ một số nguồn cụ thể. Thay vì cho phép tất cả các nguồn, bạn có thể cấu hình CORS để chỉ cho phép các yêu cầu từ http://localhost:3000, ví dụ:
// js
// Copy code
// app.use(cors({ origin: 'http://localhost:3000' }));
// Điều này bảo mật hơn trong môi trường sản xuất bằng cách chỉ cho phép các ứng dụng từ nguồn cụ thể truy cập vào server của bạn.

// app.use(express.json());:

// Cấu hình middleware express.json() để phân tích cú pháp dữ liệu JSON từ body của các yêu cầu HTTP. Khi bạn sử dụng express.json(), Express có thể xử lý các yêu cầu mà nội dung của chúng là JSON và tự động chuyển đổi nó thành một đối tượng JavaScript mà bạn có thể dễ dàng làm việc với trong mã.
// app.use('/auth', authRoutes);:

// Đăng ký middleware cho các route bắt đầu bằng /auth. Tất cả các yêu cầu đến /auth sẽ được chuyển đến authRoutes. Đây là nơi bạn định nghĩa các route liên quan đến xác thực (như đăng nhập), và khi một yêu cầu đến /auth/login, Express sẽ gọi các route tương ứng đã được định nghĩa trong authRoutes.
// app.listen(5000, () => { console.log('Server running on port 5000'); });:

// Bắt đầu lắng nghe các yêu cầu HTTP trên cổng 5000. Khi server khởi động thành công và bắt đầu lắng nghe các yêu cầu, nó sẽ ghi thông báo 'Server running on port 5000' vào console. Điều này cho phép bạn biết server đã sẵn sàng để xử lý các yêu cầu từ client.
// Tóm tắt:
// Import Express và các thư viện cần thiết: Thiết lập môi trường cần thiết cho ứng dụng.
// Tạo đối tượng ứng dụng: Khởi tạo ứng dụng Express.
// Cấu hình CORS: Quản lý chính sách CORS để cho phép hoặc hạn chế các nguồn gửi yêu cầu.
// Cấu hình middleware: Sử dụng express.json() để phân tích cú pháp dữ liệu JSON.
// Đăng ký các route: Định nghĩa route cho các yêu cầu liên quan đến xác thực.
// Khởi động server: Lắng nghe các yêu cầu trên cổng 5000 và thông báo khi server sẵn sàng.