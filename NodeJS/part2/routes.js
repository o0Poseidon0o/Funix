const fs = require('fs'); //Dòng này sử dụng module fs (file system) của Node.js để làm việc với tệp tin.
//Đây là một hàm xử lý yêu cầu (request handler) nhận vào hai đối tượng req (request) và res (response).
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;//Hai dòng này lấy ra URL và phương thức HTTP từ yêu cầu.
  //Nếu URL là '/', máy chủ sẽ trả về một trang HTML chứa biểu mẫu để nhập tin nhắn và gửi đến URL /message bằng phương thức POST.
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  //Nếu URL là /message và phương thức là POST, máy chủ sẽ thu thập dữ liệu từ biểu mẫu. Dữ liệu được gửi dưới dạng các "chunk" và được đẩy vào mảng body. 
  //Sau khi thu thập xong, dữ liệu được ghép lại và chuyển 
  //đổi thành chuỗi, lấy ra giá trị của tin nhắn và lưu vào tệp message.txt. Cuối cùng, máy chủ trả về mã trạng thái 302 để chuyển hướng người dùng về trang chủ (/).
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  //Nếu URL không khớp với '/' hoặc /message, máy chủ sẽ trả về một trang HTML đơn giản với thông báo "Hello from my Node.js Server!".
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
//Các dòng này xuất ra hàm requestHandler và một chuỗi văn bản "Some hard coded text" để 
//có thể sử dụng ở nơi khác trong ứng dụng. Có nhiều cách khác nhau để xuất các module trong Node.js, 
//các dòng bị chú thích minh họa một số cách khác nhau, nhưng cuối cùng đoạn mã sử dụng exports để xuất requestHandler và someText.

//Phương thức method trong ngữ cảnh của đoạn mã Node.js là một thuộc tính của đối tượng yêu cầu HTTP (req) được gửi đến máy chủ.
//Nó cho biết hành động mà máy khách (client) muốn thực hiện. Các phương thức HTTP phổ biến bao gồm:
//GET: Được sử dụng để yêu cầu dữ liệu từ máy chủ. Ví dụ, khi bạn nhập một URL vào trình duyệt và nhấn Enter, trình duyệt sẽ gửi một yêu cầu GET để lấy nội dung của trang đó.
//POST: Được sử dụng để gửi dữ liệu đến máy chủ, thường là từ một biểu mẫu HTML. Ví dụ, khi bạn điền vào một 
// biểu mẫu trên trang web và nhấn nút gửi, trình duyệt sẽ gửi một yêu cầu POST với dữ liệu biểu mẫu đến máy chủ.
// PUT: Được sử dụng để cập nhật dữ liệu hiện có trên máy chủ.
// DELETE: Được sử dụng để xóa dữ liệu trên máy chủ.
// PATCH: Được sử dụng để áp dụng các thay đổi một phần đối với tài nguyên.