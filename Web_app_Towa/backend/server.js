const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);  // In ra lỗi chi tiết
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

// Kết nối database và chạy server
sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => console.log("Database connection error:", error));
