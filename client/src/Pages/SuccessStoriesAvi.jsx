



import React, { useState } from "react";      
import women1 from "./women1.webp";
import women2 from "./women2.jpg";
import man1 from "./man1.jpg";
import man2 from "./man2.jpg";


const SuccessStories = () => {
  const [likedStories, setLikedStories] = useState({});
  const [showFullStory, setShowFullStory] = useState({});
  const [showFeaturedFullStory, setShowFeaturedFullStory] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("all"); // Default filter
  const [videoUrl, setVideoUrl] = useState(null); // State for video URL

  const stories = [{
    id: 1,
    title: "Success sweet like Honey",
    author: "Avishkar Ghodke",
    region: "Gujarat",
    sector: "farming",
    challenge: "loan-application",
    thumbnail: man2,
    views: 1234,
    likes: 456,
    date: "March 15, 2025",
    summary:
      "How I transformed my 1-acre farm into a successful beekeeping business",
    fullStory:
      "Avishkar faced financial difficulties but found innovative ways to sustain beekeeping. By optimizing hive placements and improving honey extraction, he achieved remarkable success.",
    keyLessons: [
      "Optimizing hive placement for higher yield",
      "Identifying and preventing common bee diseases",
      "Innovative techniques for honey extraction",
    ],
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/zMZ6IBCQCm8?si=XqjOE1n3z8Fo5QVK", // Corrected video URL
  },
    
    {
      id: 2,
      title: "Building a Women's Dairy Cooperative",
      author: "Lakshmi Singh",
      region: "Punjab",
      sector: "dairy",
      challenge: "savings",
      thumbnail: women2,
      views: 2345,
      likes: 789,
      date: "March 10, 2025",
      summary: "Uniting 50 women to create a successful dairy business",
      fullStory:
        "Lakshmi led a group of women to form a cooperative, overcoming economic challenges. Their dairy business is now thriving due to smart financial planning and teamwork.",
      keyLessons: [
        "Importance of community collaboration",
        "Financial planning for cooperatives",
        "Effective quality control systems",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/CDU-3XEwsAw?si=ptPCwePBhwvGA3Oc",
    },
    {
      id: 3,
      title: "Digital Transformation of Traditional Craft",
      author: "Rajesh Kumar",
      region: "Rajasthan",
      sector: "small-business",
      challenge: "digital-adoption",
      thumbnail: man1,
      views: 1567,
      likes: 234,
      date: "March 5, 2025",
      summary:
        "Taking our family's handicraft business online during the pandemic",
      fullStory:
        "Rajesh adapted digital marketing strategies and set up an e-commerce store, ensuring his family’s handicrafts reached a global audience.",
      keyLessons: [
        "Digital marketing fundamentals",
        "E-commerce platform selection",
        "International shipping logistics",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/7CCjkqSpSz8?si=24HxB6qC-bO1jmPM",
    },
    {
      id: 4,
      title: "Innovative Water Conservation Techniques",
      author: "Suresh Patel",
      region: "Madhya Pradesh",
      sector: "farming",
      challenge: "water-scarcity",
      thumbnail: man2,
      views: 987,
      likes: 123,
      date: "April 1, 2025",
      summary: "How I implemented rainwater harvesting in my village",
      fullStory:
        "Suresh introduced rainwater harvesting systems in his village, significantly improving water availability for farming and daily use.",
      keyLessons: [
        "Importance of water conservation",
        "Community involvement in sustainable practices",
        "Simple techniques for rainwater harvesting",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/-evivoRwUZw?si=7Es1H7NKRKhK21SD",
    },
    {
      id: 5,
      title: "Empowering Women Through Skill Development",
      author: "Anjali Verma",
      region: "Uttar Pradesh",
      sector: "education",
      challenge: "skill-development",
      thumbnail: women1,
      views: 654,
      likes: 321,
      date: "April 15, 2025",
      summary: "Creating opportunities for women through vocational training",
      fullStory:
        "Anjali established a vocational training center for women, helping them gain skills and become financially independent.",
      keyLessons: [
        "The role of education in empowerment",
        "Building community support for women's initiatives",
        "Effective training programs for skill development",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/oniEpiAr9-8?si=ssKdtaDh0LV43yID",
    },
    {
      id: 6,
      title: "Sustainable Farming Practices",
      author: "Ravi Kumar",
      region: "Haryana",
      sector: "farming",
      challenge: "sustainability",
      thumbnail: man1,
      views: 432,
      likes: 210,
      date: "May 1, 2025",
      summary: "Transitioning to organic farming for better yields",
      fullStory:
        "Ravi shares his journey of converting his conventional farm to organic, focusing on sustainable practices that benefit the environment.",
      keyLessons: [
        "Benefits of organic farming",
        "Techniques for sustainable agriculture",
        "Market access for organic products",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/bPXA8fDcPFE?si=QgUZf500oamSajOO",
    },
    {
      id: 7,
      title: "Harnessing Solar Energy for Farming",
      author: "Kiran Mehta",
      region: "Gujarat",
      sector: "energy",
      challenge: "energy-access",
      thumbnail: man2,
      views: 800,
      likes: 150,
      date: "May 15, 2025",
      summary: "How solar panels transformed my farm's energy needs",
      fullStory:
        "Kiran installed solar panels on his farm, reducing energy costs and promoting sustainable practices.",
      keyLessons: [
        "Cost benefits of solar energy",
        "Sustainable farming practices",
        "Community impact of renewable energy",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/6EUaXRzG6cM?si=UF1qOPAHXIrsuWSr",
    },
    {
      id: 8,
      title: "Creating a Community Garden",
      author: "Neha Sharma",
      region: "Delhi",
      sector: "community",
      challenge: "food-security",
      thumbnail: women1,
      views: 600,
      likes: 200,
      date: "June 1, 2025",
      summary: "Uniting neighbors to grow food and build community",
      fullStory:
        "Neha organized a community garden project, fostering relationships and providing fresh produce to local families.",
      keyLessons: [
        "Community engagement in food production",
        "Benefits of local food systems",
        "Building social connections through gardening",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/59PiwBaVkmU?si=gFi--h54gE4PRaiM",
    },
    {
      id: 9,
      title: "Innovative Techniques in Organic Farming",   
      author: "Vikram Singh",
      region: "Punjab",
      sector: "farming",
      challenge: "organic-certification",
      thumbnail: man1,
      views: 700,
      likes: 180,
      date: "June 15, 2025",
      summary: "How I achieved organic certification for my farm",
      fullStory:
        "Vikram shares his journey of transitioning to organic farming and the challenges he faced in getting certified.",
      keyLessons: [
        "Understanding organic certification",
        "Techniques for organic farming",
        "Market opportunities for organic products",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 10,
      title: "Using Technology in Agriculture",
      author: "Rohit Verma",
      region: "Madhya Pradesh",
      sector: "technology",
      challenge: "agriculture-tech",
      thumbnail: man2,
      views: 500,
      likes: 100,
      date: "July 1, 2025",
      summary: "How technology improved my farming practices",
      fullStory:
        "Rohit implemented various technologies on his farm, leading to increased efficiency and productivity.",
      keyLessons: [
        "Benefits of technology in agriculture",
        "Adopting new farming techniques",
        "Improving yield through innovation",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/V9NAGL-Ji20?si=oc3ZN519TLldxkR0",
    },
    {
      id: 11,
      title: "Reviving Traditional Farming Methods",
      author: "Sita Devi",
      region: "Rajasthan",
      sector: "farming",
      challenge: "cultural-preservation",
      thumbnail: women2,
      views: 400,
      likes: 90,
      date: "July 15, 2025",
      summary: "How I brought back traditional farming techniques",
      fullStory:
        "Sita shares her experience of reviving traditional farming methods that are sustainable and culturally significant.",
      keyLessons: [
        "Importance of cultural heritage in farming",
        "Sustainable practices from the past",
        "Community involvement in preserving traditions",
      ],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/embed/sOF6lYBZV6w?si=HuQJ44VPiObj3JMV",
    },
  ];

  const featuredStory = {
    title: "From Small Farm to Thriving Business",
    author: "Maya Patel",
    summary:
      "Maya Patel shares her inspiring journey of transforming a small farm into a successful organic produce business, overcoming financial and operational challenges along the way.",
    fullStory:
      "Maya Patel began her journey with just a half-acre plot inherited from her family in rural Gujarat. With limited resources and no formal agricultural training, she faced numerous challenges including poor soil quality, unpredictable weather, and lack of market access. Determined to succeed, Maya researched organic farming techniques online and attended local workshops. She implemented sustainable practices like crop rotation, composting, and rainwater harvesting, which gradually improved her yields. To overcome financial hurdles, she secured a small loan and invested in a drip irrigation system, significantly reducing water costs. Maya then leveraged social media to market her organic vegetables directly to consumers, building a loyal customer base. Within three years, her business expanded to supply organic produce to supermarkets in three nearby cities, employing 15 local workers and inspiring other farmers in her community to adopt organic methods.",
  };

  const toggleLike = (id) => {
    setLikedStories((prev) => {
      const isLiked = prev[id] !== undefined;
      const story = stories.find((s) => s.id === id);
      const newLikes = isLiked ? story.likes - 1 : story.likes + 1;

      return {
        ...prev,
        [id]: !isLiked,
      };
    });
  };

  const toggleFullStory = (id) => {
    setShowFullStory((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFeaturedStory = () => {
    setShowFeaturedFullStory((prev) => !prev);
  };

  // Filter stories based on selected criteria
  const filteredStories = stories.filter((story) => {
    if (filterCriteria === "all") return true;
    if (filterCriteria.startsWith("sector-")) {
      return story.sector === filterCriteria.split("sector-")[1];
    }
    if (filterCriteria.startsWith("region-")) {
      return story.region === filterCriteria.split("region-")[1];
    }
    if (filterCriteria.startsWith("challenge-")) {
      return story.challenge === filterCriteria.split("challenge-")[1];
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          Success Stories & Case Studies
        </h1>

        {/* Featured Story */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={women1}
                alt="Featured success story"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Featured Story
                </span>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                {featuredStory.title}
              </h2>
              <p className="text-gray-600 mb-6">{featuredStory.summary}</p>
              {showFeaturedFullStory && (
                <p className="text-gray-700 mb-6">{featuredStory.fullStory}</p>
              )}
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
                onClick={toggleFeaturedStory}
              >
                {showFeaturedFullStory ? "Hide Full Story" : "Read Full Story"}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Filter Stories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("all")}
            >
              All Stories
            </button>
            {/* Sector Filters */}
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "sector-farming"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("sector-farming")}
            >
              Farming
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "sector-dairy"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("sector-dairy")}
            >
              Dairy
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "sector-small-business"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("sector-small-business")}
            >
              Small Business
            </button>
            {/* Region Filters */}
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "region-Gujarat"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("region-Gujarat")}
            >
              Gujarat
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "region-Punjab"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("region-Punjab")}
            >
              Punjab
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "region-Rajasthan"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("region-Rajasthan")}
            >
              Rajasthan
            </button>
            {/* Challenge Filters */}
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "challenge-loan-application"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("challenge-loan-application")}
            >
              Loan Application
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "challenge-savings"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("challenge-savings")}
            >
              Savings
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filterCriteria === "challenge-digital-adoption"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setFilterCriteria("challenge-digital-adoption")}
            >
              Digital Adoption
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    if (story.hasVideo) {
                      setVideoUrl(story.videoUrl);
                    }
                  }}
                >
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  {story.hasVideo && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
                      ▶ Video
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{story.summary}</p>

                  <h4 className="font-semibold text-green-800 mb-2">
                    Key Lessons:
                  </h4>
                  <ul className="space-y-1">
                    {story.keyLessons.map((lesson, index) => (
                      <li
                        key={index}
                        className="text-gray-600 text-sm flex items-center"
                      >
                        ✅ {lesson}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                    <span>👀 {story.views} Views</span>
                    {/* Heart Symbol with Count */}
                    <div className="flex items-center">
                      <button
                        className={`text-lg transition-colors duration-300 ${
                          likedStories[story.id] ? "text-red-600" : "text-gray-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering video play
                          toggleLike(story.id);
                        }}
                      >
                        {likedStories[story.id] ? "❤️" : "🩶"}
                      </button>
                      <span className="ml-2">
                        {story.likes + (likedStories[story.id] ? 1 : 0)} Likes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No stories found.</p>
          )}
        </div>
      </div>


      {/* Video Modal */}
      {videoUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          onClick={() => setVideoUrl(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-11/12 md:w-3/4 lg:w-1/2">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1"
              onClick={() => setVideoUrl(null)}
            >
              ✖
            </button>
            <iframe
              width="100%"
              height="315"
              src={videoUrl}
              title="Success Story Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;







