const request = require('supertest'); // Để gửi các request HTTP
const { expect } = require('chai');   // Chai để viết các assertion
const app = require('../server');        // Tệp chính của ứng dụng (Express app)

describe('POST /login', () => {
    it('should return 200 if login is successful', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email_user: 'test@example.com', password_user: 'password' });

        expect(res.status).to.be.oneOf([200, 201]); // Kiểm tra mã phản hồi
        expect(res.body).to.have.property('username'); // Kiểm tra nếu có trường username
        expect(res.body).to.have.property('role');     // Kiểm tra nếu có trường role
    });

    it('should return 401 if password is incorrect', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email_user: 'test@example.com', password_user: 'wrongpassword' });

        expect(res.status).to.equal(401); // Mong đợi phản hồi 401 nếu mật khẩu sai
    });

    it('should return 404 if user not found', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email_user: 'nonexistent@example.com', password_user: 'password' });

        expect(res.status).to.equal(404); // Mong đợi phản hồi 404 nếu user không tồn tại
    });
});
