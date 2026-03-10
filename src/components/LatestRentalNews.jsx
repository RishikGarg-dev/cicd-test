import React from "react";
import { Link } from "react-router-dom";

export default function LatestRentalNews({ news = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 pt-8 bg-zinc-50 xl:max-w-[100vw] overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-[340px] flex-shrink-0 bg-white rounded-2xl border border-zinc-100 h-[400px] shadow-sm relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                <div className="w-full h-48 bg-zinc-50" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-zinc-200 rounded-full w-3/4" />
                  <div className="h-4 bg-zinc-100 rounded-full w-1/2" />
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-100/50 rounded-full w-full" />
                    <div className="h-4 bg-zinc-100/50 rounded-full w-[90%]" />
                    <div className="h-4 bg-zinc-100/50 rounded-full w-[80%]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 pt-8 bg-zinc-50/50 xl:max-w-[100vw] overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white border border-zinc-200 text-zinc-800 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm w-full">
            <div className="w-16 h-16 bg-zinc-50 rounded-xl flex items-center justify-center shadow-sm mb-4 border border-zinc-200">
              <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 15c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
            <p className="max-w-md opacity-70 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 pt-8 bg-zinc-50/50 xl:max-w-[100vw] overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white border border-zinc-200 text-zinc-800 p-12 rounded-2xl text-center shadow-sm w-full">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-zinc-200">
              <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v4a2 2 0 002 2h4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h3m-3 4h6m-6 4h6" />
              </svg>
            </div>
            <p className="text-2xl font-bold mb-2">No news articles found</p>
            <p className="opacity-60 text-lg">Please check back in a few hours for the latest updates.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 pt-0 bg-zinc-50/50 xl:max-w-[100vw] overflow-x-hidden flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-6 pt-0">
          {news.slice(0, 8).map((article, index) => (
            <div
              key={index}
              className="group w-[340px] md:w-[400px] flex-shrink-0 bg-white rounded-2xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
            >
              <Link to={`/news/${index}`} state={{ article }} className="relative h-48 overflow-hidden bg-zinc-100">
                <img
                  src={article.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-800 text-[10px] font-bold px-3 py-1 rounded-full border border-zinc-200/50 shadow-sm">
                  LATEST
                </div>
              </Link>
  
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-zinc-600 px-2 py-0.5 bg-zinc-100 rounded uppercase tracking-wider">
                    {article.source.name}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500 font-medium">
                    {timeAgo(article.publishedAt)}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-2 text-zinc-800 line-clamp-2 h-[56px] leading-snug group-hover:text-zinc-500 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-zinc-500 line-clamp-3 h-[60px] mb-6 leading-relaxed">
                  {article.description}
                </p>
  
                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <Link
                    to={`/news/${index}`}
                    state={{ article }}
                    className="flex items-center gap-2 text-zinc-800 font-bold text-sm group/link hover:text-zinc-500 transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-200">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);

  const diffSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(diffSeconds / 3600);
  const days = Math.floor(diffSeconds / 86400);
  const weeks = Math.floor(diffSeconds / 604800);

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
}
