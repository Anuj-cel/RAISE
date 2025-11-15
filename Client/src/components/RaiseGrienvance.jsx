import React, { useState } from "react";

const RaiseGrievance = ({ token, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("cleanliness");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("⚠️ You can upload a maximum of 5 images only!");
      e.target.value = "";
      return;
    }

    setImages(selectedFiles);
  };

  const submitGrievance = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        alert("Please login first!");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("http://localhost:8080/api/grievances", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Grievance submitted successfully!");
        setTitle("");
        setDescription("");
        setImages([]);
        setCategory("cleanliness");
        onSuccess && onSuccess(); // refresh grievances
      } else {
        alert(data.message || "Failed to submit grievance");
        if (data.message === "Token invalid or expired") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <form
      onSubmit={submitGrievance}
      className="border rounded-lg p-4 shadow-md mb-8 bg-white"
    >
      <h2 className="text-xl font-semibold mb-3">Submit a Grievance</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="cleanliness">Cleanliness</option>
        <option value="security">Security</option>
        <option value="maintenance">Maintenance</option>
        <option value="other">Other</option>
      </select>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full mb-3 rounded"
      />

      {/* Preview selected images */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Grievance
      </button>
    </form>
  );
};

export default RaiseGrievance;
