import React from "react";
import img4 from "../assets/office.jpg";

export default function StartRenting() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-4">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4">
            Start Renting Out Your Property Today
          </h2>
          <p className="text-gray-700 mb-6">
            List your space on Swiftly — whether it's furnished or not — and get <br />
            matched with genuine, trustworthy tenants.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-green-400 text-white px-6 py-3 rounded-md shadow hover:opacity-90 transition">
            Start Listing
          </button>
        </div>

        <div className="relative w-[260px] sm:w-[300px] md:w-[320px] lg:w-[360px]">
          <img
            src={img4}
            alt="Leasing Office"
            className="rounded-xl w-full h-[360px] object-cover"

          />

          <div
            className={`
              absolute bottom-6
              left-1/2 -translate-x-1/2 
              lg:left-[-60px] lg:translate-x-0
              bg-blue-500 text-white 
              rounded-md shadow-md 
              px-6 py-5 
              w-[95%] sm:w-[320px] lg:w-[260px]
            `}
          >
            <div className="flex justify-between items-center text-center w-full">
              <div className="flex-1">
                <div className="text-2xl font-bold">1400+</div>
                <div className="text-sm font-medium">Properties</div>
              </div>
              <div className="w-px bg-white h-12 mx-6"></div>
              <div className="flex-1">
                <div className="text-2xl font-bold">72+</div>
                <div className="text-sm font-medium">Trusted clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
