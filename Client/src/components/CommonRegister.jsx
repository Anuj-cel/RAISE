import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const CommonRegister = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student"; // default to student
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    email: "",       // For admin only
    password: "",
    confirmPassword: "",

    // Student fields
    registrationId: "",
    course: "",
    yearOfStudy: "",
    personalEmail: "",
    phoneNumber: "",
    hostelName: "",
    roomNumber: "",

    // Admin fields
    staffId: "",
    designation: "",   // chief warden, warden, supervisor, system admin
    adminPhoneNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate required fields depending on role
    if (role === "student") {
      const requiredStudentFields = [
        "name",
        "registrationId",
        "course",
        "yearOfStudy",
        "personalEmail",
        "hostelName",
        "roomNumber",
        "password",
      ];
      for (const field of requiredStudentFields) {
        if (!formData[field]) {
          setError(`Please fill in ${field}`);
          return;
        }
      }
    } else if (role === "admin") {
      const requiredAdminFields = [
        "name",
        "staffId",
        "designation",
        "email",
        "adminPhoneNumber",
        "password",
      ];
      for (const field of requiredAdminFields) {
        if (!formData[field]) {
          setError(`Please fill in ${field}`);
          return;
        }
      }
    } else {
      setError("Invalid role");
      return;
    }

    setLoading(true);

    // Prepare body according to role
    let body = {};
    if (role === "student") {
      body = {
        role,
        name: formData.name,
        registrationId: formData.registrationId,
        course: formData.course,
        yearOfStudy: Number(formData.yearOfStudy),
        personalEmail: formData.personalEmail,
        phoneNumber: formData.phoneNumber,
        hostelName: formData.hostelName,
        roomNumber: formData.roomNumber,
        password: formData.password,
      };
    } else {
      // admin
      body = {
        role,
        name: formData.name,
        staffId: formData.staffId,
        designation: formData.designation,
        hostelName: formData.hostelName,
        phoneNumber: formData.adminPhoneNumber,
        email: formData.email,
        password: formData.password,
      };
    }

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      // Redirect
      if (role === "student") {
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Server error, please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        {role.charAt(0).toUpperCase() + role.slice(1)} Registration
      </h2>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {role === "student" && (
          <>
            <input
              type="text"
              name="registrationId"
              placeholder="Registration ID"
              value={formData.registrationId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="course"
              placeholder="Course (e.g. B.Tech)"
              value={formData.course}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="yearOfStudy"
              placeholder="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              min={1}
              max={4}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="email"
              name="personalEmail"
              placeholder="Personal Email"
              value={formData.personalEmail}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number (optional)"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="hostelName"
              placeholder="Hostel Name (e.g. A)"
              value={formData.hostelName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </>
        )}

        {role === "admin" && (
          <>
            <input
              type="text"
              name="staffId"
              placeholder="Staff ID"
              value={formData.staffId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Designation</option>
              <option value="chief warden">Chief Warden</option>
              <option value="warden">Warden</option>
              <option value="supervisor">Supervisor</option>
              <option value="system admin">System Admin</option>
            </select>

            <input
              type="text"
              name="hostelName"
              placeholder="Hostel Name (e.g. A)"
              value={formData.hostelName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="adminPhoneNumber"
              placeholder="Phone Number"
              value={formData.adminPhoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </>
        )}

        {/* Passwords */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default CommonRegister;
