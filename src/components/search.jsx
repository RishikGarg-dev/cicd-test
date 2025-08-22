// src/components/SearchAndFilters.jsx
import React from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import bannerImg from '../assets/image45.png';

const Search = () => {
  const filters = ["Property Type", "Age of Property", "Price Range", "Beds", "Parking", "Others"];

  return (
    <>
      {/* Hero with Search */}
      <div
        className="relative bg-cover bg-center h-[500px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Filter to Fit Your Needs</h2>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            From villas and apartments to shops and offices — filter and find it all.
          </p>
          <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center border-r border-gray-200 pr-4 w-full md:w-auto">
                <h3 className="font-semibold text-gray-800">Hyderabad</h3>
                <ChevronDown className="w-5 h-5 text-gray-500 ml-2" />
              </div>
              <div className="flex-grow flex items-center w-full">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Enter locality or land mark or Zip code"
                  className="w-full focus:outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center w-full md:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                className="flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
              >
                {filter}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            ))}
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-900">Reset all</button>
        </div>
      </div>
    </>
  );
};

export default Search;
