import React, { useRef, useState, useEffect } from "react";
import {
  FaBed,
  FaRulerCombined,
  FaCarSide,
  FaHome,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { houses } from "../houses";

export default function CardCarousel() {
  const total = houses.length;
  const [centerIndex, setCenterIndex] = useState(2);
  const [favorites, setFavorites] = useState([]);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStartX = useRef(null);
  const dragging = useRef(false);
  const autoplayRef = useRef(null);

  // ---------- Move to Next / Prev ----------
  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + total) % total);
  };

  // ---------- Autoplay ----------
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  // ---------- Drag / Swipe ----------
  const handleDragStart = (clientX) => {
    stopAutoplay();
    dragging.current = true;
    dragStartX.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!dragging.current || dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    setDragDelta(delta);
  };

  const handleDragEnd = (clientX) => {
    if (!dragging.current || dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;

    if (Math.abs(delta) > 50) {
      if (delta < 0) nextSlide();
      else prevSlide();
    }

    dragging.current = false;
    dragStartX.current = null;
    setDragDelta(0);
    startAutoplay();
  };

  // ---------- Card Styles ----------
  const getStyles = (i) => {
    const diff = ((i - centerIndex + total) % total + total) % total;
    const visibleIndex = diff > total / 2 ? diff - total : diff;

    const isMobile = window.innerWidth < 640;
    const baseTranslate = visibleIndex * (isMobile ? 60 : 75);

    const deltaTranslate = (dragDelta / window.innerWidth) * 100;

    const translate = baseTranslate + deltaTranslate;
    const scale = 1 - Math.min(Math.abs(visibleIndex) * 0.1, 0.4);
    const zIndex = 100 - Math.abs(visibleIndex);
    const opacity = Math.abs(visibleIndex) > 2 ? 0 : 1;

    return {
      transform: `translateX(${translate}%) scale(${scale})`,
      zIndex,
      opacity,
      transition: dragging.current
        ? "none"
        : "transform 0.5s ease, opacity 0.5s ease",
    };
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="relative w-full h-[400px] sm:h-[460px] overflow-hidden select-none px-[5px] cursor-pointer"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={(e) => handleDragEnd(e.clientX)}
      onMouseLeave={(e) => handleDragEnd(e.clientX)}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
    >
      <div className="relative flex items-center justify-center h-full">
        {houses.map((card, i) => (
          <div
            key={card.id}
            className="absolute w-[65vw] sm:w-[80vw] max-w-[300px] min-h-[300px] sm:min-h-[440px] 
                       p-3 sm:p-4 bg-white rounded-xl shadow-lg flex flex-col"
            style={getStyles(i)}
          >
            {/* Favorite button */}
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

            {/* Card Content */}
            <div className="flex-1 flex flex-col">
              <img
                className="w-full h-36 sm:h-52 rounded-md mb-2 object-cover"
                src={
                  Array.isArray(card.image)
                    ? card.image[0]
                    : card.image || "/placeholder.png"
                }
                alt={card.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png";
                }}
              />

              <h3 className="text-base sm:text-lg font-semibold">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-2">
                📍 {card.location}
              </p>

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

              {/* Price pinned at bottom */}
              <div className="mt-auto">
                <p className="text-lg sm:text-2xl font-bold text-center text-blue-800">
                  ₹{card.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
