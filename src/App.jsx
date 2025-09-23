import React from 'react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginSignup from './Pages/LoginSignUpPage';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/HomePage';
import PropertyPage from './Pages/PropertiesPage';
import VerifiedListings from './Pages/VerifiedlistingPage';
import FurnitureRewards from './Pages/FurnitureRewardsPage';
import UpToDayRentals from './Pages/UpToDayRentalsPage';
import Landlord from './Pages/LandLord';
import Footer from './components/Footer';
import Agent from './Pages/Agent';
import AgentDetails from "./components/AgentDetails";
import ActiveRentals from './Pages/MyRentals';
import BlogPage from './Pages/BlogPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/Login" element={<LoginSignup />} />
        <Route exact path="/properties" element={<PropertyPage />} />
        <Route path="/properties/:id" element={<HouseDetail />} />
        <Route path="/verified-listings" element={<VerifiedListings />} />
        <Route path="/furniture-rewards" element={<FurnitureRewards />} />
        <Route path="/up-to-day-rentals" element={<UpToDayRentals />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/agent/:id" element={<AgentDetails />} />
        <Route path="/landlord" element={<Landlord />} />
        <Route path="/myrentals" element={<ActiveRentals />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
