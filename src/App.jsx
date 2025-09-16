import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginSignup from './Pages/LoginSignUpPage';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/HomePage';
import PropertyPage from './Pages/PropertiesPage';
import VerifiedListings from './Pages/VerifiedlistingPage';
import FurnitureRewards from './Pages/FurnitureRewardsPage';
import UpToDayRentals from './Pages/UpToDayRentalsPage';
import Landlord from './Pages/landLord';
import Footer from './components/Footer';
import Agent from './Pages/Agent';
import AgentDetails from "./components/AgentDetails";
import ActiveRentals from './Pages/MyRentals';

// ✅ only blog listing import
import BlogPage from './Pages/BlogPage';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/properties/:id" element={<HouseDetail />} />
          <Route path="/verified-listings" element={<VerifiedListings />} />
          <Route path="/furniture-rewards" element={<FurnitureRewards />} />
          <Route path="/up-to-day-rentals" element={<UpToDayRentals />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/agent/:id" element={<AgentDetails />} />
          <Route path="/landlord" element={<Landlord />} />
          <Route path="/myrentals" element={<ActiveRentals />} />

          {/* ✅ single blog route */}
          <Route path="/blogs" element={<BlogPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
