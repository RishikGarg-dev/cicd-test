import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { agentsData } from "../agentsData.jsx";
import { useNavigate } from "react-router-dom";

export default function Agent() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const navigate = useNavigate();

  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.city.toLowerCase().includes(search.toLowerCase());

    const matchesRating = ratingFilter
      ? Math.floor(agent.rating) === parseInt(ratingFilter)
      : true;
    const matchesExperience = experienceFilter
      ? agent.experience >= parseInt(experienceFilter)
      : true;
    const matchesLanguage = languageFilter
      ? agent.languages.includes(languageFilter)
      : true;

    return matchesSearch && matchesRating && matchesExperience && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-white text-black">
      

      <div>
        {/* Search */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or city..."
              className="flex-1 px-3 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            <select
              className="bg-white px-4 py-1 rounded shadow cursor-pointer"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">Rating</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
            </select>

            <select
              className="bg-white px-4 py-1 rounded shadow cursor-pointer"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
            >
              <option value="">Experience</option>
              <option value="2">2+ years</option>
              <option value="3">3+ years</option>
              <option value="5">5+ years</option>
              <option value="8">8+ years</option>
            </select>

            <select
              className="bg-white px-4 py-1 rounded shadow cursor-pointer"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="">Languages</option>
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Marathi">Marathi</option>
            
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[2px] gap-y-6  max-w-5xl mx-auto mt-8 mb-12 place-items-center">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-gray-100 rounded-xl p-4 flex flex-col items-center text-center shadow border border-black w-66 h-76"
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-20 h-20 rounded-full mb-3"
                />
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <div className="flex items-center gap-1 text-gray-700">
                  <MapPin size={14} />
                  <span>{agent.city}</span>
                </div>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: Math.floor(agent.rating) }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <span className="mt-2 px-3 py-1 bg-blue-200 rounded-full text-sm">
                  {agent.experience} years experience
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {agent.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm shadow"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/agent/${agent.id}`)}
                  className="mt-4 flex items-center gap-1 text-blue-700 font-semibold hover:underline cursor-pointer"
                >
                  View →
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No agents found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
