import React from "react";
import img4 from "../assets/office.jpg";

export default function StartRenting() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-4">
        {/* Left Text Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">
            Start Renting Out Your Property Today
          </h2>
          <p className="text-gray-700 mb-6">
            List your space on Swiftly — whether it's furnished or not — and get
            matched with genuine, trustworthy tenants.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-green-400 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition">
            Start Listing
          </button>
        </div>

        {/* Right Image with Overlay Box */}
        <div className="relative w-fit">
          <img
            src={img4}
            alt="Leasing Office"
            className="rounded-xl w-full h-auto"
          />

          {/* Overlay stats box */}
          <div className="absolute bottom-4  right-6 w=1/2 bg-blue-500 text-white square-md flex px-6 py-4 shadow-md">
            <div className="pr-9 border-r border-white">
              <div className="text-2xl font-bold">1400+</div>
              <div className="text-sm font-medium">Properties</div>
            </div>
            <div className="pl-8">
              <div className="text-2xl font-bold">72+</div>
              <div className="text-sm font-medium">Trusted clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
