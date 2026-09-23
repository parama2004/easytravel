import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function BookingForm() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "Rara Lake",
    travelDate: "",
    travelers: 1,
  });

  // Status messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "travelers" ? Number(value) : value,
    }));
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      console.log("Sending booking:", formData);

      const response = await fetch(
        "https://easytravel-hgi8.vercel.app/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Booking response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save booking"
        );
      }

      // Success
      setMessage(
        "Booking inquiry sent successfully! Our team will contact you soon."
      );

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        destination: "Rara Lake",
        travelDate: "",
        travelers: 1,
      });
    } catch (err) {
      console.error("Booking error:", err);

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="w-full py-24 bg-[#F8FAFC] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        <div
          className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          data-aos="zoom-in"
        >
          {/* LEFT SIDE: INFO */}
          <div className="bg-[#2F4156] p-12 text-white flex flex-col justify-center relative">
            <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

            <span
              className="text-[#F1A501] font-bold text-sm uppercase tracking-widest mb-4 block"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Plan Your Trip
            </span>

            <h2
              className="text-4xl font-bold mb-6 leading-tight"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              Ready to start your adventure?
            </h2>

            <p
              className="text-gray-300 text-sm leading-relaxed mb-8"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              Fill out the form and our team will get back
              to you within 24 hours with a custom itinerary
              tailored to your preferences.
            </p>

            <div
              className="space-y-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="flex items-center gap-4 text-sm text-gray-200">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  📍
                </span>
                Kathmandu, Nepal
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-200">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  📞
                </span>
                +977 123456789
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="p-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* FULL NAME */}
              <div
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#F1A501] focus:ring-4 focus:ring-[#F1A501]/5 transition-all duration-300"
                />
              </div>

              {/* EMAIL */}
              <div
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#F1A501] focus:ring-4 focus:ring-[#F1A501]/5 transition-all duration-300"
                />
              </div>

              {/* PHONE */}
              <div
                data-aos="fade-left"
                data-aos-delay="350"
              >
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Phone Number
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#F1A501] focus:ring-4 focus:ring-[#F1A501]/5 transition-all duration-300"
                />
              </div>

              {/* DESTINATION */}
              <div
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Select Destination
                </label>

                <div className="relative">
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#F1A501] appearance-none cursor-pointer transition-all duration-300"
                  >
                    <option>Rara Lake</option>
                    <option>Pokhara</option>
                    <option>Tilicho Lake</option>
                    <option>Everest Base Camp</option>
                    <option>Annapurna Base Camp</option>
                    <option>Langtang Valley</option>
                    <option>Gosaikunda Lake</option>
                    <option>Mustang</option>
                    <option>Chitwan National Park</option>
                    <option>Lumbini</option>
                    <option>Bandipur</option>
                    <option>Bhaktapur</option>
                    <option>Patan</option>
                  </select>

                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* TRAVEL DATE */}
              <div
                data-aos="fade-left"
                data-aos-delay="450"
              >
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Travel Date
                </label>

                <input
                  required
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#F1A501] focus:ring-4 focus:ring-[#F1A501]/5 transition-all duration-300"
                />
              </div>

              {/* NUMBER OF TRAVELERS */}
              <div
                data-aos="fade-left"
                data-aos-delay="500"
              >
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Number of Travelers
                </label>

                <input
                  required
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:bg-white focus:border-[#F1A501] focus:ring-4 focus:ring-[#F1A501]/5 transition-all duration-300"
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {message && (
                <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-3 text-sm">
                  {message}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                data-aos="zoom-in"
                data-aos-delay="550"
                className="w-full bg-[#F1A501] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#df9801] hover:shadow-[#F1A501]/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;