
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HiSparkles,
  HiArrowLeft,
  HiCalendar,
  HiCreditCard,
  HiCheckCircle,
} from 'react-icons/hi';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import your existing images
import everestImage from './assets/everest1.jpg';
import annapurnaImage from '../assets/annapurna1.jpg';
import machhapuchhreImage from '../assets/machhapuchre.jpeg';
import langtangImage from '../assets/langtang.jpg';
import tilichoImage from '../assets/tilicho.jpg';
import kathmanduImage from '../assets/kathmandu.jpg';
import pokharaImage from '../assets/pokhara.jpg';

// Match database destination names to your local images
const destinationImages = {
  'Everest Base Camp': everestImage,
  Annapurna: annapurnaImage,
  'Annapurna Base Camp': annapurnaImage,
  Machhapuchhre: machhapuchhreImage,
  Langtang: langtangImage,
  'Langtang Valley': langtangImage,
  'Tilicho Lake': tilichoImage,
  Kathmandu: kathmanduImage,
  'Kathmandu Valley': kathmanduImage,
  Pokhara: pokharaImage,
};

// Get the correct local image
const getDestinationImage = (destination) => {
  if (!destination) return null;

  // First try exact destination name
  if (destinationImages[destination.name]) {
    return destinationImages[destination.name];
  }

  // Then try region
  if (destinationImages[destination.region]) {
    return destinationImages[destination.region];
  }

  // Finally search by keywords
  const text = `${destination.name} ${destination.region}`.toLowerCase();

  if (text.includes('everest')) return everestImage;
  if (text.includes('annapurna')) return annapurnaImage;
  if (text.includes('machhapuch')) return machhapuchhreImage;
  if (text.includes('langtang')) return langtangImage;
  if (text.includes('tilicho')) return tilichoImage;
  if (text.includes('kathmandu')) return kathmanduImage;
  if (text.includes('pokhara')) return pokharaImage;

  return null;
};

const RecommendationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const userWish =
    location.state?.wish?.trim() || 'A general adventure in Nepal';

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const getRecommendations = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://easytravel-hgi8.vercel.app/recommendations',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              wish: userWish,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to get recommendations'
          );
        }

        console.log('Backend recommendation:', data);

        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error('Recommendation error:', err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [userWish]);

  // ---------------- LOADING ----------------

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF8] px-6 text-center">

        <div className="w-20 h-20 border-4 border-[#C8D9E6]/40 border-t-[#F1A501] rounded-full animate-spin mb-8" />

        <div className="flex items-center gap-2 mb-4">
          <HiSparkles className="text-[#F1A501] text-xl" />

          <span className="text-xs tracking-[0.2em] text-gray-400 font-bold uppercase">
            AI Crafting Room
          </span>
        </div>

        <h2 className="text-[#2F4156] text-3xl font-black">
          Finding Your Perfect Destinations...
        </h2>

        <p className="text-gray-400 mt-3 italic max-w-md">
          "{userWish}"
        </p>

      </div>
    );
  }

  // ---------------- ERROR ----------------

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-6">

        <div className="bg-white p-10 rounded-[40px] shadow-xl max-w-md w-full text-center">

          <div className="w-16 h-16 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center text-xl mx-auto mb-6">
            ✕
          </div>

          <h2 className="text-[#2F4156] text-xl font-black mb-3">
            Something went wrong
          </h2>

          <p className="text-gray-500 text-sm mb-8">
            {error}
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#2F4156] text-white py-4 rounded-[20px] font-bold hover:bg-[#F1A501] transition-all flex items-center justify-center gap-2"
          >
            <HiArrowLeft />
            Go Back
          </button>

        </div>
      </div>
    );
  }

  // ---------------- MAIN PAGE ----------------

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-32 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-5">

            <HiSparkles className="text-[#F1A501]" />

            <span className="text-xs tracking-[0.2em] text-gray-400 font-bold uppercase">
              Personalized Recommendation
            </span>

          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#2F4156]">
            Your Recommended Destinations
          </h1>

          <p className="text-gray-500 mt-4 italic">
            "{userWish}"
          </p>

        </div>

        {/* CARDS */}

        {recommendations.length === 0 ? (

          <div className="bg-white rounded-[35px] p-10 text-center shadow-lg">
            <h2 className="text-2xl font-black text-[#2F4156]">
              No destinations found
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching for a destination, city, lake, mountain,
              wildlife experience, or cultural trip.
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 bg-[#2F4156] text-white px-8 py-3 rounded-full font-bold hover:bg-[#F1A501] transition-all"
            >
              Try Another Search
            </button>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {recommendations.map((destination, index) => {

              const image = getDestinationImage(destination);

              return (
                <div
                  key={destination._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white rounded-[35px] overflow-hidden shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300"
                >

                  {/* IMAGE */}

                  <div className="h-64 bg-[#C8D9E6]/30 overflow-hidden">

                    {image ? (

                      <img
                        src={image}
                        alt={destination.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center">
                        <HiSparkles className="text-[#2F4156] text-5xl" />
                      </div>

                    )}

                  </div>

                  {/* CARD CONTENT */}

                  <div className="p-8">

                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C8D9E6] mb-2">
                      {destination.region}
                    </p>

                    <h2 className="text-2xl font-black text-[#2F4156] mb-3">
                      {destination.name}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {destination.description}
                    </p>

                    {/* INFO */}

                    <div className="grid grid-cols-2 gap-4 mb-6">

                      <div className="bg-[#F8F9FA] p-4 rounded-2xl">

                        <HiCalendar className="text-[#F1A501] text-xl mb-2" />

                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                          Best Season
                        </p>

                        <p className="text-sm font-bold text-[#2F4156]">
                          {destination.bestSeason}
                        </p>

                      </div>

                      <div className="bg-[#F8F9FA] p-4 rounded-2xl">

                        <HiCreditCard className="text-[#F1A501] text-xl mb-2" />

                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                          Price
                        </p>

                        <p className="text-sm font-bold text-[#2F4156]">
                          NPR{' '}
                          {Number(
                            destination.priceNPR || 0
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                    {/* DIFFICULTY */}

                    <div className="flex items-center gap-2 mb-6">

                      <HiCheckCircle className="text-[#F1A501]" />

                      <span className="text-sm font-bold text-gray-600">
                        {destination.difficulty} Difficulty
                      </span>

                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={() => navigate('/')}
                      className="w-full bg-[#2F4156] text-white py-4 rounded-2xl font-bold hover:bg-[#F1A501] transition-all"
                    >
                      Book This Experience
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* CHANGE SEARCH */}

        <div className="text-center mt-12">

          <button
            onClick={() => navigate('/')}
            className="border-2 border-[#2F4156] text-[#2F4156] px-8 py-3 rounded-full font-bold hover:bg-[#2F4156] hover:text-white transition-all"
          >
            Change Destination Wish
          </button>

        </div>

      </div>
    </div>
  );
};

export default RecommendationPage;

