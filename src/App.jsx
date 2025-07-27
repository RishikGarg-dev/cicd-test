import React from 'react';
import FeaturedProperties from './components/FeaturedProperties.jsx';
import TrustedProperties from './components/TrustedProperties';
import StartRenting from './components/StartRenting';

import CardCarousel from './components/home.jsx';


export default function App() {
  return (
     <div className="max-w-full overflow-hidden">
      <div>
        <FeaturedProperties />
        <CardCarousel />
      </div>
      <TrustedProperties />
      <StartRenting />
    </div>
  );
}
