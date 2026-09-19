import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="w-full bg-[#2F4156] text-white pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* TOP SECTION: NEWSLETTER & BRAND */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-700">
          
          {/* Brand Info */}
          <div className="lg:col-span-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold tracking-tighter mb-6">
              Easy<span className="text-[#C8D9E6]">Travel.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Revolutionizing Nepal tourism with AI-driven recommendations. Discover the 
              hidden gems of the Himalayas tailored to your budget and style.
            </p>
            <div className="flex gap-4 mt-8">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#C8D9E6] hover:text-[#2F4156] transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-bold mb-6 text-[#C8D9E6] uppercase text-xs tracking-widest">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition">AI Recommendations</a></li>
              <li><a href="#packages" className="hover:text-white transition">Destinations</a></li>
              <li><a href="#" className="hover:text-white transition">Booking Portal</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-bold mb-6 text-[#C8D9E6] uppercase text-xs tracking-widest">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li>Kathmandu, Nepal</li>
              <li>+977 01-4225689, +977 9861922372</li>
              <li>info@easytravel.com.np</li>
              <li>Sun - Fri: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-bold mb-6 text-[#C8D9E6] uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-xs text-gray-400 mb-4">Subscribe for seasonal travel deals.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-transparent border-b border-gray-600 py-2 text-sm focus:border-[#C8D9E6] outline-none transition"
              />
              <button className="absolute right-0 top-2 text-[#C8D9E6] hover:text-white transition">
                →
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <p>© 2026 EASYTRAVEL NEPAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;