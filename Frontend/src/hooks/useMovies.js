import { useEffect, useState } from "react";
import { fetchTrendingMovies, searchMovies } from "../Services/tmdb";

export const useMovies = (search) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let data;

      if (search && search.trim() !== "") {
        data = await searchMovies(search); // 🔍 LIVE SEARCH
      } else {
        data = await fetchTrendingMovies(); // 🔥 DEFAULT
      }

      setMovies(data);
      setLoading(false);
    };

    load();
  }, [search]); // 🔥 runs every time you type

  return { movies, loading };
};