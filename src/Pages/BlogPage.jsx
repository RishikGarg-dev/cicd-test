import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../BlogsDetailsData";
import LatestRentalNews from "../components/LatestRentalNews";

export default function BlogPage() {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const targetUrl = `https://gnews.io/api/v4/search?q=rental%20housing%20India&lang=en&country=in&max=10&apikey=7345947614720d3679ce65f2925f64ee`;
      // Using AllOrigins proxy to bypass CORS during development
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyUrl);

      if (!res.ok) {
        throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const articles = data.articles || [];

      // Ensure we have at least 6 articles if available (fetching 10, showing 8 for better scroll feel)
      const limitedArticles = articles.slice(0, 8);

      setNews(limitedArticles);
      sessionStorage.setItem("shiftly_news", JSON.stringify(limitedArticles));
    } catch (error) {
      console.error("News fetch error:", error);
      setError(error.message || "Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const storedNews = sessionStorage.getItem("shiftly_news");
    if (storedNews) {
      setNews(JSON.parse(storedNews));
      setLoading(false);
    } else {
      fetchNews();
    }

  }, []);

  const handleRefresh = () => {
    sessionStorage.removeItem("shiftly_news");
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-white pt-4 pb-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-100 w-full xl:max-w-[100vw] overflow-x-hidden">
        <div className="w-full text-left">

          <h1 className="text-5xl md:text-6xl font-black text-zinc-800 mb-6 tracking-tight">
            Rental Insights & Tips
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl">
            Expert advice for tenants, leasing guides, and rental market trends.
          </p>

        </div>
      </div>

      {/* Refresh Button */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center bg-zinc-50/50 xl:max-w-[100vw] overflow-x-hidden">
        <h2 className="text-2xl font-black text-zinc-800 m-0 p-0 tracking-tight">Latest Updates</h2>

        <button
          onClick={handleRefresh}
          className="border border-zinc-300 bg-white text-zinc-700 px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full hover:bg-zinc-100 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Refresh News
        </button>

      </div>

      {/* Latest News */}
      <LatestRentalNews news={news} loading={loading} error={error} />

      {/* Static Blogs Heading */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 bg-white xl:max-w-[100vw] overflow-x-hidden border-t border-zinc-100">

        <h2 className="text-3xl font-black text-zinc-800 mb-0 tracking-tight">
          Property Guides & Insights
        </h2>

      </div>

      {/* Static Blogs */}
      <div className="w-full grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-6 lg:px-8 pb-20 bg-white xl:max-w-[100vw] overflow-x-hidden">

        {blogs.map((blog) => (

          <div
            key={blog.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-1 overflow-hidden flex flex-col"
          >

            <Link to={`/blogs/${blog.id}`}>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover cursor-pointer"
              />
            </Link>

            <div className="p-6 flex flex-col flex-1">

              <h2 className="text-2xl font-bold text-zinc-800 mb-3 line-clamp-2 hover:text-zinc-600 transition-colors">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-base flex-1 line-clamp-3">
                {blog.description}
              </p>

              <Link
                to={`/blogs/${blog.id}`}
                className="mt-6 text-zinc-800 font-bold text-sm uppercase tracking-wider hover:text-zinc-500 transition-colors inline-block pb-1"
              >
                Read Article →
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}