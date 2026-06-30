const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchTrendingMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data?.results || [];
};

export const searchMovies = async (query) => {
  if (!query.trim()) return [];

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data?.results || [];
};