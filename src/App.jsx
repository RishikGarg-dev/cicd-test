import React from 'react';
import NewsDetailsPage from "./Pages/NewsDetailsPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginSignup from './Pages/LoginSignUpPage';
import HouseDetail from './components/HouseDetail';
import HomePage from './Pages/HomePage';
import PropertyPage from './Pages/propertiespage'
import VerifiedListings from './Pages/verifiedlistingpage';
import FurnitureRewards from './Pages/furniturerewardspage';
import UpToDayRentals from './Pages/uptodayrentalspage';
import Landlord from './Pages/landLord';
import Footer from './components/Footer';
import Agent from './Pages/Agent';
import AgentDetails from "./components/AgentDetails";
import ActiveRentals from './Pages/MyRentals';
import BlogPage from './Pages/BlogPage';
import ScheduleTour from './Pages/ScheduleTour';
import BlogsDetailsPage from './Pages/BlogsDetailsPage';
import SavedPropertiesPage from './Pages/SavedPropertiesPage';
import { WishlistProvider } from './context/WishlistProvider';

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
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

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogsDetailsPage />} />
          <Route path="/news/:id" element={<NewsDetailsPage />} />
          <Route path="/property/:id/schedule-tour" element={<ScheduleTour />} />
          <Route path="/saved-properties" element={<SavedPropertiesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;