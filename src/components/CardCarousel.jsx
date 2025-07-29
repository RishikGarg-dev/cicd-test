import React, { useState, useEffect, useRef } from 'react';
import {
  FaBed,
  FaRulerCombined,
  FaCarSide,
  FaHome,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';

const CardCarousel = () => {
  const containerRef = useRef(null);
  const controllerRef = useRef(null);
  const [cards, setCards] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [xScale, setXScale] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [smoothReturn, setSmoothReturn] = useState(false);
  const [likedCards, setLikedCards] = useState({});

  const toggleLike = (id) => {
    setLikedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
    },
  ];

  useEffect(() => {
    const cardElements = containerRef.current?.querySelectorAll('.card');
    if (cardElements) {
      const cardArray = Array.from(cardElements);
      setCards(cardArray);
      const center = (cardArray.length - 1) / 2;
      setCenterIndex(center);

      if (cardArray.length > 0 && containerRef.current) {
        const width = (cardArray[0].offsetWidth / containerRef.current.offsetWidth) * 100;
        setCardWidth(width);
      }
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      build();
    }
  }, [cards, cardWidth]);

  useEffect(() => {
    const handleResize = () => {
      if (cards.length > 0 && containerRef.current) {
        const width = (cards[0].offsetWidth / containerRef.current.offsetWidth) * 100;
        setCardWidth(width);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39 || e.key === 'ArrowRight') {
        const temp = {};
        Object.keys(xScale).forEach((x) => {
          const newX = parseInt(x) - 1 < -centerIndex ? centerIndex : parseInt(x) - 1;
          temp[newX] = xScale[x];
        });
        setXScale(temp);
        updateCardsFromXScale(temp);
      } else if (e.keyCode === 37 || e.key === 'ArrowLeft') {
        const temp = {};
        Object.keys(xScale).forEach((x) => {
          const newX = parseInt(x) + 1 > centerIndex ? -centerIndex : parseInt(x) + 1;
          temp[newX] = xScale[x];
        });
        setXScale(temp);
        updateCardsFromXScale(temp);
      }
    };

    if (controllerRef.current) {
      controllerRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        if (controllerRef.current) {
          controllerRef.current.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, [xScale, centerIndex]);

  const calcScale = (x) => Math.max(0.6, 1 - Math.abs(x) * 0.15);
  const calcScale2 = (x) => Math.max(0.4, 1 - (Math.abs(x) / 4));

  const calcPos = (x, scale) => {
    const isMobile = window.innerWidth <= 640;
    const spacing = 2.5;
    return x < 0
      ? (scale * 100 - cardWidth) / 2 - spacing * Math.abs(x)
      : 100 - (scale * 100 + cardWidth) / 2 + spacing * Math.abs(x);
  };

  const updateCards = (card, data) => {
    if (!card) return;
    if (data.x !== undefined) card.setAttribute('data-x', data.x);
    if (data.scale !== undefined) {
      card.style.transform = `scale(${data.scale})`;
      card.style.opacity = data.scale === 0 ? '0' : '1';
    }
    if (data.leftPos !== undefined) card.style.left = `${data.leftPos}%`;
    if (data.zIndex !== undefined) {
      card.style.zIndex = data.zIndex;
      data.zIndex === 0 ? card.classList.add('highlight') : card.classList.remove('highlight');
    }
  };

  const build = () => {
    const newXScale = {};
    cards.forEach((card, i) => {
      const x = i - centerIndex;
      const scale = calcScale(x);
      const scale2 = calcScale2(x);
      const zIndex = -Math.abs(i - centerIndex);
      const leftPos = calcPos(x, scale2);
      newXScale[x] = card;
      updateCards(card, { x, scale, leftPos, zIndex });
    });
    setXScale(newXScale);
  };

  const updateCardsFromXScale = (xScaleObj) => {
    Object.keys(xScaleObj).forEach((x) => {
      const scale = calcScale(x);
      const scale2 = calcScale2(x);
      const leftPos = calcPos(x, scale2);
      const zIndex = -Math.abs(x);
      updateCards(xScaleObj[x], { x, scale, leftPos, zIndex });
    });
  };

  const checkOrdering = (card, x, xDist) => {
    const original = parseInt(card.dataset.x);
    const rounded = Math.round(xDist);
    let newX = x;
    if (x !== x + rounded) {
      if (x + rounded > original && x + rounded > centerIndex) {
        newX = x + rounded - 1 - centerIndex - rounded + -centerIndex;
      } else if (x + rounded < original && x + rounded < -centerIndex) {
        newX = x + rounded + 1 + centerIndex - rounded + centerIndex;
      }
      setXScale((prev) => ({
        ...prev,
        [newX + rounded]: card,
      }));
    }
    updateCards(card, { zIndex: -Math.abs(newX + rounded) });
    return newX;
  };

  const moveCards = (data) => {
    let xDist = data ? data.x / 250 : 0;
    setSmoothReturn(!data);
    cards.forEach((card) => {
      const x = checkOrdering(card, parseInt(card.dataset.x), xDist);
      const scale = calcScale(x + xDist);
      const scale2 = calcScale2(x + xDist);
      const leftPos = calcPos(x + xDist, scale2);
      updateCards(card, { scale, leftPos });
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    let startX = e.clientX || e.touches?.[0]?.clientX;
    const handleMouseMove = (e) => {
      const currentX = e.clientX || e.touches?.[0]?.clientX;
      moveCards({ x: currentX - startX });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      moveCards(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  return (
    <div className="bg-white" style={{ fontFamily: 'system-ui' }}>
      <style jsx>{`
        .card-carousel {
          --card-width: 90%;
          --card-max-width: 300px;
          --card-height: 380px;
          --carousel-min-width: 600px;
          transition: filter 0.3s ease;
          position: relative;
          overflow-x: hidden;
          overflow-y: visible;
          touch-action: pan-y;
          overscroll-behavior: contain;
        }
        .card-carousel.smooth-return {
          transition: all 0.2s ease;
        }
        .card {
          position: absolute;
          width: var(--card-width);
          max-width: var(--card-max-width);
          height: var(--card-height);
          min-width: 250px;
          transition: inherit;
          filter: brightness(0.9);
        }
        .card.highlight {
          filter: brightness(1);
        }
        @media screen and (max-width: 640px) {
          .card-carousel {
            --card-width: 80%;
            --card-max-width: 100%;
            --carousel-min-width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      <div className="overflow-hidden p-5 pt-15">
        <div
          ref={containerRef}
          className={`card-carousel z-10 mx-auto w-full ${smoothReturn ? 'smooth-return' : ''}`}
          style={{
            height: 'var(--card-height)',
            minWidth: 'var(--carousel-min-width)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {cardData.map((cardItem) => (
            <div
              key={cardItem.id}
              className="card bg-white text-center text-gray-800 flex flex-col cursor-grab active:cursor-grabbing overflow-hidden rounded-lg"
              style={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.1)', margin: '0 auto' }}
              data-x="0"
            >
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{ backgroundImage: `url("${cardItem.image}")` }}
              />
              <div className="absolute top-3 right-3 z-20">
                <button onClick={() => toggleLike(cardItem.id)}>
                  {likedCards[cardItem.id] ? (
                    <FaHeart className="w-5 h-5 text-red-500 cursor-pointer" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-black cursor-pointer" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-1">{cardItem.title}</h2>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="mr-1">📍</span>{cardItem.location}
                </p>
                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <FaBed className="text-gray-500 w-4 h-4 mr-2" />
                    <span className="text-sm">{cardItem.beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-gray-500 w-4 h-4 mr-2" />
                    <span className="text-sm">{cardItem.size}</span>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <FaCarSide className="text-gray-500 w-4 h-4 mr-2" />
                    <span className="text-sm">{cardItem.vehicles}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaHome className="text-gray-500 w-4 h-4 mr-2" />
                    <span className="text-sm">{cardItem.type}</span>
                  </div>
                </div>
                <p className="text-xl font-bold">₹{cardItem.price}</p>
              </div>
            </div>
          ))}
        </div>
        <a ref={controllerRef} href="#" className="absolute -z-10 right-0 opacity-0" tabIndex="0">
          Carousel controller
        </a>
      </div>
    </div>
  );
};

export default CardCarousel;
