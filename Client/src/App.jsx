import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProfile from "./components/AdminProfile";
import CommonDashboard from "./components/CommonDashboard";
import StudentRegister from "./components/StudentRegister";
import AdminDashboard from "./components/AdminDashboard";
import GrievanceCard from "./components/GrievanceCard";
import RaiseGrievance from "./components/RaiseGrienvance";
import MyGrievances from "./components/MyGrievances";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
import StudentProfile from "./components/StudentProfile";

import PendingGrievances from "./components/PendingGrievances";
import RunningGrievances from "./components/RunningGrievances";
import CompletedGrievances from "./components/CompletedGrievances";
import AllGrievancesAdmin from "./components/AllGrievancesAdmin";
import AdminRegister from './components/AdminRegister'

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
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin/>}/>

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<MyGrievances  />} />
        <Route path="/student/raiseGrievance" element={<RaiseGrievance  />} />
        <Route path="/student/profile" element={<StudentProfile  />} />

        {/* Admin Routes */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/grievances" element={<AllGrievancesAdmin />} />
        <Route path="/admin/grievances/pending" element={<PendingGrievances />} />
        <Route path="/admin/grievances/running" element={<RunningGrievances />} />
        <Route path="/admin/grievances/completed" element={<CompletedGrievances />} />
        <Route path="/admin/grievance/:id" element={<GrievanceCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
