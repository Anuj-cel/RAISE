
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import SearchBar from "./SearchBar";

const CompletedGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchFiltered();
  }, []);

  // ✅ USE SAME ROUTE AND FILTER COMPLETED
  const fetchFiltered = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:8080/all/greivances/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      const list = Array.isArray(data.data) ? data.data : [];

      // Filter only completed grievances
      const completedOnly = list.filter((item) => item.status === "completed");

      setGrievances(completedOnly);
    } catch (error) {
      console.error("Error fetching completed grievances:", error);
    }
  };

  const viewGrievance = (id) => {
    navigate(`/admin/grievance/${id}`);
  };

  const filteredGrievances = grievances.filter((item) =>
    item.registrationId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminNavbar />

      <div style={{ padding: "20px" }}>
       <h2
  style={{
    textAlign: "center",
    margin: "20px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    letterSpacing: "0.5px",
  }}
>
  Completed Grievances
</h2>


        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={thStyle}>Registration ID</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredGrievances.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "15px", textAlign: "center" }}>
                  No completed grievances found
                </td>
              </tr>
            ) : (
              filteredGrievances.map((item) => (
                <tr key={item._id}>
                  <td style={tdStyle}>{item.registrationId}</td>
                  <td style={tdStyle}>{item.category}</td>
                  <td style={tdStyle}>{item.status}</td>
                  <td style={tdStyle}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() => viewGrievance(item._id)}
                      style={{
                        padding: "6px 12px",
                        background: "#008CBA",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
};

const tdStyle = {
  padding: "8px",
  border: "1px solid #ccc",
};

export default CompletedGrievances;
