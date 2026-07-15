import React, { useEffect, useState } from "react";
import "./WatchList.css";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const WatchList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/favourites");
        const data = await response.json();

        setMovies(shuffleArray(data));
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  const removeFromWatchlist = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/favourites/remove/${id}`, {
        method: "DELETE",
      });

      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <div>
          <h1 className="watchlist-heading">❤️ My Watchlist</h1>
          <p>
            {movies.length} Movie{movies.length !== 1 ? "s" : ""} Saved
          </p>
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
            <div className="movie-card" key={movie._id}>
              <div className="poster-container">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500x750?text=No+Poster";
                  }}
                />

                <div className="movie-overlay">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWatchlist(movie._id)}
                  >
                    Remove ❤️
                  </button>
                </div>
              </div>

              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span>📅 {movie.year || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;