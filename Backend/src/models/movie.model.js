import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "Description not available",
    },

    poster: {
      type: String,
      default: "https://via.placeholder.com/300x450?text=No+Poster",
    },

    genre: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    trailer: {
      type: String,
      default: "Trailer not available",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
