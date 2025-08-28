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
    },
    {
      id: 3,
      image: "/images/img3.jpg",
      address: "XYZ Street",
      location: "Banjara Hills, Hyderabad",
      rent: "20,000/-",
      leaseEnd: "12-11-2025"
    },
    {
      id: 4,
      image: "/images/img4.jpg",
      address: "DEF Avenue",
      location: "Jubilee Hills, Hyderabad",
      rent: "22,000/-",
      leaseEnd: "01-12-2025"
    },
    {
      id: 5,
      image: "/images/img5.jpg",
      address: "LMN Road",
      location: "Gachibowli, Hyderabad",
      rent: "25,000/-",
      leaseEnd: "15-08-2025"
    }
  ];

  return (
    <section className="flex flex-col sm:flex-row">
      {/* Sidebar Component */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} className="sm:w-1/4 lg:w-1/5" />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-full">
          <h2 className="text-lg sm:text-xl font-medium mb-6">Active Rental Properties</h2>

          {/* Scrollable Container for Properties */}
          <div className="space-y-6 overflow-y-auto max-h-[500px] sm:max-h-[600px] md:max-h-[700px] lg:max-h-[800px]">
            {activeProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="w-full h-48 sm:h-60 md:h-72 bg-gray-100">
                  <img
                    src={property.image}
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
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

                  {/* Move the button to the right side */}
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
      </div>
    </section>
  );
};

export default ActiveRentals;
