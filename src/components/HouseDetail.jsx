import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { houses } from '../houses';
import HouseCard from './HouseCard';
import { FaHeart, FaRegHeart, FaBed, FaBath, FaCar, FaRegLightbulb, FaLock, FaHome, FaRegBuilding, FaMapMarkerAlt, FaSubway, FaShoppingCart, FaCompass, FaRulerCombined } from 'react-icons/fa';
import { GiLift, GiWaterDrop } from 'react-icons/gi';
import { MdCleaningServices, MdBalcony, MdAccessTime } from 'react-icons/md';


const HouseDetail = () => {
  const { id } = useParams();
  const house = houses.find(h => h.id === Number(id));

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (houseId) => {
    setFavorites(prev =>
      prev.includes(houseId)
        ? prev.filter(id => id !== houseId)
        : [...prev, houseId]
    );
  };

  if (!house) return <div className="p-4">House not found</div>;

  const isFavorite = favorites.includes(house.id);
   
  

  return (
    <div className="max-w-screen-xl p-4 mx-auto">

      <div className="flex flex-col items-start justify-between px-2 mb-4 md:flex-row md:items-center md:px-0">
        <div>
          <h2 className="text-2xl font-semibold">{house.title}</h2>
          <div className="flex items-center text-lg text-gray-500">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <span>{house.location}</span>
          </div>
        </div>
        <div className="mt-3 space-y-1 text-base text-right text-gray-800 md:text-lg md:mt-0">
          <p className="text-2xl font-semibold text-green-600">₹{house.price}/month</p>
          <p className="text-sm text-gray-500">Security Deposit: ₹{house.deposit}</p>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {house.image.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`House view ${idx + 1}`}
              className="w-[350px] h-[300px] object-cover rounded-lg shrink-0"
            />
          ))}
        </div>


        <div
          className="absolute z-10 p-2 bg-white rounded-full shadow-md cursor-pointer top-5 right-5"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(house.id);
          }}
        >
          {isFavorite ? (
            <FaHeart size={24} className="text-red-500" />
          ) : (
            <FaRegHeart size={24} className="text-gray-500" />
          )}
        </div>
      </div>


      <h1 className="text-xl font-semibold "> Property Summary </h1>
      <div className="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-3 lg:grid-cols-4">

        <div className="flex items-center">
          <FaBed className="mr-2 text-gray-600" />
          <span>{house.beds} BHK</span>
        </div>
        <div className="flex items-center">
          <FaBath className="mr-2 text-gray-600" />
          <span>{house.bathrooms} Bathrooms</span>
        </div>
        <div className="flex items-center">
          <FaRulerCombined className="mr-2 text-gray-600" />
          <span>{house.size} sq. ft.</span>
        </div>
        <div className="flex items-center">
          <FaCar className="mr-2 text-gray-600" />
          <span>{house.parking} Reserved Parking</span>
        </div>
        <div className="flex items-center">
          <FaRegBuilding className="mr-2 text-gray-600" />
          <span>{house.floor} Floor</span>
        </div>
        <div className="flex items-center">
          <MdCleaningServices className="mr-2 text-gray-600" />
          <span>{house.furnishing}</span>
        </div>
        <div className="flex items-center">
          <FaHome className="mr-2 text-gray-600" />
          <span>{house.propertyType}</span>
        </div>
        <div className="flex items-center">
          <GiLift className="mr-2 text-gray-600" />
          <span>{house.lift}</span>
        </div>
        <div className="flex items-center">
          <FaLock className="mr-2 text-gray-600" />
          <span>{house.security}</span>
        </div>
        <div className="flex items-center">
          <FaRegLightbulb className="mr-2 text-gray-600" />
          <span>{house.powerBackup}</span>
        </div>
        <div className="flex items-center">
          <MdAccessTime className="mr-2 text-gray-600" />
          <span>{house.propertyAge} Years</span>
        </div>
        <div className="flex items-center">
          <GiWaterDrop className="mr-2 text-gray-600" />
          <span>{house.waterSupply}</span>
        </div>
        <div className="flex items-center">
          <FaCompass className="mr-2 text-gray-600" />
          <span>{house.facing}</span>
        </div>
        <div className="flex items-center">
          <MdBalcony className="mr-2 text-gray-600" />
          <span>{house.balcony}</span>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold">Description</h3>
      <p>{house.description}</p>

      <div className="pt-8 mt-10">
        <h3 className="mb-6 text-xl font-semibold">Nearby Accessibility</h3>
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-blue-600" size={18} />
              <span>{house.nearbyLocation}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaSubway className="mt-1 text-blue-600" size={18} />
              <span>{house.nearbyMetro}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaShoppingCart className="mt-1 text-blue-600" size={18} />
              <span>{house.nearbyMall}</span>
            </li>
          </ul>

          <div>
            <iframe
              src={`https://www.google.com/maps?q=${house.latitude},${house.longitude}&hl=en&z=16&output=embed`}
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '0.75rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nearby Map"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-base text-gray-800">
            <strong>Want to visit the Property?</strong><br />
            Just schedule the time by clicking on schedule a tour.
          </p>
          <button className="px-6 py-2 text-white transition bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600">
            Schedule a Tour
          </button>
        </div>

        <div>
          <p className="mb-3 text-base text-gray-800">
            <strong>Click Apply Now to begin your rental journey.</strong><br />
            It takes just a few minutes to share your details, upload documents, and take the first step toward securing your new home.
          </p>
          <button className="px-6 py-2 text-white transition bg-green-500 rounded-md cursor-pointer hover:bg-green-600">
            Apply Now
          </button>
        </div>
      </div>

      
      <div className="mt-10">
  <h3 className="mb-4 text-xl font-semibold">Similar Listings</h3>

  {houses.filter((h) => {
    if (h.id === house.id) return false; // skip current
    // Check if both share a common locality word
    const selectedLocation = house.location.toLowerCase();
    const otherLocation = h.location.toLowerCase();
    return (
      h.propertyType === house.propertyType &&
      selectedLocation.split(" ").some((word) =>
        otherLocation.includes(word)
      )
    );
  }).length === 0 ? (
    <p className="text-gray-500">No similar listings found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
      {houses
        .filter((h) => {
          if (h.id === house.id) return false;
          const selectedLocation = house.location.toLowerCase();
          const otherLocation = h.location.toLowerCase();
          return (
            h.propertyType === house.propertyType &&
            selectedLocation.split(" ").some((word) =>
              otherLocation.includes(word)
            )
          );
        })
        .map((h) => (
          <HouseCard
            key={h.id}
            house={h}
            isFavorite={favorites.includes(h.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
    </div>
  )}
</div>





    </div>
  );
};

export default HouseDetail;