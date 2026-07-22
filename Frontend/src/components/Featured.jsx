import React, { useState } from "react";
import "./featured.css";
import { useNavigate } from "react-router-dom";

const Featured = ({ movies, search, loading }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("default");

  let sortedMovies = [...movies];

  if (sortBy === "az") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortBy === "za") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortBy === "newest") {
    sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
  } else if (sortBy === "oldest") {
    sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
  }

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>{search ? "Search Results 🔍" : "Featured Movies ⭐"}</h2>

        {sortedMovies.length > 0 && (
          <select
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Relevance</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        )}
      </div>

      {loading ? (
        <div className="movie-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      ) : sortedMovies.length === 0 ? (
        <p className="no-results">No movies found 😕</p>
      ) : (
        <div className="movie-container">
          {sortedMovies.map((movie) => (
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

export default Featured;