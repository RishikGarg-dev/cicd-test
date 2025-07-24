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
              <div className="mt-6 w-full max-w-4xl mx-auto px-4">
                <form onSubmit={handleSubmit}>

                  <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center justify-between max-w-5xl mx-auto mt-20 shadow-md text-sm">
                    {/* Location */}
                    <div className="flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-black ml-2"></i>
                      <input
                        type="text"
                        placeholder="Enter location"
                        className="flex-1 px-4 py-2 rounded-md text-black focus:outline-none placeholder-black text-md"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}

                      />
                    </div>

                    <div className="h-6 w-px bg-black/30 mx-1" />

                    {/* Price Range */}
                    <div className="relative">
                      <div
                        className="flex items-center gap-1 cursor-pointer mr-15"
                        onClick={() => setShowSlider(!showSlider)}
                      >
                        <i className="fas fa-money-bill-wave text-black ml-2 mr-3"></i>
                        <span className="text-black text-md whitespace-nowrap">
                          Price Range
                        </span>
                      </div>

                      {/* Slider Dropdown Panel */}
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


                    <div className="h-6 w-px bg-black/30 mx-1" />

                    {/* Age */}
                    <div className="flex items-center px-3">
                      <i className="fas fa-hourglass-half text-black mr-3"></i>
                      <input
                        type="text"
                        placeholder="Age of properties"
                        className="bg-transparent outline-none text-black placeholder-black"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-[1.5px] bg-black/30 mx-1" />

                    {/* Property Type */}
                    <div className="flex items-center gap-0">
                      <i className="fas fa-building text-black ml-2"></i>
                      <select className="flex-1 px-3 py-2 rounded-md text-black focus:outline-none cursor-pointer"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="">Property Type</option>
                        <option value="flat">Flat</option>
                        <option value="house">House</option>
                        <option value="pg">PG</option>
                      </select>
                    </div>

                    {/* Search Button */}
                    <button className="text-black px-3 cursor-pointer">
                      <i className="fas fa-search text-xl"></i>
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