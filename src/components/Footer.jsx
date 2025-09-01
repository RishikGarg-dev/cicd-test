import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1D1E20] w-full text-white px-4 sm:px-8 md:px-12 lg:px-16 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:flex-wrap justify-between gap-y-6 gap-x-8 text-sm">

        {/* Services & Social */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-base font-semibold mb-2">Services</h2>
          <p className="leading-relaxed max-w-sm text-gray-300">
            We manage your property leasing and rental needs.
          </p>
          <div className="flex items-center gap-x-4 mt-4">
            <a href="https://www.instagram.com/rentwithswiftly/" target="_blank" aria-label="Instagram" className="hover:text-gray-400 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578842593380" target="_blank" aria-label="Facebook" className="hover:text-gray-400 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com/rentwithswiftly" target="_blank" aria-label="X" className="hover:text-gray-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="currentColor">
                <path d="M1198 0H949L601 505 253 0H2l430 623-430 604h249l348-486 348 486h251L768 606z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-400 transition-colors">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[160px]">
          <h2 className="text-base font-semibold mb-2">Contact</h2>
          <p>+91 9573263944</p>
          <p>info@shswift.com</p>
        </div>


        <div className="flex-1 min-w-[220px] max-w-sm">
          <h2 className="text-base font-semibold mb-2">Support</h2>
          <label htmlFor="email" className="mb-1 block">Email address</label>
          <div className="bg-white rounded-full h-9 mb-3 flex items-center px-4">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-transparent text-black text-sm w-full outline-none placeholder:text-gray-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 text-xs cursor-pointer">
            Submit Request
          </button>
        </div>
      </div>


      <div className="mt-6 text-center border-t border-gray-700 pt-4 text-xs text-gray-400">
        © 2025. All rights reserved.
      </div>
    </footer>
  );
}