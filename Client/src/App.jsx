import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import CommonDashboard from "./components/CommonDashboard";
import StudentRegister from "./components/StudentRegister";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import CommonRegister from "./components/CommonRegister";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import RaiseGrievance from "./components/RaiseGrienvance";
import MyGrievances from "./components/MyGrievances";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
import StudentProfile from "./components/StudentProfile";
import AllGrievances from "./components/AllGrievances";
import AdminNavbar from "./components/AdminNavbar";
import PendingGrievances from "./components/PendingGrievances";
import RunningGrievances from "./components/RunningGrievances";
import CompletedGrievances from "./components/CompletedGrievances";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("student");

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<CommonDashboard />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin/>}/>
        <Route path="/student/dashboard" element={<MyGrievances  />} />
        <Route path="/student/raiseGrievance" element={<RaiseGrievance  />} />
        <Route path="/student/profile" element={<StudentProfile  />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/grievances" element={<AllGrievances />} />
        <Route path="/admin/grievances/pending" element={<PendingGrievances />} />
        <Route path="/admin/grievances/running" element={<RunningGrievances />} />
        <Route path="/admin/grievances/completed" element={<CompletedGrievances />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
