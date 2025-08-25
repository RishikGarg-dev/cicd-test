import React, { useState } from 'react';
import bannerImg from '../assets/image45.png';
import NavBar from '../components/NavBar';
import Property from '../components/propertiesPage';
import { SlidersHorizontal, ChevronDown, MapPin, Search } from 'lucide-react';


const filterOptions = {
  "Property Type": ["Flat", "Villa", "Independent House"],
  "Price Range": ["< ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000", "> ₹30,000"],
  "Beds": ["1", "2", "3", "4+"],
  "Age of Property": ["New", "<5 years", "5-10 years", "10+ years"],
  "Parking": ["Yes", "No"],
  "Others": ["Furnished", "Pet Friendly", "Lift", "Security"],
};

const PropertyPage = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const importantFilters = ["Property Type", "Price Range"];
  
  const removeFilter = (filterKey) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[filterKey];
      return updated;
    });
  };

  const toggleDropdown = (filter) => {
    setActiveDropdown((prev) => (prev === filter ? null : filter));
  };

  const selectOption = (filter, option) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: option }));
    setActiveDropdown(null);
  };

  const resetAllFilters = () => {
    setSelectedFilters({});
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative bg-cover bg-center h-[300px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Filter to Fit Your Needs</h2>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            From villas and apartments to shops and offices — filter and find it all.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center my-6 px-4">
        <div className="w-full max-w-4xl border p-1 rounded-lg shadow-lg bg-white">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md w-full md:w-auto">
              <h3 className="font-medium text-sm">Hyderabad</h3>
              <ChevronDown className="w-5 h-5 text-gray-500 ml-2" />
            </div>
            <div className="flex-grow flex items-center w-full">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Enter locality or landmark or Zip code"
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

      {/* Filters */}
      <div className="bg-white pt-2 pb-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-col gap-2 sm:hidden mb-3">
            <div className="flex items-center gap-2">
              {/* Filter Icon */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 flex-shrink-0"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">Filter</span>
              </button>

              {/* Always-visible filters beside icon */}
              <div className="flex gap-2 flex-1 min-w-0">
                {importantFilters.map((filter) => (
                  <div key={filter} className="relative flex-shrink-0">
                    <button
                      onClick={() => toggleDropdown(filter)}
                      className="flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
                    >
                      {selectedFilters[filter] || filter}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {activeDropdown === filter && (
                      <div className="absolute z-50 mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-max min-w-[160px] text-left max-h-60 overflow-y-auto">
                        {filterOptions[filter].map((option) => (
                          <div
                            key={option}
                            onClick={() => selectOption(filter, option)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Filters (other than important ones) - on a separate row */}
            {Object.entries(selectedFilters).some(([filter]) => !importantFilters.includes(filter)) && (
              <div className="flex gap-2 flex-wrap">
                {Object.entries(selectedFilters).map(([filter, value]) =>
                  !importantFilters.includes(filter) ? (
                    <span
                      key={filter}
                      className="flex items-center bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {filter}: {value}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="ml-2 text-blue-800 hover:text-red-600 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Stacked filters for mobile */}
          {showMobileFilters && (
            <div className="flex flex-col gap-3 sm:hidden">
              {Object.entries(filterOptions)
                .filter(([filter]) => !importantFilters.includes(filter))
                .map(([filter, options]) => (
                  <div key={filter} className="relative">
                    <button
                      onClick={() => toggleDropdown(filter)}
                      className="w-full flex justify-between items-center text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {selectedFilters[filter] || filter}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === filter && (
                      <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-md w-full z-50 absolute">
                        {options.map((option) => (
                          <div
                            key={option}
                            onClick={() => selectOption(filter, option)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              <button
                onClick={resetAllFilters}
                className="w-full text-center text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
              >
                Reset all
              </button>
            </div>
          )}

          {/* Desktop filters inline */}
          <div className="hidden sm:flex flex-wrap justify-center gap-3">

            {Object.entries(filterOptions).map(([filter, options]) => (
              <div key={filter} className="relative">
                <button
                  onClick={() => toggleDropdown(filter)}
                  className="flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium"
                >
                 {selectedFilters[filter] ? `${filter}: ${selectedFilters[filter]}` : filter}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {activeDropdown === filter && (
                  <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-md min-w-[160px] text-left">
                    {options.map((option) => (
                      <div
                        key={option}
                        onClick={() => selectOption(filter, option)}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={resetAllFilters}
              className="flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              Reset all
            </button>
          </div>
        </div>
      </div>

      <Property selectedFilters={selectedFilters} />
    </>
  );
};

export default PropertyPage;
