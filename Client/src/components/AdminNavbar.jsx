// src/components/Admin/AdminNavbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = ({ adminName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <NavLink to="/" style={styles.link}>    
       
               <h2 style={styles.brand}>🎓 Grievance Portal</h2>
               </NavLink>
      </div>

      <div style={styles.right}>

        {/* ✅ HOME BUTTON ADDED */}
        <NavLink to="/admin/dashboard" style={({ isActive }) => ({
          ...styles.link,color: isActive ? "yellowgreen" : "#ecf0f1",})}>
          Home
        </NavLink>

        <NavLink to="/admin/grievances/pending" style={({ isActive }) => ({
          ...styles.link,color: isActive ? "yellowgreen" : "#ecf0f1",})}>
          Pending
        </NavLink>

        <NavLink to="/admin/grievances/completed" style={({ isActive }) => ({
          ...styles.link,color: isActive ? "yellowgreen" : "#ecf0f1",})}>
          Completed
        </NavLink>

        <NavLink to="/admin/profile" style={({ isActive }) => ({
          ...styles.link,color: isActive ? "yellowgreen" : "#ecf0f1",})}>
          Profile
        </NavLink>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>

      </div>
    </nav>
  );
};

// Inline CSS styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
  },
  left: {},
  brand: {
    margin: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontWeight: "500",
  },
  logoutBtn: {
    padding: "5px 12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminNavbar;
