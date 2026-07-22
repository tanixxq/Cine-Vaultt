import React,{useState,useEffect,useContext} from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Featured from "../components/Featured";
import RecentlyViewed from "../components/RecentlyViewed";
import recommendations from "../data/recommendations";
import {AuthContext} from "../context/authContext";

const HomeScreen=()=>{

  const {user,token}=useContext(AuthContext);

  const [search,setSearch]=useState("");
  const [debouncedSearch,setDebouncedSearch]=useState("");
  const [movies,setMovies]=useState([]);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const [recentMovies,setRecentMovies]=useState([]);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setDebouncedSearch(search);
    },500);

    return()=>clearTimeout(timer);
  },[search]);

  useEffect(()=>{
    setPage(1);
  },[debouncedSearch]);


  useEffect(()=>{

    const fetchRecentlyViewed=async()=>{

      if(!user)return;

      try{
        const response=await fetch(
          "https://cine-vaultt-2.onrender.com/api/recently-viewed",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        const data=await response.json();
        setRecentMovies(data);

      }catch(error){
        console.log(error);
      }
    };

    fetchRecentlyViewed();

  },[user,token]);


  useEffect(()=>{

    async function fetchMovies(){

      setLoading(true);

      try{

        if(debouncedSearch.trim()){

          const res=await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${debouncedSearch}&page=${page}`
          );

          const data=await res.json();

          if(data.Response==="False"){
            setMovies([]);
            return;
          }

          if(page===1)
            setMovies(data.Search||[]);
          else
            setMovies(prev=>[...prev,...(data.Search||[])]);

        }else{

          const moviePromises=recommendations.map(movie=>
            fetch(
              `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${movie.imdbID}`
            ).then(res=>res.json())
          );

          setMovies(await Promise.all(moviePromises));
        }

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }

    }

    fetchMovies();

  },[debouncedSearch,page]);


  return(
    <div>

      <Hero/>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Featured
        movies={movies}
        loading={loading}
        search={debouncedSearch}
      />

      {!debouncedSearch&&(
        <RecentlyViewed
          movies={recentMovies}
          loading={false}
          user={user}
        />
      )}

      {!loading&&debouncedSearch&&movies.length>0&&(
        <button
          onClick={()=>setPage(prev=>prev+1)}
          className="see-more-btn"
        >
          See More
        </button>
      )}

    </div>
  );
};

export default HomeScreen;