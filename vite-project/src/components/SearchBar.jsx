import React from 'react'
import './SearchBar.css'
const SearchBar = () => {
  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="Search movies, actors, directors..."
      />
      <button>Search</button>
    </section>
  )
}

export default SearchBar