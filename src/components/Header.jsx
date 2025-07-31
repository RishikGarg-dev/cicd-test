import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo/Brand */}
          <div className="text-2xl font-bold text-black">
            Swiftly
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-black text-sm font-medium hover:text-gray-700 transition">
              Home
            </Link>
            <Link to="/properties" className="text-black text-sm font-medium hover:text-gray-700 transition">
              Properties
            </Link>
            <Link to="/login" className="text-black text-sm font-medium hover:text-gray-700 transition flex items-center">
              <i className="fas fa-user mr-1"></i> Login
            </Link>
          </div>

          {/* Mobile Menu Icon (optional for real menu toggle) */}
          <div className="md:hidden">
            {/* This could be replaced with a hamburger menu icon + toggle functionality */}
            <button className="text-black">
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
