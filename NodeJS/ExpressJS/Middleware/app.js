const http = require('http');//Dòng này sử dụng mô-đun HTTP của Node.js để tạo một máy chủ HTTP.

const express = require('express');
const app=express();
app.use('/',(req,res,next)=>{
    console.log('This always run!')
    next();//Allows the request to continue the next middleware in line
    // Thường xuyên chạy
});
app.use('/add-product',(req,res,next)=>{
    console.log('In another middleware!')
    res.send('<h1>The "Add product" Page</h1>')
});
app.use('/',(req,res,next)=>{
    console.log('In another middleware!')
    res.send('<h1>Hello from Express!</h1>')
});
const server = http.createServer(app);//Dòng này tạo một máy chủ HTTP và sử dụng hàm xử lý yêu cầu handler từ routes.js.
// Khi máy chủ nhận được một yêu cầu, nó sẽ chuyển yêu cầu đó đến hàm handler trong routes.js.



server.listen(3000);//Dòng này khởi động máy chủ và lắng nghe các kết nối trên cổng 3000. 
//Khi bạn truy cập http://localhost:3000 trong trình duyệt, máy chủ sẽ xử lý các yêu cầu theo logic đã định nghĩa trong handler.
