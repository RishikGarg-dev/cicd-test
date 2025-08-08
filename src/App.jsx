import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginSignup from './Pages/LoginSignUpPage'
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/HomePage';
import Properties from './Pages/PropertiesPage';
import VerifiedListings from './Pages/VerifiedlistingPage'
import FurnitureRewards from './Pages/FurnitureRewardsPage'
import UpToDayRentals from './Pages/UpToDayRentalsPage'
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginSignup />} />
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






