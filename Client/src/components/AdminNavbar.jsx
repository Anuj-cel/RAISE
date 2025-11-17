// src/components/Admin/AdminNavbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = ({ adminName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/admin");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h2 style={styles.brand}>🎓 Grievance Portal</h2>
      </div>

      <div style={styles.right}>

        {/* ✅ HOME BUTTON ADDED */}
        <NavLink to="/admin/dashboard" style={styles.link}>
          Home
        </NavLink>

        <NavLink to="/admin/grievances/pending" style={styles.link}>
          Pending
        </NavLink>

        <NavLink to="/admin/grievances/completed" style={styles.link}>
          Completed
        </NavLink>

        <NavLink to="/admin/profile" style={styles.link}>
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
    gap: "15px",
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
