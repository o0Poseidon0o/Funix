import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Layoutmenu from "./components/Layout/Layoutmenu";
import Headermain from "./components/Layout/Headermain";
import Trangchu from "./components/Pages/Trangchu";
import Quidinh from "./components/Pages/Quidinh";
import Huongdan from "./components/Pages/Huongdan";
import Thongbao from "./components/Pages/Thongbao";
import Ungdung from "./components/Pages/ungdung";
import Congdoan from "./components/Pages/Congdoan";
import Hinhanh from "./components/Pages/Hinhanh";
import Admin from "./components/Pages/Admin/Admin";
import Login from "./components/Pages/login/login";
import UserProfiles from "./components/Pages/Users/Userprofiles";
import Dashboard from "./components/Pages/Admin/dashboard";
import Forgotpassword from "./components/Pages/Users/Forgotpassword";
import axios from "axios";

// App Component chính quản lý trạng thái đăng nhập và điều hướng
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kiểm tra người dùng đã đăng nhập hay chưa
  const [userRole, setUserRole] = useState(null); // Lưu trữ vai trò người dùng
  const [appRoutes, setAppRoutes] = useState([]); // Lưu các route động
  const [user, setUser] = useState(null); // Lưu thông tin người dùng sau khi đăng nhập

  // Xử lý khi đăng nhập thành công
  const handleLogin = (role, user) => {
    setIsAuthenticated(true); // Đánh dấu người dùng đã đăng nhập
    setUserRole(role); // Cập nhật vai trò
    setUser(user); // Cập nhật thông tin người dùng
  };

  // Xử lý khi đăng xuất
  const handleLogout = () => {
    setIsAuthenticated(false); // Đặt lại trạng thái không đăng nhập
    setUserRole(null); // Xóa vai trò
    setUser(null); // Xóa thông tin người dùng
  };

  // Tải dữ liệu route động từ tệp JSON
  useEffect(() => {
    axios
      .get("/data/application.json")
      .then((response) => {
        setAppRoutes(response.data); // Lưu dữ liệu route động vào state
      })
      .catch((error) => {
        console.error("Error fetching application routes:", error);
      });
  }, []);

  return (
    <Router>
      {/* Kiểm tra nếu người dùng đã đăng nhập hay chưa */}
      {isAuthenticated ? (
        <AuthenticatedApp
          appRoutes={appRoutes}
          userRole={userRole}
          onLogout={handleLogout}
          user={user}
        />
      ) : (
        <UnauthenticatedApp handleLogin={handleLogin} />
      )}
    </Router>
  );
}

// Ứng dụng khi người dùng đã đăng nhập
function AuthenticatedApp({ appRoutes, userRole, onLogout, user }) {
  const location = useLocation(); // Lấy vị trí hiện tại trong ứng dụng
  const isAdminPage = location.pathname.startsWith("/Admin"); // Kiểm tra xem có phải trang Admin hay không

  return (
    <div>
      {/* Nếu không phải trang Admin thì hiển thị Header và Menu */}
      {!isAdminPage && (
        <>
          <Headermain user={user} onLogout={onLogout} />
          <Layoutmenu />
        </>
      )}
      <Routes>
        {/* Các route cố định cho người dùng */}
        <Route path="/" element={<Trangchu />} />
        <Route path="/Quidinh" element={<Quidinh />} />
        <Route path="/Huongdan" element={<Huongdan />} />
        <Route path="/Thongbao" element={<Thongbao />} />
        <Route path="/Ungdung" element={<Ungdung />} />
        <Route path="/Congdoan" element={<Congdoan />} />
        <Route path="/Hinhanh" element={<Hinhanh />} />
        <Route path="/UserProfiles" element={<UserProfiles />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Quenmatkhau" element={<Forgotpassword />} />

        {/* Trang Admin chỉ cho phép truy cập nếu vai trò là admin */}
        <Route
          path="/Admin/*"
          element={userRole === "admin" ? <Admin /> : <Navigate to="/" />}
        />

        {/* Render các route động từ JSON */}
        {appRoutes.map((app) => (
          <Route
            key={app.href}
            path={`/Ungdung/${app.href}`}
            element={<DynamicComponent componentName={app.element} />}
          />
        ))}
      </Routes>
    </div>
  );
}

// Ứng dụng cho người dùng chưa đăng nhập
function UnauthenticatedApp({ handleLogin }) {
  const navigate = useNavigate();

  // Xử lý khi đăng nhập thành công
  const onLoginSuccess = (role, user) => {
    handleLogin(role, user);
    navigate("/"); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={onLoginSuccess} />} />
      <Route path="/Quenmatkhau" element={<Forgotpassword />} />{" "}
      {/* Trang Quên mật khẩu */}
      <Route path="/*" element={<Navigate to="/login" />} />{" "}
      {/* Điều hướng mặc định đến login */}
    </Routes>
  );
}

// Component động để tải các ứng dụng khác từ JSON
function DynamicComponent({ componentName }) {
  const Component = React.lazy(() =>
    import(`./components/Pages/application/${componentName}`)
  );
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
}

export default App;
