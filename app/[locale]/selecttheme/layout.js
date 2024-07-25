"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbars/ThemeNavbar";
import SelectTheme from "./page";

function ThemeLayout({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ free: false, premium: false });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  console.log("Search Query:", searchQuery);
  console.log("Filters:", filters);

  return (
    <div className="bg-blueGray-800 text-white">
      <Navbar onSearch={handleSearch} onFilter={handleFilter} />
      {React.cloneElement(children, { searchQuery, filters })}
    </div>
  );
}

export default ThemeLayout;
