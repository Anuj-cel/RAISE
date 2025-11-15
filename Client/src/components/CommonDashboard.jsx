import React from "react";
import { useNavigate } from "react-router-dom";

const CommonDashboard = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    // Navigate to login page with role as query param or state
    if(role==='student')
    navigate(`/login/student`);
    else
    navigate(`/login/admin`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">Hostel Grievance Redressal System</h1>
      <p className="mb-6 text-lg text-gray-700">Please select your login type</p>

      <div className="space-x-6">
        <button
          onClick={() => handleLoginClick("student")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Student Login
        </button>

        <button
          onClick={() => handleLoginClick("admin")}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};


export default CommonDashboard;
