import React, { useEffect, useState } from "react";
import recommendations from "../data/recommendations";
import { useNavigate } from "react-router-dom";
import "./Trending.css";

const MyRecommendations = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const moviePromises = recommendations.map((movie) =>
          fetch(
            `https://www.omdbapi.com/?apikey=${
              import.meta.env.VITE_OMDB_API_KEY
            }&i=${movie.imdbID}`
          ).then((res) => res.json())
        );

        const data = await Promise.all(moviePromises);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRecommendations();
  }, []);

  return (
    <section className="trending">
      <h2>🍿 CineVault picks</h2>

      <div className="movie-container">
        {movies.map((movie) => (
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
            />

            <h3>{movie.Title}</h3>
            <p>📅 {movie.Year}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyRecommendations;