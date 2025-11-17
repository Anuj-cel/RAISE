import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search by Student ID..." }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "250px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    />
  );
};

export default SearchBar;
