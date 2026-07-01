import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import MyPicks from "../components/MyPicks";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when search / genre changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedGenre]);

  // Fetch movies
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
  
      try {
        // fetch logic
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchMovies();
  }, [debouncedSearch, selectedGenre, page]);

  return (
    <div>
      <Navbar />
      <Hero />

      <SearchBar search={search} setSearch={setSearch} />

      <div className="genre-bar">
        <button onClick={() => setSelectedGenre(null)}>All</button>
        <button onClick={() => setSelectedGenre(28)}>Action</button>
        <button onClick={() => setSelectedGenre(27)}>Horror</button>
        <button onClick={() => setSelectedGenre(53)}>Thriller</button>
        <button onClick={() => setSelectedGenre(35)}>Comedy</button>
        <button onClick={() => setSelectedGenre(878)}>Sci-Fi</button>
      </div>

      <Trending movies={movies} search={debouncedSearch} />

      <button
        onClick={() => setPage((prev) => prev + 1)}
        style={{
          display: "block",
          margin: "30px auto",
          padding: "15px 30px",
          backgroundColor: "#e50914",
          color: "white",
          fontSize: "18px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        See More
      </button>

      <MyPicks />
    </div>
  );
};

export default HomeScreen;