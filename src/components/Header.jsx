import { Link } from 'react-router-dom'; 

const Header = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        <div className="text-2xl font-bold">
          <span className="text-black">Swiftly</span>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <Link to="/" className="text-black text-sm font-medium hover:text-gray-700">
            Home
          </Link>
          <Link to="/properties" className="text-black text-sm font-medium hover:text-gray-700">
            Properties
          </Link>
          <Link to="/login" className="text-black text-sm font-medium hover:text-gray-700">
            <i className="fas fa-user mr-1"></i> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
