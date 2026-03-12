import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import favoriteController from "../controllers/favorite.controller.js";

const favRouter = express.Router();

/*
add movies to favorite || remove movies from favorite
Route : POST "/api/favorites/toogle"
*/

favRouter.post("/toggle", authMiddleware, favoriteController.toggleFavorite);

/*
fetch all fevorite movies
Route : GET "/api/favorites/"
*/
favRouter.get("/", authMiddleware, favoriteController.getFavorites);

/*
delete fevorite movies
Route : GET "/api/favorites/:id"
*/

favRouter.delete("/:id", authMiddleware, favoriteController.deleteFavorite);

export default favRouter;
