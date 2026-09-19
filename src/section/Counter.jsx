import React from 'react';

function Counter() {
  const stats = [
    { label: "Destinations", value: "12+" },
    { label: "Happy Travelers", value: "1500+" },
    { label: "AI Suggestions", value: "5000+" },
    { label: "Partner Agencies", value: "20+" }
  ];

  return (
    <section className="w-full bg-[#2F4156] py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center lg:items-start border-l border-gray-700 pl-8">
              <span className="text-4xl font-bold text-[#C8D9E6]">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold mt-2 text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Counter;