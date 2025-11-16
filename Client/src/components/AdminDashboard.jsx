import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={container}>
        <h1 style={title}>Admin Dashboard</h1>

        <p style={subtitle}>Manage hostel grievance requests efficiently</p>

        <div style={cardContainer}>
          <Link to="/admin/grievances" style={linkStyle}>
            <div style={card}>
              <h3 style={cardTitle}>All Grievances</h3>
              <p style={cardText}>View every grievance submitted</p>
            </div>
          </Link>

          <Link to="/admin/grievances/pending" style={linkStyle}>
            <div style={card}>
              <h3 style={cardTitle}>Pending</h3>
              <p style={cardText}>Grievances waiting for action</p>
            </div>
          </Link>

          <Link to="/admin/grievances/running" style={linkStyle}>
            <div style={card}>
              <h3 style={cardTitle}>Running</h3>
              <p style={cardText}>Tasks currently being processed</p>
            </div>
          </Link>

          <Link to="/admin/grievances/completed" style={linkStyle}>
            <div style={card}>
              <h3 style={cardTitle}>Completed</h3>
              <p style={cardText}>Resolved grievance records</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  padding: "30px",
  textAlign: "center",
};

const title = {
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#2c3e50",
};

const subtitle = {
  fontSize: "18px",
  color: "#7f8c8d",
  marginBottom: "40px",
};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  maxWidth: "700px",
  margin: "0 auto",
};

const card = {
  background: "white",
  padding: "25px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s",
};

card.hover = {
  transform: "translateY(-5px)",
};

const cardTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#34495e",
};

const cardText = {
  fontSize: "14px",
  color: "#7f8c8d",
  marginTop: "8px",
};

const linkStyle = {
  textDecoration: "none",
};
