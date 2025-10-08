import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { houses } from "../houses"; 
import { agentsData } from "../agentsData"; 

export default function ScheduleTour() {
  const { id } = useParams();
  const property = houses.find((h) => h.id === Number(id));

  // Default agent for unassigned properties
  const defaultAgent = {
    name: "N/A",
    phone: "N/A",
    email: "N/A",
    image: "/images/agent.jpg",
  };

  // Find the assigned agent or use default
  const agent = agentsData.find((a) => a.id === property?.agentId) || defaultAgent;

  // Form states
  const [selectedTime, setSelectedTime] = useState("");
  const [tourType, setTourType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [requests, setRequests] = useState("");

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Date range: today → Dec 31, 2027
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date("2027-12-31").toISOString().split("T")[0];

  // Validators
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (val && !/^[A-Za-z\s]+$/.test(val)) {
      setNameError("Only letters and spaces are allowed");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (
      val &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
    ) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setPhone(val.slice(0, 10));
    if (val.length > 0 && val.length < 10) {
      setPhoneError("Phone number must be 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || nameError) {
      alert("Please enter a valid name");
      return;
    }
    if (!email || emailError) {
      alert("Please enter a valid email");
      return;
    }
    if (!phone || phoneError) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }
    if (!tourType) {
      alert("Please select a tour type");
      return;
    }

    alert("Form submitted successfully!");
    // TODO: send data to API
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Property Header */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={property?.image?.[0] || "https://via.placeholder.com/120"}
            alt={property?.title || "Property"}
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {property?.title}
            </h2>
            <p className="text-gray-600 text-sm">{property?.location}</p>
          </div>
        </div>

        {/* Agent Details */}
        <div className="border rounded-lg p-4 mb-8 bg-gray-50 flex items-center gap-4">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-20 h-20 object-cover rounded-lg shadow"
          />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">{agent.name}</h3>
            <p className="text-gray-600 text-sm">{agent.phone}</p>
            <p className="text-gray-600 text-sm">{agent.email}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Date */}
          <h3 className="font-semibold text-gray-800 mb-2">Schedule a Tour</h3>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            min={today}
            max={maxDate}
            className="w-full border rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Time Slots */}
          <div className="flex gap-3 mb-6">
            {["10:00AM", "2:00PM", "4:00PM"].map((time) => (
              <button
                key={time}
                type="button"
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
          <h3 className="font-semibold text-gray-800 mb-3">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone No"
                value={phone}
                onChange={handlePhoneChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 mb-6 text-sm">
            <input
              type="checkbox"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
            I want agent to call me before the visit
          </label>

          {/* Requests */}
          <label className="block text-sm text-gray-600 mb-1">
            Any Specific Requests?
          </label>
          <textarea
            className="w-full border rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
