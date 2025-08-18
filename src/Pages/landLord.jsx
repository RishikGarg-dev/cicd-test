import React, { useState } from 'react';
import MyProperty from '../components/myProperty';
import ApplicationsList from '../components/applicationList';
import PropertyForm from '../components/AddProperty';
import LeaseAgreementsComp from '../components/LeaseAgreement'; // renamed import
import MaintenanceRequestsComp from '../components/MaintanenceRequests';
import { Menu } from 'lucide-react'; // Optional icon
import Navbar from '../components/NavBar';

// Section components
const MyProperties = () => <MyProperty />;
const RentalApplications = () => <ApplicationsList />;
const Addproperty = () => <PropertyForm />;
const LeaseAgreements = () => <LeaseAgreementsComp />;   // use alias here
const MaintenanceRequests = () =><MaintenanceRequestsComp />;

// Menu config
const menuItems = [
  { key: 'my properties', component: <MyProperties /> },
  { key: 'rental applications', component: <RentalApplications /> },
  { key: 'add property', component: <Addproperty /> },
  { key: 'lease agreements', component: <LeaseAgreements /> },
  { key: 'maintenance requests', component: <MaintenanceRequests /> },
];

const LandlordDashboard = () => {
  const [activeKey, setActiveKey] = useState(menuItems[0].key);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle

  const activeComponent = menuItems.find((item) => item.key === activeKey)?.component;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Topbar for mobile */}
      <div className="md:hidden p-4 flex items-center justify-between bg-white shadow">
        <h2 className="text-xl font-semibold capitalize">{activeKey}</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${menuOpen ? 'block' : 'hidden'} 
          md:block w-full md:w-64 bg-gray-100 border-r border-gray-300 p-4
        `}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center text-lg capitalize font-medium px-4 py-2 cursor-pointer
                ${activeKey === item.key ? 'bg-gray-300 border-l-4 border-red-600' : ''}
              `}
              onClick={() => {
                setActiveKey(item.key);
                setMenuOpen(false); // Close menu on mobile after selection
              }}
            >
              {item.key}
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-auto">
        {activeComponent}
      </div>
    </div>
    </>
  );
};

export default LandlordDashboard;
