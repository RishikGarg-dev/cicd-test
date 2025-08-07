import React, { useRef, useState } from 'react';
import {
  FaBed,
  FaRulerCombined,
  FaCarSide,
  FaHome,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import { houses } from '../houses';

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
        setCenterIndex((prev) => (prev + 1) % houses.length);
      } else {
        setCenterIndex((prev) => (prev - 1 + houses.length) % houses.length);
      }
    }
    dragStartX.current = null;
  };

  const handleTouchStart = (e) => {
    dragging.current = true;
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!dragging.current || dragStartX.current === null) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${delta}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    dragging.current = false;
    const delta = e.changedTouches[0].clientX - (dragStartX.current ?? 0);
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateX(0)';
    }
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        setCenterIndex((prev) => (prev + 1) % houses.length);
      } else {
        setCenterIndex((prev) => (prev - 1 + houses.length) % houses.length);
      }
    }
    dragStartX.current = null;
  };

  const getStyles = (i) => {
    const total = houses.length;
    const diff = ((i - centerIndex + total) % total + total) % total;
    const visibleIndex = diff > total / 2 ? diff - total : diff;

    const isMobile = window.innerWidth < 640;
    const translate = visibleIndex * (isMobile ? 60 : 75);
    const scale = 1 - Math.min(Math.abs(visibleIndex) * 0.1, 0.4);
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
      className="relative w-full h-[380px] sm:h-[430px] overflow-hidden select-none px-[5px] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={containerRef}
        className="relative flex items-center justify-center h-full transition-transform duration-300 ease-in-out"
      >
        {houses.map((card, i) => (
          <div
            key={card.id}
            className="absolute w-50vw] sm:w-[80vw] max-w-[300px] h-[280px] sm:h-[420px] p-3 sm:p-4 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out"
            style={getStyles(i)}
          >
            <div
  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md cursor-pointer z-10"
  onClick={(e) => {
    e.stopPropagation();
    toggleFavorite(card.id);
  }}
>
  {favorites.includes(card.id) ? (
    <FaHeart size={24} className="text-red-500" />
  ) : (
    <FaRegHeart size={24} className="text-gray-600" />
  )}
</div>

            <div
              className="w-full h-36 sm:h-52 bg-cover bg-center rounded-md mb-2"
              style={{ backgroundImage: `url(${card.image})` }}
            />

            <h3 className="text-base sm:text-lg font-semibold">{card.title}</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-2">📍 {card.location}</p>
            <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center gap-1">
                <FaBed /> {card.beds}
              </div>
              <div className="flex items-center gap-1">
                <FaRulerCombined /> {card.size}
              </div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <div className="flex items-center gap-1">
                <FaCarSide /> {card.vehicles}
              </div>
              <div className="flex items-center gap-1">
                <FaHome /> {card.type}
              </div>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-center text-blue-800">
              ₹{card.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
