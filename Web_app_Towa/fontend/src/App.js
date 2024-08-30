import React, { useState, useEffect } from "react";
import Layoutmenu from "./compoments/Layout/Layoutmenu";
import Headermain from "./compoments/Layout/Headermain";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Trangchu from "./compoments/Pages/Trangchu";
import Quidinh from "./compoments/Pages/quidinh";
import Huongdan from "./compoments/Pages/huongdan";
import Thongbao from "./compoments/Pages/thongbao";
import Ungdung from "./compoments/Pages/ungdung";
import Congdoan from "./compoments/Pages/congdoan";
import Hinhanh from "./compoments/Pages/hinhanh";
import Admin from "./compoments/Pages/admin";
import Login from "./compoments/Pages/login/login";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appRoutes, setAppRoutes] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    axios
      .get("/data/application.json")
      .then((response) => {
        setAppRoutes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching application routes:", error);
      });
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div>
          <Headermain />
          <Layoutmenu />
          <Routes>
            <Route path="/" element={<Trangchu />} />
            <Route path="/Quidinh" element={<Quidinh />} />
            <Route path="/Huongdan" element={<Huongdan />} />
            <Route path="/Thongbao" element={<Thongbao />} />
            <Route path="/Ungdung" element={<Ungdung />} />
            <Route path="/Congdoan" element={<Congdoan />} />
            <Route path="/Hinhanh" element={<Hinhanh />} />
            <Route path="/Admin" element={<Admin />} />
            {/* Render động các route từ JSON */}
            {appRoutes.map((app) => (
              <Route
                key={app.href}
                path={app.href}
                element={<DynamicComponent componentName={app.p} />}
              />
            ))}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}

function DynamicComponent({ componentName }) {
  // Loại bỏ khoảng trắng và ký tự đặc biệt khỏi tên component
  const sanitizedComponentName = componentName
    .replace(/\s+/g, "")
    .toLowerCase();

  // Import động component dựa trên tên đã xử lý
  const Component = React.lazy(() =>
    import(`./compoments/Pages/application/${sanitizedComponentName}`)
  );
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
}

export default App;
