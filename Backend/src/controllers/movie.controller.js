import movieModel from "../models/movie.model.js";

async function createMovie(req, res) {
  try {
    const {
      title,
      description,
      poster,
      genre,
      rating,
      releaseYear,
      trailer,
      category,
    } = req.body;

    const userId = req.user.id;

    const movie = await movieModel.create({
      title,
      description,
      poster,
      genre,
      rating,
      releaseYear,
      trailer,
      category,
      createdBy: userId,
    });

    res.status(201).json({
      message: "movie created successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// fetch all movies by find method
async function getAllMovies(req, res) {
  try {
    const movies = await movieModel
      .find()
      .populate("createdBy", "username email role")
      .lean();

    res.status(200).json({
      message: "movies fetched successfully",
      total: movies.length,
      movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// get single movie by movieId 
async function getSingleMovie(req, res) {
  try {
    const movieId = req.params.id;

    const movie = await movieModel
      .findById(movieId)
      .populate("createdBy", "username email role")
      .lean();

    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    res.status(200).json({
      message: "movie fetched successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// update movie
async function updateMovie(req, res) {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const movie = await movieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    if (movie.createdBy.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({
        message: "not authorized to update this movie",
      });
    }

    const updatedMovie = await movieModel
      .findByIdAndUpdate(movieId, req.body, {
        new: true,
      })
      .populate("createdBy", "username email role")
      .lean();

    res.status(200).json({
      message: "movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// delete movie created by user/admin
async function deleteMovie(req, res) {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const movie = await movieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    if (movie.createdBy.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({
        message: "not authorized to delete this movie",
      });
    }

    await movieModel.findByIdAndDelete(movieId);

    res.status(200).json({
      message: "movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default {
  createMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
  deleteMovie,
};
