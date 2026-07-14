import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import recommendations from "../data/recommendations";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      try {
        // SEARCH
        if (debouncedSearch.trim()) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${
              import.meta.env.VITE_OMDB_API_KEY
            }&s=${debouncedSearch}&page=${page}`
          );

          const data = await res.json();

          if (data.Response === "False") {
            setMovies([]);
            return;
          }

          if (page === 1) {
            setMovies(data.Search || []);
          } else {
            setMovies((prev) => [...prev, ...(data.Search || [])]);
          }
        }

        // HOME PAGE RECOMMENDATIONS
        else {
          const moviePromises = recommendations.map((movie) =>
            fetch(
              `https://www.omdbapi.com/?apikey=${
                import.meta.env.VITE_OMDB_API_KEY
              }&i=${movie.imdbID}`
            ).then((res) => res.json())
          );

          const data = await Promise.all(moviePromises);

          setMovies(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedSearch, page]);

  return (
    <div>
      <Navbar />

      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Trending
        movies={movies}
        loading={loading}
        search={debouncedSearch}
      />

      {!loading && debouncedSearch && movies.length > 0 && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{
            display: "block",
            margin: "30px auto",
            padding: "15px 30px",
            background: "#e50914",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          See More
        </button>
      )}
    </div>
  );
};

export default HomeScreen;