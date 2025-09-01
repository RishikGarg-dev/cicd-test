
import React, { useState } from 'react';
import { houses } from '../houses';
import HouseCard from './HouseCard';

const HouseList = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>

      <h1 className="text-xl text-red-500"> <strong>Discount Listings</strong></h1>
      <p className='text-lg'><u>Special deals and exclusive discounts -rent smarter, save more.</u></p>

      <div
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          justifyContent: 'flex-start',
          maxWidth: '960px',
          margin: '30px auto',
          paddingBottom: 10,
        }}
      >
        {houses.map((house) => (
          <div key={house.id} style={{ display: 'inline-block' }}>
            <HouseCard
              house={house}
              isFavorite={favorites.includes(house.id)}
              toggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseList;
