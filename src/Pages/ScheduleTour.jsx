import React, { useState } from "react";

export default function ScheduleTour({ property }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [tourType, setTourType] = useState("");

  // ✅ Date range: today → Dec 31, 2027
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date("2027-12-31").toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Property Header */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={property?.image || "https://via.placeholder.com/120"}
            alt={property?.title || "Property"}
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {property?.title || "Property Title"}
            </h2>
            <p className="text-gray-600 text-sm">
              {property?.location || "Location"}
            </p>
          </div>
        </div>

        {/* Date */}
        <h3 className="font-semibold text-gray-800 mb-2">Schedule a Tour</h3>
        <label className="block text-sm text-gray-600 mb-1">Date</label>
        <input
          type="date"
          min={today}
          max={maxDate}
          className="w-full border rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Time Slots */}
        <div className="flex gap-3 mb-6">
          {["10:00AM", "2:00PM", "4:00PM"].map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedTime === time
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Tour Type */}
        <div className="flex items-center gap-6 mb-8">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tour"
              value="virtual"
              checked={tourType === "virtual"}
              onChange={() => setTourType("virtual")}
            />
            Virtual Tour
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tour"
              value="in-person"
              checked={tourType === "in-person"}
              onChange={() => setTourType("in-person")}
            />
            In-Person Tour
          </label>
        </div>

        {/* Contact Info */}
        <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            pattern="^[A-Za-z\s]+$"
            title="Only letters are allowed"
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Enter a valid email address"
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone No"
            pattern="^\d{10}$"
            maxLength="10"
            title="Enter a valid 10-digit phone number"
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2 mb-6 text-sm">
          <input type="checkbox" />
          I want agent to call me before the visit
        </label>

        {/* Requests */}
        <label className="block text-sm text-gray-600 mb-1">
          Any Specific Requests?
        </label>
        <textarea
          className="w-full border rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>

        {/* Submit */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
          Submit Request
        </button>
      </div>
    </div>
  );
}
