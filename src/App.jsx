import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FeaturedProperties from './components/FeaturedProperties.jsx';
import TrustedProperties from './components/TrustedProperties';
import StartRenting from './components/StartRenting';
import CardCarousel from './components/home.jsx';
import Footer from './components/Footer';

import './App.css';

const Home = () => (
  <div>
    <FeaturedProperties />
    <CardCarousel />
    <TrustedProperties />
    <StartRenting />
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="max-w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}