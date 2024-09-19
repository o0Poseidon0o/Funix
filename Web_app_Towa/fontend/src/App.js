import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Pages/login/login';
import AdminPage from './components/Pages/Admin/Admin';
import Dashboard from './components/Pages/Admin/AdminDashboard';
import UserProfile from './components/Pages/Users/Userprofiles';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
