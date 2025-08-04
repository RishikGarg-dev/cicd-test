import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { houses } from '../houses';
import HouseCard from '../components/HouseCard';
import CardCarousel from '../components/CardCarousel';
import img4 from "../assets/office.jpg";
import Navbar from '../components/NavBar';

export default function HomePage() {
  const [price, setPrice] = useState(5000);
  const [location, setLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [age, setAge] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [showSlider, setShowSlider] = useState(false);
  const [showAgeSlider, setShowAgeSlider] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

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
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] sm:min-h-screen">
        <div className="bg-[url('/banner.png')] bg-cover bg-center h-150 w-full relative">
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-5xl font-bold text-white text-center leading-snug">
              Find, Rent, and Manage <br />Homes Swiftly
            </h1>
            <p className="mt-6 text-xl md:text-xl font-medium drop-shadow-sm">
              Easy Steps to find your next home <br />Partner, View, Tour, Shift.
            </p>
            <div className="mt-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
              <form onSubmit={handleSubmit}>
                <div className="relative bg-white/100 backdrop-blur-md rounded-full px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between w-full mx-auto mt-10 shadow-md text-[10px] sm:text-sm gap-1 sm:gap-2">
                  {/* Location */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-black text-[10px] sm:text-sm"></i>
                    <input
                      type="text"
                      placeholder="Location"
                      className="px-1 sm:px-2 py-1 rounded-md text-black focus:outline-none placeholder-black text-[9px] sm:text-sm w-12 sm:w-24"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="self-stretch w-px bg-black/30 flex-shrink-0" />

                  {/* Price */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setShowSlider(!showSlider)}
                    >
                      <i className="fas fa-money-bill-wave text-black text-[10px] sm:text-sm"></i>
                      <span className="text-black text-[9px] sm:text-sm whitespace-nowrap">Price Range</span>
                    </div>
                    {showSlider && (
                      <div className="absolute top-full mt-2 left-0 bg-white p-4 rounded-lg shadow-lg z-10 w-64">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Max Price: ₹{price.toLocaleString()}
                        </label>
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
                      </div>
                    )}
                  </div>

                  <div className="self-stretch w-px bg-black/30 flex-shrink-0" />

                  {/* Age */}
                  <div className="relative flex items-center gap-1 flex-shrink-0">
                    <i className="fas fa-hourglass-half text-black text-[10px] sm:text-sm"></i>
                    <span
                      className="text-[9px] sm:text-sm text-black cursor-pointer whitespace-nowrap"
                      onClick={() => setShowAgeSlider(!showAgeSlider)}
                    >
                      Age of Property
                    </span>
                    {showAgeSlider && (
                      <div className="absolute top-full mt-2 left-0 bg-white p-4 rounded-lg shadow-lg z-10 w-64">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                          Max Age: {age} years
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          step="1"
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>

                  <div className="self-stretch w-px bg-black/30 flex-shrink-0" />

                  {/* Property Type */}
                  <div className="flex items-center flex-shrink-0">
                    <i className="fas fa-building text-black text-[10px] sm:text-sm"></i>
                    <select
                      className="text-[9px] sm:text-sm px-1 py-1 sm:px-2 rounded-md text-black focus:outline-none cursor-pointer 
                                 w-[60px] sm:w-auto min-w-[50px] appearance-none"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Property Type</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                    </select>
                  </div>

                  <button className="text-black px-1 sm:px-2 cursor-pointer flex-shrink-0">
                    <i className="fas fa-search text-sm sm:text-xl"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Listings */}
      <section className="px-4 sm:px-6 py-8 text-center">
        <h2 className="text-3xl text-red-500 font-bold">Discount Listings</h2>
        <p className="text-base sm:text-lg mt-1">
          Special deals and exclusive discounts - rent smarter, save more.
        </p>
        {/* Added scrollbar-hide and hidden scroll classes */}
        <div className="mt-8 flex gap-6 overflow-x-auto pb-4 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {houses.map((house) => (
            <div key={house.id} className="min-w-[280px] sm:min-w-[300px]">
              <HouseCard
                house={house}
                isFavorite={favorites.includes(house.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className='px-4 sm:px-6 py-8 text-center'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Featured Properties</h1>
        <CardCarousel />
      </section>

      {/* Trusted Properties */}
      <section className="bg-gray-50 py-10 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Trusted Properties</h2>
        <p className="max-w-2xl mx-auto text-center text-gray-600 text-sm sm:text-base mb-8">
          Rent confidently. Swiftly connects you with genuine listings, flexible options,
          and rewards that make moving smarter.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl mx-auto">
          <div onClick={() => navigate('/verified-listings')} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600 text-sm">Only real, verified properties from trusted owners and agents.</p>
          </div>
          <div onClick={() => navigate('/furniture-rewards')} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center">
            <div className="text-4xl mb-4">🛋️</div>
            <h3 className="text-lg font-semibold mb-2">Furniture Rewards</h3>
            <p className="text-gray-600 text-sm">Leave behind good furniture? Earn rewards and help the next renter.</p>
          </div>
          <div onClick={() => navigate('/up-to-day-rentals')} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">Up‑to‑Day Rentals</h3>
            <p className="text-gray-600 text-sm">See only live, available listings — no outdated posts.</p>
          </div>
        </div>
      </section>

      {/* Start Renting */}
      <section className="py-10 bg-white flex items-center">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row justify-between gap-16 px-4 sm:px-6 lg:px-8">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Start Renting Out Your Property Today
            </h2>
            <p className="text-gray-700 mb-6 text-base sm:text-lg">
              List your space on Swiftly — whether it's furnished or not — and get <br className="hidden sm:inline-block" />
              matched with genuine, trustworthy tenants.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-green-400 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition cursor-pointer">
              Start Listing
            </button>
          </div>

          <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px]">
            <img src={img4} alt="Leasing Office" className="rounded-xl w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover" />
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 lg:left-[-70px] lg:translate-x-0 bg-blue-500 text-white rounded-md shadow-md px-4 sm:px-6 py-5 w-[90%] sm:w-[320px] lg:w-[260px]">
              <div className="flex justify-between items-center text-center w-full">
                <div className="flex-1">
                  <div className="text-xl sm:text-2xl font-bold">1400+</div>
                  <div className="text-sm font-medium">Properties</div>
                </div>
                <div className="w-px bg-white h-10 sm:h-12 mx-4 sm:mx-6"></div>
                <div className="flex-1">
                  <div className="text-xl sm:text-2xl font-bold">72+</div>
                  <div className="text-sm font-medium">Trusted clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}