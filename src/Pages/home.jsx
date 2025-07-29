import React, { useState } from 'react';
import { houses } from '../houses'; 
import HouseCard from '../components/HouseCard'; 

export default function HomePage() {
  const [price, setPrice] = useState(5000);
  const [location, setLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [age, setAge] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [showSlider, setShowSlider] = useState(false);

  // State variable for favorites
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite functionality
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { location, selectedPrice, age, propertyType };
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Hero Section */}
      <section className="relative w-full">
        <div className="bg-cover bg-center h-[600px] w-full relative" style={{ backgroundImage: "url('/banner.png')" }}>
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-snug">
              Find, Rent, and Manage <br />Homes Swiftly
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-medium drop-shadow-sm">
              Easy Steps to find your next home <br />Partner, View, Tour, Shift.
            </p>

            {/* Search Form */}
            <div className="mt-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
              <form onSubmit={handleSubmit}>
                <div className="relative bg-white/20 backdrop-blur-md rounded-full px-4 py-3 flex items-center justify-between gap-2 overflow-visible">

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-black text-sm"></i>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="px-3 py-1 rounded-md text-black focus:outline-none placeholder-black text-sm"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* Divider */}
                  <div className="self-stretch w-px bg-black/30 mx-2" />

                  {/* Price Range */}
                  <div className="relative">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => setShowSlider(!showSlider)}
                    >
                      <i className="fas fa-money-bill-wave text-black text-sm"></i>
                      <span className="text-black text-sm">Price Range</span>
                    </div>

                    {showSlider && (
                      <div className="absolute top-full mt-2 left-0 bg-white p-4 rounded-lg shadow-lg z-10 w-64">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Max Price: ₹{price.toLocaleString()}
                        </label>
                        <input
                          type="range"
                          min="1000"
                          max="50000"
                          step="500"
                          value={price}
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                            setSelectedPrice(`0-${e.target.value}`);
                          }}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="self-stretch w-px bg-black/30 mx-2" />

                  {/* Age */}
                  <div className="flex items-center gap-2">
                    <i className="fas fa-hourglass-half text-black text-sm"></i>
                    <input
                      type="text"
                      placeholder="Age of properties"
                      className="bg-transparent outline-none text-black placeholder-black text-sm"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  {/* Divider */}
                  <div className="self-stretch w-px bg-black/30 mx-2" />

                  {/* Property Type */}
                  <div className="flex items-center gap-2">
                    <i className="fas fa-building text-black text-sm"></i>
                    <select
                      className="px-3 py-1 rounded-md text-black focus:outline-none cursor-pointer text-sm"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Property Type</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <button className="text-black px-3 py-1 cursor-pointer">
                    <i className="fas fa-search text-xl"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* House Listings Section */}
      <section className="p-5 text-center">
        <h1 className="text-xl sm:text-2xl text-red-500 font-bold"><strong>Discount Listings</strong></h1>
        <p className="text-lg sm:text-xl">Special deals and exclusive discounts - rent smarter, save more.</p>

        <div
          className="overflow-x-auto whitespace-nowrap flex justify-start max-w-[960px] mx-auto my-8 pb-4"
        >
          {houses.map((house) => (
            <div key={house.id} className="inline-block">
              <HouseCard
                house={house}
                isFavorite={favorites.includes(house.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
