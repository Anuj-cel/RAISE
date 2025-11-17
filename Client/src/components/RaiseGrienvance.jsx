
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
const RaiseGrievance = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cleanliness");
  const [images, setImages] = useState([]);

  const [alertMessage, setAlertMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const showAlert = (message, success = false) => {
    setAlertMessage(message);
    setIsSuccess(success);
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("Please log in first to raise a grievance.");
      // Use setTimeout to allow alert to display before navigation
      setTimeout(() => navigate('/login/student'), 2000); 
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      showAlert("⚠️ You can upload a maximum of 5 images only!");
      e.target.value = "";
      return;
    }

    setImages(selectedFiles);
  };

  const submitGrievance = async (e) => {
    e.preventDefault();

    // Check for token again before submit (though useEffect handles initial check)
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("Authentication failed. Please log in again.");
      setTimeout(() => navigate('/login/student'), 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      images.forEach((img) => formData.append("images", img));

      // Note: Using dummy URL since the original was 'http://localhost:8080/api/grievances'
      const apiUrl = "http://localhost:8080/api/grievances"; 

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("🎉 Grievance submitted successfully! Redirecting...", true);
        setTitle("");
        setDescription("");
        setImages([]);
        setCategory("cleanliness");
        setTimeout(() => navigate("/student/dashboard"), 2000);
      } else {
        showAlert(data.message || "Failed to submit grievance");
        if (data.message === "Token invalid or expired") {
          localStorage.removeItem("token");
          // No need to redirect here, the useEffect handles it if token is removed
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      showAlert("An unexpected error occurred. Please try again.");
    }
  };

  // Custom Alert Modal Component
  const CustomAlert = ({ message, isSuccess, onClose }) => {
    if (!message) return null;

    const bgColor = isSuccess ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700";
    const icon = isSuccess ? "✅" : "❌";
    const title = isSuccess ? "Success" : "Error";

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className={`max-w-sm mx-auto p-4 rounded-xl shadow-2xl border ${bgColor}`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{icon}</span>
              <h3 className="text-lg font-bold">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-full hover:opacity-75 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <p className="mt-2 text-sm">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <StudentNavbar/> 
      {/* Assuming StudentNavbar exists, uncomment the line below when available */}
      {/* <StudentNavbar /> */}

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
        <div className="max-w-3xl mx-auto">
          {/* Form Container with modern styling */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Raise a New Grievance
            </h2>
            <p className="text-gray-500 mb-8 text-center">
              Please provide detailed information to help us resolve the issue quickly.
            </p>

            <form onSubmit={submitGrievance} className="space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Grievance Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="A concise summary of the issue (e.g., Leaky faucet in Room 301)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
              </div>

              {/* Description Textarea */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Describe the issue, its location, and when it started."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
                  required
                />
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
                >
                  <option value="cleanliness">Cleanliness</option>
                  <option value="security">Security</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                  Attach Images (Max 5)
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-150"
                />
              </div>

              {/* Preview selected images */}
              {images.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Image Previews:</p>
                  <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Grievance attachment ${i + 1}`}
                          className="w-24 h-24 object-cover rounded-md border-2 border-indigo-200 shadow-md transition duration-200 group-hover:opacity-80"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:scale-[1.01]"
              >
                Submit Grievance
              </button>
            </form>
          </div>
        </div>
      </div>

      <CustomAlert 
        message={alertMessage} 
        isSuccess={isSuccess} 
        onClose={closeAlert} 
      />
    </>
  );
};

export default RaiseGrievance;