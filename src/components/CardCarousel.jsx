import React, { useRef, useState } from 'react';
import { FaBed, FaRulerCombined, FaCarSide, FaHome } from 'react-icons/fa';

const cardData = [ {
      id: 1,
      title: 'Urban Tuplis 10th Floor',
      location: 'Jubilee Hills, Hyderabad',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      beds: 4,
      size: '3200 sq ft',
      vehicles: '3 Cars',
      type: 'Villa',
      price: '3.2 Cr',
      discount: '15% OFF',
    },
    {
      id: 2,
      title: 'Elegant Duplex',
      location: 'Gachibowli, Hyderabad',
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
      beds: 3,
      size: '2600 sq ft',
      vehicles: '2 Cars',
      type: 'Duplex',
      price: '2.1 Cr',
      discount: '5% OFF',
    },
    {
      id: 3,
      title: 'Urban Bungalow',
      location: 'Madhapur, Hyderabad',
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
      beds: 5,
      size: '4000 sq ft',
      vehicles: '4 Cars',
      type: 'Bungalow',
      price: '4.8 Cr',
      discount: '12% OFF',
    },
    {
      id: 4,
      title: 'Modern Row House',
      location: 'Kondapur, Hyderabad',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      beds: 3,
      size: '2200 sq ft',
      vehicles: '2 Cars',
      type: 'Row House',
      price: '1.9 Cr',
      discount: '8% OFF',
    },
    {
      id: 5,
      title: 'Contemporary Villa',
      location: 'Financial District, Hyderabad',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      beds: 4,
      size: '3000 sq ft',
      vehicles: '3 Cars',
      type: 'Villa',
      price: '3.4 Cr',
      discount: '10% OFF',
    }, ];

export default function CardCarousel() {
  const [centerIndex, setCenterIndex] = useState(2);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(null);

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (dragStartX.current === null) return;

    const delta = dragOffset;
    const threshold = 100;

    if (delta < -threshold && centerIndex < cardData.length - 1) {
      setCenterIndex((prev) => prev + 1);
    } else if (delta > threshold && centerIndex > 0) {
      setCenterIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    dragStartX.current = null;
  };

  const getStyles = (i) => {
    const diff = i - centerIndex;
    const isDragging = dragStartX.current !== null;
    const dragTranslate = isDragging ? dragOffset / 10 : 0;

    const scale = 1 - Math.min(Math.abs(diff) * 0.15, 0.5);
    const translateX = diff * 60 + dragTranslate;
    const zIndex = 100 - Math.abs(diff);
    const opacity = Math.abs(diff) > 2 ? 0 : 1;

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      opacity,
      transition: isDragging ? 'none' : 'transform 0.3s ease',
    };
  };

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative flex items-center justify-center h-full">
        {cardData.map((card, i) => (
          <div
            key={card.id}
            className="absolute w-[300px] h-[360px] p-4 bg-white rounded-xl shadow-lg"
            style={getStyles(i)}
          >
            <div
              className="w-full h-40 bg-cover bg-center rounded-md mb-3"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{card.location}</p>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center gap-1"><FaBed /> {card.beds}</div>
              <div className="flex items-center gap-1"><FaRulerCombined /> {card.size}</div>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-1"><FaCarSide /> {card.vehicles}</div>
              <div className="flex items-center gap-1"><FaHome /> {card.type}</div>
            </div>
            <p className="text-xl font-bold text-center text-blue-800">₹{card.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
