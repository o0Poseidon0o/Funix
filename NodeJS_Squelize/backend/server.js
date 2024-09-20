const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');
const app = express();
app.use(cors()); // Cho phép truy cập từ frontend


const PORT = process.env.PORT || 5000;

app.use(express.json()); // Để xử lý dữ liệu JSON

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log('Error syncing database:', err));
