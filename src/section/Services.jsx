import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import an image representing Nepal tourism (e.g., Kathmandu or Pokhara)
import nepalServiceImg from '../assets/paragliding.jpg'; 

function Services() {
  const [activeService, setActiveService] = useState('Smart Recommendations');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Services derived from project modules [cite: 254, 255, 257, 258]
  const services = [
    "Smart Recommendations",
    "Seamless Booking",
    "Destination Discovery",
    "Admin Management"
  ];

  return (
    <section id="services" className="w-full bg-white font-sans text-[#2F4156] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* TOP HEADER [cite: 234, 247] */}
        <div className="text-center mb-20" data-aos="fade-up">
          <span className="text-xs tracking-[0.3em] text-[#C8D9E6] font-bold uppercase">
            ♥ Our Features
          </span>
          <h2 className="text-4xl font-bold mt-4">What EasyTravel Offers?</h2>
          <p className="text-gray-400 text-sm mt-4 max-w-lg mx-auto">
            Providing tailored destination suggestions and integrated booking for a 
            smarter way to explore the beauty of Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 1. LEFT: SERVICE MENU  */}
          <div className="lg:col-span-3 flex flex-col gap-2" data-aos="fade-right">
            {services.map((item) => (
              <button
                key={item}
                onClick={() => setActiveService(item)}
                className={`text-left py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeService === item 
                  ? "bg-[#2F4156] text-white shadow-xl translate-x-2" 
                  : "bg-gray-50 text-gray-400 hover:bg-[#C8D9E6] hover:text-[#2F4156]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* 2. CENTER: FEATURE IMAGE */}
          <div className="lg:col-span-5" data-aos="zoom-in">
            <div className="relative group">
              <img 
                src={nepalServiceImg} 
                alt={activeService} 
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-[#C8D9E6] rounded-3xl opacity-20 blur-2xl"></div>
            </div>
          </div>

          {/* 3. RIGHT: DETAILED CONTENT [cite: 235, 244, 255, 310] */}
          <div className="lg:col-span-4 flex flex-col gap-8 pt-6" data-aos="fade-left">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-gray-400 font-bold uppercase block mb-2">
                ◎ TAILORED FOR YOU
              </span>
              <h3 className="text-3xl font-bold leading-tight">
                AI-Based <span className="italic font-medium">Destination Suggestions</span>
              </h3>
            </div>

            <p className="text-gray-500 leading-relaxed text-sm">
              Our rule-based engine processes your budget, preferred region, and travel 
              season to provide personalized recommendations. Say goodbye to 
              generic listings and discover locations that truly suit your taste.
            </p>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-l-4 border-[#C8D9E6]">
      
               <p className="text-xs font-bold text-[#2F4156]">
                 From trekking in the Annapurna to cultural tours in Lumbini.
               </p>
            </div>

            <div className="mt-2">
              <button className="bg-[#C8D9E6] text-[#2F4156] font-bold py-3 px-8 rounded-full hover:bg-[#b5c7d4] transition-all active:scale-95 shadow-md text-sm">
                Start Planning
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;