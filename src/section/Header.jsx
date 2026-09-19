import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { HashLink } from 'react-router-hash-link'; // Ensure you've run: npm install react-router-hash-link

function Header() {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links now point to the root path "/" plus the ID to work from any sub-page
  const navLinks = [
    { name: 'Home', link: '/#hero' },
    { name: 'About', link: '/#about' },
    { name: 'Services', link: '/#services' },
    { name: 'Packages', link: '/#packages' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 px-6 lg:px-16 py-4 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <HashLink 
          smooth to="/#hero" 
          className={`text-2xl font-bold tracking-tighter transition-colors ${
            scrolled ? 'text-[#2F4156]' : 'text-white'
          }`}
        >
          Easy<span className="text-[#C8D9E6]">Travel.</span>
        </HashLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <HashLink 
              smooth
              key={item.name} 
              to={item.link} 
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
                scrolled ? 'text-gray-600 hover:text-[#2F4156]' : 'text-white hover:text-[#2F4156]'
              }`}
            >
              {item.name}
            </HashLink>
          ))}
          
          <HashLink 
            smooth
            to="/#booking"
            className="bg-[#C8D9E6] text-[#2F4156] font-bold py-2 px-6 rounded-full hover:bg-[#2F4156] hover:text-white transition-all text-xs uppercase tracking-widest active:scale-95 inline-block text-center"
          >
            Book Now
          </HashLink>
        </nav>

        {/* MOBILE MENU ICON */}
        <div 
          className={`md:hidden cursor-pointer ${scrolled ? 'text-[#2F4156]' : 'text-white'}`} 
          onClick={() => setNav(!nav)}
        >
          {nav ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 transition-transform duration-500 z-[-1] ${nav ? 'translate-y-0' : '-translate-y-full'}`}>
        {navLinks.map((item) => (
          <HashLink 
            smooth
            key={item.name} 
            to={item.link} 
            onClick={() => setNav(false)}
            className="text-[#2F4156] text-2xl font-bold uppercase tracking-widest hover:opacity-70"
          >
            {item.name}
          </HashLink>
        ))}
        
        <HashLink 
          smooth
          to="/#booking"
          onClick={() => setNav(false)}
          className="bg-[#C8D9E6] text-[#2F4156] font-bold py-3 px-8 rounded-full text-sm uppercase tracking-widest hover:bg-[#2F4156] hover:text-white transition-all text-center"
        >
          Book Now
        </HashLink>
      </div>
    </header>
  );
}

export default Header;