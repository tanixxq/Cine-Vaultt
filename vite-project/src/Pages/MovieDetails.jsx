import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoviePages.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&i=${id}&plot=full`
        );

        const data = await res.json();

        if (data.Response === "False") {
          console.log(data.Error);
          return;
        }

        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [id]);

  const addToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];

    const alreadyExists = existing.find((m) => m.id === movie.imdbID);

    if (!alreadyExists) {
      const updated = [
        ...existing,
        {
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
        },
      ];

      localStorage.setItem("watchlist", JSON.stringify(updated));
      alert("Added to Watchlist ❤️");
    } else {
      alert("Already in Watchlist ⚡");
    }
  };

  if (!movie) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <div
      className="movie-hero"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#111827,#1f2937)",
      }}
    >
      <div className="details-container">
        <div className="details-card">
          <img src={movie.Poster} alt={movie.Title} />

          <div className="details-info">
            <h1>{movie.Title}</h1>

            <div className="rating">
              <span>⭐ IMDb {movie.imdbRating}</span>
            </div>

            <p>
              🍅 Rotten Tomatoes:{" "}
              {movie.Ratings?.find(
                (r) => r.Source === "Rotten Tomatoes"
              )?.Value || "N/A"}
            </p>

            <p className="overview">{movie.Plot}</p>

            <div className="meta">
              <p><b>Released:</b> {movie.Released}</p>
              <p><b>Runtime:</b> {movie.Runtime}</p>
              <p><b>Genre:</b> {movie.Genre}</p>
              <p><b>Language:</b> {movie.Language}</p>
              <p><b>Country:</b> {movie.Country}</p>
              <p><b>Director:</b> {movie.Director}</p>
              <p><b>Writer:</b> {movie.Writer}</p>
              <p><b>Actors:</b> {movie.Actors}</p>
              <p><b>Awards:</b> {movie.Awards}</p>
              <p><b>Box Office:</b> {movie.BoxOffice}</p>
              <p><b>Production:</b> {movie.Production || "N/A"}</p>
            </div>

            <div className="button-group">
              <button
                className="watchlist-btn"
                onClick={addToWatchlist}
              >
                ❤️ Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;