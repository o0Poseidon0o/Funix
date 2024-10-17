import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedRole, setEditedRole] = useState({ id_roles: '', name_role: '' });
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(5000); // Mặc định là 5 giây
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state cho từ khóa tìm kiếm

  // Hàm lấy danh sách vai trò từ API
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/roles/all-roles');
      setRoles(response.data); // Giả định rằng dữ liệu vai trò nằm trong trường data
      setError(null); // Đặt lại lỗi nếu lấy dữ liệu thành công
    } catch (error) {
      setError('Error fetching roles.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect để gọi fetchRoles và thiết lập polling
  useEffect(() => {
    fetchRoles(); // Lấy danh sách vai trò ban đầu

    // Thiết lập interval để lấy lại danh sách vai trò nếu tự động làm mới được bật
    const interval = autoRefreshEnabled ? setInterval(() => {
      fetchRoles();
    }, refreshInterval) : null;

    // Dọn dẹp interval khi component unmount hoặc khi autoRefreshEnabled hoặc refreshInterval thay đổi
    return () => clearInterval(interval);
  }, [autoRefreshEnabled, refreshInterval]);

  // Hàm xử lý khi bắt đầu chỉnh sửa một vai trò
  const handleEdit = (role) => {
    setEditingId(role.id_roles);
    setEditedRole({ ...role }); // Sao chép đối tượng role
  };

  // Hàm lưu thông tin vai trò đã chỉnh sửa
  const handleSave = async (id) => {
    if (!editedRole.name_role) {
      alert('Tên role không được để trống!');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/roles/update/${id}`, editedRole);
      setEditingId(null);
      alert('Cập nhật role thành công');
      fetchRoles(); // Lấy lại danh sách vai trò sau khi cập nhật
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Có lỗi xảy ra khi cập nhật role.');
    }
  };

  // Hàm xóa một vai trò
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa role này?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/roles/delete/${id}`);
      alert('Xóa role thành công');
      fetchRoles(); // Lấy lại danh sách vai trò sau khi xóa
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Có lỗi xảy ra khi xóa role.');
    }
  };

  // Hàm tìm kiếm vai trò
  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`http://localhost:5000/api/roles/search?name=${searchTerm}`);
        setRoles(response.data); // Giả định rằng dữ liệu vai trò nằm trong trường data
      } catch (error) {
        setError('Error searching roles.');
      }
    } else {
      fetchRoles(); // Nếu không có từ khóa tìm kiếm, lấy lại danh sách vai trò
    }
  };

  // Hiển thị loading hoặc lỗi nếu có
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full mt-8">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i> Danh sách Roles
      </p>

      {/* Input tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Tìm kiếm khi nhấn Enter
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <button 
          onClick={handleSearch} 
          className="bg-blue-500 px-4 py-2 text-white rounded shadow-md"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Input để điều chỉnh khoảng thời gian làm mới */}
      <div className="mb-4">
        <label className="ml-4">
          <input
            type="checkbox"
            checked={autoRefreshEnabled}
            onChange={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
          />
          Tự động làm mới
        </label>
      </div>

      <div className="bg-white overflow-auto">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Id Role
              </th>
              <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Tên Role
              </th>
              <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id_roles} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b border-gray-300">
                  {editingId === role.id_roles ? (
                    <input
                      type="text"
                      value={editedRole.id_roles}
                      readOnly // Không cho phép chỉnh sửa ID role
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                    />
                  ) : (
                    <span>{role.id_roles}</span>
                  )}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  {editingId === role.id_roles ? (
                    <input
                      type="text"
                      value={editedRole.name_role}
                      onChange={(e) =>
                        setEditedRole({ ...editedRole, name_role: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span>{role.name_role}</span>
                  )}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  <div className="flex space-x-4">
                    {editingId === role.id_roles ? (
                      <button
                        onClick={() => handleSave(role.id_roles)}
                        className="bg-blue-500 px-4 py-2 text-white rounded shadow-md"
                      >
                        Lưu
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(role)}
                        className="bg-blue-500 px-4 py-2 text-white rounded shadow-md"
                      >
                        Sửa
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(role.id_roles)}
                      className="bg-red-500 px-4 py-2 text-white rounded shadow-md"
                    >
                      Xóa
                    </button>
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

export default SettingRoles;
