import api from "../../api/axios";

const retryRequest = async (request, retries = 2, delay = 600) => {
  try {
    return await request();
  } catch (error) {
    if (retries <= 0) throw error;

    await new Promise((res) => setTimeout(res, delay));
    return retryRequest(request, retries - 1, delay);
  }
};

export const getTrendingMovies = () =>
  retryRequest(() => api.get("/api/tmdb/trending?page=1"));

export const getPopularMovies = () =>
  retryRequest(() => api.get("/api/tmdb/popular?page=1"));

export const getTVShows = () =>
  retryRequest(() => api.get("/api/tmdb/tv/popular?page=1"));

export const getMovieDetails = (id) =>
  retryRequest(() => api.get(`/api/tmdb/movie/${id}`));

export const getMovieTrailer = (id) =>
  retryRequest(() => api.get(`/api/tmdb/movie/${id}/trailer`));

export const searchMovie = (query) =>
  retryRequest(() => api.get(`/api/tmdb/search?query=${query}`));

export const getTVDetails = (id) =>
  retryRequest(() => api.get(`/api/tmdb/tv/${id}`));

export const getTVTrailer = (id) =>
  retryRequest(() => api.get(`/api/tmdb/tv/${id}/trailer`));
