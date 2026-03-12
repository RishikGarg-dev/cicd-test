// PropertyPage.js
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//import bannerImg from "../assets/banner.p.png";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import HouseCard from "../components/HouseCard";
import { houses as initialHouses } from "../houses";

// Helper: Get unique filter options dynamically
const getFilterOptions = (houses) => {
  // Beds: ensure 4 exists and also add a 4+ option at the end
  const bedSet = new Set(houses.map((h) => Number(h.beds)));
  bedSet.add(4);
  const bedOptions = Array.from(bedSet)
    .filter((v) => !Number.isNaN(v))
    .sort((a, b) => a - b)
    .map((v) => String(v));
  if (!bedOptions.includes("4+")) bedOptions.push("4+");

  return {
    "Building Type": [
      ...new Set(houses.map((h) => h.propertyType || h.type)),
    ],
    Beds: bedOptions,
    Parking: [...new Set(houses.map((h) => h.parking))],
    Furnishing: [...new Set(houses.map((h) => h.furnishing))],
    Others: ["Pet Friendly", "Lift", "Security"],
  };
};

// Helper: Price parser
const parsePrice = (priceStr) =>
  parseInt(priceStr.toString().replace(/[^0-9]/g, "")) || 0;

// Price range
const priceRange = { min: 500, max: 100000 };

const DEFAULT_OFFSET = { x: 0, y: 8 };

