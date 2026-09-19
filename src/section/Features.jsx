import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineMap, 
  HiOutlineColorSwatch 
} from 'react-icons/hi';

function Features() {
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      offset: 100 
    });
  }, []);

  const featureList = [
    {
      title: "AI Recommendations",
      desc: "Tailored suggestions based on your budget, region, and travel season.",
      icon: <HiOutlineLightningBolt size={30} />,
    },
    {
      title: "Secure Booking",
      desc: "An integrated module for reliable and secure trip reservations.",
      icon: <HiOutlineShieldCheck size={30} />,
    },
    {
      title: "Local Expertise",
      desc: "Hand-picked destinations covering the best of Nepal's culture and nature.",
      icon: <HiOutlineMap size={30} />,
    },
    {
      title: "Smart Filtering",
      desc: "Advanced rule-based engine to find your perfect expedition match.",
      icon: <HiOutlineColorSwatch size={30} />,
    }
  ];

  return (
    <section id="features" className="w-full bg-white py-24 text-[#2F4156] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
        
        {/* SECTION LABEL */}
        <span 
          className="text-xs tracking-[0.3em] text-[#C8D9E6] font-bold uppercase block mb-4" 
          data-aos="fade-up"
        >
          Our Speciality
        </span>

        {/* MAIN HEADING */}
        <h2 
          className="text-4xl lg:text-5xl font-bold mb-16" 
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          We Offer Best Services
        </h2>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {featureList.map((f, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center group transition-all duration-300" 
              data-aos="fade-up" 
              data-aos-delay={i * 150}
            >
              <div className="w-20 h-20 rounded-3xl bg-[#F8F9FA] flex items-center justify-center text-[#C8D9E6] 
                              shadow-sm border border-gray-50
                              transition-all duration-500 ease-out
                              group-hover:bg-[#2F4156] group-hover:text-white 
                              group-hover:-translate-y-3 group-hover:shadow-xl group-hover:shadow-[#2F4156]/20">
                {f.icon}
              </div>

              <h3 className="text-xl font-bold mt-8 mb-3 transition-colors duration-300 group-hover:text-[#2F4156]">
                {f.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
                {f.desc}
              </p>

              <div className="w-0 h-[2px] bg-[#F1A501] mt-4 transition-all duration-500 group-hover:w-12"></div>
            </div>
          ))}
        </div>

        {/* --- START PLANNING BUTTON --- */}
        <div className="relative z-30" data-aos="zoom-in" data-aos-delay="600">
          <a 
            href="#booking" 
            className="inline-block bg-[#C8D9E6] text-[#2F4156] font-bold py-4 px-12 rounded-full 
                       transition-all duration-300 ease-in-out
                       hover:bg-[#2F4156] hover:text-white hover:-translate-y-1 hover:shadow-xl
                       active:scale-95 text-center cursor-pointer shadow-md"
          >
            Start Planning
          </a>
        </div>

      </div>
    </section>
  );
}

export default Features;