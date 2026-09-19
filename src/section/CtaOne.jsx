import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CtaOne() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Pass the user's text to the recommendation page
    navigate('/recommendation', { state: { wish: userInput } });
  };

  return (
    <section className="w-full bg-[#2F4156] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        
        <span data-aos="fade-up" className="text-[#C8D9E6] text-xs tracking-[0.4em] font-bold uppercase">
          AI-Powered Travel Assistant
        </span>

        <h2 data-aos="fade-up" data-aos-delay="100" className="text-white text-4xl md:text-6xl font-bold leading-tight">
          Where does your heart <br />
          <span className="italic font-medium text-[#C8D9E6]">want to go?</span>
        </h2>

        {/* INPUT AREA */}
        <div data-aos="zoom-in" data-aos-delay="200" className="w-full max-w-2xl mt-4">
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text"
              placeholder="e.g. A 7-day luxury trip to Mustang with trekking..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-5 px-8 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#C8D9E6] transition-all backdrop-blur-sm text-lg"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#C8D9E6] text-[#2F4156] font-bold px-8 rounded-full hover:bg-white transition-all active:scale-95 shadow-lg"
            >
              Plan Now
            </button>
          </form>
          <p className="text-gray-400 text-sm mt-4 italic">
            Describe your dream trip: budget, vibe, or specific region.
          </p>
        </div>

      </div>
    </section>
  );
}

export default CtaOne;