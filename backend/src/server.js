const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Destination = require("./models/Destination");
const Booking = require("./models/booking");
const authRoutes = require("./routes/auth");

const {
  protect,
  adminOnly,
} = require("./middleware/authMiddleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "EasyTravel Backend API is running",
  });
});

// =====================================================
// GET ALL DESTINATIONS
// =====================================================

app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();

    res.json(destinations);
  } catch (error) {
    console.error(
      "Error fetching destinations:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch destinations",
    });
  }
});

// =====================================================
// RECOMMENDATION API
// =====================================================

app.post("/api/recommendations", async (req, res) => {
  try {
    const {
      wish,
      budget,
      region,
      difficulty,
      season,
    } = req.body;

    console.log("------------------------------------");
    console.log("USER SEARCH:", wish);
    console.log("------------------------------------");

    const destinations = await Destination.find();

    if (!destinations.length) {
      return res.status(404).json({
        message: "No destinations available",
      });
    }

    // =================================================
    // CLEAN USER SEARCH
    // =================================================

    const searchText = (wish || "")
      .toLowerCase()
      .trim();

    const ignoredWords = new Set([
      "i",
      "want",
      "to",
      "visit",
      "go",
      "travel",
      "trip",
      "take",
      "for",
      "a",
      "an",
      "the",
      "in",
      "on",
      "with",
      "and",
      "or",
      "my",
      "me",
      "please",
      "can",
      "would",
      "like",
      "looking",
      "lookingfor",
      "place",
      "places",
      "destination",
      "destinations",
    ]);

    const words = searchText
      .replace(/[^\w\s-]/g, " ")
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(
        (word) =>
          word.length >= 3 &&
          !ignoredWords.has(word)
      );

    console.log("SEARCH WORDS:", words);

    // =================================================
    // WORD SYNONYMS
    // =================================================

    const synonyms = {
      mountain: [
        "mountain",
        "mountains",
        "himalaya",
        "himalayas",
        "snow",
        "peak",
        "peaks",
      ],

      lake: [
        "lake",
        "lakes",
        "water",
        "waters",
        "lakeview",
      ],

      temple: [
        "temple",
        "temples",
        "shrine",
        "shrines",
        "religious",
        "religion",
      ],

      culture: [
        "culture",
        "cultural",
        "heritage",
        "history",
        "historic",
        "traditional",
        "tradition",
        "newari",
        "tibetan",
      ],

      adventure: [
        "adventure",
        "adventurous",
        "exciting",
        "thrill",
        "thrilling",
      ],

      trekking: [
        "trek",
        "trekking",
        "hiking",
        "hike",
        "trail",
        "trails",
        "walk",
        "walking",
      ],

      peaceful: [
        "peaceful",
        "peace",
        "quiet",
        "calm",
        "relax",
        "relaxing",
        "relaxation",
        "serene",
      ],

      romantic: [
        "romantic",
        "romance",
        "couple",
        "couples",
        "honeymoon",
      ],

      wildlife: [
        "wildlife",
        "animals",
        "animal",
        "jungle",
        "safari",
        "tiger",
        "rhino",
        "elephant",
        "bird",
        "birds",
      ],

      city: [
        "city",
        "urban",
        "town",
        "shopping",
        "market",
      ],

      nature: [
        "nature",
        "natural",
        "green",
        "forest",
        "scenery",
        "scenic",
        "beautiful",
        "beauty",
        "landscape",
        "landscapes",
      ],

      family: [
        "family",
        "children",
        "kids",
        "child",
      ],

      cheap: [
        "cheap",
        "budget",
        "affordable",
        "low-cost",
        "lowcost",
      ],
    };

    // =================================================
    // EXPAND SEARCH WORDS
    // =================================================

    let expandedWords = [...words];

    words.forEach((word) => {
      Object.values(synonyms).forEach((group) => {
        if (group.includes(word)) {
          expandedWords.push(...group);
        }
      });
    });

    expandedWords = [
      ...new Set(expandedWords),
    ];

    console.log(
      "EXPANDED SEARCH:",
      expandedWords
    );

    // =================================================
    // SCORE DESTINATIONS
    // =================================================

    const scoredDestinations = destinations.map(
      (destination) => {
        let score = 0;

        const name =
          destination.name?.toLowerCase() || "";

        const description =
          destination.description?.toLowerCase() || "";

        const location =
          destination.location?.toLowerCase() || "";

        const destinationRegion =
          destination.region?.toLowerCase() || "";

        const destinationDifficulty =
          destination.difficulty?.toLowerCase() || "";

        const bestSeason =
          destination.bestSeason?.toLowerCase() || "";

        const categories =
          destination.categories
            ?.map((item) => item.toLowerCase())
            .join(" ") || "";

        const keywords =
          destination.keywords
            ?.map((item) => item.toLowerCase())
            .join(" ") || "";

        const activities =
          destination.activities
            ?.map((item) => item.toLowerCase())
            .join(" ") || "";

        const suitableFor =
          destination.suitableFor
            ?.map((item) => item.toLowerCase())
            .join(" ") || "";

        const searchableText = `
          ${name}
          ${description}
          ${location}
          ${destinationRegion}
          ${destinationDifficulty}
          ${bestSeason}
          ${categories}
          ${keywords}
          ${activities}
          ${suitableFor}
        `;

        // =================================================
        // EXACT DESTINATION NAME
        // =================================================

        if (
          searchText.includes(name) ||
          name.includes(searchText)
        ) {
          score += 100;
        }

        // =================================================
        // EXACT LOCATION
        // =================================================

        if (
          searchText.includes(location) ||
          searchText.includes(destinationRegion)
        ) {
          score += 50;
        }

        // =================================================
        // WORD MATCHING
        // =================================================

        expandedWords.forEach((word) => {
          if (
            searchableText.includes(word)
          ) {
            score += 5;
          }

          // Name is more important
          if (name.includes(word)) {
            score += 15;
          }

          // Categories are very important
          if (categories.includes(word)) {
            score += 12;
          }

          // Keywords are important
          if (keywords.includes(word)) {
            score += 10;
          }

          // Activities
          if (activities.includes(word)) {
            score += 8;
          }

          // Suitable-for matching
          if (suitableFor.includes(word)) {
            score += 8;
          }
        });

        // =================================================
        // BUDGET
        // =================================================

        if (budget) {
          const userBudget = Number(budget);

          if (
            !isNaN(userBudget) &&
            destination.priceNPR <= userBudget
          ) {
            score += 15;
          }

          if (
            !isNaN(userBudget) &&
            destination.priceNPR > userBudget
          ) {
            score -= 5;
          }
        }

        // =================================================
        // REGION
        // =================================================

        if (
          region &&
          destinationRegion ===
            region.toLowerCase()
        ) {
          score += 20;
        }

        // =================================================
        // DIFFICULTY
        // =================================================

        if (
          difficulty &&
          destinationDifficulty ===
            difficulty.toLowerCase()
        ) {
          score += 15;
        }

        // =================================================
        // SEASON
        // =================================================

        if (
          season &&
          bestSeason.includes(
            season.toLowerCase()
          )
        ) {
          score += 10;
        }

        return {
          destination,
          score,
        };
      }
    );

    // =================================================
    // SORT
    // =================================================

    scoredDestinations.sort(
      (a, b) => b.score - a.score
    );

    console.log(
      "TOP RESULTS:",
      scoredDestinations
        .slice(0, 5)
        .map((item) => ({
          name: item.destination.name,
          score: item.score,
        }))
    );

    // =================================================
    // GET RESULTS
    // =================================================

    let recommendations =
      scoredDestinations
        .filter(
          (item) => item.score > 0
        )
        .slice(0, 3)
        .map((item) => ({
          ...item.destination.toObject(),
          score: item.score,
        }));

    // =================================================
    // FALLBACK
    // =================================================

    if (!recommendations.length) {
      recommendations =
        destinations
          .slice(0, 3)
          .map((destination) => ({
            ...destination.toObject(),
            score: 1,
          }));
    }

    // =================================================
    // RESPONSE
    // =================================================

    res.json({
      message:
        "Recommendations generated successfully",

      search: wish,

      recommendations,
    });

  } catch (error) {
    console.error(
      "Recommendation error:",
      error.message
    );

    res.status(500).json({
      message:
        "Failed to generate recommendations",
    });
  }
});

