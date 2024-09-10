const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const menuRoutes = require('./routes/menu'); // Đường dẫn tới file menu.js


dotenv.config(); // Đọc biến môi trường từ file .env

const app = express();

app.use(express.json());
// Kích hoạt CORS
app.use(cors());
// Sử dụng route menu
app.use('/api', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
