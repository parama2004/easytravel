import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2F4156] text-white text-2xl shadow-lg mb-4">
            ✈
          </div>

          <h1 className="text-3xl font-bold text-[#2F4156]">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue your EasyTravel journey.
          </p>

        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[30px] shadow-xl border border-gray-100 p-8">

          <h2 className="text-xl font-bold text-[#2F4156] mb-6">
            Login
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:bg-white focus:border-[#F1A501] transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:bg-white focus:border-[#F1A501] transition"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F1A501] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#df9801] hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* REGISTER LINK */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">

            <p className="text-sm text-gray-500">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-[#F1A501] font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>

        </div>

        {/* BACK HOME */}
        <div className="text-center mt-6">

          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-[#2F4156] transition"
          >
            ← Back to EasyTravel
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;