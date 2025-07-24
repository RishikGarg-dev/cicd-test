import React from 'react';
import FeaturedProperty from './components/FeaturedProperty';
import TrustedProperties from './components/TrustedProperties';
import StartRenting from './components/StartRenting';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <FeaturedProperty />
      <TrustedProperties />
      <StartRenting />
    </div>
  );
}
