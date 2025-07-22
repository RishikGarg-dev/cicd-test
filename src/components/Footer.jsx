export default function Footer() {
  return (
    <footer className="bg-[#1D1E20] w-[1448px] h-[423px] text-white px-16 py-10">
      <div className="flex justify-between h-full items-start">
        {/* Services Section */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-lg font-semibold mb-3">Services</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              We manage your property leasing and rental needs.
            </p>
          </div>
          <p className="text-sm mt-auto">© 2025. All rights reserved.</p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-2 h-full">
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-sm">+91 9573263944</p>
          <p className="text-sm">info@shswift.com</p>
        </div>

        {/* Support Section */}
        <div className="flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          <label htmlFor="email" className="text-sm mb-2">
            Enter your email address
          </label>
          
          {/* White Input Area Container */}
          <div className="bg-white rounded-full w-[330px] h-[44px] mb-4 flex items-center px-6">
            <input
              id="email"
              type="email"
              placeholder="your email address"
              className="bg-white text-sm text-black w-full outline-none placeholder:text-gray-500"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 w-fit text-sm">
            Submit your Request now
          </button>
        </div>
      </div>
    </footer>
  );
}
