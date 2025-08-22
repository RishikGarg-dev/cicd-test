// src/components/Property.jsx
import React from 'react';
import PropertyCard from './propertyCard';

const Property = () => {
  return (
    <section className="py-6 px-4 md:px-10">
      <h2 className="text-2xl font-bold mb-4">Explore Properties</h2>
      <PropertyCard />
    </section>
  );
};

export default Property;
