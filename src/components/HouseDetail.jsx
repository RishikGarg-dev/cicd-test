// src/components/HouseDetail.js
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

  if (!house) return <div>House not found</div>;

  const isFavorite = favorites.includes(house.id);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ position: 'relative' }}>
        <img
          src={house.image}
          alt="Detail"
          style={{
            width: '100%',
            height: '700px',
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
        <div
          style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
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

      <h2 className='text-2xl font-medium' style={{  marginTop: 20 }}> {house.title}</h2>
      <p className='text-2xl'><strong>Location:</strong> {house.location}</p>
      <p className='text-2xl'><strong>Size:</strong> {house.size}</p>
      <p className='text-2xl'><strong>Beds:</strong> {house.beds}</p>
      <p className='text-2xl'><strong>Vehicles:</strong> {house.vehicles}</p>
      <p className='text-2xl'><strong>Type:</strong> {house.type}</p>
      <p className='text-2xl'><strong>Price:</strong> ₹{house.price} <span style={{ color: 'red' }}>{house.discount}</span></p>

      <h1 className='text-xl font-medium' style={{ marginTop: 40 }}> Similar Listings</h1>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          paddingTop: 20,
          gap: 10,
        }}
      >
        {houses
          .filter(h => h.id !== house.id)
          .map(h => (
            <div key={h.id} style={{ display: 'inline-block' }}>
              <HouseCard
                house={h}
                isFavorite={favorites.includes(h.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HouseDetail;
