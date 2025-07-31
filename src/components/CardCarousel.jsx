import React, { useRef, useState } from 'react';
import {
  FaBed, FaRulerCombined, FaCarSide, FaHome, FaHeart, FaRegHeart,
} from 'react-icons/fa';

const cardData = [
  {
    id: 1,
    title: 'Urban Tuplis 10th Floor',
    location: 'Jubilee Hills, Hyderabad',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    beds: 4,
    size: '3200 sq ft',
    vehicles: '3 Cars',
    type: 'Villa',
    price: '32000',
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
    price: '25000',
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
    price: '20000',
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
    price: '19000 ',
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
    price: '30000 ',
    discount: '10% OFF',
  },
];

export default function CardCarousel() {
  const [centerIndex, setCenterIndex] = useState(2);
  const [favorites, setFavorites] = useState([]);
  const containerRef = useRef(null);
  const dragStartX = useRef(null);
  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!dragging.current || dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${delta}px)`;
    }
  };

  const handleMouseUp = (e) => {
    dragging.current = false;
    const delta = e.clientX - (dragStartX.current ?? 0);
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateX(0)';
    }
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        setCenterIndex((prev) => (prev + 1) % cardData.length);
      } else {
        setCenterIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
      }
    }
    dragStartX.current = null;
  };

  const getStyles = (i) => {
    const total = cardData.length;
    const diff = ((i - centerIndex + total) % total + total) % total;
    const visibleIndex = diff > total / 2 ? diff - total : diff;

    const scale = 1 - Math.min(Math.abs(visibleIndex) * 0.1, 0.4);
    const translate = visibleIndex * 75;
    const zIndex = 100 - Math.abs(visibleIndex);
    const opacity = Math.abs(visibleIndex) > 2 ? 0 : 1;

    return {
      transform: `translateX(${translate}%) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="relative w-full h-[430px] overflow-hidden select-none px-[5px] cursor-pointer "
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={containerRef}
        className="relative flex items-center justify-center h-full transition-transform duration-300 ease-in-out"
      >
        {cardData.map((card, i) => (
          <div
            key={card.id}
            className="absolute w-[80vw] max-w-[320px] h-[420px] p-4 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out"
            style={getStyles(i)}
          >
            <div
              className="absolute top-3 right-3 cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(card.id);
              }}
            >
              {favorites.includes(card.id) ? (
                <FaHeart size={30} className="text-red-500" />
              ) : (
                <FaRegHeart size={30} className="text-black-400" />
              )}
            </div>

            <div
              className="w-full h-52 bg-cover bg-center rounded-md mb-3"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{card.location}</p>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center gap-1">
                <FaBed /> {card.beds}
              </div>
              <div className="flex items-center gap-1">
                <FaRulerCombined /> {card.size}
              </div>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-1">
                <FaCarSide /> {card.vehicles}
              </div>
              <div className="flex items-center gap-1">
                <FaHome /> {card.type}
              </div>
            </div>
            <p className="text-xl font-bold text-center text-blue-800">
              ₹{card.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
