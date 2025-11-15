import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const navigate = useNavigate();

  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, registrationId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      if (role === "student") {
        navigate("/student/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  const goToRegister = () => {
    navigate(`/register?role=${role}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          autoComplete="false"
          placeholder={role === "student" ? "Student RegistrationId" : "Admin StaffId"}
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded" 
         
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="mb-2">Don't have an account?</p>
        <button
          onClick={goToRegister}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
