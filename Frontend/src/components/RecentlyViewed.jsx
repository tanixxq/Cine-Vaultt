import React from "react";
import "./RecentlyViewed.css";
import {useNavigate} from "react-router-dom";

const RecentlyViewed=({movies,loading,user})=>{
  const navigate=useNavigate();

  if(!user){
    return(
      <section className="recently-viewed-section">
        <div className="recently-viewed-header">
          <h2>🕒 Recently Viewed</h2>
        </div>

        <p className="no-results">
          Login to save your recently viewed movies 🔒
        </p>

        <button onClick={()=>navigate("/login")}>
          Login
        </button>
      </section>
    );
  }

  return(
    <section className="recently-viewed-section">
      <div className="recently-viewed-header">
        <h2>🕒 Recently Viewed</h2>
      </div>

      {loading?(
        <div className="recently-viewed-container">
          {[...Array(5)].map((_,index)=>(
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      ):movies.length===0?(
        <p className="no-results">
          You haven't viewed any movies yet.
        </p>
      ):(
        <div className="recently-viewed-container">
          {movies.map(movie=>(
            <div
              key={movie.omdbID}
              className="movie-card"
              onClick={()=>navigate(`/movie/${movie.omdbID}`)}
            >
              <img
                src={movie.poster||"https://via.placeholder.com/300x450?text=No+Poster"}
                alt={movie.title}
                onError={(e)=>{
                  e.target.src="https://via.placeholder.com/300x450?text=No+Poster";
                }}
              />

              <h3>{movie.title}</h3>
              <p>📅 {movie.year}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyViewed;