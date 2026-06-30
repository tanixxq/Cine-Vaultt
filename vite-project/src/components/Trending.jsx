import React, { useEffect, useState } from "react";
import "./Trending.css";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        console.log("fetch started");

        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );

        const data = await response.json();
        console.log("movie data:", data);

        setMovies(data?.results || []);
      } catch (error) {
        console.log("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <section className="trending">
      <h2>Trending Now 🔥</h2>

      {loading ? (
        <p>Loading movies...</p>
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
                alt={movie.title}
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