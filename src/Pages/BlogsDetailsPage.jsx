import React from "react";
import { Link, useParams } from "react-router-dom";
import { blogs } from "../BlogsDetailsData"; 

export default function BlogsDetailsPage() {
  // Grab the ID from the URL
  const { id } = useParams();
  
  // Find the specific blog based on that ID
  const blogId = parseInt(id);
  const blog = blogs.find((b) => b.id === blogId);

  // Fallback if the URL has an ID that doesn't exist
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link to="/blogs" className="text-blue-600 hover:underline">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Article Header */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <Link to="/blogs" className="text-blue-600 font-medium hover:underline mb-8 inline-block">
          ← Back to Blogs
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          {blog.description}
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 text-lg text-gray-800 leading-relaxed">
        {blog.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-6">
            {paragraph}
          </p>
        ))}
        
        <hr className="my-12 border-gray-200" />
        
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Enjoyed this article?</h3>
          <p className="text-gray-600 mb-4">Check out more insights on our main blog page.</p>
          <Link to="/blogs" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
            Read More Articles
          </Link>
        </div>
      </article>
    </div>
  );
}