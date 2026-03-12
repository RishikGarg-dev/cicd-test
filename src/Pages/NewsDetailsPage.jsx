import React, { useMemo, useState } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";

/**
 * NewsDetailsPage
 * - Reads article from location.state.article OR sessionStorage ("shiftly_news") using :id
 * - Shows: title, source (link), published "time ago" + full date, author (if any), image,
 *   description, content, reading time, actions (open original, copy link, email share)
 * - Shows up to 3 related articles (from sessionStorage) if available
 */

function timeAgo(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const past = new Date(dateString);
  const diffSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(diffSeconds / 3600);
  const days = Math.floor(diffSeconds / 86400);
  const weeks = Math.floor(diffSeconds / 604800);

  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function estimateReadingMinutes(text) {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function NewsDetailsPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Try to get article from state first, otherwise fall back to sessionStorage using :id
  const article = useMemo(() => {
    if (state && state.article) return state.article;

    try {
      const stored = sessionStorage.getItem("shiftly_news");
      if (!stored) return null;
      const arr = JSON.parse(stored);
      const idx = parseInt(id, 10);
      if (!Number.isNaN(idx) && Array.isArray(arr) && arr[idx]) {
        return arr[idx];
      }
      return null;
    } catch (e) {
      console.error("Failed to read sessionStorage shiftly_news", e);
      return null;
    }
  }, [state, id]);

  const [copyStatus, setCopyStatus] = useState("");
  const [openOriginalConfirm, setOpenOriginalConfirm] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl text-center p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-3">Article not found</h2>
          <p className="text-gray-600 mb-4">
            The article data isn't available. You may have opened this page directly.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/blogs")}
              className="px-4 py-2 border border-black rounded hover:bg-gray-100"
            >
              Back to Blogs
            </button>
            <button
              onClick={() => {
                // try to re-open blogs and rely on their fetch/sessionStorage
                navigate("/blogs");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fullText = (article.content || "") + " " + (article.description || "");
  const readMinutes = estimateReadingMinutes(fullText);

  const related = useMemo(() => {
    try {
      const stored = sessionStorage.getItem("shiftly_news");
      if (!stored) return [];
      const arr = JSON.parse(stored);
      if (!Array.isArray(arr)) return [];
      // pick up to 3 articles different from current (by url or id)
      const currentUrl = article.url;
      return arr
        .filter((a) => a.url !== currentUrl)
        .slice(0, 3);
    } catch {
      return [];
    }
  }, [article]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(article.url);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (e) {
      setCopyStatus("Failed to copy");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(article.title || "Interesting article");
    const body = encodeURIComponent(`${article.title}\n\nRead here: ${article.url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const openOriginal = () => {
    // small confirmation so user doesn't lose context (optional)
    setOpenOriginalConfirm(true);
    // open in new tab
    window.open(article.url, "_blank", "noopener,noreferrer");
    setTimeout(() => setOpenOriginalConfirm(false), 1000);
  };

  // sanitize basic HTML tags removal for description/content
  const stripTags = (html) => (html ? html.replace(/<[^>]+>/g, "") : "");

  return (
    <div className="min-h-screen bg-white pb-20 w-full overflow-x-hidden">
      {/* Article Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-12 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 font-semibold tracking-wider text-sm hover:underline hover:text-zinc-800 transition-colors mb-8 inline-block"
        >
          ← Back
        </button>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-zinc-800 leading-tight mb-6 tracking-tighter w-full">
          {article.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6 pb-8 border-b border-zinc-100">
          <div className="text-sm font-medium text-zinc-500 flex flex-wrap items-center gap-2">
            <a
              href={article.source?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-800 font-bold hover:underline"
            >
              {article.source?.name || "Unknown source"}
            </a>
            <span className="text-zinc-300">•</span>
            <span>{timeAgo(article.publishedAt)} </span>
            <span className="text-zinc-300">•</span>
            <span>{formatDate(article.publishedAt)}</span>
            {article.author ? (
              <>
                <span className="hidden sm:inline text-zinc-300">•</span>
                <span className="hidden sm:inline">{article.author}</span>
              </>
            ) : null}
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase">
              {readMinutes} min read
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="px-5 py-2.5 border border-zinc-200 rounded-full text-sm font-bold text-zinc-700 hover:bg-zinc-50 shadow-sm transition-all flex items-center gap-2"
            >
              {copyStatus || "Copy Link"}
            </button>

            <button
              onClick={handleEmailShare}
              className="px-5 py-2.5 border border-zinc-200 rounded-full text-sm font-bold text-zinc-700 hover:bg-zinc-50 shadow-sm transition-all"
            >
              Share
            </button>

            <button
              onClick={openOriginal}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-zinc-800 shadow-sm transition-all"
            >
              Open Original
            </button>
          </div>
        </div>
      </div>

      {openOriginalConfirm && (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mb-4">
          <div className="text-sm font-medium text-zinc-600 bg-zinc-100 px-4 py-2 rounded-lg inline-block">
            Opened original article in a new tab.
          </div>
        </div>
      )}

      {/* Hero Image */}
      {article.image && (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[50vh] md:h-[65vh] object-cover rounded-3xl shadow-sm"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="w-full max-w-7xl mx-auto px-6 sm:px-8 text-lg md:text-xl text-zinc-800 leading-relaxed font-medium mt-8">
        {article.description && (
          <p className="text-xl md:text-2xl text-zinc-600 font-medium mb-12 max-w-5xl leading-relaxed">
            {stripTags(article.description)}
          </p>
        )}

        <div className="max-w-5xl">
          {article.content
            ? article.content.split("\n\n").map((p, i) => (
                <p key={i} className="mb-8">
                  {stripTags(p)}
                </p>
              ))
            : (
                <p className="mb-8 italic text-zinc-500">
                  Full content is not available via the API preview. Please read the original article to see the full story.
                </p>
              )}
        </div>
      </article>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-12 mb-16">
        <hr className="border-t border-zinc-200 mb-8 max-w-5xl" />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-800 font-bold hover:text-zinc-500 underline underline-offset-4 decoration-zinc-200 hover:decoration-zinc-400 transition-all inline-flex items-center gap-2"
        >
          Read the rest of the story on {article.source?.name || "the original source"} 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 mt-16 bg-zinc-50/50 py-16 -mb-20">
          <h3 className="text-3xl font-black text-zinc-800 mb-8 tracking-tight">More related news</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r, idx) => (
              <Link
                key={idx}
                to={`/news/${idx}`}
                state={{ article: r }}
                className="group bg-white border border-zinc-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                <div className="flex gap-4 mb-4">
                  {r.image && (
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-24 h-24 object-cover rounded-xl shadow-sm border border-zinc-100"
                    />
                  )}
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                      {r.source?.name} <span className="text-zinc-300 mx-1">•</span> {timeAgo(r.publishedAt)}
                    </div>
                    <div className="font-bold text-zinc-800 line-clamp-3 leading-snug group-hover:text-zinc-600 transition-colors">
                      {r.title}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-zinc-500 line-clamp-2 mt-auto">
                  {stripTags(r.description)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}