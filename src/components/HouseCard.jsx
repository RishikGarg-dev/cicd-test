
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
      style={{
        width: 300,
        margin: '0 6px',
        border: '2px solid #ddd',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={Array.isArray(house.image) ? house.image[0] : house.image}
          alt="House"
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />

        <div
          onClick={handleHeartClick}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          {isFavorite ? (
            <FaHeart size={24} color="red" />
          ) : (
            <FaRegHeart size={24} color="gray" />
          )}
        </div>

      </div>

      <div style={{ padding: '10px 14px', flexGrow: 1 }}>
        <h4 style={{ margin: '5px 0', fontWeight: 'bold' }}>{house.title}</h4>
        <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#555' }}>
          📍 {house.location}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 12 }}>
            <FaBed size={18} />
            <span>{house.beds} Beds</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 12 }}>
            <FaRulerCombined size={18} />
            <span>{house.size}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 12 }}>
            <FaCarSide size={18} />
            <span>{house.parking}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 12 }}>
            <FaHome size={18} />
            <span>{house.propertyType}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: 16 }}>₹ {house.price}</strong>
          <span style={{ color: 'red', fontSize: 12 }}>{house.discount}</span>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
