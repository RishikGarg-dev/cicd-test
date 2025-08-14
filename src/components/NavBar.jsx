import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-black hover:text-gray-700">Swiftly</Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none cursor-pointer"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-14 ml-auto">
          <Link to="/" className="text-black text-sm font-medium hover:text-gray-700">Home</Link>
          <Link to="/Properties" className="text-black text-sm font-medium hover:text-gray-700">Properties</Link>
          <Link to="/LandLord" className="text-black text-sm font-medium hover:text-gray-700">LandLord</Link>
          <Link to="/Login" className="text-black text-sm font-medium hover:text-gray-700">
            <i className="fas fa-user mr-1"></i> Login
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/60 backdrop-blur-md px-4 pb-4 space-y-3 text-sm">
          <Link to="/" className="block text-black font-medium hover:text-gray-700">Home</Link>
          <Link to="#Properties" className="block text-black font-medium hover:text-gray-700">Properties</Link>
          <Link to="#Login" className="block text-black font-medium hover:text-gray-700">
            <i className="fas fa-user mr-1"></i> Login
          </Link>
        </div>
      )}
    </nav>
  );
}
