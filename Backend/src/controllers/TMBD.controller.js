import tmdbService from "../services/TMBD.services.js";

// get this weeks trending Movies from TMDB Api
async function getTrendingMovies(req, res) {
  try {
    const page = req.query.page || 1;

    const data = await tmdbService.fetchTrendingMovies(page);

    res.status(200).json({
      message: "Trending movies fetched successfully",
      page: data.page,
      totalPages: data.total_pages,
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// search movies on TMDB Api
async function searchMovies(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page || 1;

    const data = await tmdbService.searchMovies(query, page);

    res.status(200).json({
      message: "Search results",
      movies: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Fetch Popular Movie
async function getPopularMovies(req, res) {
  try {
    const page = req.query.page || 1;
    const data = await tmdbService.fetchPopularMovies(page);

    res.status(200).json({
      message: "Popular movies fetched successfully",
      page: data.page,
      totalPages: data.total_pages,
      movies: data.results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// fetch Movies Detail
async function getMovieDetails(req, res) {
  try {
    const movieId = req.params.id;

    const data = await tmdbService.fetchMovieDetails(movieId);

    res.status(200).json({
      message: "Movie details fetched successfully",
      movie: data,
    });
  } catch (error) {
    console.error("MOVIE DETAILS ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
}

// Movie trailer fetch and youtube link
async function getMovieTrailer(req, res) {
  try {
    const movieId = req.params.id;

    const data = await tmdbService.fetchMovieTrailer(movieId);

    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );

    res.status(200).json({
      trailer: trailer ? trailer.key : null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Popular TV shows Fetch
async function getPopularTV(req, res) {
  try {
    const page = req.query.page || 1;

    const data = await tmdbService.fetchPopularTV(page);

    res.status(200).json({
      message: "Popular TV shows fetched successfully",
      tvShows: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// search actor by API
async function searchPeople(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page || 1;

    const data = await tmdbService.searchPeople(query, page);

    res.status(200).json({
      message: "People search results",
      people: data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default {
  getTrendingMovies,
  searchMovies,
  getPopularMovies,
  getMovieDetails,
  getMovieTrailer,
  getPopularTV,
  searchPeople,
};
