import React, { useState, useEffect } from "react";
import {
  CircleDollarSign,
  CheckCircle2,
  ChevronDown,
  X,
  ExternalLink,
  BookOpen,
  Play,
  Eye,
  Star,
  PiggyBank,
  CreditCard,
  Save,
  Shield,
  PhoneCall,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../LandingPage/Footer/Footer";

const RoadmapWithModals = () => {
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

  // Progress calculation
  const totalTasks = steps.length * 2;
  const completedTasks = steps.reduce((acc, step) => {
    const prog = getStepProgress(step.id);
    return acc + (prog.video ? 1 : 0) + (prog.article ? 1 : 0);
  }, 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <>
      <NavBar language="en" toggleLanguage={() => {}} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 sm:px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl relative overflow-hidden">

          {/* Progress Bar */}
          <div className="px-8 pt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 font-semibold text-lg">प्रगति</span>
              <span className="text-green-700 font-semibold text-lg">{progressPercent}%</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-3xl p-10 text-white shadow-lg mt-4 animate-fadeIn">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">वित्तीय शिक्षा यात्रा</h1>
            <p className="text-green-100 text-lg">अपनी वित्तीय यात्रा को आगे बढ़ाएं और सीखें</p>
          </div>

          {/* Main Roadmap */}
          <div className="relative p-8">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-green-300 via-green-100 to-transparent rounded-full shadow-md" />
            <div className="relative space-y-20">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const stepProgress = getStepProgress(step.id);
                const isCompleted = stepProgress.video && stepProgress.article;
                const isPartial = stepProgress.video || stepProgress.article;
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="relative flex flex-col sm:flex-row items-center gap-8 group animate-fadeIn">
                    {/* Step Number & Icon */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-105
                          ${isCompleted
                            ? "bg-gradient-to-br from-green-400 to-green-600 animate-bounceIn"
                            : isPartial
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600 animate-bounceIn"
                            : "bg-gradient-to-br from-gray-300 to-gray-400"
                          }`}
                        style={{ boxShadow: "0 8px 32px 0 rgba(34,197,94,0.15)" }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-white text-green-700 px-3 py-1 rounded-full shadow border border-green-100">
                          चरण {index + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 size={40} className="drop-shadow-md animate-bounce" />
                        ) : (
                          <Icon size={40} className="drop-shadow-md group-hover:animate-pulse" />
                        )}
                      </div>
                      {isPartial && !isCompleted && (
                        <div className="absolute -bottom-3 right-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shadow-md border-2 border-white animate-bounceIn">
                          <Eye size={18} className="text-yellow-600" />
                        </div>
                      )}
                    </div>

                    {/* Step Card */}
                    <div className="flex-1 bg-gradient-to-br from-white via-green-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-green-100 p-8">
                      <h3 className="font-bold text-2xl mb-2 text-gray-800 flex items-center gap-2">
                        <Star className="text-yellow-400" size={20} /> {step.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg">{step.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => openVideo(step)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow
                            ${stepProgress.video
                              ? "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                            }`}
                        >
                          {stepProgress.video ? <CheckCircle2 size={20} /> : <Play size={20} />}
                          <span>{stepProgress.video ? "पूर्ण किया गया" : "वीडियो देखें"}</span>
                        </button>
                        <button
                          onClick={() => openArticle(step)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow
                            ${stepProgress.article
                              ? "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100"
                              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
                            }`}
                        >
                          {stepProgress.article ? <CheckCircle2 size={20} /> : <BookOpen size={20} />}
                          <span>{stepProgress.article ? "पढ़ा गया" : "लेख पढ़ें"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Timeline Arrow */}
                    {!isLast && (
                      <div className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 z-0">
                        <ChevronDown size={32} className="text-green-300 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Modal */}
          {showVideoModal && selectedContent && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border-2 border-green-200 relative">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center rounded-t-2xl bg-gradient-to-r from-green-50 to-green-100">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                    <Play className="text-blue-500" /> {selectedContent.title}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedContent.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      title="YouTube पर खोलें"
                    >
                      <ExternalLink size={24} />
                    </a>
                    <button
                      onClick={() => setShowVideoModal(false)}
                      className="text-gray-500 hover:text-red-500 transition-colors rounded-full p-1 bg-gray-100"
                      title="बंद करें"
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
                    className="rounded-b-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Modal */}
          {showArticleModal && selectedContent && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border-2 border-green-200 relative">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-green-100 rounded-t-2xl sticky top-0 z-10">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-gray-700" /> {selectedContent.title}
                  </h3>
                  <button
                    onClick={() => setShowArticleModal(false)}
                    className="text-gray-500 hover:text-red-500 transition-colors rounded-full p-1 bg-gray-100"
                    title="बंद करें"
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
                        <h4 className="text-2xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                          <Star className="text-yellow-400" size={18} /> {section.title}
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
                              <span className="text-gray-700 text-lg">{point}</span>
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
      </div>
      <Footer />
    </>
  );
};

export default RoadmapWithModals;