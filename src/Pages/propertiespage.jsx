import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import bannerImg from "../assets/banner.p.png";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import PropertyCard from "../components/PropertyCard";

const filterOptions = {
  "Building Type": ["Flat", "Villa", "Independent House"],
  Beds: ["1", "2", "3", "4+"],
  Parking: ["Yes", "No"],
  Others: ["Furnished", "Pet Friendly", "Lift", "Security"],
};

// Generic portal popup anchored to an element (anchor can be a ref or DOM node)
function PortalPopup({ anchor, onClose, children, className = "", style = {}, offset = { x: 0, y: 8 } }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(null);

  // compute position relative to anchor
  useEffect(() => {
    function updatePos() {
      const anchorEl = anchor && ("current" in anchor ? anchor.current : anchor);
      if (!anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      const left = Math.max(8, rect.left + window.scrollX + offset.x); // clamp a little
      const top = rect.bottom + window.scrollY + offset.y;
      setPos({ left, top });
    }

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [anchor, offset]);

  // click outside to close
  useEffect(() => {
    function handleDocClick(e) {
      const anchorEl = anchor && ("current" in anchor ? anchor.current : anchor);
      const clickedInsidePopup = containerRef.current && containerRef.current.contains(e.target);
      const clickedAnchor = anchorEl && anchorEl.contains(e.target);
      if (!clickedInsidePopup && !clickedAnchor) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
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
  const [price, setPrice] = useState(5000);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [age, setAge] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [showSlider, setShowSlider] = useState(false);
  const [showAgeSlider, setShowAgeSlider] = useState(false);
  const [location, setLocation] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // refs to anchor popup positioning
  const priceRef = useRef(null);
  const ageRef = useRef(null);
  const mobilePriceRef = useRef(null);
  const mobileAgeRef = useRef(null);
  // store refs for each filter button (desktop & mobile) in an object
  const buttonRefs = useRef({});

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
    setActiveDropdown(null); // close the portal dropdown
  };

  const resetAllFilters = () => {
    setSelectedFilters({});
    setActiveDropdown(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { location, selectedPrice, age, propertyType };
    console.log("Form Data:", formData);
  };
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
          {/* Location */}
          <div className="flex items-center gap-2">
            <i className="text-black fas fa-map-marker-alt"></i>
            <input
              type="text"
              placeholder="Enter Location"
              className="w-40 px-2 py-1 text-black placeholder-gray-500 bg-transparent border-none focus:outline-none"

              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSlider(false);
                setShowAgeSlider(false);
              }}
              onClick={() => {
                setShowSlider(false);
                setShowAgeSlider(false);
              }}
            />
          </div>

          <div className="self-stretch w-px bg-black/30" />
          {/* Price */}
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
              <span className="text-black whitespace-nowrap">Price Range</span>
            </div>
          </div>
          <div className="self-stretch w-px bg-black/30" />
          {/* Age */}
          <div className="relative flex items-center gap-2">
            <i className="text-black fas fa-hourglass-half"></i>
            <span
              ref={ageRef}
              className="text-black cursor-pointer whitespace-nowrap"
              onClick={() => {
                setShowAgeSlider((s) => !s);
                setShowSlider(false);
                setActiveDropdown(null);
              }}
            >
              Age of Property
            </span>
          </div>
          <div className="self-stretch w-px bg-black/30" />
          {/* Property Type */}
          <div className="flex items-center">
            <i className="text-black fas fa-building"></i>

            <select
              className="text-sm px-2 py-1 rounded-md text-black focus:outline-none cursor-pointer min-w-[100px]"
              value={propertyType}
              onChange={(e) => {
                setPropertyType(e.target.value);
                setShowSlider(false);
                setShowAgeSlider(false);
                setActiveDropdown(null);
              }}
              onClick={() => {
                setShowSlider(false);
                setShowAgeSlider(false);
              }}
            >
              <option value="">Property Type</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>
          </div>
          <button className="px-2 text-black cursor-pointer" type="submit">
            <i className="text-xl fas fa-search"></i>
          </button>
        </div>
      </form>
      {/* Mobile Search Bar */}
      <form onSubmit={handleSubmit} className="block px-4 mt-6 sm:hidden">
        <div className="flex items-center gap-2 px-3 py-2 text-black bg-white rounded-full shadow-md">
          <i className="text-xs fas fa-map-marker-alt" />
          <input
            type="text"
            placeholder="Enter locality or Zip code"
            className="flex-1 text-xs bg-transparent focus:outline-none"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowSlider(false);
              setShowAgeSlider(false);
            }}
          />
          <button className="px-2 text-black" type="submit">
            <i className="text-xl fas fa-search"></i>
          </button>
        </div>
      </form>
      {/* Mobile Filters */}
      <div className="relative z-10 px-4 mt-4 sm:hidden">
        <div className="relative w-full">
          <div className="flex justify-between w-full gap-2">
            {/* Property Type */}
            <div className="flex-1 min-w-0">
              <select
                className="appearance-none text-center text-[11px] px-2 py-1 border-none rounded-full shadow bg-white text-black w-full outline-none"
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                  setShowSlider(false);
                  setShowAgeSlider(false);
                }}
              >
                <option value="">Property Type</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>
            {/* Price Range */}
            <div className="relative flex-1 min-w-0">

              <button
                ref={mobilePriceRef}
                onClick={() => {
                  setShowSlider((s) => !s);
                  setShowAgeSlider(false);
                  setActiveDropdown(null);
                }}
                type="button"
                className="text-[11px] text-center px-2 py-1 border-none rounded-full shadow bg-white text-black w-full outline-none"
              >
                Price Range
              </button>
            </div>
            {/* Age of Property */}
            <div className="relative flex-1 min-w-0">

              <button
                ref={mobileAgeRef}
                onClick={() => {
                  setShowAgeSlider((s) => !s);
                  setShowSlider(false);
                  setActiveDropdown(null);
                }}
                type="button"
                className="text-[11px] text-center px-2 py-1 border-none rounded-full shadow bg-white text-black w-full outline-none"
              >
                Age of Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pt-2 pb-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col gap-2 mb-3 sm:hidden">

            <div className="flex items-center gap-2">
              {/* Filter Icon */}
              <button
                onClick={() => setShowMobileFilters((s) => !s)}
                className="flex items-center flex-shrink-0 gap-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200"

              >
                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">Filter</span>
              </button>
              {/* Always-visible filters beside icon */}
            </div>
            {/* Selected Filters (other than important ones) - on a separate row */}
            {Object.entries(selectedFilters).some(([filter]) => !importantFilters.includes(filter)) && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([filter, value]) =>
                  !importantFilters.includes(filter) ? (
                    <span key={filter} className="flex items-center px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                      {filter}: {value}
                      <button onClick={() => removeFilter(filter)} className="ml-2 text-blue-800 hover:text-red-600 focus:outline-none">
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
                      ref={(el) => (buttonRefs.current[filter] = el)}
                      onClick={() => toggleDropdown(filter)}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      {selectedFilters[filter] || filter}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              <button onClick={resetAllFilters} className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Reset all
              </button>
            </div>
          )}
          {/* Desktop filters inline */}
          <div className="flex-wrap justify-center hidden gap-3 sm:flex">
            {Object.entries(filterOptions).map(([filter, options]) => (
              <div key={filter} className="relative">
                <button
                  ref={(el) => (buttonRefs.current[filter] = el)}
                  onClick={() => toggleDropdown(filter)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {selectedFilters[filter] ? `${filter}: ${selectedFilters[filter]}` : filter}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
            <button onClick={resetAllFilters} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
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
      {/* --- PORTALS: render popups into body so they float above everything --- */}
      {/* Price slider (desktop/mobile) */}
      {showSlider && priceRef.current && (
        <PortalPopup
          anchor={priceRef}
          onClose={() => setShowSlider(false)}
          className="p-4"
          style={{ minWidth: 260 }}
        >
          <label className="block mb-2 text-sm font-semibold text-gray-700">Max Price: ₹{price.toLocaleString()}</label>
          <input
            type="range"
            min="1000"
            max="700000"
            step="500"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              setSelectedPrice(`0-${e.target.value}`);
            }}
            className="w-full"
          />
        </PortalPopup>
      )}
      {/* Mobile price (if mobile trigger used) */}
      {showSlider && !priceRef.current && mobilePriceRef.current && (
        <PortalPopup anchor={mobilePriceRef} onClose={() => setShowSlider(false)} className="p-4" style={{ width: "92vw", maxWidth: 360 }}>
          <label className="block mb-2 text-xs font-semibold text-gray-700">Max Price: ₹{price.toLocaleString()}</label>
          <input
            type="range"
            min="1000"
            max="700000"
            step="500"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              setSelectedPrice(`0-${e.target.value}`);
            }}
            className="w-full"
          />
        </PortalPopup>
      )}
      {/* Age slider */}
      {showAgeSlider && ageRef.current && (
        <PortalPopup anchor={ageRef} onClose={() => setShowAgeSlider(false)} className="p-4" style={{ minWidth: 220 }}>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Max Age: {age} years</label>
          <input type="range" min="1" max="100" step="1" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full" />
        </PortalPopup>
      )}
      {showAgeSlider && !ageRef.current && mobileAgeRef.current && (
        <PortalPopup anchor={mobileAgeRef} onClose={() => setShowAgeSlider(false)} className="p-4" style={{ width: "92vw", maxWidth: 360 }}>
          <label className="block mb-2 text-xs font-semibold text-gray-700">Max Age: {age} years</label>
          <input type="range" min="1" max="100" step="1" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full" />
        </PortalPopup>
      )}
      {/* Filter dropdown (single portal used for whichever filter is active) */}
      {activeDropdown && buttonRefs.current[activeDropdown] && (
        <PortalPopup
          anchor={{ current: buttonRefs.current[activeDropdown] }}
          onClose={() => setActiveDropdown(null)}
          className=""
          style={{ minWidth: 160 }}
        >
          <div className="overflow-y-auto max-h-60">
            {(filterOptions[activeDropdown] || filterOptions[activeDropdown] === undefined ? filterOptions[activeDropdown] : []).map((option) => (
              <div
                key={option}
                onClick={() => selectOption(activeDropdown, option)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </div>
            ))}
            {/* If activeDropdown is one of the important filters (like "Price Range") that don't map in filterOptions,
                provide safe handling. */}
            {!filterOptions[activeDropdown] && activeDropdown === "Price Range" && (
              <div className="px-4 py-2 text-sm text-gray-700">Use the price slider above</div>
            )}
          </div>
        </PortalPopup>
      )}
    </>
  );
};

export default PropertyPage;
