import React from 'react';
import previewImg from '../assets/rara2.jpeg'; 

function BookingSteps() {
  const steps = [
    {
      id: 1,
      title: "Choose Destination",
      desc: "Input your preferences into our AI engine for tailored suggestions.",
      color: "bg-[#F1A501]"
    },
    {
      id: 2,
      title: "Confirm Details",
      desc: "Review your personalized itinerary and select your trip package.",
      color: "bg-[#DF6951]"
    },
    {
      id: 3,
      title: "Reach Destination",
      desc: "Complete your booking securely and prepare for your adventure.",
      color: "bg-[#006380]"
    }
  ];

  return (
    <section id="steps" className="w-full py-24 bg-white text-[#2F4156]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT SIDE: STEPS */}
        <div data-aos="fade-right">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Easy and Fast</span>
          <h2 className="text-4xl font-bold mt-4 mb-12 leading-tight">Book Your Next Trip<br/>In 3 Easy Steps</h2>
          
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-6">
                {/* Replaced Emoji with a numbered circle */}
                <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center shrink-0 shadow-md text-white font-bold text-sm`}>
                  {step.id}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: FLOATING CARD */}
        <div className="relative" data-aos="zoom-in">
          <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-gray-50 max-w-sm mx-auto relative z-10">
            <img 
              src={previewImg} 
              className="rounded-3xl w-full h-48 object-cover mb-6" 
              alt="Destination Preview" 
            />
            <h4 className="font-bold text-lg mb-2 text-[#2F4156]">Trip To Rara Lake</h4>
            <p className="text-xs text-gray-400 mb-6">14-29 June | by EasyTravel AI</p>
            
            {/* Replaced Emojis with simple text badges */}
            <div className="flex gap-2 mb-6">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Nature</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Map</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Flight</span>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-400 font-medium pt-4 border-t border-gray-100">
              <span className="flex items-center gap-2">Group: 24 people</span>
              <span className="text-gray-300">Booked</span>
            </div>
          </div>
          
          {/* Background Glow */}
          <div className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C8D9E6]/40 blur-[100px] rounded-full"></div>
        </div>

      </div>
    </section>
  );
}

export default BookingSteps;