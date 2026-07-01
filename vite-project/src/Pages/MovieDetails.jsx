import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoviePages.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const addToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];
  
    const alreadyExists = existing.find((m) => m.id === movie.id);
  
    if (!alreadyExists) {
      const updated = [
        ...existing,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        },
      ];
  
      localStorage.setItem("watchlist", JSON.stringify(updated));
      alert("Added to Watchlist ❤️");
    } else {
      alert("Already in Watchlist ⚡");
    }
  };


  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();
      setMovie(data);
    }

    fetchMovie();
  }, [id]);

  // Fetch trailer
  const fetchTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await res.json();

    const trailerVideo = data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    setTrailer(trailerVideo);
    setShowTrailer(true);
  };

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div
      className="movie-hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="overlay"></div>

      <div className="details-container">
        <div className="details-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="details-info">
            
            <h1>{movie.title}</h1>

            <div className="rating">
              <span>⭐ {movie.vote_average}</span>
              <div className="rating-bar">
                <div
                  className="rating-fill"
                  style={{ width: `${movie.vote_average * 10}%` }}
                />
              </div>
            </div>

            <p className="overview">{movie.overview}</p>

            <div className="meta">
              <p><b>Release:</b> {movie.release_date}</p>
              <p><b>Runtime:</b> {movie.runtime} min</p>
              <p><b>Status:</b> {movie.status}</p>
              <p><b>Language:</b> {movie.original_language}</p>
            </div>

            <p className="genres">
              <b>Genres:</b>{" "}
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <div className="button-group">
            <button className="trailer-btn" onClick={fetchTrailer}>
              ▶ Watch Trailer
            </button>
            <button className="watchlist-btn" onClick={addToWatchlist}>
  ❤️ Add to Watchlist
</button>
</div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;