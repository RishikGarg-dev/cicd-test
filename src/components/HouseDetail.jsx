import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { houses } from '../houses';
import HouseCard from './HouseCard';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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
    <div className="p-4">
      {/* Main Image & Favorite Icon */}
      <div className="relative">
        <img
          src={house.image}
          alt="House"
          className="w-full h-[500px] md:h-[600px] object-cover rounded-lg"
        />
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(house.id);
          }}
        >
          {isFavorite ? (
            <FaHeart size={30} color="red" />
          ) : (
            <FaRegHeart size={30} color="white" />
          )}
        </div>
      </div>

      {/* House Details */}
      <h2 className="text-2xl font-semibold mt-6">{house.title}</h2>
      <p className="text-lg"><strong>Location:</strong> {house.location}</p>
      <p className="text-lg"><strong>Size:</strong> {house.size}</p>
      <p className="text-lg"><strong>Beds:</strong> {house.beds}</p>
      <p className="text-lg"><strong>Vehicles:</strong> {house.vehicles}</p>
      <p className="text-lg"><strong>Type:</strong> {house.type}</p>
      <p className="text-lg">
        <strong>Price:</strong> ₹{house.price}{' '}
        <span className="text-red-500">{house.discount}</span>
      </p>

      {/* Similar Listings */}
      <h1 className="text-xl font-medium mt-10 mb-4">Similar Listings</h1>
      <div className='max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-5'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-3">
        {houses
          .filter(h => h.id !== house.id)
          .map(h => (
            <HouseCard
              key={h.id}
              house={h}
              isFavorite={favorites.includes(h.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
      </div>
    </div>
  </div>
  );
};

export default HouseDetail;
