import React, { useEffect, useState } from "react";
import "./Trending.css";

const Trending = ({ search }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        let url = "";

        if (search && search.trim() !== "") {
          // 🔍 SEARCH API (your requirement)
          url = `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&query=${search}`;
        } else {
          // 🔥 TRENDING API
          url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setMovies(data?.results || []);
      } catch (error) {
        console.log("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search]); // 🔥 runs whenever user types

  return (
    <section className="trending">
      <h2>{search ? "Search Results 🔍" : "Trending Now 🔥"}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300"
                }
                alt={movie.title || movie.name}
              />

              <h3>{movie.title || movie.name}</h3>
              <p>⭐ {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Trending;