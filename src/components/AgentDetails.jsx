import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useCallback } from "react";
import { agentsData } from "../agentsData.jsx";
import { houses } from "../houses.jsx";
import {
  MapPin,
  Star,
  Phone,
  Mail,
  MessageSquare,
  Languages,
} from "lucide-react";
import HouseCard from "../components/HouseCard";

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agentId = parseInt(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const agent = useMemo(
    () => agentsData.find((a) => a.id === agentId),
    [agentId],
  );
  const agentHouses = useMemo(
    () => houses.filter((h) => h.agentId === agentId),
    [agentId],
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setFormError(null);
      if (!formData.name || !formData.email || !formData.message) {
        setFormError("Please fill out all fields");
        return;
      }
      setFormSubmitting(true);
      setTimeout(() => {
        setFormSubmitting(false);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
    },
    [formData],
  );

  if (!agent) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Agent Not Found
          </h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            The professional you're looking for isn't in our directory. They
            might have moved or the link is broken.
          </p>
          <button
            onClick={() => navigate("/agent")}
            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* back button */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
        aria-label="Go back to previous page"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-200 group-hover:border-black transition-colors">
          <span className="pb-0.5 transition-transform duration-200 group-hover:-translate-x-0.5">
            ←
          </span>
        </span>
        Back to Directory
      </button>

      {/* profile header */}
      <div className="bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* profile image */}
          <div className="relative shrink-0">
            <div className="p-1 rounded-full bg-gradient-to-tr from-blue-100 to-gray-100 shadow-sm">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-inner"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-white/20">
              {agent.experience}+ Years
            </div>
          </div>

          {/* profile info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {agent.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-5 gap-y-2 text-gray-500 mt-4 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-gray-400" />
                {agent.city}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded">
                  <span className="text-yellow-700 font-bold mr-1">
                    {agent.rating}
                  </span>
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                </div>
                <span className="text-gray-400 font-normal">
                  ({agent.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* dynamic languages */}
              <div className="flex items-center gap-2 mt-6 text-sm text-gray-600 font-medium">
                <Languages size={16} className="text-gray-400" />
                <span>{agent.languages.join(", ")}</span>
              </div>

            {/* dynamic specialties */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {agent.specialties.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-600 rounded-lg text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* action buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-64 mt-4 md:mt-2">
            <button className="flex-1 bg-gradient-to-r from-blue-100 to-indigo-200 text-indigo-900 px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200">
              <MessageSquare size={18} />
              Message Agent
            </button>
            <a
              href={`tel:${agent.phone}`}
              className="flex-1 bg-gray-50 text-gray-700 px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 font-semibold text-sm border border-gray-200 hover:bg-gray-100 transition-all duration-200"
            >
              <Phone size={18} />
              Call Direct
            </a>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="grid lg:grid-cols-3 gap-10 mt-12">
        <div className="lg:col-span-2 space-y-10">
          {/* About */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              About the Agent
            </h2>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm leading-relaxed">
              <p className="text-gray-600 text-base">{agent.about}</p>
            </div>
          </section>

          {/* Active Listings */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Active Listings
              </h2>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {agentHouses.length} Properties
              </span>
            </div>

            {agentHouses.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <p className="text-gray-400 font-medium">
                  No active listings at the moment.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {agentHouses.map((prop) => (
                  <HouseCard key={prop.id} house={prop} />
                ))}
              </div>
            )}
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Client Experiences
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-300">
              {agent.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 first:rounded-t-3xl last:rounded-b-3xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-400 text-xs uppercase">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating ? "fill-current" : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* right column - sticky form */}
        <aside className="lg:col-span-1">
          <div className="sticky top-10 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-[2rem] p-8 text-gray-900 shadow-lg border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-bl-full" />

              <h3 className="text-lg font-bold mb-6 text-gray-900">
                Contact Information
              </h3>

              <div className="space-y-4 relative z-10">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Phone size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-700 transition-colors">
                    {agent.phone}
                  </span>
                </a>

                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Mail size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-700 transition-colors truncate">
                    {agent.email}
                  </span>
                </a>
              </div>
            </div>

            {/* Message Form */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Inquiry Form
              </h3>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                {formError && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium border border-red-100">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="I'm interested in..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 h-32 text-sm focus:ring-2 focus:ring-black/5 transition-all resize-none placeholder:text-gray-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-100 to-indigo-200 
                              text-indigo-900 py-4 rounded-2xl 
                              flex items-center justify-center gap-2
                              active:scale-95 font-semibold text-sm 
                              shadow-sm hover:shadow-md 
                              transition-all duration-200 mt-2
                              ${formSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {formSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}