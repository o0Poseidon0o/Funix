import React, { useEffect, useState } from "react";
import axios from "axios";

const Settinguser = () => {
  const [users, setUsers] = useState([]); // Khởi tạo state để lưu trữ người dùng
  const [loading, setLoading] = useState(true); // Để hiển thị loading khi dữ liệu đang được tải

  // Gọi API lấy dữ liệu người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/all");
        setUsers(response.data.users); // Lưu dữ liệu vào state
        setLoading(false); // Đánh dấu hoàn thành việc tải dữ liệu
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false); // Nếu có lỗi, cũng đánh dấu tải xong
      }
    };

    fetchUsers();
  }, []); // Chỉ chạy 1 lần khi component mount

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo loading khi dữ liệu chưa được tải
  }

  return (
    <div className="w-full mt-8">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i> Danh sách nhân viên
      </p>
      <div className="bg-white overflow-auto">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Hình ảnh
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Số hiệu
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Họ và tên
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Email
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Bộ phận
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Chức danh
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_users} className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">
                  <img
                    src={`http://localhost:5000${user.avatar}`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="py-4 px-6 border-b border-grey-light">{user.id_users}</td>
                <td className="py-4 px-6 border-b border-grey-light">{user.username}</td>
                <td className="py-4 px-6 border-b border-grey-light">{user.email_user}</td>
                <td className="py-4 px-6 border-b border-grey-light">{user.department_name}</td>
                <td className="py-4 px-6 border-b border-grey-light">{user.role_name}</td>
                <td className="py-4 px-6 border-b border-grey-light text-white">
                  <div className="flex space-x-2">
                    <button className="bg-red-500 w-14 rounded shadow-md">Sửa</button>
                    <button className="bg-red-500 w-14 rounded shadow-md">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settinguser;
