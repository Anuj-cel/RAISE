import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import SearchBar from "./SearchBar";

const AllGrievancesAdmin = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await fetch("http://localhost:8080/all/greivances/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = await res.json(); // Renamed to responseData
      
      console.log("Fetched grievances data:", responseData);

      // 🛑 ERROR FIX: The response is an object with a 'data' property that holds the array.
      // We need to check the 'data' property of the response object.
      if (responseData && Array.isArray(responseData.data)) {
        setGrievances(responseData.data); // Set the state with the array inside 'data'
      } else {
        console.error("Unexpected response structure or non-array data:", responseData);
        // If the 'data' property is missing or not an array, set to an empty array
        setGrievances([]); 
      }
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const viewGrievance = (id) => {
    navigate(`/admin/grievance/${id}`);
  };

  // 🔍 FILTERED LIST USING SEARCH TERM
  // 🛑 POTENTIAL ERROR FIX: Filtering should use 'registrationId' (from your log) instead of 'student_id'.
  const filteredGrievances = grievances.filter((item) =>
    item.registrationId.toLowerCase().includes(searchTerm.toLowerCase())
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
  All Grievance Requests
</h2>

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
              {/* 🛑 UI TEXT CHANGE: Change header text to match the property used for ID */}
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
                  No matching records found
                </td>
              </tr>
            ) : (
              filteredGrievances.map((item) => (
                <tr key={item._id}>
                  {/* 🛑 PROPERTY CHANGE: Display 'registrationId' */}
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

export default AllGrievancesAdmin;