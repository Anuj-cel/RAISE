import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
const token = localStorage.getItem("token");
if(!token){
  window.location.href="/login/student";
}
    // const userRole = localStorage.getItem("role");
  const getStudentData = async () => {
    console.log("Get student data is called")
    try {
      const res = await fetch("http://localhost:8080/profile/student", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        // credentials: "include", // <-- important if you're using cookies/login
      });

      const data = await res.json();
      // console.log("Student Data in student profile ->", data);

      if (!res.ok) {
        setError(data.message || "Failed to fetch data");
        return;
      }

      setStudent(data.student); // <-- store student data
    } catch (err) {
      console.log("This is error fron student Profile",err)
      setError("Server error, please try again later.");
    }
  };

  useEffect(() => {
    
    getStudentData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading student profile...
      </div>
    );
  }

  // --- Avatar Logic ---
  const firstLetter = student.name.charAt(0).toUpperCase();

  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-indigo-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-orange-600",
  ];

  const colorIndex = student.name.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <>
    <StudentNavbar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">

        {/* Profile Header */}
        <div className="flex items-center space-x-6">

          {/* Profile Photo or Dummy Avatar */}
          {student.photo ? (
            <img
              src={student.photo}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
            />
          ) : (
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-semibold ${avatarColor}`}
            >
              {firstLetter}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold">{student.name}</h1>
            <p className="text-gray-600 text-lg">{student.course} — Year {student.yearOfStudy}</p>
            <p className="text-gray-600">Hostel {student.hostelName}</p>
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="mt-10 grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Registration ID</p>
            <p className="font-semibold">{student.registrationId}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Course</p>
            <p className="font-semibold">{student.course}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Year of Study</p>
            <p className="font-semibold">{student.yearOfStudy}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{student.personalEmail}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-semibold">{student.phoneNumber}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Hostel Name</p>
            <p className="font-semibold">{student.hostelName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Room Number</p>
            <p className="font-semibold">{student.roomNumber}</p>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
