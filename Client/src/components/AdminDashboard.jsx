import React, { useEffect, useState } from "react";


const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGrievances();
  }, [filterStatus]);

  const fetchGrievances = async () => {
    try {
      let url = "http://localhost:8080localhost:8080/api/grievances";
      if (filterStatus !== "all") {
        url += `?status=${filterStatus}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGrievances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:8080localhost:8080/api/grievances/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ status }),
});
      fetchGrievances();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2 font-semibold">
          Filter by status:
        </label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Resolved</option>
        </select>
      </div>

      <ul>
        {grievances.map((g) => (
          <li
            key={g._id}
            className="border p-3 mb-2 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{g.title}</h3>
              <p>{g.description}</p>
              <small>By User: {g.userId}</small>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-3 py-1 rounded"
                onClick={() => updateStatus(g._id, "pending")}
              >
                Pending
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(g._id, "done")}
              >
                Resolve
              </button>
              <span
                className={`px-2 py-1 rounded text-white ${
                  g.status === "pending" ? "bg-yellow-500" : "bg-green-600"
                }`}
              >
                {g.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
