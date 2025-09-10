import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import your actual components
import LeaseDocuments from '../components/LeaseDocuments';
import RentalsHistory from '../components/RentalHistory';
import MaintenanceIssue from '../components/RaiseMaintenanceIssue';
import PaymentStatus from '../components/Paymentstatus';

// --- Section Components ---
const MyRentals = () => {
  const activeProperties = [
    { id: 1, image: "/images/img1.jpg", address: "ABC Main st.", location: "LB Nagar, Hyderabad", rent: "18,000/-", leaseEnd: "10-09-2025" },
    { id: 2, image: "/images/img2.jpeg", address: "ABC Main st.", location: "LB Nagar, Hyderabad", rent: "18,000/-", leaseEnd: "10-09-2025" },
    { id: 3, image: "/images/img3.jpeg", address: "XYZ Street", location: "Banjara Hills, Hyderabad", rent: "20,000/-", leaseEnd: "12-11-2025" },
    { id: 4, image: "/images/img4.jpg", address: "DEF Avenue", location: "Jubilee Hills, Hyderabad", rent: "22,000/-", leaseEnd: "01-12-2025" },
    { id: 5, image: "/images/img5.jpg", address: "LMN Road", location: "Gachibowli, Hyderabad", rent: "25,000/-", leaseEnd: "15-08-2025" }
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-medium mb-6">Active Rental Properties</h2>

      <div className="space-y-6">
        {activeProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="w-full h-48 sm:h-60 md:h-72 bg-gray-100">
              <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 text-base sm:text-lg">{property.address}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{property.location}</p>
                </div>
                <div className="text-right mt-3 sm:mt-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{property.rent}</p>
                </div>
              </div>

              {property.leaseEnd && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    Lease Ends on: <span className="text-gray-900">{property.leaseEnd}</span>
                  </p>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Link to={`/rentals/${property.id}`} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm sm:text-base">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Menu Config ---
const menuItems = [
  { key: "my rentals", component: <MyRentals /> },
  { key: "rentals history", component: <RentalsHistory /> },
  { key: "lease documents", component: <LeaseDocuments /> },
  { key: "payment status", component: <PaymentStatus /> },
  { key: "maintenance issue", component: <MaintenanceIssue /> },
];

const ActiveRentals = () => {
  const [activeKey, setActiveKey] = useState(menuItems[0].key);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeComponent = menuItems.find((item) => item.key === activeKey)?.component;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile topbar */}
      <div className="md:hidden p-4 flex items-center justify-between bg-white shadow">
        <h2 className="text-xl font-semibold capitalize">{activeKey}</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 p-2">☰</button>
      </div>

      {/* Sidebar */}
      <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-100 border-r border-gray-300 p-4`}>
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center text-lg capitalize font-medium px-4 py-2 cursor-pointer
                ${activeKey === item.key ? 'bg-gray-300' : ''}`}
              onClick={() => {
                setActiveKey(item.key);
                setMenuOpen(false);
              }}
            >
              {item.key}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content with separate scroll */}
      <div className="flex-1 h-screen overflow-y-auto p-6">
        {activeComponent}
      </div>
    </div>
  );
};

export default ActiveRentals;
