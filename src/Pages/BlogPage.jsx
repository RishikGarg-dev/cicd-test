import React from "react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Real Estate Trends in 2025",
    description:
      "Discover the latest property market insights and investment opportunities.",
    image: "/images/BlogPage1.jpg",
  },
  {
    id: 2,
    title: "How to Choose the Right Agent",
    description:
      "Tips to find the perfect property agent who understands your needs.",
    image: "/images/BlogPage2.png",
  },
  {
    id: 3,
    title: "Luxury Homes Worth Exploring",
    description:
      "A curated list of the most stunning luxury properties available today.",
    image: "/images/BlogPage3.jpg",
  },
  {
    id: 4,
    title: "Why Verified Listings Matter",
    description:
      "Understand the importance of verified property listings for buyers and sellers.",
    image: "/images/BlogPage4.jpg",
  },
  {
    id: 5,
    title: "Furnishing Your New Home",
    description:
      "Simple and effective furniture tips to make your new house feel like home.",
    image: "/images/BlogPage5.webp",
  },
  {
    id: 6,
    title: "Maximizing Rental Yields",
    description:
      "Strategies landlords can use to increase rental returns in today’s market.",
    image: "/images/BlogPage6.png",
  },
];


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Swiftly Blogs
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with property insights, agent tips, and real estate
            trends curated just for you.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-16">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-base flex-1">
                {blog.description}
              </p>
              <button className="mt-4 text-blue-600 font-medium hover:underline self-start">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
