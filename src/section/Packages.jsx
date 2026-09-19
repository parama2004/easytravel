import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Existing images
import everestImg from '../assets/everest.jpg';
import annapurnaImg from '../assets/annapurna1.jpg';
import machhapuchhreImg from '../assets/machhapuchre.jpeg';
import langtangImg from '../assets/langtang.jpg';

function Packages() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    fetch('http://localhost:5000/api/destinations')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        return response.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
        setError('Unable to load destinations.');
        setLoading(false);
      });
  }, []);

  const images = [
    everestImg,
    annapurnaImg,
    machhapuchhreImg,
    langtangImg
  ];

  if (loading) {
    return (
      <section className="w-full bg-[#F8F9FA] py-24 text-center">
        <p className="text-gray-500">Loading destinations...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#F8F9FA] py-24 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section
      id="packages"
      className="w-full bg-[#F8F9FA] py-24 font-sans text-[#2F4156]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div data-aos="fade-right">
            <span className="text-xs tracking-[0.3em] text-[#C8D9E6] font-bold uppercase">
              ★ Top Selling
            </span>

            <h2 className="text-4xl font-bold mt-4">
              Top Destinations
            </h2>
          </div>

          <p
            className="text-gray-400 text-sm max-w-sm"
            data-aos="fade-left"
          >
            Hand-picked locations curated by our AI system based on seasonal
            relevance and travel preferences across Nepal.
          </p>
        </div>

        {/* DESTINATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {destinations.slice(0, 4).map((pkg, index) => (
            <div
              key={pkg._id}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >

              <div className="relative overflow-hidden rounded-3xl mb-4 shadow-sm">

                <img
                  src={images[index]}
                  alt={pkg.name}
                  className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* PRICE */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-md flex flex-col items-end">

                  <span className="text-[10px] font-bold text-gray-400 leading-none">
                    FROM
                  </span>

                  <span className="text-sm font-extrabold text-[#2F4156]">
                    NPR {pkg.priceNPR.toLocaleString()}
                  </span>

                </div>
              </div>

              <div className="flex flex-col gap-1 px-2">

                <div className="flex items-center gap-2 text-[10px] text-[#C8D9E6] font-bold uppercase tracking-widest">

                  <span>{pkg.difficulty}</span>

                  <span className="text-gray-300">•</span>

                  <span>{pkg.region}</span>

                </div>

                <h3 className="text-xl font-bold group-hover:text-[#C8D9E6] transition-colors duration-300">
                  {pkg.name}, Nepal
                </h3>

              </div>

            </div>
          ))}

        </div>

        {/* VIEW ALL */}
        <div
          className="mt-20 flex justify-center"
          data-aos="zoom-in"
        >
          <Link
            to="/all-packages"
            className="bg-[#C8D9E6] text-[#2F4156] font-bold py-3 px-8 rounded-full hover:bg-[#2F4156] hover:text-white transition-all active:scale-95 shadow-md text-sm inline-block"
          >
            View All Packages
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Packages;