// =====================================================
// BOOKING API - CREATE BOOKING
// =====================================================

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      destination,
      travelDate,
      travelers,
    } = req.body;

    // Check required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !destination ||
      !travelDate ||
      !travelers
    ) {
      return res.status(400).json({
        message:
          "Please provide all required booking details",
      });
    }

    // Create booking
    const booking = new Booking({
      fullName,
      email,
      phone,
      destination,
      travelDate,
      travelers,
    });

    // Save to MongoDB
    const savedBooking =
      await booking.save();

    console.log("------------------------------------");
    console.log("NEW BOOKING SAVED");
    console.log("------------------------------------");

    console.log(
      "Name:",
      savedBooking.fullName
    );

    console.log(
      "Email:",
      savedBooking.email
    );

    console.log(
      "Phone:",
      savedBooking.phone
    );

    console.log(
      "Destination:",
      savedBooking.destination
    );

    console.log(
      "Travel Date:",
      savedBooking.travelDate
    );

    console.log(
      "Travelers:",
      savedBooking.travelers
    );

    console.log(
      "Booking ID:",
      savedBooking._id
    );

    console.log("------------------------------------");

    res.status(201).json({
      message:
        "Booking saved successfully",

      booking: savedBooking,
    });

  } catch (error) {
    console.error(
      "Booking error:",
      error.message
    );

    res.status(500).json({
      message:
        "Failed to save booking",

      error: error.message,
    });
  }
});

// =====================================================
// GET ALL BOOKINGS - ADMIN
// =====================================================

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    console.error(
      "Error fetching bookings:",
      error.message
    );

    res.status(500).json({
      message:
        "Failed to fetch bookings",
    });
  }
});

// =====================================================
// UPDATE BOOKING STATUS - ADMIN
// =====================================================

app.patch(
  "/api/bookings/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      // Check valid status
      if (
        ![
          "pending",
          "confirmed",
          "cancelled",
        ].includes(status)
      ) {
        return res.status(400).json({
          message:
            "Invalid booking status",
        });
      }

      // Find and update booking
      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      // Booking not found
      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      res.json({
        message:
          "Booking status updated successfully",

        booking,
      });

    } catch (error) {
      console.error(
        "Error updating booking status:",
        error.message
      );

      res.status(500).json({
        message:
          "Failed to update booking status",
      });
    }
  }
);

// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `EasyTravel backend running on port ${PORT}`
  );
});