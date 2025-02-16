const http = require('http');//Dòng này sử dụng mô-đun HTTP của Node.js để tạo một máy chủ HTTP.

const routes = require('./routes'); //Dòng này yêu cầu tệp routes.js và gán giá trị trả về cho biến routes. Trong trường hợp này, routes.js chứa mã xử lý yêu cầu và một số văn bản cố định.

console.log(routes.someText);//Dòng này in ra console giá trị của thuộc tính someText từ routes. Nếu bạn nhớ đoạn mã trong routes.js, giá trị của someText là "Some hard coded text".

const server = http.createServer(routes.handler);//Dòng này tạo một máy chủ HTTP và sử dụng hàm xử lý yêu cầu handler từ routes.js.
// Khi máy chủ nhận được một yêu cầu, nó sẽ chuyển yêu cầu đó đến hàm handler trong routes.js.

server.listen(3000);//Dòng này khởi động máy chủ và lắng nghe các kết nối trên cổng 3000. 
//Khi bạn truy cập http://localhost:3000 trong trình duyệt, máy chủ sẽ xử lý các yêu cầu theo logic đã định nghĩa trong handler.
