import React, { useEffect, useState } from "react";
import "./WatchList.css";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const WatchList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setMovies(shuffleArray(saved));
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <div>
          <h1 className="watchlist-heading">❤️ My Watchlist</h1>
          <p>{movies.length} Movie{movies.length !== 1 ? "s" : ""} Saved</p>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="empty-state">
          <h2>Your Watchlist is Empty 🎬</h2>
          <p>Save your favourite movies and they'll appear here.</p>
        </div>
      ) : (
        <div className="watchlist-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="poster-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                <div className="rating-badge">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>

                <div className="movie-overlay">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove ❤️
                  </button>
                </div>
              </div>

              <div className="movie-info">
                <h3>{movie.title}</h3>

                <span>
                  📅{" "}
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;