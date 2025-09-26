import React from 'react';
import {
  FaBed,
  FaRulerCombined,
  FaCarSide,
  FaHome,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HouseCard = ({ house, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/properties/${house.id}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleFavorite(house.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full h-full max-w-[400px] mx-auto border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col"
    >
      {/* Image with heart icon */}
      <div className="relative">
        <img
          src={Array.isArray(house.image) ? house.image[0] : house.image}
          alt="House"
          className="w-full h-[180px] object-cover rounded-t-xl"
        />
        <div
          onClick={handleHeartClick}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer z-10"
        >
          {isFavorite ? (
            <FaHeart size={20} className="text-red-500" />
          ) : (
            <FaRegHeart size={20} className="text-gray-500" />
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Title + location */}
        <div>
          <h4 className="font-semibold text-base mb-1">{house.title}</h4>
          <p className="text-sm text-gray-600 mb-4 truncate">
            📍 {house.location}
          </p>
        </div>

        {/* Icons row */}
        <div className="flex justify-between text-xs text-center mb-4">
          <div className="flex flex-col items-center">
            <FaBed className="text-gray-700 mb-1" size={16} />
            <span>{house.beds} Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <FaRulerCombined className="text-gray-700 mb-1" size={16} />
            <span>{house.size}</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCarSide className="text-gray-700 mb-1" size={16} />
            <span>{house.parking}</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHome className="text-gray-700 mb-1" size={16} />
            <span>{house.propertyType}</span>
          </div>
        </div>

        {/* Price + discount */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-black">
            ₹ {house.price}
          </span>
          {house.discount && (
            <span className="text-sm text-red-500 font-medium">
              {house.discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseCard;