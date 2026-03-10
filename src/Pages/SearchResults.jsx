import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { houses } from '../houses';
import HouseCard from '../components/HouseCard';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const { filteredHouses } = location.state || {};
    setResults(filteredHouses || []);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          {/* <h1 className="text-3xl font-bold text-gray-800">Properties</h1> */}
          <p className="text-gray-500 mt-1">{results.length} properties found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 px-2 sm:px-0">
          {results.map((house) => (
            <HouseCard
              key={house.id}
              house={house}
              isFavorite={favorites.includes(house.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
