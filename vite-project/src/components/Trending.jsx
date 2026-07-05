import React from "react";
import "./Trending.css";
import { useNavigate } from "react-router-dom";

const Trending = ({ movies, search, loading }) => {
  const navigate = useNavigate();

  // Optional: remove movies with completely invalid poster values
  const validMovies = movies.filter((movie) => movie);

  return (
    <section className="trending">
      <h2>{search ? "Search Results 🔍" : "Featured Movies ⭐"}</h2>

      {loading ? (
        <div className="movie-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      ) : validMovies.length === 0 ? (
        <p className="no-results">No movies found 😕</p>
      ) : (
        <div className="movie-container">
          {validMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >
              <img
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.Title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Poster";
                }}
              />

              <h3>{movie.Title}</h3>
              <p>📅 {movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Trending;