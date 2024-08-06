const express = require('express');
const app=express();
// app.use((req,res,next)=>{
//     console.log('first middleware');
//     next();
// })
// app.use((req,res,next)=>{
//     console.log('second middleware');
//     res.send('<p>Assignment solved (almost)</p>')
// })

app.use('/',(req,res,next)=>{
    console.log('/ middleware');
    res.send('<p>the Middleware that handles just /</p>')
});
app.use('/users', (req,res,next)=>{
    console.log('/users middleware');
    res.send('<p>the Middleware that handles just /users /</p>')
})
app.listen(3000)


// Middleware trong Express là các hàm được thực thi theo thứ tự chúng được khai báo. Chúng có thể thực hiện nhiều nhiệm vụ khác nhau như:

// Xác thực người dùng.
// Ghi lại các yêu cầu.
// Xử lý dữ liệu.
// Thay đổi các đối tượng yêu cầu và phản hồi.

////////////////////////////////////////////

// app.use((req, res, next) => {
//     console.log('Logging middleware');
//     next(); // Chuyển tiếp yêu cầu đến middleware tiếp theo
// });

// app.use('/admin', (req, res, next) => {
//     if (!req.isAdmin) {
//         return res.send('Not authorized');
//     }
//     next(); // Chuyển tiếp yêu cầu đến middleware tiếp theo nếu người dùng là admin
// });
////////////////////////
// Middleware đầu tiên sẽ ghi lại các yêu cầu.
// Middleware thứ hai sẽ kiểm tra xem người dùng có phải là admin không, nếu không sẽ gửi phản hồi "Not authorized".
// Trong đoạn code của bạn:

// Middleware đầu tiên xử lý mọi yêu cầu đến / và gửi phản hồi "the Middleware that handles just /".
// Middleware thứ hai xử lý mọi yêu cầu đến /users và gửi phản hồi "the Middleware that handles just /users".
// Điều này cho phép bạn dễ dàng quản lý và mở rộng các chức năng của ứng dụng web bằng cách thêm các middleware mới.