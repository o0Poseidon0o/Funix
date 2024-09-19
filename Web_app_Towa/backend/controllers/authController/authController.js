// Đây là phần điều khiển model backend sẽ được gọi ở router để tạo đường dẫn
const User = require('../../models/Users/User');
const Role = require('../../models/Users/Role');
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
    const { email_user, password_user } = req.body;

    try {
        const user = await User.findOne({ where: { email_user } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password_user, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Nếu đăng nhập thành công, trả về 200
        res.status(200).json({
            id: user.id_users,
            username: user.username,
            email: user.email_user,
            role: user.role.name_role
        });

    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
