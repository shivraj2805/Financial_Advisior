import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || ""; // Set your backend URL in .env

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "marathi", label: "Marathi" },
  { value: "punjabi", label: "Punjabi" },
  { value: "gujarati", label: "Gujarati" },
];

const CATEGORIES = [
  { value: "all", label: "All Topics" },
  { value: "agriculture", label: "Agriculture" },
  { value: "dairy", label: "Dairy" },
  { value: "schemes", label: "Government Schemes" },
];

const QASessions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [archivedSessions, setArchivedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveSession, setLiveSession] = useState(null);

  // Fetch sessions from API
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/api/qna/upcoming?lang=${selectedLanguage}`).then(res => res.json()),
      fetch(`${API_URL}/api/qna/archived?lang=${selectedLanguage}`).then(res => res.json()),
      fetch(`${API_URL}/api/qna/live?lang=${selectedLanguage}`).then(res => res.json()).catch(() => null)
    ])
      .then(([upcoming, archived, live]) => {
        setUpcomingSessions(upcoming || []);
        setArchivedSessions(archived || []);
        setLiveSession(live && live.id ? live : null);
      })
      .catch(() => {
        setUpcomingSessions([]);
        setArchivedSessions([]);
        setLiveSession(null);
      })
      .finally(() => setLoading(false));
  }, [selectedLanguage]);

  // Filter logic for category
  const filterSessions = (sessions) => {
    if (selectedCategory === 'all') return sessions;
    return sessions.filter(s =>
      s.category === selectedCategory ||
      (s.topics && s.topics.some(t => t.toLowerCase().includes(selectedCategory)))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Language Selection */}
        <div className="flex justify-end mb-4">
          <select
            className="px-4 py-2 border border-green-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4 drop-shadow">Learn from Experts</h1>
          <p className="text-lg text-green-700 font-semibold">Get answers to your questions</p>
        </div>

        {/* Live Session */}
        {liveSession && (
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl p-8 mb-12 relative overflow-hidden shadow-lg">
            <div className="absolute top-4 right-4 flex items-center">
              <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative rounded-full h-3 w-3 bg-red-500"></span>
              <span className="ml-2 font-bold">Live Now</span>
            </div>
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">{liveSession.title}</h2>
                <p className="mb-4 font-semibold">{liveSession.expert}</p>
                <div className="flex items-center space-x-2">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                    {liveSession.attendees || 0} Attendees
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                    Language: {liveSession.language || LANGUAGES.find(l => l.value === selectedLanguage)?.label}
                  </span>
                </div>
              </div>
              <a
                href={liveSession.joinUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-700 font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors duration-300 shadow"
              >
                Join Now
              </a>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`px-5 py-2 rounded-full font-bold shadow-sm transition ${selectedCategory === cat.value ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <h2 className="text-2xl font-extrabold text-green-800 mb-6">Upcoming Sessions</h2>
        {loading ? (
          <div className="text-center text-green-700 py-12 font-bold animate-pulse">Loading...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {filterSessions(upcomingSessions).length === 0 ? (
              <div className="col-span-full text-center text-gray-500 font-semibold">No sessions available</div>
            ) : (
              filterSessions(upcomingSessions).map(session => (
                <div key={session.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-green-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-bold">
                        {session.type === 'webinar' ? 'Webinar' : 'Q&A'}
                      </span>
                      <span className="text-gray-500 font-semibold">{session.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">{session.title}</h3>
                    <p className="text-gray-700 mb-4">{session.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                        Languages: {session.languages?.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600 font-semibold">{session.time}</span>
                      </div>
                      <a
                        href={session.joinUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors duration-300 shadow"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Archived Sessions */}
        <h2 className="text-2xl font-extrabold text-green-800 mb-6">Past Sessions</h2>
        {loading ? (
          <div className="text-center text-green-700 py-12 font-bold animate-pulse">Loading...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filterSessions(archivedSessions).length === 0 ? (
              <div className="col-span-full text-center text-gray-500 font-semibold">No sessions available</div>
            ) : (
              filterSessions(archivedSessions).map(session => (
                <div key={session.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-green-100">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{session.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.topics?.map(topic => (
                        <span key={topic} className="bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 font-semibold">
                        <span>{session.duration}</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          Languages: {session.languages?.join(", ")}
                        </span>
                      </div>
                      <a
                        href={session.recordingUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-200 transition-colors duration-300 shadow"
                      >
                        Watch
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-green-50 rounded-2xl p-6 text-center shadow">
          <h3 className="text-lg font-bold text-green-800 mb-2">Need Help?</h3>
          <p className="text-green-700 mb-4 font-semibold">Call: 1800-XXX-XXXX (Toll Free)</p>
          <p className="text-sm text-green-700">9am to 6pm (Monday to Saturday)</p>
        </div>
      </div>
    </div>
  );
};

export default QASessions;