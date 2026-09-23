
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  HiSparkles,
  HiArrowLeft,
  HiCalendar,
  HiCreditCard,
  HiCheckCircle,
} from "react-icons/hi";

import AOS from "aos";
import "aos/dist/aos.css";

// Automatically load ALL images from src/assets
const assetImages = import.meta.glob(
  "../assets/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// Convert filename into a simple searchable name
const normalizeName = (name) => {
  return name
    .toLowerCase()
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// Create image map automatically
const imageMap = {};

Object.entries(assetImages).forEach(([path, imageUrl]) => {
  const filename = path.split("/").pop();
  const cleanName = normalizeName(filename);

  imageMap[cleanName] = imageUrl;
});

// Destination name → possible asset filenames
const destinationImageAliases = {
  "Everest Base Camp": [
    "everest",
    "everest1",
    "everest2",
  ],

  "Annapurna Base Camp": [
    "annapurna1",
    "annapurna2",
    "annapurna i",
    "annapurna-i",
  ],

  Machhapuchhre: [
    "machhapuchre",
    "fishtail1",
    "fishtail2",
  ],

  "Langtang Valley": [
    "langtang",
    "langtang1",
    "langtang2",
    "langtangvalley",
    "langtang valley",
  ],

  "Tilicho Lake": [
    "tilicho",
    "tilicho1",
    "tilicho2",
    "tilicho lake",
  ],

  "Gosaikunda Lake": [
    "gosaikunda",
    "gosaikunda1",
    "gosaikunda2",
    "gosainkunda",
  ],

  Gosaikunda: [
    "gosaikunda",
    "gosaikunda1",
    "gosaikunda2",
    "gosainkunda",
  ],

  Mustang: [
    "mustang1",
    "mustang2",
    "mustang",
  ],

  "Upper Mustang": [
    "upper mustang",
    "mustang2",
    "mustang1",
  ],

  Bandipur: [
    "bandipur",
  ],

  Bhaktapur: [
    "bhaktapur",
  ],

  "Kathmandu Valley": [
    "kathmandu",
    "pashupati",
    "budhanilkantha",
  ],

  Kathmandu: [
    "kathmandu",
    "pashupati",
    "budhanilkantha",
  ],

  "Chitwan National Park": [
    "chitwan",
  ],

  Patan: [
    "patan",
  ],

  Pokhara: [
    "pokhara",
  ],

  Lumbini: [
    "lumbini",
    "janaki",
  ],

  "Rara Lake": [
    "rara",
    "rara1",
    "rara2",
    "raralake",
  ],

  Rara: [
    "rara",
    "rara1",
    "rara2",
    "raralake",
  ],

  Ghandruk: [
    "ghandruk",
    "ghandruk1",
    "ghandruk2",
    "ghandruk3",
  ],

  Tansen: [
    "tansen",
    "palpa",
  ],

  Palpa: [
    "palpa",
    "tansen",
  ],

  Makalu: [
    "makalu",
  ],

  Manaslu: [
    "manaslu",
  ],

  "Panch Pokhari": [
    "pachpokhari",
    "pachpokhari2",
    "panchpokhari",
    "panchpokhari11",
  ],

  Panchpokhari: [
    "pachpokhari",
    "pachpokhari2",
    "panchpokhari",
    "panchpokhari11",
  ],

  "Khopra Danda": [
    "khopra1",
    "khopra2",
    "khopra danda",
  ],

  Pathivara: [
    "pathivara",
  ],

  Muktinath: [
    "muktinakh",
    "muktinath",
  ],

  Ilam: [
    "illam",
    "ilam",
  ],

  "Bardia National Park": [
    "bardia",
  ],

  "Phewa Lake": [
    "pokhara",
  ],

  Nagarkot: [
    "nagarkot",
  ],

  "Janaki Temple": [
    "janaki",
  ],

  Budhanilkantha: [
    "budhanilkantha",
  ],

  Pashupatinath: [
    "pashupati",
  ],

  Kaligandaki: [
    "kaligandaki",
  ],
};

// Find an image for a destination
const getDestinationImage = (destination) => {
  if (!destination) {
    return null;
  }

  const destinationName = destination.name || "";

  // First try aliases
  const aliases = destinationImageAliases[destinationName];

  if (aliases) {
    for (const alias of aliases) {
      const image = imageMap[normalizeName(alias)];

      if (image) {
        return image;
      }
    }
  }

  // Try exact destination name
  const exactImage = imageMap[normalizeName(destinationName)];

  if (exactImage) {
    return exactImage;
  }

  // Try partial matching
  const normalizedDestination = normalizeName(destinationName);

  const matchingKey = Object.keys(imageMap).find((key) => {
    return (
      key.includes(normalizedDestination) ||
      normalizedDestination.includes(key)
    );
  });

  if (matchingKey) {
    return imageMap[matchingKey];
  }

  // Use backend imageUrl only if it is a real URL
  if (
    destination.imageUrl &&
    (destination.imageUrl.startsWith("http://") ||
      destination.imageUrl.startsWith("https://"))
  ) {
    return destination.imageUrl;
  }

  return null;
};

const RecommendationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const userWish =
    location.state?.wish?.trim() ||
    "A general adventure in Nepal";

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const getRecommendations = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Sending wish to backend:", userWish);

        const response = await fetch(
          "https://easytravel-hgi8.vercel.app/api/recommendations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wish: userWish,
            }),
          }
        );

        const data = await response.json();

        console.log(
          "Backend recommendation response:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to get recommendations"
          );
        }

        setRecommendations(
          data.recommendations || []
        );

        setTimeout(() => {
          AOS.refresh();
        }, 200);
      } catch (err) {
        console.error(
          "Recommendation error:",
          err
        );

        setError(
          err.message ||
            "Something went wrong while getting recommendations."
        );
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [userWish]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFEB] flex items-center justify-center">
        <div className="text-center">

          <div className="w-16 h-16 border-4 border-[#C8D9E6] border-t-[#2F4156] rounded-full animate-spin mx-auto mb-6"></div>

          <HiSparkles className="text-[#2F4156] text-4xl mx-auto mb-3" />

          <h2 className="text-2xl font-bold text-[#2F4156]">
            Finding Your Perfect Nepal Adventure...
          </h2>

          <p className="text-gray-600 mt-2">
            Our AI is creating personalized
            recommendations for you.
          </p>

        </div>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen bg-[#F5EFEB] flex items-center justify-center px-4">

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">

          <HiSparkles className="text-red-500 text-5xl mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-[#2F4156] mb-3">
            Recommendation Error
          </h2>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-[#2F4156] text-white px-6 py-3 rounded-lg hover:bg-[#567C8D] transition"
          >
            Go Back
          </button>

        </div>
      </div>
    );
  }

  // MAIN PAGE
  return (
    <div className="min-h-screen bg-[#F5EFEB]">

      {/* HEADER */}
      <div className="bg-[#2F4156] text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
          >
            <HiArrowLeft />
            Back
          </button>

          <div className="flex items-center gap-3 mb-3">

            <HiSparkles className="text-3xl" />

            <h1 className="text-3xl md:text-4xl font-bold">
              Your AI Travel Recommendations
            </h1>

          </div>

          <p className="text-white/80 max-w-3xl">
            Based on your travel preference:
          </p>

          <div className="mt-3 inline-block bg-white/10 border border-white/20 rounded-lg px-4 py-3">
            <span className="font-semibold">
              "{userWish}"
            </span>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {recommendations.length === 0 ? (
          <div className="text-center py-16">

            <HiSparkles className="text-[#2F4156] text-6xl mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-[#2F4156]">
              No recommendations found
            </h2>

            <p className="text-gray-600 mt-2">
              Try changing your travel preference.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 bg-[#2F4156] text-white px-6 py-3 rounded-lg hover:bg-[#567C8D] transition"
            >
              Try Again
            </button>

          </div>
        ) : (
          <>
            {/* INTRO */}
            <div
              className="text-center mb-10"
              data-aos="fade-up"
            >
              <h2 className="text-3xl font-bold text-[#2F4156]">
                Places You Might Love
              </h2>

              <p className="text-gray-600 mt-2">
                Here are personalized destinations
                selected for your trip.
              </p>
            </div>

            {/* RECOMMENDATION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {recommendations.map(
                (destination, index) => {

                  const image =
                    getDestinationImage(
                      destination
                    );

                  return (
                    <div
                      key={
                        destination._id ||
                        destination.name ||
                        index
                      }
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                    >

                      {/* IMAGE */}
                      <div className="h-64 bg-[#C8D9E6]/40 relative overflow-hidden">

                        {image ? (
                          <img
                            src={image}
                            alt={
                              destination.name ||
                              "Nepal destination"
                            }
                            className="w-full h-full object-cover transition duration-500 hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";

                              const fallback =
                                e.currentTarget
                                  .parentElement
                                  .querySelector(
                                    ".image-fallback"
                                  );

                              if (fallback) {
                                fallback.style.display =
                                  "flex";
                              }
                            }}
                          />
                        ) : null}

                        {/* FALLBACK */}
                        <div
                          className={`image-fallback absolute inset-0 items-center justify-center ${
                            image
                              ? "hidden"
                              : "flex"
                          }`}
                        >
                          <div className="text-center px-4">

                            <HiSparkles className="text-[#2F4156] text-5xl mx-auto mb-3" />

                            <p className="text-[#2F4156] font-bold text-lg">
                              {destination.name ||
                                "Nepal Destination"}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                              Image coming soon
                            </p>

                          </div>
                        </div>

                        {/* AI BADGE */}
                        <div className="absolute top-4 left-4 bg-[#2F4156] text-white px-3 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg">
                          <HiSparkles />
                          AI Pick
                        </div>

                      </div>

                      {/* CARD CONTENT */}
                      <div className="p-6">

                        <h3 className="text-2xl font-bold text-[#2F4156] mb-2">
                          {destination.name ||
                            "Nepal Destination"}
                        </h3>

                        {destination.region && (
                          <p className="text-[#567C8D] font-medium mb-3">
                            📍 {destination.region}
                          </p>
                        )}

                        {destination.description && (
                          <p className="text-gray-600 leading-relaxed mb-5">
                            {destination.description}
                          </p>
                        )}

                        {/* DETAILS */}
                        <div className="space-y-3 border-t border-gray-100 pt-5">

                          {destination.duration && (
                            <div className="flex items-center gap-3">

                              <HiCalendar className="text-[#567C8D] text-xl" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Duration
                                </p>

                                <p className="font-semibold text-gray-800">
                                  {destination.duration}
                                </p>
                              </div>

                            </div>
                          )}

                          {destination.bestSeason && (
                            <div className="flex items-center gap-3">

                              <HiCheckCircle className="text-[#567C8D] text-xl" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Best Season
                                </p>

                                <p className="font-semibold text-gray-800">
                                  {destination.bestSeason}
                                </p>
                              </div>

                            </div>
                          )}

                          {destination.priceNPR && (
                            <div className="flex items-center gap-3">

                              <HiCreditCard className="text-[#567C8D] text-xl" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Estimated Budget
                                </p>

                                <p className="font-semibold text-gray-800">
                                  NPR{" "}
                                  {Number(
                                    destination.priceNPR
                                  ).toLocaleString()}
                                </p>
                              </div>

                            </div>
                          )}

                          {destination.difficulty && (
                            <div className="flex items-center gap-3">

                              <HiSparkles className="text-[#567C8D] text-xl" />

                              <div>
                                <p className="text-xs text-gray-500">
                                  Difficulty
                                </p>

                                <p className="font-semibold text-gray-800">
                                  {destination.difficulty}
                                </p>
                              </div>

                            </div>
                          )}

                        </div>

                        {/* HIGHLIGHTS */}
                        {destination.highlights &&
                          destination.highlights.length > 0 && (
                            <div className="mt-5">

                              <p className="font-bold text-[#2F4156] mb-3">
                                Highlights
                              </p>

                              <div className="flex flex-wrap gap-2">

                                {destination.highlights.map(
                                  (
                                    highlight,
                                    highlightIndex
                                  ) => (
                                    <span
                                      key={
                                        highlightIndex
                                      }
                                      className="bg-[#C8D9E6]/40 text-[#2F4156] px-3 py-1 rounded-full text-sm"
                                    >
                                      {highlight}
                                    </span>
                                  )
                                )}

                              </div>
                            </div>
                          )}

                        {/* BOOK BUTTON */}
                        <button
                          onClick={() => {
                            navigate("/", {
                              state: {
                                selectedDestination:
                                  destination,
                              },
                            });
                          }}
                          className="w-full mt-6 bg-[#2F4156] text-white py-3 rounded-lg font-semibold hover:bg-[#567C8D] transition duration-300"
                        >
                          Book This Experience
                        </button>

                      </div>
                    </div>
                  );
                }
              )}

            </div>

            {/* BOTTOM */}
            <div
              className="text-center mt-12"
              data-aos="fade-up"
            >
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 border-2 border-[#2F4156] text-[#2F4156] px-6 py-3 rounded-lg font-semibold hover:bg-[#2F4156] hover:text-white transition"
              >
                <HiArrowLeft />
                Try Another Preference
              </button>
            </div>

          </>
        )}

      </main>
    </div>
  );
};

export default RecommendationPage;

