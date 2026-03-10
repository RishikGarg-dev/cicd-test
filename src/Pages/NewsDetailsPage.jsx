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
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium hover:underline mb-4 inline-block"
        >
          ← Back
        </button>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="text-sm text-gray-500">
            <a
              href={article.source?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 hover:underline"
            >
              {article.source?.name || "Unknown source"}
            </a>
            {" • "}
            <span>{timeAgo(article.publishedAt)} </span>
            <span className="text-gray-400">•</span>
            <span className="ml-1">{formatDate(article.publishedAt)}</span>
            {article.author ? <span className="hidden sm:inline"> • {article.author}</span> : null}
            <span className="ml-2 text-gray-400">•</span>
            <span className="ml-1 text-gray-600">{readMinutes} min read</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              {copyStatus || "Copy link"}
            </button>

            <button
              onClick={handleEmailShare}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              Share
            </button>

            <button
              onClick={openOriginal}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Open original
            </button>
          </div>
        </div>

        {openOriginalConfirm && (
          <div className="mb-4 text-sm text-green-600">Opened original in new tab.</div>
        )}

        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[420px] object-cover rounded-2xl mb-6 shadow"
          />
        )}

        {article.description && (
          <p className="text-lg text-gray-700 mb-6">{stripTags(article.description)}</p>
        )}

        {/* Content: try splitting by paragraphs if available, otherwise show content */}
        <article className="prose max-w-none text-gray-800 leading-relaxed">
          {article.content
            ? article.content.split("\n\n").map((p, i) => (
                <p key={i} className="mb-4">
                  {stripTags(p)}
                </p>
              ))
            : (article.description && (
                <p>{stripTags(article.description)}</p>
              ))}
        </article>

        <div className="mt-8 border-t pt-6">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Read original on {article.source?.name || "source"} →
          </a>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Related articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r, idx) => (
                <Link
                  key={idx}
                  to={`/news/${idx}`}
                  state={{ article: r }}
                  className="block bg-white border border-gray-100 rounded-lg p-4 hover:shadow transition"
                >
                  <div className="flex gap-3">
                    {r.image && (
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="text-sm text-gray-500">{r.source?.name} • {timeAgo(r.publishedAt)}</div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-gray-600 line-clamp-2">{stripTags(r.description)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}