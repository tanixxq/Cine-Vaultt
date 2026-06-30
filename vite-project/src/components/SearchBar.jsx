import React from "react";
import "./SearchBar.css";

const SearchBar = ({ search, setSearch }) => {
  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>
  );
};

export default SearchBar;