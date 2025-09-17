// src/components/PropertySection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBed,
  FaRulerCombined,
  FaCarSide,
  FaHome,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import { houses } from '../houses';

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link
      to={`/properties/${property.id}`}
      className="block overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
    >
      <div className="relative">
        <img
          className="object-cover w-full h-56"
          src={Array.isArray(property.image) ? property.image[0] : property.image}
          alt={property.title}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute p-2 text-gray-700 transition-colors rounded-full top-4 right-4 bg-white/80 backdrop-blur-sm hover:text-red-500"
        >
          {isLiked ? (
            <FaHeart className="w-6 h-6 text-red-500 fill-current" />
          ) : (
            <FaRegHeart className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="mb-1 text-xl font-semibold text-gray-800">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center mb-4 text-gray-500">
          <p className="text-sm">📍 {property.location}</p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-4 gap-4 mb-4 text-center">
          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaBed size={18} className="mb-1" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaRulerCombined size={18} className="mb-1" />
            <span>{property.size}</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaCarSide size={18} className="mb-1" />
            <span>{property.parking}</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaHome size={18} className="mb-1" />
            <span>{property.propertyType}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">₹ {property.price}</p>
        </div>
      </div>
    </Link>
  );
};

const PropertyPage = () => (
  <div className="py-12 bg-gray-50">
    <div className="container px-4 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:mb-0">
          Properties ({houses.length})
        </h2>

        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Sort by:</span>
          <select
            defaultValue="relevance"
            className="font-semibold text-gray-800 bg-transparent focus:outline-none focus:ring-0 focus:border-none appearance-auto"
          >
            <option value="relevance">Relevance</option>
            <option value="toprated">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {houses.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  </div>
);

export default PropertyPage;
