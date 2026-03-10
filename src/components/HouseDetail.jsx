import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { houses } from '../houses';
import HouseCard from './HouseCard';
import { 
  FaHeart, FaRegHeart, FaBed, FaBath, FaCar, FaRegLightbulb, 
  FaLock, FaHome, FaRegBuilding, FaMapMarkerAlt, FaSubway, 
  FaShoppingCart, FaCompass, FaRulerCombined, FaTimes, FaApple 
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GiLift, GiWaterDrop } from 'react-icons/gi';
import { MdCleaningServices, MdBalcony, MdAccessTime } from 'react-icons/md';

const HouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const house = houses.find(h => h.id === Number(id));

  // --- STATE MANAGEMENT ---
  const [showSoftGate, setShowSoftGate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favorites, setFavorites] = useState([]);
  const isLoggedIn = false; 

  // --- TRIGGER POPUP ---
  useEffect(() => {
    if (isLoggedIn) return;
    const timer = setTimeout(() => {
      setShowSoftGate(true);
    }, 2000); // Trigger after 2 seconds
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  const toggleFavorite = (houseId) => {
    setFavorites(prev =>
      prev.includes(houseId) ? prev.filter(id => id !== houseId) : [...prev, houseId]
    );
  };

  if (!house) return <div className="p-4">House not found</div>;
  const isFavorite = favorites.includes(house.id);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Add your login logic here
  };

  return (
    <div className="relative min-h-screen">
      
      {/* --- SOFT GATE POPUP --- */}
      {showSoftGate && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all duration-500">
          {/* Transparent click-to-close overlay */}
          <div className="absolute inset-0" onClick={() => setShowSoftGate(false)} />
          
          <div className="relative bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full border border-gray-100 animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowSoftGate(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={18} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Sign In</h3>
              
            </div>

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              {/* Username/Email */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">Email or Username</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-400 uppercase ml-1 mb-1">Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/>}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                className="w-full py-3.5 bg-gray-100 text-black rounded-2xl font-bold hover:bg-gray-200 transition-all shadow-lg active:scale-95"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="px-3 text-[10px] text-gray-400 uppercase tracking-widest font-black">OR</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Social Logins */}
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 w-1/2 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold transition hover:bg-gray-50 active:scale-95 shadow-sm">
                <FcGoogle size={20} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 w-1/2 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold transition hover:bg-gray-50 active:scale-95 shadow-sm">
                <FaApple size={20} /> Apple
              </button>
            </div>

            {/* Create Account Link */}
            <p className="text-center text-sm text-gray-500 mt-8">
              New here?{' '}
              <button onClick={() => navigate('/Login')} className="text-blue-600 font-bold hover:underline underline-offset-4">
                Create New Account
              </button>
            </p>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className={`transition-all duration-1000 ${showSoftGate ? "blur-md pointer-events-none select-none" : ""}`}>
        <div className="max-w-screen-xl p-4 mx-auto">
          {/* Header */}
          <div className="flex flex-col items-start justify-between px-2 mb-4 md:flex-row md:items-center md:px-0">
            <div>
              <h2 className="text-2xl font-semibold">{house.title}</h2>
              <div className="flex items-center text-lg text-gray-500">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                <span>{house.location}</span>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-base text-right text-gray-800 md:text-lg md:mt-0">
              <p className="text-2xl font-semibold text-green-600">₹{house.price}/month</p>
              <p className="text-sm text-gray-500">Security Deposit: ₹{house.deposit}</p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-6">
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {house.image.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`House view ${idx + 1}`}
                  className="w-[350px] h-[300px] object-cover rounded-2xl shrink-0 shadow-sm"
                />
              ))}
            </div>
            <div
              className="absolute z-10 p-2.5 bg-white rounded-full shadow-lg cursor-pointer top-5 right-5 active:scale-90 transition-transform"
              onClick={(e) => { e.stopPropagation(); toggleFavorite(house.id); }}
            >
              {isFavorite ? <FaHeart size={22} className="text-red-500" /> : <FaRegHeart size={22} className="text-gray-400" />}
            </div>
          </div>

          {/* Property Summary Grid */}
          <h1 className="text-xl font-bold mb-4">Property Summary</h1>
          <div className="grid grid-cols-2 gap-6 mb-8 sm:grid-cols-3 lg:grid-cols-4 bg-gray-50 p-6 rounded-3xl">
            <div className="flex items-center gap-3"><FaBed className="text-gray-400" /> <span>{house.beds} BHK</span></div>
            <div className="flex items-center gap-3"><FaBath className="text-gray-400" /> <span>{house.bathrooms} Bath</span></div>
            <div className="flex items-center gap-3"><FaRulerCombined className="text-gray-400" /> <span>{house.size} sq. ft.</span></div>
            <div className="flex items-center gap-3"><FaCar className="text-gray-400" /> <span>{house.parking} Parking</span></div>
            <div className="flex items-center gap-3"><FaRegBuilding className="text-gray-400" /> <span>{house.floor} Floor</span></div>
            <div className="flex items-center gap-3"><MdCleaningServices className="text-gray-400" /> <span>{house.furnishing}</span></div>
            <div className="flex items-center gap-3"><GiLift className="text-gray-400" /> <span>{house.lift}</span></div>
            <div className="flex items-center gap-3"><FaLock className="text-gray-400" /> <span>{house.security}</span></div>
          </div>

          <h3 className="mb-2 text-lg font-bold">Description</h3>
          <p className="text-gray-600 leading-relaxed mb-10">{house.description}</p>
          
          
          <div className="pt-8 mt-10">
            <h3 className="mb-6 text-xl font-bold">Nearby Accessibility</h3>
            <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-blue-600" size={18} />
                  <span>{house.nearbyLocation}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaSubway className="mt-1 text-blue-600" size={18} />
                  <span>{house.nearbyMetro}</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaShoppingCart className="mt-1 text-blue-600" size={18} />
                  <span>{house.nearbyMall}</span>
                </li>
              </ul>

              <div>
                <iframe
                  src={`https://www.google.com/maps?q=${house.latitude},${house.longitude}&hl=en&z=16&output=embed`}
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '1.5rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nearby Map"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-12">
            <div className="p-6 border border-gray-100 rounded-3xl bg-blue-50/30">
              <p className="mb-4 text-sm text-gray-600 font-medium">Want to visit the property in person?</p>
              <button 
                onClick={() => navigate(`/property/${house.id}/schedule-tour`)}
                className="w-full md:w-auto px-8 py-3 text-white bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Schedule a Tour
              </button>
            </div>
            <div className="p-6 border border-gray-100 rounded-3xl bg-green-50/30">
              <p className="mb-4 text-sm text-gray-600 font-medium">Ready to start your application?</p>
              <button className="w-full md:w-auto px-8 py-3 text-white bg-green-600 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                Apply Now
              </button>
            </div>
          </div>

          {/* Similar Listings */}
          <div className="mt-12">
            <h3 className="mb-6 text-xl font-bold">Similar Listings in {house.location}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {houses
                .filter(h => h.id !== house.id && h.propertyType === house.propertyType)
                .slice(0, 4)
                .map(h => (
                  <HouseCard key={h.id} house={h} isFavorite={favorites.includes(h.id)} toggleFavorite={toggleFavorite} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;