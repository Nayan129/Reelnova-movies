import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 20000,
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

// Trending Movies
async function fetchTrendingMovies(page = 1) {
  const response = await tmdb.get("/trending/movie/week", {
    params: { page },
  });

  return response.data;
}

// Search Movies
async function searchMovies(query, page = 1) {
  const response = await tmdb.get("/search/movie", {
    params: { query, page },
  });

  return response.data;
}

// Popular Movies
async function fetchPopularMovies(page = 1) {
  const response = await tmdb.get("/movie/popular", {
    params: { page },
  });

  return response.data;
}

// Movie Details
async function fetchMovieDetails(movieId) {
  const response = await tmdb.get(`/movie/${movieId}`);

  return response.data;
}

// Movie Trailer
async function fetchMovieTrailer(movieId) {
  const response = await tmdb.get(`/movie/${movieId}/videos`);

  return response.data;
}

// TV Shows
async function fetchPopularTV(page = 1) {
  const response = await tmdb.get("/tv/popular", {
    params: { page },
  });

  return response.data;
}

// Search Actors
async function searchPeople(query, page = 1) {
  const response = await tmdb.get("/search/person", {
    params: { query, page },
  });

  return response.data;
}

export default {
  fetchTrendingMovies,
  searchMovies,
  fetchPopularMovies,
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchPopularTV,
  searchPeople,
};
