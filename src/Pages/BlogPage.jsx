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
      <div className="bg-white py-16 px-6 mb-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Rental Insights & Tips
          </h1>

          <p className="text-lg text-gray-600">
            Expert advice for tenants, leasing guides, and rental market trends.
          </p>

        </div>
      </div>

      {/* Refresh Button */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex justify-end">

        <button
          onClick={handleRefresh}
          className="border border-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          Refresh News
        </button>

      </div>

      {/* Latest News */}
      <LatestRentalNews news={news} loading={loading} error={error} />

      {/* Static Blogs Heading */}
      <div className="max-w-7xl mx-auto px-6 pb-6">

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Property Guides & Insights
        </h2>

      </div>

      {/* Static Blogs */}
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-16">

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

              <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-base flex-1 line-clamp-3">
                {blog.description}
              </p>

              <Link
                to={`/blogs/${blog.id}`}
                className="mt-6 text-blue-600 font-semibold hover:text-blue-800"
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