import React from "react";
import "./Trending.css";
import { useNavigate } from "react-router-dom";

const Trending = ({ movies, search }) => {
  const navigate = useNavigate();

  return (
    <section className="trending">
      <h2>{search ? "Search Results 🔍" : "Trending Now 🔥"}</h2>

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
    </section>
  );
};

export default Trending;