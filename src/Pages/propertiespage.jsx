import React, { useState } from 'react';
import bannerImg from '/images/banner.p.png'; // Ensure this path is correct
import { SlidersHorizontal, ChevronDown, MapPin, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard'; // assuming you still keep PropertyCard separate
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
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[300px]"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Filter to Fit Your Needs</h2>
          <p className="max-w-2xl mb-8 text-lg md:text-xl">
            From villas and apartments to shops and offices — filter and find it all.
          </p>
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex justify-center w-full px-4 my-6">
        <div className="w-full max-w-4xl p-1 bg-white border rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex items-center w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 md:w-auto">
              <h3 className="text-sm font-medium">Hyderabad</h3>
              <ChevronDown className="w-5 h-5 ml-2 text-gray-500" />
            </div>
            <div className="flex items-center flex-grow w-full">
              <MapPin className="w-5 h-5 mr-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter locality or landmark or Zip code"
                className="w-full text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center justify-center w-full px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 md:w-auto">
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="px-4 pt-2 pb-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Mobile Filters */}
          <div className="flex flex-col gap-2 mb-3 sm:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center flex-shrink-0 gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">Filter</span>
              </button>
              <div className="flex flex-1 min-w-0 gap-2">
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
                            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
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
            {Object.entries(selectedFilters).some(([filter]) => !importantFilters.includes(filter)) && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([filter, value]) =>
                  !importantFilters.includes(filter) ? (
                    <span
                      key={filter}
                      className="flex items-center px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
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
          {showMobileFilters && (
            <div className="flex flex-col gap-3 sm:hidden">
              {Object.entries(filterOptions)
                .filter(([filter]) => !importantFilters.includes(filter))
                .map(([filter, options]) => (
                  <div key={filter} className="relative">
                    <button
                      onClick={() => toggleDropdown(filter)}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      {selectedFilters[filter] || filter}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === filter && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md">
                        {options.map((option) => (
                          <div
                            key={option}
                            onClick={() => selectOption(filter, option)}
                            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
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
                className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Reset all
              </button>
            </div>
          )}
          {/* Desktop Filters */}
          <div className="flex-wrap justify-center hidden gap-3 sm:flex">
            {Object.entries(filterOptions).map(([filter, options]) => (
              <div key={filter} className="relative">
                <button
                  onClick={() => toggleDropdown(filter)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
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
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
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
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              Reset all
            </button>
          </div>
        </div>
      </div>
      {/* Property Section */}
      <section className="px-4 py-6 md:px-10">
        <h2 className="mb-4 text-2xl font-bold">Explore Properties</h2>
        <PropertyCard selectedFilters={selectedFilters} />
      </section>
    </>
  );
};
export default PropertyPage;