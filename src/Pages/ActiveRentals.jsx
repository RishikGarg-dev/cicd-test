import React, { useState } from 'react';
import Sidebar from '../components/SideBar';  // Import Sidebar Component
import { Link } from 'react-router-dom';

const ActiveRentals = () => {
  const [activeSection, setActiveSection] = useState('my-rentals');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const activeProperties = [
    {
      id: 1,
      image: "/images/img1.jpg",
      address: "ABC Main st.",
      location: "LB Nagar, Hyderabad",
      rent: "18,000/-",
      leaseEnd: "10-09-2025"
    },
    {
      id: 2,
      image: "/images/img2.jpeg",
      address: "ABC Main st.",
      location: "LB Nagar, Hyderabad",
      rent: "18,000/-",
      leaseEnd: "10-09-2025"
    }
  ];

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-6">Active Rental Properties</h2>

          <div className="space-y-6">
            {activeProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="w-full h-48 bg-gray-100">
                  <img
                    src={property.image}
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{property.address}</h3>
                      <p className="text-gray-600 text-sm">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{property.rent}</p>
                    </div>
                  </div>

                  {property.leaseEnd && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        Lease Ends on: <span className="text-gray-900">{property.leaseEnd}</span>
                      </p>
                    </div>
                  )}

                  <Link to={`/rentals/${property.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ActiveRentals