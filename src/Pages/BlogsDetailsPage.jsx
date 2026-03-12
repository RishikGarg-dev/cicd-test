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
          <h1 className="text-3xl font-black text-zinc-800 mb-4 tracking-tight">Article Not Found</h1>
          <Link to="/blogs" className="text-zinc-600 font-bold uppercase tracking-wider text-sm hover:underline hover:text-zinc-800 transition-colors">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 w-full overflow-x-hidden">
      {/* Article Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-12 mb-8">
        <Link to="/blogs" className="text-zinc-500 font-semibold tracking-wider text-sm hover:underline hover:text-zinc-800 transition-colors mb-8 inline-block">
          ← Back to Blogs
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-zinc-800 leading-tight mb-6 tracking-tighter w-full">
          {blog.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium mb-8 leading-relaxed w-full max-w-5xl">
          {blog.description}
        </p>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[50vh] md:h-[65vh] object-cover rounded-3xl shadow-sm"
        />
      </div>

      {/* Article Content */}
      <article className="w-full max-w-7xl mx-auto px-6 sm:px-8 text-lg md:text-xl text-zinc-800 leading-relaxed font-medium mt-8">
        {blog.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-8 max-w-5xl">
            {paragraph}
          </p>
        ))}
        
        <hr className="my-16 border-zinc-200 w-full" />
        
        <div className="bg-zinc-50 border border-zinc-100 text-zinc-800 p-12 md:p-16 rounded-3xl w-full max-w-5xl mx-auto flex flex-col items-center text-center my-16 shadow-sm">
          <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-zinc-800">Enjoyed this article?</h3>
          <p className="text-zinc-500 mb-8 text-lg max-w-md">Check out more insights, tips, and trends on our main blog page.</p>
          <Link to="/blogs" className="bg-white border border-zinc-200 text-zinc-800 px-8 py-3.5 rounded-full font-bold hover:bg-zinc-50 transition-all duration-300 shadow-sm hover:shadow-md text-sm uppercase tracking-widest">
            Read More Articles
          </Link>
        </div>
      </article>
    </div>
  );
}