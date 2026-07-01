import React from "react";
import "./Trending.css";
import { useNavigate } from "react-router-dom";

const Trending = ({ movies, search, loading }) => {
  const navigate = useNavigate();

  return (
    <section className="trending">
      <h2>{search ? "Search Results 🔍" : "Trending Now 🔥"}</h2>

      {loading ? (
        <div className="movie-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <p className="no-results">No movies found 😕</p>
      ) : (
        <div className="movie-container">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300"
                }
                alt={movie.title}
              />

              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Trending;