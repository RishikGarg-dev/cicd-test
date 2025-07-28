import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1D1E20] w-full text-white px-16 py-10">
      <div className="flex justify-between items-start">
        {/* Services Section */}
        <div className="flex flex-col justify-between h-full min-h-[250px]">
          <div>
            <h2 className="text-lg font-semibold mb-3">Services</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              We manage your property leasing and rental needs.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-x-6 mt-6">
              <a href="#" aria-label="Instagram" className="text-white hover:text-gray-400 transition-colors">
                <FaInstagram size={36} />
              </a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-gray-400 transition-colors">
                <FaFacebookF size={36} />
              </a>
              <a href="https://x.com" aria-label="X" className="text-white hover:text-gray-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1227" fill="currentColor">
                  <path d="M1198 0H949L601 505 253 0H2l430 623-430 604h249l348-486 348 486h251L768 606z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-white hover:text-gray-400 transition-colors">
                <FaYoutube size={36} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-sm">+91 9573263944</p>
          <p className="text-sm">info@shswift.com</p>
        </div>

        {/* Support Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          <label htmlFor="email" className="text-sm mb-2">
            Enter your email address
          </label>
          <div className="bg-white rounded-full w-[330px] h-[44px] mb-4 flex items-center px-6">
            <input
              id="email"
              type="email"
              placeholder="your email address"
              className="bg-transparent text-sm text-black w-full outline-none placeholder:text-gray-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 w-fit text-sm">
            Submit your Request now
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <p className="text-sm text-center">© 2025. All rights reserved.</p>
      </div>
      
    </footer>
  );
}
