// PropertyPage.js
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import bannerImg from "../assets/banner.p.png";
import { ChevronDown } from "lucide-react";
import HouseCard from "../components/HouseCard";
import { houses as initialHouses } from "../houses";

// Utility to dynamically get unique values from houses for filters
const getFilterOptions = (houses) => {
  return {
    Beds: [...new Set(houses.map((h) => h.beds))],
    Parking: [...new Set(houses.map((h) => h.parking))],
    Furnishing: [...new Set(houses.map((h) => h.furnishing))],
    Others: ["Lift", "Security", "Pet Friendly"],
  };
};

// Helper function to convert price string to number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.toString().replace(/[^0-9]/g, '')) || 0;
};

// Fixed price range
const priceRange = {
  min: 500,
  max: 100000
};

function PortalPopup({ anchor, onClose, children, className = "", style = {}, offset = { x: 0, y: 8 } }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    const updatePos = () => {
      const anchorEl = anchor?.current || anchor;
      if (!anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      setPos({
        left: Math.max(8, rect.left + window.scrollX + offset.x),
        top: rect.bottom + window.scrollY + offset.y,
      });
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [anchor, offset]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const anchorEl = anchor?.current || anchor;
      if (!containerRef.current?.contains(e.target) && !anchorEl?.contains(e.target)) onClose?.();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchor, onClose]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={containerRef}
      className={`bg-white rounded-lg shadow-xl ${className}`}
      style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999, ...style }}
    >
      {children}
    </div>,
    document.body
  );
}

