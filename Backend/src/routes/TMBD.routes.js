import express from "express";
import tmdbController from "../controllers/TMBD.controller.js";

const tmdbRouter = express.Router();

tmdbRouter.get("/trending", tmdbController.getTrendingMovies);
tmdbRouter.get("/search", tmdbController.searchMovies);
tmdbRouter.get("/popular", tmdbController.getPopularMovies);
tmdbRouter.get("/movie/:id", tmdbController.getMovieDetails);
tmdbRouter.get("/movie/:id/trailer", tmdbController.getMovieTrailer);
tmdbRouter.get("/tv/popular", tmdbController.getPopularTV);
tmdbRouter.get("/search/people", tmdbController.searchPeople);

export default tmdbRouter;
