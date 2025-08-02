import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { houses } from '../houses';
import HouseCard from '../components/HouseCard';
import CardCarousel from '../components/CardCarousel';
import img4 from "../assets/office.jpg";

export default function HomePage() {
  const [price, setPrice] = useState(5000);
  const [location, setLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [age, setAge] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [showSlider, setShowSlider] = useState(false);
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

      {/* Hero Section */}




      <section className="relative w-full min-h-screen">
        <div className="bg-cover bg-center h-[600px] w-full relative" style={{ backgroundImage: "url('/banner.png')" }}>
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-snug">
              Find, Rent, and Manage <br />Homes Swiftly
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-medium drop-shadow-sm">
              Easy Steps to find your next home <br />Partner, View, Tour, Shift.
            </p>

            <div className="mt-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
              <form onSubmit={handleSubmit}>
                <div className="relative bg-white/20 backdrop-blur-md rounded-full px-4 py-3 flex items-center justify-between gap-2 overflow-visible">


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


                  <div className="self-stretch w-px bg-black/30 mx-2" />


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

                  <div className="self-stretch w-px bg-black/30 mx-2" />

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

                  <div className="self-stretch w-px bg-black/30 mx-2" />

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

                  <button className="text-black px-3 py-1 cursor-pointer">
                    <i className="fas fa-search text-xl"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Listings */}
      <section className="px-4 sm:px-6 py-10 text-center min-h-screen flex flex-col justify-center">
        <h2 className="text-6xl sm:text-3xl text-red-500 font-bold">Discount Listings</h2>
        <p className="text-6xl text-base sm:text-lg mt-1">
          Special deals and exclusive discounts - rent smarter, save more.
        </p>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-6 ">
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

      {/* CardCarousel section */}

      <section className='px-4 sm:px-6 py-10 text-center min-h-screen flex flex-col justify-center ' >

        <div className='m-16'>
          <h1 className='text-2xl sm:text-3xl  font-bold ' > Featured Properties </h1>
        </div>
        <div>
          <CardCarousel />
        </div>
      </section>




      {/* Trusted Properties */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6 min-h-screen flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Trusted Properties</h2>
        <p className="max-w-2xl mx-auto text-center text-gray-600 text-sm sm:text-base mb-10">
          Rent confidently. Swiftly connects you with genuine listings, flexible options,
          and rewards that make moving smarter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-18 max-w-8xl mx-auto">
          {/* Verified Listings */}
          <div
            onClick={() => navigate('/verified-listings')}
            className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center"
          >
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600 text-sm">
              Only real, verified properties from trusted owners and agents.
            </p>
          </div>

          {/* Furniture Rewards */}
          <div
            onClick={() => navigate('/furniture-rewards')}
            className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center"
          >
            <div className="text-4xl mb-4">🛋️</div>
            <h3 className="text-lg font-semibold mb-2">Furniture Rewards</h3>
            <p className="text-gray-600 text-sm">
              Leave behind good furniture? Earn rewards and help the next renter.
            </p>
          </div>

          {/* Up-to-Day Rentals */}
          <div
            onClick={() => navigate('/up-to-day-rentals')}
            className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center"
          >
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">Up‑to‑Day Rentals</h3>
            <p className="text-gray-600 text-sm">
              See only live, available listings — no outdated posts.
            </p>
          </div>
        </div>
      </section>

      {/* StartRenting Section */}


      <section className="py-12 bg-white min-h-screen flex items-center">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row justify-between gap-70 px-4 sm:px-6 lg:px-8">

          {/* Text Content */}
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

          {/* Image + Floating Card */}
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px]">
            <img
              src={img4}
              alt="Leasing Office"
              className="rounded-xl w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover"
            />

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