import React, { useState } from 'react';

const QASessions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');

  const upcomingSessions = [
    {
      id: 1,
      title: "किसान क्रेडिट कार्ड का उपयोग कैसे करें",
      englishTitle: "How to Use Kisan Credit Card",
      expert: "रमेश यादव",
      role: "कृषि विभाग अधिकारी",
      date: "15 मार्च 2025",
      time: "दोपहर 2:00 बजे",
      registeredUsers: 234,
      description: "किसान क्रेडिट कार्ड के लाभ और इसका उपयोग करने की पूरी जानकारी",
      topics: ["कृषि ऋण", "सरकारी योजनाएं", "बैंकिंग"],
      type: "webinar",
      languages: ["Hindi", "Bhojpuri"]
    },
    {
      id: 2,
      title: "दूध उत्पादन में वृद्धि कैसे करें",
      englishTitle: "How to Increase Milk Production",
      expert: "सविता पाटिल",
      role: "पशु चिकित्सक",
      date: "20 मार्च 2025",
      time: "शाम 4:00 बजे",
      registeredUsers: 456,
      description: "पशुपालन और दूध उत्पादन में सुधार के लिए महत्वपूर्ण जानकारी",
      topics: ["पशुपालन", "डेयरी", "पशु स्वास्थ्य"],
      type: "ama",
      languages: ["Hindi", "Marathi"]
    }
  ];

  const archivedSessions = [
    {
      id: 3,
      title: "वर्मी कम्पोस्ट बनाने की विधि",
      englishTitle: "How to Make Vermi Compost",
      expert: "किशन सिंह",
      role: "जैविक कृषि विशेषज्ञ",
      date: "1 मार्च 2025",
      views: 1234,
      duration: "45 मिनट",
      topics: ["जैविक खेती", "कम्पोस्ट", "मृदा स्वास्थ्य"],
      rating: 4.8,
      languages: ["Hindi", "Gujarati"]
    },
    {
      id: 4,
      title: "फसल बीमा का लाभ कैसे लें",
      englishTitle: "How to Benefit from Crop Insurance",
      expert: "प्रीति शर्मा",
      role: "बीमा सलाहकार",
      date: "25 फरवरी 2025",
      views: 2345,
      duration: "60 मिनट",
      topics: ["फसल बीमा", "जोखिम प्रबंधन", "सरकारी योजनाएं"],
      rating: 4.9,
      languages: ["Hindi", "Punjabi"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Language Selection */}
        <div className="flex justify-end mb-4">
          <select
            className="px-4 py-2 border border-green-200 rounded-lg"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="hindi">हिंदी</option>
            <option value="marathi">मराठी</option>
            <option value="punjabi">ਪੰਜਾਬੀ</option>
            <option value="gujarati">ગુજરાતી</option>
            <option value="english">English</option>
          </select>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">विशेषज्ञों से सीखें</h1>
          <p className="text-lg text-green-600">अपने प्रश्नों के उत्तर जानें</p>
        </div>

        {/* Currently Live Session */}
        <div className="bg-green-600 text-white rounded-xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative rounded-full h-3 w-3 bg-red-500"></span>
            <span className="ml-2 font-medium">अभी लाइव</span>
          </div>
          
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">खरीफ फसल की तैयारी</h2>
              <p className="mb-4">कृषि वैज्ञानिक डॉ. राजेश कुमार के साथ</p>
              <div className="flex items-center space-x-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  247 श्रोतागण
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  भाषा: हिंदी
                </span>
              </div>
            </div>
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors duration-300">
              जुड़ें
            </button>
          </div>
        </div>

        {/* Simple Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
            onClick={() => setSelectedCategory('all')}>
            सभी विषय
          </button>
          <button className={`px-4 py-2 rounded-full ${selectedCategory === 'agriculture' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
            onClick={() => setSelectedCategory('agriculture')}>
            कृषि
          </button>
          <button className={`px-4 py-2 rounded-full ${selectedCategory === 'dairy' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
            onClick={() => setSelectedCategory('dairy')}>
            पशुपालन
          </button>
          <button className={`px-4 py-2 rounded-full ${selectedCategory === 'schemes' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
            onClick={() => setSelectedCategory('schemes')}>
            सरकारी योजनाएं
          </button>
        </div>

        {/* Upcoming Sessions */}
        <h2 className="text-2xl font-bold text-green-800 mb-6">आगामी सत्र</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {upcomingSessions.map(session => (
            <div key={session.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {session.type === 'webinar' ? 'सीधा प्रसारण' : 'प्रश्नोत्तर'}
                  </span>
                  <span className="text-gray-500">{session.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-green-800 mb-2">{session.title}</h3>
                <p className="text-gray-600 mb-4">{session.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    भाषाएं: {session.languages.join(", ")}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{session.time}</span>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                    नाम लिखाएं
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Archived Sessions */}
        <h2 className="text-2xl font-bold text-green-800 mb-6">पुराने सत्र</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {archivedSessions.map(session => (
            <div key={session.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">{session.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {session.topics.map(topic => (
                    <span key={topic} className="bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{session.duration}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      भाषाएं: {session.languages.join(", ")}
                    </span>
                  </div>
                  <button className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors duration-300">
                    देखें
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-green-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">मदद चाहिए?</h3>
          <p className="text-green-600 mb-4">कॉल करें: 1800-XXX-XXXX (टोल फ्री)</p>
          <p className="text-sm text-green-600">सुबह 9 बजे से शाम 6 बजे तक (सोमवार से शनिवार)</p>
        </div>
      </div>
    </div>
  );
};

export default QASessions;