const PropertyPage = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState(priceRange.max);
  const [age, setAge] = useState(100);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showSlider, setShowSlider] = useState(false);
  const [showAgeSlider, setShowAgeSlider] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const priceRef = useRef(null);
  const ageRef = useRef(null);
  const buttonRefs = useRef({});

  const filterOptions = getFilterOptions(initialHouses);

  const propertyTypes = [...new Set(initialHouses.map(house => house.propertyType))];

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));

  const toggleDropdown = (filter) => setActiveDropdown((prev) => (prev === filter ? null : filter));
  const selectOption = (filter, option) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: option }));
    setActiveDropdown(null);
  };
  const removeFilter = (filterKey) => {
    const updated = { ...selectedFilters };
    delete updated[filterKey];
    setSelectedFilters(updated);
  };

  const resetAllFilters = () => {
    setSelectedFilters({});
    setPropertyType("");
    setLocation("");
    setPrice(priceRange.max);
    setAge(100);
    setShowSlider(false);
    setShowAgeSlider(false);
    setActiveDropdown(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, price, age, propertyType, selectedFilters });
  };

  let filteredHouses = initialHouses.filter((house) => {
    if (location && !house.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (propertyType && house.propertyType !== propertyType) return false;
    const housePrice = parsePrice(house.price);
    if (price && housePrice > price) return false;
    if (age < 100 && house.propertyAge && house.propertyAge > age) return false;
    for (let key in selectedFilters) {
      if (key === "Others") {
        for (let o of selectedFilters[key].split(",")) {
          if (!house[o.toLowerCase()]) return false;
        }
      } else if (house[key.toLowerCase()] && house[key.toLowerCase()] !== selectedFilters[key]) return false;
    }
    return true;
  });

  if (sortBy === "Price: Low to High") filteredHouses.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  else if (sortBy === "Price: High to Low") filteredHouses.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  else if (sortBy === "Newest") filteredHouses.sort((a, b) => b.id - a.id);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[300px]" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Filter to Fit Your Needs</h2>
          <p className="max-w-2xl mb-8 text-lg md:text-xl">
            From villas and apartments to shops and offices — filter and find it all.
          </p>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <form onSubmit={handleSubmit} className="hidden w-full max-w-4xl px-4 py-5 mx-auto mt-6 sm:block">
        <div className="relative flex items-center justify-between gap-2 px-4 py-3 text-sm bg-gray-300 rounded-full shadow-md backdrop-blur-md">
          <div className="flex items-center gap-2">
            <i className="text-black fas fa-map-marker-alt"></i>
            <input
              type="text"
              placeholder="Enter Location"
              className="w-40 px-2 py-1 text-black placeholder-gray-500 bg-transparent border-none focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onClick={() => {
                setShowSlider(false);
                setShowAgeSlider(false);
              }}
            />
          </div>

          <div className="self-stretch w-px bg-black/30" />
          <div className="relative">
            <div
              ref={priceRef}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setShowSlider((s) => !s);
                setShowAgeSlider(false);
                setActiveDropdown(null);
              }}
            >
              <i className="text-black fas fa-money-bill-wave"></i>
              <span className="text-black whitespace-nowrap">
                Price: Up to ₹{price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="self-stretch w-px bg-black/30" />
          <div className="relative">
            <div
              ref={ageRef}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setShowAgeSlider((s) => !s);
                setShowSlider(false);
                setActiveDropdown(null);
              }}
            >
              <i className="text-black fas fa-hourglass-half"></i>
              <span className="text-black whitespace-nowrap">
                Age: Up to {age} years
              </span>
            </div>
          </div>

          <div className="self-stretch w-px bg-black/30" />
          <div className="flex items-center">
            <i className="text-black fas fa-building"></i>
            <select
              className="text-sm px-2 py-1 rounded-md text-black focus:outline-none cursor-pointer min-w-[120px]"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button className="px-2 text-black cursor-pointer" type="submit">
            <i className="text-xl fas fa-search"></i>
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
          {Object.keys(filterOptions).map((filter) => (
            <button
              key={filter}
              ref={(el) => (buttonRefs.current[filter] = el)}
              onClick={() => toggleDropdown(filter)}
              className={`px-4 py-2 text-sm rounded-full border ${
                selectedFilters[filter]
                  ? "bg-gray-300 text-gray-900 border-gray-400"
                  : "bg-gray-200 text-gray-800 border-gray-300"
              } hover:bg-gray-300 transition-colors duration-200`}
            >
              {filter} {selectedFilters[filter] && `: ${selectedFilters[filter]}`} <ChevronDown className="inline ml-1 w-3 h-3" />
            </button>
          ))}

          <button
            onClick={resetAllFilters}
            className="px-4 py-2 text-sm rounded-full border bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 transition-colors duration-200"
          >
            Reset All
          </button>
        </div>

        {/* Selected Filters Bar */}
        {Object.keys(selectedFilters).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(selectedFilters).map(([key, value]) => (
              <span
                key={key}
                className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600"
                onClick={() => removeFilter(key)}
              >
                {key}: {value} <span className="ml-1 font-bold">×</span>
              </span>
            ))}
          </div>
        )}
      </form>

      {/* Properties Section */}
      <section className="px-4 py-6 md:px-16 lg:px-24">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">Explore Properties</h2>

        <div className="flex items-center justify-between mb-4 text-gray-700">
          <span className="text-gray-600 text-lg">
            Total Properties: <strong>{filteredHouses.length}</strong>
          </span>
          <div className="flex items-center gap-2 text-lg">
            <span className="font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-gray-800 text-lg bg-transparent focus:outline-none border-none"
            >
              <option value="">Relevance</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center px-4 md:px-0 mx-auto">
          {filteredHouses.map((house) => (
            <HouseCard
              key={house.id}
              house={{ ...house, discount: undefined }}
              isFavorite={favorites.includes(house.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Price Slider Popup */}
      {showSlider && priceRef.current && (
        <PortalPopup anchor={priceRef.current} onClose={() => setShowSlider(false)} className="p-4" style={{ minWidth: 300 }}>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Max Price: ₹{price.toLocaleString()}
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>₹{priceRange.min.toLocaleString()}</span>
              <span>₹{priceRange.max.toLocaleString()}</span>
            </div>
          </div>
        </PortalPopup>
      )}

      {/* Age Slider Popup */}
      {showAgeSlider && ageRef.current && (
        <PortalPopup anchor={ageRef.current} onClose={() => setShowAgeSlider(false)} className="p-4" style={{ minWidth: 250 }}>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Max Age: {age} years
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>0 years</span>
              <span>100+ years</span>
            </div>
          </div>
        </PortalPopup>
      )}

      {/* Dropdown for Filters */}
      {activeDropdown && buttonRefs.current[activeDropdown] && (
        <PortalPopup anchor={{ current: buttonRefs.current[activeDropdown] }} onClose={() => setActiveDropdown(null)} style={{ minWidth: 160 }}>
          <div className="overflow-y-auto max-h-60">
            {(filterOptions[activeDropdown] || []).map((option) => (
              <div
                key={option}
                onClick={() => selectOption(activeDropdown, option)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </div>
            ))}
          </div>
        </PortalPopup>
      )}
    </>
  );
};

export default PropertyPage;
