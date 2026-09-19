const dns = require("dns");

// Use public DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Destination = require("./models/Destination");
const Booking = require("./models/booking");

// IMPORTANT: Routes folder has capital R
const authRoutes = require("./Routes/auth");

const { protect, adminOnly } = require("./middleware/authMiddleware");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// AUTH ROUTES
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// ===============================
// HOME / TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "EasyTravel Backend API is running",
  });
});

// ===============================
// GET ALL DESTINATIONS
// ===============================

app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find().sort({
      createdAt: -1,
    });

    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);

    res.status(500).json({
      message: "Failed to fetch destinations",
      error: error.message,
    });
  }
});

// ===============================
// AI / RULE-BASED RECOMMENDATION
// ===============================

app.post("/api/recommendations", async (req, res) => {
  try {
    const {
      wish = "",
      budget = "",
      region = "",
      difficulty = "",
      season = "",
    } = req.body;

    const destinations = await Destination.find();

    if (!destinations.length) {
      return res.status(404).json({
        message: "No destinations found",
      });
    }

    // --------------------------------
    // Normalize user input
    // --------------------------------

    const normalizedWish = String(wish)
      .toLowerCase()
      .trim();

    const normalizedBudget = String(budget)
      .toLowerCase()
      .trim();

    const normalizedRegion = String(region)
      .toLowerCase()
      .trim();

    const normalizedDifficulty = String(difficulty)
      .toLowerCase()
      .trim();

    const normalizedSeason = String(season)
      .toLowerCase()
      .trim();

    // --------------------------------
    // Words that should be ignored
    // --------------------------------

    const ignoredWords = new Set([
      "i",
      "want",
      "a",
      "an",
      "the",
      "to",
      "go",
      "visit",
      "travel",
      "trip",
      "place",
      "destination",
      "in",
      "for",
      "with",
      "and",
      "or",
      "my",
      "me",
      "some",
      "somewhere",
      "looking",
      "look",
      "like",
      "would",
      "love",
      "prefer",
      "need",
      "wanting",
    ]);

    // --------------------------------
    // Synonyms
    // --------------------------------

    const synonymGroups = {
      mountain: [
        "mountain",
        "mountains",
        "mount",
        "himalaya",
        "himalayan",
        "peak",
        "peaks",
      ],

      lake: [
        "lake",
        "lakes",
        "water",
        "waterfall",
      ],

      temple: [
        "temple",
        "temples",
        "spiritual",
        "religious",
        "religion",
        "holy",
      ],

      culture: [
        "culture",
        "cultural",
        "heritage",
        "history",
        "historical",
        "traditional",
      ],

      adventure: [
        "adventure",
        "adventurous",
        "exciting",
        "thrill",
        "thrilling",
        "extreme",
      ],

      trekking: [
        "trek",
        "trekking",
        "hike",
        "hiking",
        "walking",
        "trail",
        "trails",
      ],

      peaceful: [
        "peaceful",
        "peace",
        "quiet",
        "relax",
        "relaxing",
        "calm",
        "serene",
      ],

      romantic: [
        "romantic",
        "romance",
        "couple",
        "couples",
        "honeymoon",
        "love",
      ],

      wildlife: [
        "wildlife",
        "animals",
        "animal",
        "jungle",
        "safari",
        "nature",
      ],

      city: [
        "city",
        "cities",
        "urban",
        "town",
      ],

      nature: [
        "nature",
        "natural",
        "scenery",
        "landscape",
        "beautiful",
        "beauty",
        "greenery",
      ],

      family: [
        "family",
        "families",
        "children",
        "kids",
        "child",
      ],

      cheap: [
        "cheap",
        "budget",
        "affordable",
        "low",
        "inexpensive",
      ],
    };

    // --------------------------------
    // Expand wish words
    // --------------------------------

    const wishWords = normalizedWish
      .split(/[\s,.-]+/)
      .filter((word) => word && !ignoredWords.has(word));

    const expandedWishWords = new Set(wishWords);

    wishWords.forEach((word) => {
      Object.values(synonymGroups).forEach((group) => {
        if (group.includes(word)) {
          group.forEach((synonym) => {
            expandedWishWords.add(synonym);
          });
        }
      });
    });

    // --------------------------------
    // Score destinations
    // --------------------------------

    const scoredDestinations = destinations.map(
      (destination) => {
        let score = 0;

        const searchableText = [
          destination.name,
          destination.description,
          destination.location,
          destination.region,
          destination.difficulty,
          destination.bestSeason,

          ...(destination.categories || []),
          ...(destination.keywords || []),
          ...(destination.activities || []),
          ...(destination.suitableFor || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        // --------------------------------
        // Wish matching
        // --------------------------------

        expandedWishWords.forEach((word) => {
          if (searchableText.includes(word)) {
            score += 5;
          }
        });

        // --------------------------------
        // Category matching
        // --------------------------------

        Object.entries(synonymGroups).forEach(
          ([category, words]) => {
            const userWantsCategory = wishWords.some(
              (word) => words.includes(word)
            );

            if (!userWantsCategory) return;

            if (
              destination.categories?.some((item) =>
                words.includes(String(item).toLowerCase())
              )
            ) {
              score += 10;
            }

            if (
              destination.keywords?.some((item) =>
                words.includes(String(item).toLowerCase())
              )
            ) {
              score += 8;
            }

            if (
              destination.activities?.some((item) =>
                words.includes(String(item).toLowerCase())
              )
            ) {
              score += 8;
            }

            if (
              destination.suitableFor?.some((item) =>
                words.includes(String(item).toLowerCase())
              )
            ) {
              score += 6;
            }

            if (
              destination.name
                ?.toLowerCase()
                .includes(category)
            ) {
              score += 7;
            }

            if (
              destination.description
                ?.toLowerCase()
                .includes(category)
            ) {
              score += 4;
            }
          }
        );

        // --------------------------------
        // Budget matching
        // --------------------------------

        if (normalizedBudget) {
          const destinationBudget = String(
            destination.budget || destination.price || ""
          ).toLowerCase();

          if (
            destinationBudget.includes(normalizedBudget)
          ) {
            score += 10;
          }

          if (
            normalizedBudget.includes("cheap") &&
            destination.price &&
            Number(destination.price) < 80000
          ) {
            score += 8;
          }

          if (
            normalizedBudget.includes("low") &&
            destination.price &&
            Number(destination.price) < 80000
          ) {
            score += 8;
          }

          if (
            normalizedBudget.includes("medium") &&
            destination.price &&
            Number(destination.price) >= 80000 &&
            Number(destination.price) <= 120000
          ) {
            score += 8;
          }

          if (
            normalizedBudget.includes("high") &&
            destination.price &&
            Number(destination.price) > 120000
          ) {
            score += 8;
          }
        }

        // --------------------------------
        // Region matching
        // --------------------------------

        if (normalizedRegion) {
          if (
            destination.region
              ?.toLowerCase()
              .includes(normalizedRegion)
          ) {
            score += 12;
          }

          if (
            destination.location
              ?.toLowerCase()
              .includes(normalizedRegion)
          ) {
            score += 8;
          }
        }

        // --------------------------------
        // Difficulty matching
        // --------------------------------

        if (normalizedDifficulty) {
          if (
            destination.difficulty
              ?.toLowerCase()
              .includes(normalizedDifficulty)
          ) {
            score += 12;
          }
        }

        // --------------------------------
        // Season matching
        // --------------------------------

        if (normalizedSeason) {
          if (
            destination.bestSeason
              ?.toLowerCase()
              .includes(normalizedSeason)
          ) {
            score += 12;
          }

          if (
            destination.season
              ?.toLowerCase()
              .includes(normalizedSeason)
          ) {
            score += 8;
          }
        }

        return {
          destination,
          score,
        };
      }
    );

    // --------------------------------
    // Sort highest score first
    // --------------------------------

    scoredDestinations.sort(
      (a, b) => b.score - a.score
    );

    // --------------------------------
    // Return top 3
    // --------------------------------

    let recommendations = scoredDestinations
      .slice(0, 3)
      .map((item) => item.destination);

    // --------------------------------
    // Fallback
    // --------------------------------

    if (!recommendations.length) {
      recommendations = destinations.slice(0, 3);
    }

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error(
      "Recommendation error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations",
      error: error.message,
    });
  }
});

// ===============================
// CREATE BOOKING
// ===============================

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    const savedBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error(
      "Booking creation error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

// ===============================
// GET ALL BOOKINGS
// ===============================

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({
        createdAt: -1,
      });

    res.json(bookings);
  } catch (error) {
    console.error(
      "Error fetching bookings:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// ===============================
// UPDATE BOOKING STATUS
// ===============================

app.patch(
  "/api/bookings/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          {
            status,
          },
          {
            new: true,
          }
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.json({
        success: true,
        message: "Booking status updated",
        booking,
      });
    } catch (error) {
      console.error(
        "Booking status update error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to update booking status",
        error: error.message,
      });
    }
  }
);

// ===============================
// VERCEL EXPORT
// ===============================

// IMPORTANT:
// Do NOT use app.listen() when deploying
// this Express backend to Vercel.
// Export for Vercel
module.exports = app;

// Run locally
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`EasyTravel backend running on port ${PORT}`);
  });
}