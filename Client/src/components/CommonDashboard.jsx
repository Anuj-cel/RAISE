
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommonDashboard = () => {
  const navigate = useNavigate();

  // Add your hostel images here (place inside public/images/)
  const images = [
    "/images/hostel-1.png",
    "/images/hostel-2.jpg",
    "/images/hostel-3.jpg",
  ];

  const [index, setIndex] = useState(0);

  // Function to handle navigation to the Admin Login page
  const goToAdminLogin = () => {
    navigate("/login/admin");
  };

  // Function to handle navigation to the Student Login page
  const goToStudentLogin = () => {
    navigate("/login/student");
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden font-inter">

      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Hostel"
            // Use a placeholder if the image fails to load
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x1080/4F46E5/FFFFFF?text=Hostel+View"; }}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 
              ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Dark Transparent Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navigation Buttons (Top Right) */}
      <div className="absolute top-6 right-6 z-30 space-x-4">
        <button 
          onClick={goToAdminLogin}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Admin Login
        </button>
        <button 
          onClick={goToStudentLogin}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Student Login
        </button>
      </div>

      {/* Foreground Content (Centered) */}
      <div className="relative text-center text-white z-20 p-8 bg-gray-900/40 rounded-xl backdrop-blur-sm shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Hostel Grievance Redressal System
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-80 mt-2">
          Simplifying the process for students and administrators.
        </p>
      </div>
    </div>
  );
};

export default CommonDashboard;