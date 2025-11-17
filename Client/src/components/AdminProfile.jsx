import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
// Note: Assuming AdminNavbar is handled separately or not required here.

const AdminProfile = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  
  // Base URL for the API requests (using 8080 for consistency with other files)
  const API_URL = "http://localhost:8080/profile/admin";

  // Custom function to show a temporary message
  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    // Clear message after 4 seconds
    setTimeout(() => setMessage(null), 4000); 
  };

  // Custom Message Component (Modal style for non-blocking notifications)
  const CustomMessage = ({ text, type }) => {
    if (!text) return null;

    let bgColor = "bg-gray-100 border-gray-400 text-gray-700";
    let icon = "💡";

    if (type === 'error') {
      bgColor = "bg-red-100 border-red-400 text-red-700";
      icon = "❌";
    }
    if (type === 'success') {
      bgColor = "bg-green-100 border-green-400 text-green-700";
      icon = "✅";
    }

    return (
      <div className="fixed top-4 right-4 z-50 transition-transform duration-300 transform translate-x-0">
        <div className={`max-w-xs mx-auto p-3 rounded-xl shadow-lg border ${bgColor} flex items-center`}>
          <span className="text-xl mr-3">{icon}</span>
          <p className="text-sm font-medium">{text}</p>
        </div>
      </div>
    );
  };

  // Data fetching logic with real API request
  useEffect(() => {
    // 1. Check Authentication
    const adminToken = localStorage.getItem("adminToken"); 
    if (!adminToken) {
      showMessage("Authentication required. Redirecting to login...", 'error');
      setTimeout(() => navigate('/login/admin'), 2000); 
      setLoading(false);
      return;
    }

    // 2. Real API Call
    const fetchAdminProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/profile/admin", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
console.log("Fetched admin profile data:", data);
        if (res.ok) {
          // Success: set data
          setAdminData(data.admin);
          // showMessage("Profile data loaded successfully.", 'success');
        } else if (res.status === 401) {
          // Unauthorized: token expired or invalid
          localStorage.removeItem("adminToken");
          showMessage("Session expired. Please log in again.", 'error');
          setTimeout(() => navigate('/login/admin'), 2000);
        } else {
          // Other API errors (e.g., 404, 500)
          showMessage(data.message || "Failed to fetch profile data.", 'error');
          setAdminData(null);
        }
      } catch (err) {
        // Network errors
        console.error("Fetch profile error:", err);
        showMessage("Network error. Could not connect to the server.", 'error');
        setAdminData(null);
      } finally {
        setLoading(false); // Hide loading indicator regardless of success/failure
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  const ProfileItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className={`text-base font-semibold ${value ? 'text-gray-900' : 'text-gray-400'}`}>
        {value || 'N/A'}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <div className="text-xl text-indigo-600 animate-pulse">Loading Admin Profile...</div>
        <CustomMessage text={message?.text} type={message?.type} />
      </div>
    );
  }

  if (!adminData) {
    // If loading finished but no data was set (e.g., API failure), display this.
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 font-inter">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600">Could not retrieve admin data. Please ensure you are logged in correctly.</p>
        </div>
        <CustomMessage text={message?.text} type={message?.type} />
      </div>
    );
  }

  // Main Profile Display
  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Administrative Profile
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Details for {adminData.name} ({adminData.staffId})
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 bg-indigo-600 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold capitalize">{adminData.designation}</h2>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-white text-indigo-700">
              Hostel {adminData.hostelName || 'N/A'}
            </span>
          </div>
          
          <div className="px-8 py-8 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <ProfileItem label="Full Name" value={adminData.name} />
              <ProfileItem label="Staff ID" value={adminData.staffId} />
              <ProfileItem label="Designation" value={adminData.designation?.toUpperCase()} />
              <ProfileItem label="Assigned Hostel" value={adminData.hostelName} />
              <ProfileItem label="Email Address" value={adminData.email} />
              <ProfileItem label="Phone Number" value={adminData.phoneNumber} />
            </div>
            
            <div className="pt-6 border-t mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">System Details</h3>
              {/* Assuming role is always 'admin' and status is 'Active' based on schema */}
              <ProfileItem label="Role" value={adminData.role?.toUpperCase() || "ADMIN"} /> 
              <ProfileItem label="Account Status" value="Active" />
            </div>
          </div>
        </div>

 
      </div>
      
      <CustomMessage text={message?.text} type={message?.type} />
    </div>
            </>
  );
};

export default AdminProfile;