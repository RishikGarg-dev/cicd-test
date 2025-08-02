import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Header from './components/Header';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/home';
import Properties from './Pages/propertiespage';
import VerifiedListings from './pages/verifiedlistingpage'
import FurnitureRewards from './pages/furniturerewardspage'
import UpToDayRentals from './pages/uptodayrentalspage'
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<HouseDetail />} />
          <Route path="/verified-listings" element={<VerifiedListings />} />
          <Route path="/furniture-rewards" element={<FurnitureRewards />} />
          <Route path="/up-to-day-rentals" element={<UpToDayRentals />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App

