import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import SearchBar from "./SearchBar";

const AllGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/grievances/my");
      const data = await res.json();

      if (Array.isArray(data)) {
        setGrievances(data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const viewGrievance = (id) => {
    navigate(`/admin/grievance/${id}`);
  };

  // 🔍 FILTERED LIST USING SEARCH TERM
  const filteredGrievances = grievances.filter((item) =>
    item.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminNavbar />

      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>All Grievance Requests</h1>

        {/* 🔍 SEARCH BAR */}
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        <table 
          style={{ 
            width: "100%", 
            borderCollapse: "collapse", 
            marginTop: "20px" 
          }}
        >
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={thStyle}>Student ID</th>
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
                  No matching records found
                </td>
              </tr>
            ) : (
              filteredGrievances.map((item) => (
                <tr key={item._id}>
                  <td style={tdStyle}>{item.student_id}</td>
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

export default AllGrievances;
