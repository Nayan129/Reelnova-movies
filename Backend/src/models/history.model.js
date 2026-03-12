import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    tmdbId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    poster: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

//  prevent duplicate history for same movie & user
historySchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

const historyModel = mongoose.model("History", historySchema);

export default historyModel;
