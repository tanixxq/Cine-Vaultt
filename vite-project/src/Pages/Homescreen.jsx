import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import MyRecommendations from "../components/MyRecommendations";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page whenever a new search starts
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Fetch only when searching
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setMovies([]);
      return;
    }

    async function fetchMovies() {
      setLoading(true);

      try {
        const url = `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${debouncedSearch}&page=${page}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "False") {
          if (page === 1) {
            setMovies([]);
          }
          return;
        }

        if (page === 1) {
          setMovies(data.Search || []);
        } else {
          setMovies((prev) => [...prev, ...(data.Search || [])]);
        }
      } catch (error) {
        console.log("FETCH ERROR:", error);
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

      <SearchBar search={search} setSearch={setSearch} />

      {debouncedSearch ? (
        <>
          {loading ? (
            <h2
              style={{
                textAlign: "center",
                color: "white",
                marginTop: "30px",
              }}
            >
              Loading movies...
            </h2>
          ) : (
            <Trending
              movies={movies}
              search={debouncedSearch}
              loading={loading}
            />
          )}

          {!loading && movies.length > 0 && (
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
          )}
        </>
      ) : (
        <MyRecommendations />
      )}
    </div>
  );
};

export default HomeScreen;