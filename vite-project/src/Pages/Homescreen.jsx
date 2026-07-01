import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import MyPicks from "../components/MyPicks";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        let url = "";

        // Search API
        if (search.trim() !== "") {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&query=${search}`;
        }

        // Genre API
        else if (selectedGenre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&with_genres=${selectedGenre}`;
        }

        // Default trending movies
        else {
          url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results || []);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, [search, selectedGenre]);

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

      <Trending movies={movies} search={search} />

      <MyPicks />
    </div>
  );
};

export default HomeScreen;