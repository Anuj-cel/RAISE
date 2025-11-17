import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function GrievanceCard() {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/grievance/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setGrievance(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center py-10 text-lg">Loading...</p>;
  if (!grievance) return <p className="text-center py-10 text-lg">Not Found</p>;

  return (
    <> 
      <AdminNavbar />
      <div className="p-6 flex justify-start">
        <div className="bg-white shadow-lg rounded-2xl p-6 border w-[420px]">
          <h2 className="text-2xl font-semibold mb-4 capitalize text-gray-800">
            {grievance.title}
          </h2>

          <div className="text-sm mb-4 space-y-1 text-gray-700">
            <p><span className="font-medium">Registration ID:</span> {grievance.registrationId}</p>
            <p><span className="font-medium">Hostel:</span> {grievance.hostelName}</p>
            <p><span className="font-medium">Category:</span> {grievance.category}</p>
            <p>
              <span className="font-medium">Status:</span>
              <span className="ml-1 px-2 py-0.5 rounded text-white text-xs capitalize bg-yellow-500">
                {grievance.status}
              </span>
            </p>
            <p><span className="font-medium">Created At:</span> {new Date(grievance.createdAt).toLocaleString()}</p>
          </div>

          <p className="mb-4 text-gray-700 leading-relaxed">{grievance.description}</p>

          {grievance.images && grievance.images.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium text-gray-800">Images:</p>
              {grievance.images.map((img) => (
                <img
                  key={img._id}
                  src={`http://localhost:8080${img.link}`}
                  alt="Grievance"
                  className="w-40 h-40 object-cover rounded-xl border shadow-sm"
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={async () => {
                await fetch(`http://localhost:8080/grievance/${id}/status`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                  },
                  body: JSON.stringify({ status: "running" }),
                });
                setGrievance({ ...grievance, status: "running" });
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-4 py-2 rounded-xl shadow"
            >
              Mark Running
            </button>

            <button
              onClick={async () => {
                await fetch(`http://localhost:8080/grievance/${id}/status`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                  },
                  body: JSON.stringify({ status: "completed" }),
                });
                setGrievance({ ...grievance, status: "completed" });
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-xl shadow"
            >
              Mark Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