function PortalPopup({
  anchor,
  onClose,
  children,
  className = "",
  style = {},
  offset = DEFAULT_OFFSET,
}) {
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
      if (
        !containerRef.current?.contains(e.target) &&
        !anchorEl?.contains(e.target)
      )
        onClose?.();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchor, onClose]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={containerRef}
      className={`bg-white rounded-lg shadow-xl ${className}`}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        ...style,
      }}
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
  const [age, setAge] = useState(30);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showSlider, setShowSlider] = useState(false);
  const [showAgeSlider, setShowAgeSlider] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const priceRef = useRef(null);
  const ageRef = useRef(null);
  const buttonRefs = useRef({});

  const filterOptions = getFilterOptions(initialHouses);

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );

  const toggleDropdown = (filter) =>
    setActiveDropdown((prev) => (prev === filter ? null : filter));
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
    setAge(30);
    setShowSlider(false);
    setShowAgeSlider(false);
    setActiveDropdown(null);
    setShowMobileFilters(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, price, age, propertyType, selectedFilters });
  };

  // Filtering
  let filteredHouses = initialHouses.filter((house) => {
    if (
      location &&
      !house.location.toLowerCase().includes(location.toLowerCase())
    )
      return false;
    if (propertyType && house.propertyType !== propertyType) return false;
    if (price && parsePrice(house.price) > price) return false;
    if (age && house.propertyAge && house.propertyAge > age) return false;
    for (let key in selectedFilters) {
      if (key === "Beds") {
        const val = selectedFilters[key];
        if (val === "4+") {
          if (!(Number(house.beds) >= 4)) return false;
        } else {
          if (Number(house.beds) !== Number(val)) return false;
        }
      } else if (key === "Others") {
        for (let o of selectedFilters[key].split(",")) {
          if (!house[o.toLowerCase()]) return false;
        }
      } else if (
        house[key.toLowerCase()] &&
        house[key.toLowerCase()] !== selectedFilters[key]
      )
        return false;
    }
    return true;
  });

  if (sortBy === "Price: Low to High")
    filteredHouses.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  else if (sortBy === "Price: High to Low")
    filteredHouses.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  else if (sortBy === "Newest") filteredHouses.sort((a, b) => b.id - a.id);

  return (
    <>
      {/* Hero */}
      <div
        className="relative bg-cover bg-center h-[500px] md:h-[600px]"
        style={{ backgroundImage: `url(${"https://res.cloudinary.com/dvqrtjzvv/image/upload/v1756129943/banner_e69nkm.png"})` }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Filter to Fit Your Needs
          </h2>
          <p className="max-w-2xl mb-8 text-lg md:text-xl">
            From villas and apartments to shops and offices — filter and find it
            all.
          </p>

          {/* Desktop Search & Filters - Moved inside banner */}
          <form
            onSubmit={handleSubmit}
            className="hidden w-full max-w-4xl px-4 py-5 mx-auto mt-8 sm:block"
          >
            <div className="relative flex items-center justify-between gap-2 px-4 py-3 text-sm bg-white/95 backdrop-blur-md rounded-full shadow-md">
              {/* Location */}
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
              {/* Price */}
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
              {/* Age */}
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
              
              {/* Property Type */}
              <div className="self-stretch w-px bg-black/30" />
              <div className="flex items-center">
                <i className="text-black fas fa-building"></i>
                <select
                  className="text-sm px-2 py-1 rounded-md text-black focus:outline-none cursor-pointer min-w-[120px] bg-transparent"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Property Type</option>
                  {filterOptions["Building Type"].map((type) => (
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

            {/* Desktop Filters (Building Type removed) */}
            <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
              {Object.keys(filterOptions)
                .filter((filter) => filter !== "Building Type")
                .map((filter) => (
                  <button
                    key={filter}
                    ref={(el) => (buttonRefs.current[filter] = el)}
                    onClick={() => toggleDropdown(filter)}
                    className={`px-4 py-2 text-sm rounded-full border ${
                      selectedFilters[filter]
                        ? "bg-white/90 text-gray-900 border-gray-400"
                        : "bg-white/80 text-gray-800 border-gray-300"
                    } hover:bg-white/95 transition-colors duration-200`}
                  >
                    {filter} {selectedFilters[filter] && `: ${selectedFilters[filter]}`}{" "}
                    <ChevronDown className="inline ml-1 w-3 h-3" />
                  </button>
                ))}
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 text-sm rounded-full border bg-white/80 text-gray-800 border-gray-300 hover:bg-white/95 transition-colors duration-200"
              >
                Reset All
              </button>
            </div>

            {/* Selected Filters */}
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

          {/* Mobile Search & Filters - Moved inside banner */}
          <form onSubmit={handleSubmit} className="block px-4 mt-8 sm:hidden w-full max-w-md">
            <div className="flex items-center gap-2 px-3 py-2 text-black bg-white/95 backdrop-blur-md rounded-full shadow-md">
              <i className="text-xs fas fa-map-marker-alt" />
              <input
                type="text"
                placeholder="Enter locality or Zip code"
                className="flex-1 text-xs bg-transparent focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="px-2 text-black" type="submit">
                <i className="text-xl fas fa-search"></i>
              </button>
            </div>

            {/* Filter buttons row */}
            <div className="flex justify-between mt-4">
              {/* Property Type dropdown like desktop */}
              <select
                className="flex-1 mx-1 px-2 py-1 text-[10px] rounded-full bg-white/90 text-gray-700 focus:outline-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                {filterOptions["Building Type"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  setShowSlider((s) => !s);
                  setShowAgeSlider(false);
                }}
                className="flex-1 mx-1 px-2 py-1 text-[10px] rounded-full bg-white/90 text-gray-700 hover:bg-white/95"
              >
                Price Range
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAgeSlider((s) => !s);
                  setShowSlider(false);
                }}
                className="flex-1 mx-1 px-2 py-1 text-[10px] rounded-full bg-white/90 text-gray-700 hover:bg-white/95"
              >
                Age of Property
              </button>
            </div>

            {/* 👉 Inline sliders for mobile */}
            {showSlider && (
              <div className="mt-3 p-4 bg-white/95 backdrop-blur-md rounded-lg shadow-md">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Max Price: ₹{price.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {showAgeSlider && (
              <div className="mt-3 p-4 bg-white/95 backdrop-blur-md rounded-lg shadow-md">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Max Age: {age} years
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Extra filters (inline instead of PortalPopup) */}
            <div className="mt-3">
              <button
                onClick={() => setShowMobileFilters((s) => !s)}
                className="flex items-center gap-2 p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white/95"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">Filter</span>
              </button>

              {showMobileFilters && (
                <div className="flex flex-col gap-3 mt-3">
                  {Object.keys(filterOptions)
                    .filter((filter) => filter !== "Building Type")
                    .map((filter) => (
                      <div key={filter} className="bg-white/90 backdrop-blur-md rounded-md">
                        <button
                          onClick={() => toggleDropdown(filter)}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white/95"
                        >
                          {filter} <ChevronDown className="w-4 h-4" />
                        </button>

                        {activeDropdown === filter && (
                          <div className="max-h-60 overflow-y-auto border-t border-gray-300">
                            {(filterOptions[filter] || []).map((option) => (
                              <div
                                key={option}
                                onClick={() => selectOption(filter, option)}
                                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-white/95"
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
                    className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white/90 backdrop-blur-md rounded-md hover:bg-white/95"
                  >
                    Reset all
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>


      {/* Properties Section */}
<section className="w-full py-6 px-4 md:px-4">
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

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
    {filteredHouses.map((house) => (
      <div
        key={house.id}
        className="transition-all duration-200 rounded-lg border border-transparent hover:border-blue-300 hover:shadow-xl hover:scale-[1.02] hover:bg-blue-50"
      >
        <HouseCard
          house={{ ...house, discount: undefined }}
          isFavorite={favorites.includes(house.id)}
          toggleFavorite={toggleFavorite}
        />
      </div>
    ))}
  </div>
</section>


      {/* Desktop-only PortalPopup for sliders & filters */}
      {showSlider && priceRef.current && (
        <PortalPopup
          anchor={priceRef.current}
          onClose={() => setShowSlider(false)}
          className="p-4 sm:block hidden"
          style={{ minWidth: 260 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Max Price: ₹{price.toLocaleString()}
          </label>
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step={500}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full"
          />
        </PortalPopup>
      )}

      {showAgeSlider && ageRef.current && (
        <PortalPopup
          anchor={ageRef.current}
          onClose={() => setShowAgeSlider(false)}
          className="p-4 sm:block hidden"
          style={{ minWidth: 260 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Max Age: {age} years
          </label>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full"
          />
        </PortalPopup>
      )}

      {/* Filter Dropdown (desktop only) */}
      {activeDropdown && buttonRefs.current[activeDropdown] && (
        <PortalPopup
          anchor={buttonRefs.current[activeDropdown]}
          onClose={() => setActiveDropdown(null)}
          style={{ minWidth: 160 }}
          className="sm:block hidden"
        >
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
