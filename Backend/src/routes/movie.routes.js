import express from "express";
import movieController from "../controllers/movie.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const movieRouter = express.Router();

/**
 * Routes : create , update and delete movies those which created by user
 */
movieRouter.post("/create", authMiddleware, movieController.createMovie);
movieRouter.get("/", authMiddleware, movieController.getAllMovies);
movieRouter.get("/:id", authMiddleware, movieController.getSingleMovie);
movieRouter.patch("/:id", authMiddleware, movieController.updateMovie);
movieRouter.delete("/:id", authMiddleware, movieController.deleteMovie);

export default movieRouter;
