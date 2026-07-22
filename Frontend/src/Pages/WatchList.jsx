import React,{useEffect,useState,useContext} from "react";
import "./WatchList.css";
import {AuthContext} from "../context/authContext";
import {useNavigate} from "react-router-dom";

const shuffleArray=(array)=>[...array].sort(()=>Math.random()-0.5);

const WatchList=()=>{
  const [movies,setMovies]=useState([]);
  const [loading,setLoading]=useState(true);

  const {user,token}=useContext(AuthContext);
  const navigate=useNavigate();

  useEffect(()=>{

    if(!token){
      setLoading(false);
      return;
    }

    const fetchFavourites=async()=>{
      try{
        const response=await fetch(
          "https://cine-vaultt-2.onrender.com/api/favourites",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("FAVOURITES:", data);
        console.log("FIRST MOVIE:", data[0]);

        setMovies(data);

      }catch(error){
        console.log("Error fetching favourites:",error);
      }finally{
        setLoading(false);
      }
    };

    fetchFavourites();

  },[token]);


  const removeFromWatchlist=async(id)=>{
    try{
      await fetch(
        `https://cine-vaultt-2.onrender.com/api/favourites/remove/${id}`,
        {
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setMovies(prev=>prev.filter(movie=>movie._id!==id));

    }catch(error){
      console.log(error);
    }
  };


  if(!token){
    return(
      <div className="empty-state">
        <h2>Login to view your Watchlist 🔒</h2>
        <button onClick={()=>navigate("/login")}>
          Login
        </button>
      </div>
    );
  }


  if(loading){
    return(
      <div className="empty-state">
        <h2>Loading Watchlist...</h2>
      </div>
    );
  }


  return(
    <div className="watchlist-page">

      <div className="watchlist-header">
        <div>
          <h1 className="watchlist-heading">
            ❤️ My Watchlist
          </h1>

          <p>
            {movies.length} Movie{movies.length!==1?"s":""} Saved
          </p>
        </div>
      </div>


      {movies.length===0?(
        <div className="empty-state">
          <h2>Your Watchlist is Empty 🎬</h2>
          <p>
            Save your favourite movies and they'll appear here.
          </p>
        </div>
      ):(
        <div className="watchlist-grid">

          {movies.map(movie=>(
            <div className="movie-card" key={movie._id}>

              <div className="poster-container">

                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e)=>{
                    e.target.src=
                    "https://via.placeholder.com/500x750?text=No+Poster";
                  }}
                />

                <div className="movie-overlay">

                  <button
                    className="remove-btn"
                    onClick={()=>removeFromWatchlist(movie._id)}
                  >
                    Remove ❤️
                  </button>

                </div>

              </div>


              <div className="movie-info">

                <h3>{movie.title}</h3>

                <span>
                  📅 {movie.year||"N/A"}
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