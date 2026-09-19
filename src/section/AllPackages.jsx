import React, { useEffect, useState } from 'react';
import { HiX, HiClock, HiLocationMarker } from 'react-icons/hi'; // Ensure react-icons is installed

// Asset Imports (Keeping your established imports)
import ktmImg from '../assets/kathmandu.jpg';
import lumbiniImg from '../assets/lumbini.jpg';
import janakiImg from '../assets/janaki.jpg';
import pashupatiImg from '../assets/pashupati.jpg';
import bhaktapurImg from '../assets/bhaktapur.jpeg';
import pokharaImg from '../assets/pokhara.jpg';
import ghandrukImg from '../assets/ghandruk3.jpg';
import raraImg from '../assets/raralake.jpg';
import tilichoImg from '../assets/Tilicho Lake.jpg';
import illamImg from '../assets/illam.jpg';
import chitwanImg from '../assets/chitwan.jpg';
import bandipurImg from '../assets/bandipur.jpg';
import palpaImg from '../assets/tansen.jpg';
import mustangImg from '../assets/mustang1.jpg';
import gosaikundaImg from '../assets/Gosainkunda.jpg';
import annapurnaImg from '../assets/annapurna1.jpg';
import everestImg from '../assets/everest.jpg';
import fishtailImg from '../assets/fishtail1.jpg';
import langtangImg from '../assets/langtangvalley.jpg';
import manasluImg from '../assets/manaslu.jpg';

const allDestinations = [
  // CATEGORY 1: SPIRITUAL & CULTURAL
  { 
    name: "Kathmandu Valley", 
    price: "$250", 
    nrs: "33,000", 
    img: ktmImg, 
    tag: "Cultural & Religious",
    duration: "3 Days",
    itinerary: [
      { day: 1, title: "Arrival & Thamel", desc: "Arrival in Kathmandu and evening exploration of Thamel's vibrant streets." },
      { day: 2, title: "World Heritage Sites", desc: "Visit Pashupatinath, Boudhanath, and Swayambhunath (Monkey Temple)." },
      { day: 3, title: "Patan & Departure", desc: "Explore Patan Durbar Square before your flight departure." }
    ]
  },
  { 
    name: "Everest View", 
    price: "$950", 
    nrs: "1,26,000", 
    img: everestImg, 
    tag: "Trekking", 
    duration: "12 Days",
    itinerary: [
      { day: 1, title: "Fly to Lukla", desc: "Scenic flight to Lukla and trek to Phakding." },
      { day: 2, title: "Namche Bazaar", desc: "Steep climb to the Sherpa capital of Namche Bazaar." },
      { day: 3, title: "Everest Viewpoint", desc: "Hike to Everest View Hotel for your first glimpse of the peak." }
    ]
  },
  // Add similar 'itinerary' arrays to your other 18 objects below...
  { name: "Lumbini Birthplace", price: "$300", nrs: "40,000", img: lumbiniImg, tag: "Spiritual" },
  { name: "Janaki Temple", price: "$280", nrs: "37,000", img: janakiImg, tag: "Cultural & Religious" },
  { name: "Pashupati Area", price: "$200", nrs: "26,500", img: pashupatiImg, tag: "Spiritual" },
  { name: "Bhaktapur Durbar", price: "$240", nrs: "32,000", img: bhaktapurImg, tag: "Cultural & Religious" },
  { name: "Pokhara Lakeside", price: "$400", nrs: "53,000", img: pokharaImg, tag: "Adventure & Relaxing" },
  { name: "Ghandruk Village", price: "$320", nrs: "42,500", img: ghandrukImg, tag: "Nature & Culture" },
  { name: "Rara Lake", price: "$550", nrs: "73,000", img: raraImg, tag: "Nature & Relaxing" },
  { name: "Tilicho Lake", price: "$600", nrs: "80,000", img: tilichoImg, tag: "Adventure & Nature" },
  { name: "Ilam Tea Garden", price: "$350", nrs: "46,500", img: illamImg, tag: "Nature & Relaxing" },
  { name: "Chitwan Jungle", price: "$350", nrs: "46,000", img: chitwanImg, tag: "Wildlife & Nature" },
  { name: "Bandipur Town", price: "$290", nrs: "38,500", img: bandipurImg, tag: "Cultural Adventure" },
  { name: "Palpa Tansen", price: "$270", nrs: "36,000", img: palpaImg, tag: "Nature & History" },
  { name: "Mustang Valley", price: "$750", nrs: "99,000", img: mustangImg, tag: "Adventure & Nature" },
  { name: "Gosaikunda Lake", price: "$480", nrs: "63,500", img: gosaikundaImg, tag: "Adventure & Spiritual" },
  { name: "Annapurna Base", price: "$700", nrs: "93,000", img: annapurnaImg, tag: "Trekking", duration: "10 Days" },
  { name: "Machhapuchhre", price: "$500", nrs: "66,000", img: fishtailImg, tag: "Trekking", duration: "7 Days" },
  { name: "Langtang Valley", price: "$450", nrs: "60,000", img: langtangImg, tag: "Trekking", duration: "8 Days" },
  { name: "Manaslu Circuit", price: "$850", nrs: "1,13,000", img: manasluImg, tag: "Trekking", duration: "14 Days" }
];

function AllPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="mb-16 text-center">
          <span className="text-xs tracking-[0.3em] text-[#C8D9E6] font-bold uppercase">Our Full Collection</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2F4156] mt-4">Explore All Destinations</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allDestinations.map((dest, i) => (
            <div 
              key={i} 
              className="group cursor-pointer"
              onClick={() => setSelectedPackage(dest)}
            >
              <div className="relative overflow-hidden rounded-[40px] h-[450px] shadow-sm transition-all duration-500 hover:shadow-xl">
                <img 
                  src={dest.img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={dest.name} 
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm py-3 px-5 rounded-3xl shadow-xl text-center">
                  <p className="text-[10px] font-bold text-gray-400">FROM</p>
                  <p className="text-xl font-bold text-[#2F4156]">{dest.price}</p>
                  <p className="text-[10px] text-gray-400">Rs. {dest.nrs}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-[#C8D9E6] font-bold text-[10px] uppercase tracking-[0.2em]">
                  {dest.duration ? `${dest.duration} • ` : ""}{dest.tag}
                </p>
                <h3 className="text-2xl font-bold text-[#2F4156] mt-2 group-hover:text-[#F1A501] transition-colors">
                  {dest.name}, Nepal
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ITINERARY MODAL OVERLAY */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blur Backdrop */}
          <div 
            className="absolute inset-0 bg-[#2F4156]/40 backdrop-blur-md" 
            onClick={() => setSelectedPackage(null)}
          ></div>
          
          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[40px] shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPackage(null)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HiX className="w-6 h-6 text-[#2F4156]" />
            </button>

            {/* Content */}
            <span className="text-[#F1A501] font-bold text-xs uppercase tracking-widest">{selectedPackage.tag}</span>
            <h2 className="text-3xl font-bold text-[#2F4156] mt-2 mb-4">{selectedPackage.name}</h2>
            
            <div className="flex gap-6 mb-8 text-gray-500 text-sm">
              <span className="flex items-center gap-1"><HiClock className="text-[#C8D9E6]" /> {selectedPackage.duration || "Custom Days"}</span>
              <span className="flex items-center gap-1"><HiLocationMarker className="text-[#C8D9E6]" /> Nepal</span>
            </div>

            <div className="space-y-8">
              <h4 className="text-lg font-bold text-[#2F4156] border-b pb-2">Trip Itinerary</h4>
              {selectedPackage.itinerary ? selectedPackage.itinerary.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#C8D9E6] flex items-center justify-center text-[#2F4156] font-bold text-xs shrink-0">
                      {item.day}
                    </div>
                    {idx !== selectedPackage.itinerary.length - 1 && <div className="w-0.5 h-full bg-gray-100 mt-2"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="font-bold text-[#2F4156] text-sm uppercase tracking-tight">Day {item.day}: {item.title}</p>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )) : (
                <p className="italic text-gray-400">Detailed day-by-day itinerary is being updated for this package.</p>
              )}
            </div>

            <button className="w-full mt-8 bg-[#2F4156] text-white font-bold py-4 rounded-2xl hover:bg-[#C8D9E6] hover:text-[#2F4156] transition-all active:scale-95 shadow-lg">
              Book Now - {selectedPackage.price}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPackages;