import historyModel from "../models/history.model.js";

async function addHistory(req, res) {
  try {
    const userId = req.user.id;
    const { tmdbId, title, poster } = req.body;

    const existingHistory = await historyModel.findOne({
      userId,
      tmdbId,
    });

    // movie already in history then update timestamp
    if (existingHistory) {
      existingHistory.updatedAt = new Date();
      await existingHistory.save();

      return res.status(200).json({
        message: "history updated",
      });
    }

    // movie not in history then we create new
    await historyModel.create({
      userId,
      tmdbId,
      title,
      poster,
    });

    res.status(201).json({
      message: "movie added to history",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getHistory(req, res) {
  try {
    const userId = req.user.id;

    const history = await historyModel.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      history,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function clearHistory(req, res) {
  try {
    const userId = req.user.id;

    const result = await historyModel.deleteMany({ userId });

    res.status(200).json({
      message: "history cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteHistory(req, res) {
  try {
    const { id } = req.params;

    await historyModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "history removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default {
  addHistory,
  getHistory,
  clearHistory,
  deleteHistory,
};
