import React, { useState, useEffect } from "react";

const AddUser = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://ilarge.lisimg.com/image/21867558/1118full-hyakujuu-sentai-gaoranger-photo.jpg"
  ); // Ảnh mặc định

  const [departments, setDepartments] = useState([]); // Danh sách bộ phận
  const [roles, setRoles] = useState([]); // Danh sách vai trò
  const [userData, setUserData] = useState({
    id_departments: '',
    id_role: '',
    username: '',
    email_user: '',
    password_user: '',
  });
  const [message, setMessage] = useState(""); // Thông báo phản hồi từ server

  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Hiển thị ảnh tạm thời trước khi upload
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);
  };

  // Hàm upload và submit dữ liệu người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData để upload ảnh
    const formData = new FormData();
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    // Thêm các dữ liệu người dùng vào FormData
    formData.append("username", userData.username);
    formData.append("email_user", userData.email_user);
    formData.append("password_user", userData.password_user);
    formData.append("id_departments", userData.id_departments);
    formData.append("id_role", userData.id_role);

    try {
      const response = await fetch(`/api/users/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Người dùng đã được thêm thành công!");
        // Reset form sau khi thêm người dùng thành công
        setUserData({
          id_users:'',
          id_departments: '',
          id_role: '',
          username: '',
          email_user: '',
          password_user: '',
        });
        setSelectedFile(null);
        setAvatarUrl("https://ilarge.lisimg.com/image/21867558/1118full-hyakujuu-sentai-gaoranger-photo.jpg");
      } else {
        setMessage(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Đã xảy ra lỗi trong quá trình thêm người dùng.");
    }
  };

  const fetchDepartmentsAndRoles = async () => {
    try {
      const [departmentsResponse, rolesResponse] = await Promise.all([
        fetch('http://localhost:5000/api/departments/all-departments'),
        fetch('http://localhost:5000/api/roles/all-roles'),
      ]);
  
      const departmentsData = await departmentsResponse.json();
      const rolesData = await rolesResponse.json();
  
      // Kiểm tra dữ liệu của các bộ phận
      console.log("Departments Data:", departmentsData);
      if (Array.isArray(departmentsData)) {
        setDepartments(departmentsData);
      } else {
        console.error("Departments API did not return an array:", departmentsData);
        setDepartments([]);
      }
  
      // Kiểm tra dữ liệu của các vai trò
      console.log("Roles Data:", rolesData);
      if (Array.isArray(rolesData)) {
        setRoles(rolesData);
      } else {
        console.error("Roles API did not return an array:", rolesData);
        setRoles([]);
      }
    } catch (error) {
      console.error("Error fetching departments and roles:", error);
    }
  };
  

  // Gọi API khi component được mount
  useEffect(() => {
    fetchDepartmentsAndRoles();
  }, []);

  // Hàm xử lý thay đổi dữ liệu người dùng
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-wrap mt-10">
      <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
        <p className="text-xl pb-6 flex items-center">
          <i className="fas fa-list mr-3"></i> Hình ảnh
        </p>
        <div className="leading-loose">
          <form
            className="p-10 bg-white rounded shadow-xl"
            onSubmit={handleSubmit} // Sử dụng handleSubmit thay vì handleUpload
          >
            <img
              src={avatarUrl} // Hiển thị ảnh được chọn
              alt="avatar"
              className="mb-4 w-40 h-full object-cover rounded-md"
            />
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} // Khi người dùng chọn ảnh
                className="mb-4"
              />
            </div>
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                Thêm Người Dùng
              </button>
            </div>
            {message && <p className="mt-4 text-red-500">{message}</p>} {/* Thông báo phản hồi */}
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p className="text-xl pb-6 flex items-center">
          <i className="fas fa-list mr-3"></i> Form User
        </p>
        <div className="leading-loose">
          <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit}>
          <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="username">
                Số hiệu
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="username"
                name="username"
                type="text"
                required
                placeholder="Số hiệu"
                value={userData.id_users}
                onChange={handleChange}
                aria-label="Username"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="username">
                Tên người dùng
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="username"
                name="username"
                type="text"
                required
                placeholder="Tên người dùng"
                value={userData.username}
                onChange={handleChange}
                aria-label="Username"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="email_user">
                Email
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="email_user"
                name="email_user"
                type="email"
                required
                placeholder="Email"
                value={userData.email_user}
                onChange={handleChange}
                aria-label="Email"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="password_user">
                Mật khẩu
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="password_user"
                name="password_user"
                type="password"
                required
                placeholder="Mật khẩu"
                value={userData.password_user}
                onChange={handleChange}
                aria-label="Password"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="id_departments">
                Bộ phận
              </label>
              <select
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="id_departments"
                name="id_departments"
                required
                value={userData.id_departments}
                onChange={handleChange}
                aria-label="Department"
              >
                <option value="">Chọn bộ phận</option>
                {departments.length > 0 ? (
                  departments.map(department => (
                    <option key={department.id_departments} value={department.id_departments}>
                      {department.department_name}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có bộ phận nào</option>
                )}
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="id_role">
                Vai trò
              </label>
              <select
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="id_role"
                name="id_role"
                required
                value={userData.id_role}
                onChange={handleChange}
                aria-label="Role"
              >
                <option value="">Chọn vai trò</option>
                {roles.length > 0 ? (
                  roles.map(role => (
                    <option key={role.id_roles} value={role.id_roles}>
                      {role.name_role}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có vai trò nào</option>
                )}
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
