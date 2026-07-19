import React from "react";
import "./RecentlyViewed.css";
import { useNavigate } from "react-router-dom";

const RecentlyViewed = ({ movies, loading }) => {
  const navigate = useNavigate();

  return (
    <section className="recently-viewed-section">
      <div className="recently-viewed-header">
        <h2>🕒 Recently Viewed</h2>
      </div>

      {loading ? (
        <div className="recently-viewed-container">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <p className="no-results">
          You haven't viewed any movies yet.
        </p>
      ) : (
        <div className="recently-viewed-container">
          {movies.map((movie) => (
            <div
              key={movie.omdbID || movie.imdbID}
              className="movie-card"
              onClick={() =>
                navigate(`/movie/${movie.omdbID || movie.imdbID}`)
              }
            >
              <img
                src={
                  movie.Poster || movie.Poster
                    ? movie.poster || movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.title || movie.Title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Poster";
                }}
              />

              <h3>{movie.title || movie.Title}</h3>

              <p>📅 {movie.year || movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyViewed;