// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
  <Link to="/" className="text-black hover:text-gray-700">Swiftly</Link>
</div>
        {/* Desktop Nav */}
        <div className="flex items-center ml-auto space-x-10 sm:space-x-14">
          <Link to="/" className="text-black text-sm font-medium hover:text-gray-700">Home</Link>
          <Link to="#Properties" className="text-black text-sm font-medium hover:text-gray-700">Properties</Link>
          <Link to="#Login" className="text-black text-sm font-medium hover:text-gray-700">
            <i className="fas fa-user mr-1"></i> Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
