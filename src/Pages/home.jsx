import React, { useState } from 'react';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [price, setPrice] = useState(5000);
  const [location, setLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [age, setAge] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [showSlider, setShowSlider] = useState(false);




  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      location,
      selectedPrice,
      age,
      propertyType
    };

    console.log("Form Data:", formData);
    // You can replace this with logic to send data to backend or filter results
  };


  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-black">Swiftly</span>
          </div>

          {/* Desktop Nav */}
          <div className="flex items-center space-x-4 ml-auto">
  <a href="#home" className="text-black text-sm font-medium hover:text-gray-700">Home</a>
  <a href="#about" className="text-black text-sm font-medium hover:text-gray-700">Properties</a>
  <a href="#login" className="text-black text-sm font-medium hover:text-gray-700">
    <i className="fas fa-user mr-1"></i> Login
  </a>
</div>

        </div>
      </nav>
      <div>
        <div className="relative w-full">
          <div className="bg-[url('/banner.png')] bg-cover bg-center h-150 w-full relative">
            {/* Text on Top of Image */}
            <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h1 className="text-5xl font-bold text-white text-center leading-snug">
                Find, Rent, and Manage <br />Homes Swiftly
              </h1>
              <p className="mt-6 text-xl md:text-xl font-medium drop-shadow-sm">
                Easy Steps to find your next home <br />Partner, View, Tour, Shift.
              </p>
              <div className="mt-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
  <form onSubmit={handleSubmit}>
    <div className="relative bg-white/20 backdrop-blur-md rounded-full px-2 sm:px-4 py-3 sm:py-3 flex items-center justify-between max-w-full sm:max-w-5xl mx-auto mt-10 shadow-md text-xs sm:text-sm gap-1 sm:gap-2 overflow-visible">


      {/* Location */}
      <div className="flex items-center gap-1">
        <i className="fas fa-map-marker-alt text-black ml-1 sm:ml-2 text-xs sm:text-sm"></i>
        <input
          type="text"
          placeholder="Enter location"
          className="px-2 sm:px-3 py-1 rounded-md text-black focus:outline-none placeholder-black text-xs sm:text-sm w-24 sm:w-auto"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="self-stretch w-px bg-black/30 mx-1" />



      {/* Price Range */}
      <div className="relative">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setShowSlider(!showSlider)}
        >
          <i className="fas fa-money-bill-wave text-black ml-1 sm:ml-2 mr-1 text-xs sm:text-sm"></i>
          <span className="text-black text-xs sm:text-sm whitespace-nowrap pr-1 ml-2 sm:mr-12">
            Price Range
          </span>
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

      <div className="self-stretch w-px bg-black/30 mx-1" />


      {/* Age */}
      <div className="flex items-center">
        <i className="fas fa-hourglass-half text-black mr-2 text-xs sm:text-sm"></i>
        <input
          type="text"
          placeholder="Age of properties"
          className="bg-transparent outline-none text-black placeholder-black w-24 sm:w-auto text-xs sm:text-sm"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="self-stretch w-px bg-black/30 mx-1" />


      {/* Property Type */}
      <div className="flex items-center">
        <i className="fas fa-building text-black ml-1 sm:ml-2 text-xs sm:text-sm"></i>
        <select
          className="px-2 sm:px-3 py-1 rounded-md text-black focus:outline-none cursor-pointer text-xs sm:text-sm"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Property Type</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK </option>
          <option value="3 BHK">3 BHK</option>
        </select>
      </div>

      {/* Search Button */}
      <button className="text-black px-2 sm:px-3 cursor-pointer">
        <i className="fas fa-search text-sm sm:text-xl"></i>
      </button>
    </div>
  </form>
</div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}