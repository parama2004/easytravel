import React, { useEffect } from 'react';
import aboutimg1 from '../assets/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Keeping the icon import, but make sure react-icons is installed!
import { FaGlobeAmericas } from 'react-icons/fa';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      delay: 150,
      once: true,
    });
  }, []);

  return (
    <section id="about" className="w-full bg-white font-sans text-[#2F4156]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-14 px-6 lg:px-16 py-24">

        {/* IMAGE SECTION */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative">
            <img
              data-aos="zoom-in"
              data-aos-delay="100"
              src={aboutimg1}
              alt="about"
              className="w-[300px] sm:w-[380px] lg:w-[420px] rounded-[12px] shadow-lg rotate-[-2deg]"
            />
            <div className="absolute -z-10 top-5 left-5 w-full h-full bg-[#C8D9E6] rounded-[12px] blur-2xl opacity-60"></div>
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h4
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-sm tracking-widest text-[#C8D9E6] font-semibold uppercase"
          >
            About Us
          </h4>

          <h1
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
          >
            The Highest Level of Comfort, Convenience and Service
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-gray-600 leading-relaxed max-w-xl"
          >
            We design premium travel experiences with comfort, convenience, and
            unforgettable destinations tailored for you.
          </p>

          {/* FEATURE ROW - Added the icon here to show off the globe */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="flex items-center gap-3 font-medium text-[#2F4156]"
          >
            <FaGlobeAmericas className="text-[#F1A501] text-xl" />
            <span>Exploring Nepal since 2026</span>
          </div>

          {/* UPDATED INTERACTIVE BUTTON */}
          <a
            href="#services"
            data-aos="fade-up"
            data-aos-delay="600"
            className="w-fit bg-[#C8D9E6] text-[#2F4156] font-bold py-4 px-10 rounded-full 
                       transition-all duration-300 ease-in-out
                       hover:bg-[#2F4156] hover:text-white hover:-translate-y-1 hover:shadow-xl
                       active:scale-95 inline-block text-center cursor-pointer"
          >
            Explore More
          </a>
        </div>

      </div>
    </section>
  );
}

export default About;