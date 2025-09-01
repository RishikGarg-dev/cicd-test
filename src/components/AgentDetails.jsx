import { useParams } from "react-router-dom";
import { agentsData } from "../agentsData.jsx";
import { houses } from "../houses.jsx";
import { MapPin, Star, Phone, Mail, MessageSquare } from "lucide-react";
import HouseCard from "../components/HouseCard";

export default function AgentDetails() {
  const { id } = useParams();
  const agent = agentsData.find((a) => a.id === parseInt(id));

  if (!agent) return <p className="text-center mt-20">Agent not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Back Link */}
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-500 hover:underline mb-4 flex items-center cursor-pointer"
      >
        ← Back To Directory
      </button>

      {/* Agent Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start bg-white shadow-md rounded-2xl p-4 sm:p-6">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto md:mx-0"
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">{agent.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-gray-600 mt-2">
            <MapPin size={16} />
            <span>{agent.city}</span>
            <span>• {agent.experience} yrs</span>
            <span className="flex items-center gap-1">
              • {agent.rating}
              <Star size={14} className="text-yellow-500" /> (
              {agent.reviewsCount} reviews)
            </span>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            {agent.languages.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            {agent.specialties.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="w-full md:w-auto bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 text-sm sm:text-base cursor-pointer">
            <MessageSquare size={16} /> Message
          </button>
          <a
            href={`tel:${agent.phone}`}
            className="w-full md:w-auto border border-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 text-sm sm:text-base"
          >
            <Phone size={16} /> Call{" "}
            <span className="font-medium">{agent.phone}</span>
          </a>
        </div>
      </div>

      {/* Row 1: About & Contact Info */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {/* About */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:col-span-2">
          <h2 className="text-lg font-semibold">About {agent.name}</h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base">{agent.about}</p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <h3 className="font-semibold">Contact Information</h3>
          <div className="flex items-center gap-2 mt-3 text-gray-700 text-sm sm:text-base">
            <Phone size={16} /> <span>{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-gray-700 text-sm sm:text-base">
            <Mail size={16} /> <span>{agent.email}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Active Properties & Send Message */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Left Column (Active + Reviews) */}
        <div className="md:col-span-2 space-y-6">
          {/* Active Properties */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg font-semibold">
              Active Properties ({houses.filter(h => h.agentId === agent.id).length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
              {houses
                .filter(h => h.agentId === agent.id)
                .map((prop) => (
                  <HouseCard key={prop.id} house={prop} />
                ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <h2 className="text-lg font-semibold">
              Reviews ({agent.reviews.length})
            </h2>
            <div className="mt-4 space-y-4">
              {agent.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <p className="font-semibold text-sm sm:text-base">
                    {review.name} — {review.date}
                  </p>
                  <p className="text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Send Message) */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 h-fit min-h-[420px]">

          <h3 className="font-semibold">Send a Message</h3>
          <form className="mt-3 space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
            />
            <textarea
              placeholder="Message"
              className="w-full border rounded-lg px-3 py-2 h-24 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
