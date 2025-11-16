import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("student"); // "student" | "admin"
  
    const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };
  return (
    <>
  
    <BrowserRouter>
          <Navbar
        role={role}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<CommonDashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/student" element={<StudentRegister/>} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin/>}/>
        <Route path="/student/dashboard" element={<MyGrievances  />} />
        <Route path="/student/raiseGrievance" element={<RaiseGrievance  />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;



