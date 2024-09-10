import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Dùng để điều hướng người dùng

  useEffect(() => {
    // Tải file JSON từ thư mục public
    fetch("/data/users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Kiểm tra thông tin đăng nhập
    const user = users.find((u) => u.user === email && u.password === password);
  
    if (user) {
      setError(""); // Đăng nhập thành công
      onLogin(user.role, user); // Truyền vai trò và thông tin người dùng
      
      // Điều hướng dựa trên vai trò của người dùng
      if (user.role === "admin") {
        navigate("/Admin"); // Chuyển đến trang Admin
      } else if (user.role === "user") {
        navigate("/dashboard"); // Chuyển đến trang Dashboard
      }
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 justify-around items-center" style={{ backgroundImage: "url('/images/login/login.jpg')" }}>
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">Cổng thông tin TOWA</h1>
          <p className="text-white mt-1">Xin chào !!!!</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="https://towa.com.vn/"
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Web Towa
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Xin chào!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Chào mừng bạn trở lại</p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Đăng nhập
            </button>
            {/* Link quên mật khẩu */}
            <div className="mt-4 text-center">
              <a
                href="/Quenmatkhau"
                onClick={() => navigate("/Quenmatkhau")}
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Quên mật khẩu?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
