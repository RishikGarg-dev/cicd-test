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
import LeaseDocuments from './components/LeaseDocuments';
import RentalsHistory from './components/RentalHistory';
import MaintenanceIssue from './components/RaiseMaintenanceIssue';
import PaymentStatus from './components/Paymentstatus';


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
          <Route path="/leasedocuments" element={<LeaseDocuments />} />
          <Route path="/rentalshistory" element={<RentalsHistory />} />
          <Route path="/maintenanceissue" element={<MaintenanceIssue />} />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
