import React, { useState, useEffect } from "react";
import { Search, IndianRupee, Users, Home, Star } from "lucide-react";
import NavBar from "../components/NavBar";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold mb-2 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-600 text-sm ${className}`}>{children}</p>
);

const LearningCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    "financial literacy for low income families"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [activeTag, setActiveTag] = useState(1);

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const RESULTS_PER_PAGE = 9;

  // Quick search categories with icons and search terms
  const quickSearchTags = [
    {
      id: 1,
      icon: <IndianRupee size={16} />,
      label: "Budgeting Basics",
      searchTerm: "how to budget for low income",
    },
    {
      id: 2,
      icon: <Star size={16} />,
      label: "Saving Money",
      searchTerm: "saving tips for poor families India",
    },
    {
      id: 3,
      icon: <Users size={16} />,
      label: "Self-Help Groups",
      searchTerm: "self help groups India benefits",
    },
    {
      id: 4,
      icon: <Home size={16} />,
      label: "Govt Schemes",
      searchTerm: "government schemes for poor in India",
    },
    {
      id: 5,
      icon: <Search size={16} />,
      label: "Financial Literacy",
      searchTerm: "financial education for poor families India",
    },
  ];

  // Helper: Fetch videos from YouTube API
  const fetchVideos = async (searchTerm = "", pageToken = "") => {
    if (!YOUTUBE_API_KEY) {
      setError("YouTube API key is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `maxResults=${RESULTS_PER_PAGE}&` +
          `q=${encodeURIComponent(searchTerm)}&` +
          `type=video&` +
          `pageToken=${pageToken}&` +
          `key=${YOUTUBE_API_KEY}`
      );

      if (!searchResponse.ok) {
        throw new Error("Failed to fetch videos");
      }

      const searchData = await searchResponse.json();
      if (!searchData.items) throw new Error("No videos found");

      const videoIds = searchData.items.map((item) => item.id.videoId);

      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
          `part=contentDetails,statistics&` +
          `id=${videoIds.join(",")}&` +
          `key=${YOUTUBE_API_KEY}`
      );

      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch video details");
      }

      const detailsData = await detailsResponse.json();

      const enhancedVideos = searchData.items.map((item) => {
        const details = detailsData.items.find(
          (detail) => detail.id === item.id.videoId
        );
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          channelTitle: item.snippet.channelTitle,
          duration: details?.contentDetails?.duration || "N/A",
          viewCount: details?.statistics?.viewCount || "N/A",
        };
      });

      setVideos(pageToken ? [...videos, ...enhancedVideos] : enhancedVideos);
      setNextPageToken(searchData.nextPageToken || null);
    } catch (error) {
      setError(error.message || "Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  // Effect: Initial fetch
  useEffect(() => {
    fetchVideos(searchQuery);
  }, []);

  const handleQuickSearch = (tag) => {
    setActiveTag(tag.id === activeTag ? null : tag.id);
    setSearchQuery(tag.searchTerm);
    fetchVideos(tag.searchTerm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar language="en" toggleLanguage={() => {}} />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-green-200 text-white py-12 pt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl text-green-600 font-bold mb-4">
            Finance Learning Hub
          </h1>
          <p className="text-lg text-green-600">
            Free resources to empower low-income families with financial
            knowledge.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search financial topics..."
              className="w-full py-4 pl-10 pr-4 rounded-md text-gray-700"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>

          {/* Quick Search Tags */}
          <div className="mt-4 flex flex-wrap gap-3">
            {quickSearchTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleQuickSearch(tag)}
                className={`flex items-center px-4 py-2 rounded-full ${
                  activeTag === tag.id
                    ? "bg-white text-green-600"
                    : "bg-green-600 text-white"
                } transition-colors duration-200`}
              >
                {tag.icon}
                <span className="ml-2">{tag.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                  <div className="mt-2 text-sm text-gray-500">
                    {video.channelTitle} • {video.publishedAt}
                  </div>
                </CardHeader>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
