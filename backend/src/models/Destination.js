const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      default: "Easy",
    },

    bestSeason: {
      type: String,
      required: true,
    },

    priceNPR: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    // Important for understanding natural-language searches
    categories: {
      type: [String],
      default: [],
    },

    keywords: {
      type: [String],
      default: [],
    },

    activities: {
      type: [String],
      default: [],
    },

    // Useful for searches such as "romantic", "peaceful", "family"
    suitableFor: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Destination", destinationSchema);