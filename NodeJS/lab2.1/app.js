const http = require('http');
const fs = require('fs');

const users = []; // Array to store users

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment1</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment1</title></head>');
        res.write('<body><ul>');
        users.forEach(user => {
            res.write(`<li>${user}</li>`);
        });
        res.write('</ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username)
            users.push(username); // Add the new user to the users array
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//Kiểm tra xem URL có phải là '/create-user' và phương thức HTTP là POST.
// Khai báo mảng body để lưu trữ các phần dữ liệu nhận được từ yêu cầu.
// req.on('data', chunk => { body.push(chunk); });: Lắng nghe sự kiện 'data' để thu thập các phần dữ liệu (chunk) và thêm vào mảng body.
// req.on('end', () => { ... });: Lắng nghe sự kiện 'end' để xử lý khi toàn bộ dữ liệu đã được nhận.
// Buffer.concat(body).toString(): Kết hợp các phần dữ liệu thành một chuỗi.
// parsedBody.split('=')[1]: Tách chuỗi để lấy tên người dùng từ dữ liệu form.
// users.push(username): Thêm tên người dùng mới vào mảng users.
// res.statusCode = 302;: Thiết lập mã trạng thái HTTP 302 để chuyển hướng.
// res.setHeader('Location', '/');: Thiết lập header để chuyển hướng đến trang gốc /.
// res.end(): Kết thúc phản hồi và gửi đến client.
///////////////////////////////////////////////////////
// Kiểm tra xem URL có phải là '/users'.
// Thiết lập header của phản hồi để chỉ định rằng nội dung là HTML.
// Hiển thị danh sách người dùng từ mảng users bằng cách sử dụng một vòng lặp forEach.
// res.write để viết từng tên người dùng vào danh sách dưới dạng các phần tử <li>.
// res.end(): Kết thúc phản hồi và gửi đến client.
////////////////////////////////////////////
// Kiểm tra xem URL có phải là '/'.
// Thiết lập header của phản hồi để chỉ định rằng nội dung là HTML.
// Sử dụng res.write để viết nội dung HTML cho phản hồi.
// Hiển thị một form HTML với phương thức POST, gửi đến route /create-user.
// res.end(): Kết thúc phản hồi và gửi đến client.
////////////////////////////////////
// http.createServer: Tạo một HTTP server mới.
// req: Đối tượng đại diện cho yêu cầu từ client.
// res: Đối tượng đại diện cho phản hồi từ server.
// url: Đường dẫn của yêu cầu.
// method: Phương thức HTTP của yêu cầu (GET, POST, etc).