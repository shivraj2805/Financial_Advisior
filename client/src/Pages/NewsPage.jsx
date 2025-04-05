import React, { useState, useEffect } from "react";
import { Search, RefreshCcw, Globe, Briefcase, User } from "lucide-react";
import NavBar from "../components/NavBar";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("business-hindi");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNews = async (type, query = "") => {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    const BASE_URL = "https://newsapi.org/v2";

    let url;
    if (query) {
      url = `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`;
    } else {
      switch (type) {
        case "top":
          url = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;
          break;
        case "entrepreneurs":
          url = `${BASE_URL}/everything?q=small+entrepreneurs+india&apiKey=${API_KEY}`;
          break;
        case "business-hindi":
          url = `${BASE_URL}/everything?q=business&language=hi&apiKey=${API_KEY}`;
          break;
        default:
          url = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;
      }
    }

    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles.filter((article) => article.source.id));
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(activeTab);
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(activeTab, searchQuery);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <NavBar language="en" toggleLanguage={() => {}} />

      <div className="min-h-screen bg-gradient-to-br py-16 from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-900 mb-2">
              Global News Hub
            </h1>
            <p className="text-green-600">
              Stay informed with the latest news from around the world
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-green-200 
                         focus:outline-none focus:border-green-500"
                />
                <Search className="absolute left-3 top-2.5 text-green-400 w-5 h-5" />
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("top")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                          ${
                            activeTab === "top"
                              ? "bg-green-500 text-white"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Top Headlines</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("entrepreneurs")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                          ${
                            activeTab === "entrepreneurs"
                              ? "bg-green-500 text-white"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          }`}
                >
                  <User className="w-4 h-4" />
                  <span>Small Entrepreneurs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("business-hindi")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                          ${
                            activeTab === "business-hindi"
                              ? "bg-green-500 text-white"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Business (Hindi)</span>
                </button>
              </div>
            </form>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCcw className="w-8 h-8 text-green-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl 
                         transition-shadow duration-300 flex flex-col"
                >
                  {article.urlToImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 m-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-sm rounded">
                          {article.source.name}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                      <span>{article.author || "Unknown"}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
