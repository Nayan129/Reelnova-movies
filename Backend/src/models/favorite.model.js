import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    tmdbId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const favoriteModel = mongoose.model("favorite", favoriteSchema);

export default favoriteModel;
