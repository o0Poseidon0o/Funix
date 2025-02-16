import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/login";
import AdminPage from "./views/Admin/Admin";
import Dashboard from "./views/Admin/AdminDashboard";
import UserProfile from "./views/Users/Userprofiles";
import AddUser from "./Layout/Users/AddUserRouter";
import SettingUser from "./Layout/Users/SettingUserRouter";
import RoleDepartmentRouter from "./Layout/Department/RoleDepartmentRouter";
import Department from "./Layout/Department/Department";
import DataentryRouter from "./Layout/Dataentry/DataentryRouter";
import ChartRouter from "./Layout/Chart/ChartRouter";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/Adduser/*" element={<AddUser />} />
        <Route path="/SettingUser/*" element={<SettingUser />} />
        <Route path="/RoleDepartment/*" element={<RoleDepartmentRouter />} />
        <Route path="/Department/*" element={<Department />} />
        <Route path="/Dataentry/*" element={<DataentryRouter />} />
        <Route path="/Chartview/*" element={<ChartRouter/>} />
      </Routes>
    </Router>
  );
};

export default App;
