import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/home';
import NavBar from './components/NavBar';
import Properties from './Pages/propertiespage';
import VerifiedListings from './Pages/verifiedlistingpage';
import FurnitureRewards from './Pages/furniturerewardspage';
import UpToDayRentals from './Pages/uptodayrentalspage';
import Landlord  from './Pages/landLord';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<HouseDetail />} />
          <Route path="/verified-listings" element={<VerifiedListings />} />
          <Route path="/furniture-rewards" element={<FurnitureRewards />} />
          <Route path="/up-to-day-rentals" element={<UpToDayRentals />} />
          <Route path="/landlord" element={<Landlord/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App

