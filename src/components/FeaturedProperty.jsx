import React from 'react';
import Slider from 'react-slick';
import img1 from '../assets/house.jpg';
import img2 from '../assets/house1.jpg';
import img3 from '../assets/house2.jpg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const properties = [
  {
    img: img1,
    title: "Urban Tuplis 10th Floor",
    location: "📍 L.B Nagar, Hyderabad, 500079",
    size: "1600 Sq Ft",
    parking: "2 2W + 1 4W",
    type: "Flat",
    price: "₹ 15,000"
  },
  {
    img: img2,
    title: "Elegant Greens 2BHK",
    location: "📍 Gachibowli, Hyderabad, 500032",
    size: "1200 Sq Ft",
    parking: "1 2W + 1 4W",
    type: "Apartment",
    price: "₹ 18,500"
  },
  {
    img: img3,
    title: "Skyline Office Space",
    location: "📍 Banjara Hills, Hyderabad, 500034",
    size: "3000 Sq Ft",
    parking: "5 4W",
    type: "Office",
    price: "₹ 55,000"
  }
];

const FeaturedProperties = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Properties</h2>

      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl italic font-semibold mb-2">Swiftly</h3>
          <p className="text-lg mb-4">One Platform for Every Property Need.</p>
          <p className="text-base">
            From apartments and villas to offices and showrooms, Swiftly simplifies property
            discovery and helps you lease the right space at the right time.
          </p>
        </div>

        {/* Right Section: Full Card Carousel */}
        <div className="w-full md:w-96">
          <Slider {...sliderSettings}>
            {properties.map((property, index) => (
              <div key={index} className="border rounded-lg shadow-lg overflow-hidden relative">
                <img src={property.img} alt={property.title} className="w-full h-32 object-cover" />

                {/* Heart Icon Button */}
                <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-red-100">
                  <svg
                    className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                </button>

                <div className="p-4">
                  <h4 className="text-lg font-semibold">{property.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{property.location}</p>

                  <div className="flex justify-between text-gray-700 text-sm mb-3">
                    <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 21h18M9 21V9h6v12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{property.size}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5v14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{property.parking}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 12l2-2 4 4 8-8 6 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{property.type}</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold">{property.price}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
