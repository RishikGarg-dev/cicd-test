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

const DetailIcon = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-x-1.5 text-gray-600 text-sm whitespace-nowrap flex-shrink-0">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link
      to={`/properties/${property.id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 block"
    >
      <div className="relative">
        <img
          className="h-56 w-full object-cover"
          src={Array.isArray(property.image) ? property.image[0] : property.image}
          alt={property.title}
        />
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent navigation when clicking the heart
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors"
        >
          {isLiked ? (
            <FaHeart className="w-6 h-6 text-red-500 fill-current" />
          ) : (
            <FaRegHeart className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{property.title}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <p className="text-sm">📍{property.location}</p>
        </div>

        {/* Better spacing for smaller screens, justify-between for larger screens */}
        <div className="flex justify-between items-center text-xs sm:text-sm md:text-base text-gray-600 mb-4 border-t border-b border-gray-100 py-3 gap-x-2 sm:gap-x-3 lg:gap-x-0">
          <DetailIcon icon={FaBed} text={`${property.beds} Beds`} />
          <DetailIcon icon={FaRulerCombined} text={`${property.size}`} />
          <DetailIcon icon={FaCarSide} text={`${property.vehicles}`} />
          <DetailIcon icon={FaHome} text={property.type} />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-gray-900">₹ {property.price}</p>
        </div>
      </div>
    </Link>
  );
};

const PropertyPage = () => (
  <div className="bg-gray-50 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Properties ({houses.length})
        </h2>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Sort by:</span>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <select
              defaultValue="relevance"
              className="bg-transparent font-semibold text-gray-800 focus:outline-none focus:ring-0 focus:border-none appearance-auto"
            >
              <option value="relevance">Relevance</option>
              <option value="toprated">Top Rated</option>
            </select>
          </div>

        </div>


      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {houses.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  </div>
);

export default PropertyPage;