
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Section Imports
import Header from "./section/Header.jsx";
import Hero from "./section/Hero.jsx";
import About from "./section/About.jsx";
import Services from "./section/Services.jsx";
import Counter from "./section/Counter.jsx";
import CtaOne from "./section/CtaOne.jsx";
import Packages from "./section/Packages.jsx";
import BookingSteps from "./section/BookingSteps.jsx";
import BookingForm from "./section/BookingForm.jsx";
import Footer from "./section/Footer.jsx";

import AllPackages from "./section/AllPackages.jsx";
import RecommendationPage from "./section/RecommendationPage.jsx";
import AdminDashboard from "./section/AdminDashboard.jsx";
import Register from "./section/Register.jsx";
import Login from "./section/Login.jsx";

// =========================
// LANDING PAGE
// =========================

const Home = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Counter />
    <CtaOne />
    <Packages />
    <BookingSteps />
    <BookingForm />
  </>
);

// =========================
// LAYOUT
// =========================

function Layout() {
  const location = useLocation();

  // Admin dashboard has its own header and footer
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="overflow-x-hidden">

      {/* NORMAL WEBSITE HEADER */}
      {!isAdminPage && <Header />}

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ALL DESTINATIONS */}
        <Route
          path="/all-packages"
          element={<AllPackages />}
        />

        {/* AI RECOMMENDATION */}
        <Route
          path="/recommendation"
          element={<RecommendationPage />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* UNKNOWN PAGE */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

      {/* NORMAL WEBSITE FOOTER */}
      {!isAdminPage && <Footer />}

    </div>
  );
}

// =========================
// APP
// =========================

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

