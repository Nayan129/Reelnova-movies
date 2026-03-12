import favoriteModel from "../models/favorite.model.js";

async function toggleFavorite(req, res) {
  try {
    const userId = req.user.id;

    const { tmdbId, title, poster } = req.body;

    const existingFavorite = await favoriteModel.findOne({
      userId,
      tmdbId,
    });

    // movie already favorite → remove
    if (existingFavorite) {
      await favoriteModel.deleteOne({
        userId,
        tmdbId,
      });

      return res.status(200).json({
        message: "removed from favorites",
        action: "removed",
      });
    }

    // movie not favorite → add
    const favorite = await favoriteModel.create({
      userId,
      tmdbId,
      title,
      poster,
    });

    res.status(201).json({
      message: "added to favorites",
      action: "added",
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getFavorites(req, res) {
  try {
    const userId = req.user.id;

    const allFavorites = await favoriteModel.find({ userId });

    res.status(200).json({
      message: "fetched all favorite movies ✅",
      allFavorites,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteFavorite(req, res) {
  try {
    const { id } = req.params;

    await favoriteModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "favorite removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
export default {
  toggleFavorite,
  getFavorites,
  deleteFavorite,
};
