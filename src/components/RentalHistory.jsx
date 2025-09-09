import React from "react";
import Sidebar from "./SideBar"; 

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
    <section className="flex flex-col sm:flex-row">

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-full">
          <h2 className="text-lg sm:text-xl font-medium mb-6">History</h2>

          {/*  History Properties */}
          <div className="space-y-6 overflow-y-auto max-h-[500px] sm:max-h-[600px] md:max-h-[700px] lg:max-h-[800px]">
            {historyProperties.map((property) => (
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

                  <div className="mb-3 space-y-2">
                    <p className="text-sm text-gray-600">
                      Lease: <span className="text-gray-900">{property.leaseDetails}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Increase Rate: <span className="text-gray-900">{property.increaseRate}</span>
                    </p>
                  </div>

                  
                  <div className="flex justify-end mt-4">
                    <button className="text-blue-500 hover:underline cursor-pointer">
                      View Details
                    </button>
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

export default RentalsHistory;
