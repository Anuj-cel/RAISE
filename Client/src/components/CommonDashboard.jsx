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

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">

      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Hostel"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 
              ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Dark Transparent Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Foreground Content */}
      <div className="relative text-center text-white">
        <h1 className="text-4xl font-bold mb-140">
          Hostel Grievance Redressal System
        </h1>

        
      </div>
    </div>
  );
};

export default CommonDashboard;
