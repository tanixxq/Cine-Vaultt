import React, { useEffect, useState } from "react";
import "./WatchList.css";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const WatchList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];

    // shuffle ONLY once when loading
    const shuffled = shuffleArray(saved);

    setMovies(shuffled);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="watchlist-page">
      <h1>❤️ My Watchlist</h1>

      {movies.length === 0 ? (
        <p>No movies added yet 😢</p>
      ) : (
        <div className="watchlist-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="movie-info">
                <h3>{movie.title}</h3>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;