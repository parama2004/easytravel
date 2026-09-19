import React, { useEffect } from 'react';
import heroimg from "../assets/langtang1.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 200,
      once: false,
    });
  }, []);

  return (
    <div
      id="hero"
      className="relative w-full lg:h-screen py-30 h-auto bg-cover bg-center z-20"
      style={{ backgroundImage: `url(${heroimg})` }}
    >
      <div className="w-full relative z-10 flex flex-col justify-center items-center h-full gap-6 text-white px-6">
        
        <h1
          data-aos="zoom-in"
          data-aos-delay="100"
          className="lg:text-7xl text-4xl capitalize text-center font-fakhwang font-bold"
        >
          Explore the Beauty of Nepal
        </h1>

        <p
          data-aos="zoom-in"
          data-aos-delay="200"
          className="text-lg text-center lg:w-[50%] w-full"
        >
          Authentic journeys through mountains, culture, heritage, and nature.
        </p>

        {/* CHANGED TO ANCHOR TAG FOR INTERACTIVITY */}
        <a
          href="#packages" 
          data-aos="slide-up"
          data-aos-delay="300"
          className="bg-transparent border-2 border-[#C8D9E6] text-[#C8D9E6] font-bold py-3 px-10 rounded-full 
                     hover:bg-[#C8D9E6] hover:text-[#2F4156] transition-all duration-300 
                     active:scale-95 inline-block text-center cursor-pointer"
        >
          Explore Now
        </a>
        
      </div>
    </div>
  );
}

export default Hero;