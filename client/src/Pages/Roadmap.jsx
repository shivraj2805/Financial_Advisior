import React, { useState, useEffect } from "react";
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  Landmark,
  CheckCircle2,
  ChevronDown,
  X,
  ExternalLink,
  BookOpen,
  Play,
  Eye,
  BarChart,
  Calendar,
  Star, PiggyBank, CreditCard, Save, Shield, PhoneCall
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const RoadmapWithModals = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("learningProgress");
    return saved ? JSON.parse(saved) : {};
  });

  const steps = [
    {
      id: 1,
      title: "बुनियादी वित्तीय जानकारी",
      icon: CircleDollarSign,
      description: "पैसे को सही तरीके से संभालने और बचत करने की समझ हासिल करें",
      videoId: "WN9Mks1s4tM",
      article: {
        intro: "पैसे को सही तरीके से संभालने की बुनियादी जानकारी लें।",
        sections: [
          {
            title: "आय और खर्च को समझना",
            content: "अपनी आय और खर्चों का सही तरीके से हिसाब रखें।",
            points: [
              "मासिक आय और खर्चों की लिस्ट बनाएं",
              "थोड़ी-थोड़ी बचत करें, जैसे ₹10 रोज़"
            ],
          },
          {
            title: "बैंकिंग के फायदे",
            content: "बैंक खाता खोलने और बैंकिंग सेवाओं का उपयोग करने के लाभ जानें।",
            points: [
              "साधारण बचत खाता खोलें",
              "नकद जमा और निकासी के तरीके सीखें"
            ],
          },
        ],
      },
    },
    {
      id: 2,
      title: "बैंक खाता खोलना",
      icon: PiggyBank,
      description: "अपने पैसे को सुरक्षित रखने के लिए बैंक खाता खोलें",
      videoId: "abc67890",
      article: {
        intro: "बैंक खाता खोलने के बाद, सेविंग्स और निवेश के विकल्पों को जानें।",
        sections: [
          {
            title: "सावधनी जमा और एफडी",
            content: "बैंक में पैसे जमा करना और सुरक्षित निवेश के बारे में समझें।",
            points: [
              "फिक्स्ड डिपॉजिट और आरडी के बारे में जानें",
              "बैंक में पैसा जमा करना सीखें"
            ],
          },
        ],
      },
    },
    {
      id: 3,
      title: "ऋण और क्रेडिट को समझना",
      icon: CreditCard,
      description: "ऋण और क्रेडिट का सही उपयोग करें और समय पर चुकौती करें",
      videoId: "def11223",
      article: {
        intro: "ऋण का सही उपयोग और चुकौती की अहमियत को समझें।",
        sections: [
          {
            title: "अच्छे और बुरे ऋण का अंतर",
            content: "ऋण का उपयोग सही जगह पर करें।",
            points: [
              "कृषि, व्यवसाय या शिक्षा के लिए ऋण लें",
              "अनौपचारिक ऋण से बचें"
            ],
          },
        ],
      },
    },
    {
      id: 4,
      title: "आपातकालीन फंड और भविष्य के लिए बचत",
      icon: Save,
      description: "आपातकाल और भविष्य के लिए पैसे बचाने और निवेश करने की आदत डालें",
      videoId: "ghi45678",
      article: {
        intro: "आपातकाल और भविष्य के लिए धन सुरक्षित करने की महत्वता समझें।",
        sections: [
          {
            title: "आपातकालीन फंड बनाना",
            content: "अचानक होने वाली समस्याओं के लिए पैसे बचाएं।",
            points: [
              "जरूरी खर्चों के लिए बचत करना शुरू करें",
              "नियमित जमा करें"
            ],
          },
        ],
      },
    },
    {
      id: 5,
      title: "बीमा और सुरक्षित निवेश",
      icon: Shield,
      description: "स्वास्थ्य, जीवन और फसल बीमा के महत्व को जानें और सुरक्षित निवेश करें",
      videoId: "jkl78901",
      article: {
        intro: "बीमा और सुरक्षित निवेश के बारे में जानकारी प्राप्त करें।",
        sections: [
          {
            title: "स्वास्थ्य और जीवन बीमा",
            content: "बीमा से परिवार को सुरक्षा मिलती है।",
            points: [
              "सरकारी बीमा योजनाओं में शामिल हों",
              "कृषि बीमा के विकल्प देखें"
            ],
          },
        ],
      },
    },
    {
      id: 6,
      title: "डिजिटल टूल का इस्तेमाल",
      icon: PhoneCall,
      description: "मोबाइल बैंकिंग और ऑनलाइन भुगतान के जरिए लेन-देन करना सीखें",
      videoId: "mno34567",
      article: {
        intro: "डिजिटल टूल्स के साथ सुरक्षित लेन-देन करना सीखें।",
        sections: [
          {
            title: "मोबाइल बैंकिंग और यूपीआई",
            content: "डिजिटल प्लेटफार्म पर पैसे भेजना और प्राप्त करना सीखें।",
            points: [
              "गूगल पे या पेटीएम जैसी ऐप्स पर ट्रांजैक्शन करें",
              "ऑनलाइन धोखाधड़ी से बचें"
            ],
          },
        ],
      },
    },
  ];
  
  useEffect(() => {
    localStorage.setItem("learningProgress", JSON.stringify(progress));
  }, [progress]);

  const markComplete = (stepId, type) => {
    setProgress((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [type]: true,
      },
    }));
  };

  const getStepProgress = (stepId) => {
    const stepProgress = progress[stepId] || {};
    return {
      video: stepProgress.video || false,
      article: stepProgress.article || false,
    };
  };

  const openVideo = (step) => {
    setSelectedContent(step);
    setShowVideoModal(true);
    markComplete(step.id, "video");
  };

  const openArticle = (step) => {
    setSelectedContent(step);
    setShowArticleModal(true);
    markComplete(step.id, "article");
  };

  return (
    <>
      <NavBar language="en" toggleLanguage={() => {}} /> {/* Use NavBar */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-24 px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl relative">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">वित्तीय शिक्षा यात्रा</h1>
            <p className="text-green-100">
              अपनी वित्तीय यात्रा को आगे बढ़ाएं और सीखें
            </p>
          </div>

          {/* Main Roadmap */}
          <div className="relative p-8">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-200 via-green-100 to-transparent" />
            <div className="relative space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const stepProgress = getStepProgress(step.id);
                const isCompleted = stepProgress.video && stepProgress.article;
                const isPartial = stepProgress.video || stepProgress.article;
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="relative">
                    <div className="flex items-center gap-8">
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center text-white transform transition-all duration-300 hover:scale-110 shadow-lg ${
                            isCompleted
                              ? "bg-gradient-to-br from-green-400 to-green-600"
                              : isPartial
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-br from-gray-300 to-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2
                              size={36}
                              className="drop-shadow-md"
                            />
                          ) : (
                            <Icon size={36} className="drop-shadow-md" />
                          )}
                        </div>
                        {isPartial && !isCompleted && (
                          <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                            <Eye size={18} className="text-yellow-600" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                        <div className="p-6">
                          <h3 className="font-bold text-2xl mb-3 text-gray-800">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-6 text-lg">
                            {step.description}
                          </p>
                          <div className="flex gap-4">
                            <button
                              onClick={() => openVideo(step)}
                              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                                stepProgress.video
                                  ? "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100"
                                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                              }`}
                            >
                              {stepProgress.video ? (
                                <CheckCircle2 size={20} />
                              ) : (
                                <Play size={20} />
                              )}
                              <span className="font-medium">
                                {stepProgress.video
                                  ? "पूर्ण किया गया"
                                  : "वीडियो देखें"}
                              </span>
                            </button>
                            <button
                              onClick={() => openArticle(step)}
                              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                                stepProgress.article
                                  ? "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100"
                                  : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-md hover:shadow-lg"
                              }`}
                            >
                              {stepProgress.article ? (
                                <CheckCircle2 size={20} />
                              ) : (
                                <BookOpen size={20} />
                              )}
                              <span className="font-medium">
                                {stepProgress.article
                                  ? "पढ़ा गया"
                                  : "लेख पढ़ें"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isLast && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-8">
                        <ChevronDown size={28} className="text-green-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {showVideoModal && selectedContent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-2xl text-gray-800">
                  {selectedContent.title}
                </h3>
                <div className="flex gap-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedContent.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={24} />
                  </a>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="text-gray-500 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedContent.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Article Modal */}
        {showArticleModal && selectedContent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="font-bold text-2xl text-gray-800">
                  {selectedContent.title}
                </h3>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="text-gray-500 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto max-h-[calc(80vh-5rem)]">
                <div className="prose max-w-none">
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {selectedContent.article.intro}
                  </p>
                  {selectedContent.article.sections.map((section, idx) => (
                    <div key={idx} className="mb-10">
                      <h4 className="text-2xl font-semibold mb-4 text-gray-800">
                        {section.title}
                      </h4>
                      <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                        {section.content}
                      </p>
                      <ul className="space-y-4">
                        {section.points.map((point, pidx) => (
                          <li key={pidx} className="flex items-start gap-3">
                            <div className="mt-2">
                              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                            </div>
                            <span className="text-gray-700 text-lg">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RoadmapWithModals;
