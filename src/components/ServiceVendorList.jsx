import React from 'react';

const vendors = {
  1: [
    { name: 'Fresh Milk Co.', rating: 4.5, price: '₹2/L', image: 'https://via.placeholder.com/300x200' },
    { name: 'Dairy Delight', rating: 4.0, price: '₹2.5/L', image: 'https://via.placeholder.com/300x200' },
  ],
  2: [
    { name: 'Pure Water Supply', rating: 5.0, price: '₹1.5/Unit', image: 'https://via.placeholder.com/300x200' },
    { name: 'AquaFresh', rating: 4.8, price: '₹2/Unit', image: 'https://via.placeholder.com/300x200' },
  ],
  3: [
    { name: 'Super Grocer', rating: 4.7, price: '₹30/Bag', image: 'https://via.placeholder.com/300x200' },
    { name: 'Quick Grocery', rating: 4.2, price: '₹25/Bag', image: 'https://via.placeholder.com/300x200' },
  ],
  4: [
    { name: 'Clean Sweep', rating: 4.3, price: '₹15/Day', image: 'https://via.placeholder.com/300x200' },
    { name: 'Sparkle Cleaners', rating: 4.8, price: '₹18/Day', image: 'https://via.placeholder.com/300x200' },
  ],
};

const VendorList = ({ serviceId }) => {
  const vendorData = vendors[serviceId] || [];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Vendors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorData.map((vendor, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                <p className="text-sm text-gray-500">Rating: ⭐ {vendor.rating}</p>
                <p className="text-sm text-gray-700 font-medium mt-1">Price: {vendor.price}</p>
              </div>

              {/* Small Button on Bottom Right */}
              <div className="mt-4 flex justify-end">
                <button
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={() => alert(`Viewing details for ${vendor.name}`)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
