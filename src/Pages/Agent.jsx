import { useState } from "react";
import {
  Search,
  Star,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { agentsData } from "../agentsData.jsx";
import { useNavigate } from "react-router-dom";

export default function Agent() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 9;
  const navigate = useNavigate();

  // First filter the agents
  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.city.toLowerCase().includes(search.toLowerCase());

    const matchesRating = ratingFilter
      ? Math.floor(agent.rating) >= parseInt(ratingFilter)
      : true;
    const matchesExperience = experienceFilter
      ? agent.experience >= parseInt(experienceFilter)
      : true;
    const matchesLanguage = languageFilter
      ? agent.languages.includes(languageFilter)
      : true;

    return (
      matchesSearch && matchesRating && matchesExperience && matchesLanguage
    );
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    const aHasProperties = (a.activeProperties?.length || 0) > 0;
    const bHasProperties = (b.activeProperties?.length || 0) > 0;

    // If one has properties and the other doesn't
    if (aHasProperties !== bHasProperties) {
      return bHasProperties - aHasProperties;
    }

    // If both are same category → sort by experience
    return b.experience - a.experience;
  });

  // Pagination logic
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = sortedAgents.slice(indexOfFirstAgent, indexOfLastAgent);
  const totalPages = Math.ceil(sortedAgents.length / agentsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Reset to first page when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-4 md:px-8">
        {/* Search & Filters Section */}
        <div className="max-w-5xl mx-auto mt-8 mb-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 shadow-sm">
            {/* Search */}
            <div className="w-full lg:w-2/5 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  size={20}
                  className="text-indigo-500 group-focus-within:text-indigo-600 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Search agents by name or city..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm hover:border-gray-300"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-1 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-full lg:w-auto">
                {/* Rating Filter */}
                <div className="relative w-full sm:w-auto group">
                  <select
                    className="w-full appearance-none bg-transparent pl-4 pr-10 py-2.5 rounded-lg cursor-pointer text-sm font-semibold text-gray-700 outline-none hover:bg-gray-50 focus:bg-indigo-50/50 transition-colors focus:ring-2 focus:ring-indigo-500/30"
                    value={ratingFilter}
                    onChange={(e) =>
                      handleFilterChange(setRatingFilter)(e.target.value)
                    }
                  >
                    <option value="">Rating (All)</option>
                    <option value="5">★★★★★ 5 Stars</option>
                    <option value="4">★★★★☆ 4+ Stars</option>
                    <option value="3">★★★☆☆ 3+ Stars</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition-colors"
                  />
                </div>

                <div className="w-full h-px sm:w-px sm:h-6 bg-gray-100 sm:bg-gray-200"></div>

                {/* Experience Filter */}
                <div className="relative w-full sm:w-auto group">
                  <select
                    className="w-full appearance-none bg-transparent pl-4 pr-10 py-2.5 rounded-lg cursor-pointer text-sm font-semibold text-gray-700 outline-none hover:bg-gray-50 focus:bg-indigo-50/50 transition-colors focus:ring-2 focus:ring-indigo-500/30"
                    value={experienceFilter}
                    onChange={(e) =>
                      handleFilterChange(setExperienceFilter)(e.target.value)
                    }
                  >
                    <option value="">Experience (All)</option>
                    <option value="2">2+ Years</option>
                    <option value="3">3+ Years</option>
                    <option value="5">5+ Years</option>
                    <option value="8">8+ Years</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition-colors"
                  />
                </div>

                <div className="w-full h-px sm:w-px sm:h-6 bg-gray-100 sm:bg-gray-200"></div>

                {/* Language Filter */}
                <div className="relative w-full sm:w-auto group">
                  <select
                    className="w-full appearance-none bg-transparent pl-4 pr-10 py-2.5 rounded-lg cursor-pointer text-sm font-semibold text-gray-700 outline-none hover:bg-gray-50 focus:bg-indigo-50/50 transition-colors focus:ring-2 focus:ring-indigo-500/30"
                    value={languageFilter}
                    onChange={(e) =>
                      handleFilterChange(setLanguageFilter)(e.target.value)
                    }
                  >
                    <option value="">Language (All)</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results count and sort indicator */}
        {sortedAgents.length > 0 && (
          <div className="max-w-5xl mx-auto mb-4 px-4 flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {indexOfFirstAgent + 1}-
              {Math.min(indexOfLastAgent, sortedAgents.length)} of{" "}
              {sortedAgents.length} agents
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <span className="font-medium">Sorted by:</span> Experience (High
              to Low)
            </span>
          </div>
        )}

        {/* Cards - Fixed: The key prop ensures components re-render properly on page change */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8 mb-12 justify-items-center items-start px-4">
          {currentAgents.length > 0 ? (
            currentAgents.map((agent) => {
              return (
                <div
                  key={agent.id}
                  className="relative w-full max-w-[320px] h-full group/card z-0 hover:z-10"
                >
                  <div className="bg-white rounded-xl border border-gray-200 flex flex-col w-full h-full transition-all duration-300 group-hover/card:border-gray-300 group-hover/card:shadow-2xl group-hover/card:scale-[1.03]">
                    {/* Card Header (Static Color) */}
                    <div className="flex items-center px-5 py-4 gap-3 rounded-t-xl bg-[#F1F5F9] text-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-white overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                        {agent.image ? (
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-800 font-bold text-lg">
                            {agent.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 font-bold text-lg truncate">
                        <span className="truncate">{agent.name}</span>
                        <ChevronRight
                          size={18}
                          className="shrink-0 group-hover/card:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-5 pt-5 pb-5 flex flex-col flex-grow bg-white rounded-b-xl">
                      {/* Stats: Experience | Properties */}
                      <div className="flex items-center gap-3 text-sm font-semibold text-gray-800 mb-4 justify-center">
                        <span>
                          {agent.experience}{" "}
                          <span className="text-gray-500 font-normal">Yrs</span>{" "}
                          Experience
                        </span>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <span>
                          {agent.activeProperties?.length || 0}{" "}
                          <span className="text-gray-500 font-normal">
                            Properties
                          </span>
                        </span>
                      </div>

                      {/* Tags / Locations */}
                      <div className="flex flex-wrap gap-2 justify-center mb-5">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                          {agent.city}
                        </span>
                        {agent.specialties?.slice(0, 1).map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium"
                          >
                            {spec.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                      {/* Extra context that was previously hidden (now just part of the card) */}
                      <div className="flex flex-col items-center gap-2 mb-6">
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                          <Star
                            size={12}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="font-semibold text-gray-800">
                            {agent.rating} Rating
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        <button
                          onClick={() => navigate(`/agent/${agent.id}`)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-indigo-500 rounded-lg text-indigo-600 font-semibold text-[15px] hover:bg-indigo-50 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                          Show Details{" "}
                          <ChevronRight size={18} className="text-indigo-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-24 px-4 w-full">
              <div className="bg-gray-50 rounded-full p-6 mb-5 border border-gray-100 shadow-sm">
                <Search size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No agents found
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6 leading-relaxed">
                We couldn't find any agents matching your current search and
                filter criteria. Try adjusting your filters or searching for a
                different name.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setRatingFilter("");
                  setExperienceFilter("");
                  setLanguageFilter("");
                  setCurrentPage(1);
                }}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {sortedAgents.length > 0 && totalPages > 1 && (
          <div className="max-w-5xl mx-auto mt-8 mb-12 px-4">
            <div className="flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${
                  currentPage === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                } transition-colors`}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-lg border font-semibold transition-colors ${
                      currentPage === number
                        ? "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${
                  currentPage === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                } transition-colors`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
