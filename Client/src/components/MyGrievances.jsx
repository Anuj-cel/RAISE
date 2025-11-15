import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const MyGrievances = ({ token }) => {
  const [grievances, setGrievances] = useState([]);
  const navigate=useNavigate();

  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        navigate('login/student');
        return;
      }

      const res = await fetch("http://localhost:8080/api/grievances/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resData = await res.json();
      console.log("Fetched grievances:", resData.data);
      setGrievances(resData.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Grievances</h2>

      {grievances.length === 0 ? (
        <p className="text-gray-500">No grievances submitted yet.</p>
      ) : (
        grievances.map((g) => (
          <div
            key={g._id}
            className="border p-4 mb-3 rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{g.title}</h3>
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  g.status === "pending"
                    ? "bg-yellow-500 text-white"
                    : g.status === "done"
                    ? "bg-green-600 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {g.status}
              </span>
            </div>
            <p className="text-gray-700 mb-1">{g.description}</p>
            <p className="text-sm text-gray-500 italic mb-2">
              Category: {g.category}
            </p>

            {g.images && g.images.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {g.images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:8080${img.link}`}
                    alt="grievance"
                    className="w-28 h-28 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyGrievances;
