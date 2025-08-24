import React from "react";
import Sidebar from "./SideBar"; // Import Sidebar component

const RentalsHistory = ({ activeSection, onSectionChange }) => {
  const historyProperties = [
    {
      id: 1,
      image: "/images/img5.jpg",
      address: "ABC Main st.",
      location: "LB Nagar, Hyderabad",
      rent: "18,000/-",
      leaseDetails: "10th July 2024 - 11th June 2025",
      increaseRate: "Quarterly"
    },
    {
      id: 2,
      image: "/images/img4.jpg",
      address: "XYZ Main st.",
      location: "Banjara Hills, Hyderabad",
      rent: "20,000/-",
      leaseDetails: "1st August 2024 - 31st July 2025",
      increaseRate: "Annually"
    }
  ];

  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-6">History</h2>

          <div className="space-y-6">
            {historyProperties.map((property) => (
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

                  <div className="mb-3 space-y-2">
                    <p className="text-sm text-gray-600">
                      Lease: <span className="text-gray-900">{property.leaseDetails}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Increase Rate: <span className="text-gray-900">{property.increaseRate}</span>
                    </p>
                  </div>

                  <button className="text-blue-500 hover:underline cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalsHistory;
