import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Load auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  const commonLinks = [{ path: "/", label: "Home" }];

  const studentLinks = [
    { path: "/student/raiseGrievance", label: "Raise Grievance" },
    { path: "/student/dashboard", label: "My Grievances" },
    { path: "/student/profile", label: "Profile" },
  ];

  const adminLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/all-grievances", label: "All Grievances" },
    { path: "/students", label: "Manage Students" },
  ];

  const guestLinks = [
    // { path: "/login/student", label: "Login" },
    { path: "/login/student", label: <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Student Login</button> },
    { path: "/login/admin", label: <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Admin Login</button> },
    // { path: "/signup", label: "Signup" },
  ];

  const linksToShow = isAuthenticated
    ? role === "admin"
      ? [...commonLinks, ...adminLinks]
      : [...commonLinks, ...studentLinks]
    : [...commonLinks, ...guestLinks];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🎓 Grievance Portal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {linksToShow.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="space-y-2 px-4 py-3">
            {linksToShow.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
