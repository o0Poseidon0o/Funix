const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const departmentRouters=require('./src/routes/department/departmentRoutes');
const rolesRoles=require('./src/routes/Roles/rolesrouters');
const users=require('./src/routes/users/userRouters')

require('dotenv').config();
const app = express();
app.use(cors());
// Middleware để xử lý dữ liệu JSON
app.use(express.json());


// sử dụng route của phòng ban
app.use('/api/departments',departmentRouters);
app.use('/api/roles',rolesRoles);
app.use('/api/users',users)


sequelize
  .sync()
  .then(() => {
    app.listen(process.env.DB_PORTSERVER, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => console.log("Database connection error:", error));
