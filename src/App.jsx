import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FeaturedProperties from "./components/FeaturedProperties";
import TrustedProperties from "./components/TrustedProperties";
import StartRenting from "./components/StartRenting";
import CardCarousel from "./components/home";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <FeaturedProperties />
      <CardCarousel />
      <TrustedProperties />
      <StartRenting />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
