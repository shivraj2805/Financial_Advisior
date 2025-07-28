import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  BookOpen,
  Users,
  Shield,
  BadgeDollarSign,
  Play,
  Pause,
  ArrowUpRight,
  User,
  Briefcase,
  GraduationCap,
  Map,
  Newspaper,
  Calculator,
  UserCheck,
  Award,
  Book,
  Compass,
  Newspaper as News,
  Calculator as Calc,
  BadgeSwissFranc, 
  FileText, 
  Bot,
  Receipt // Added Receipt icon for expense tracker
} from "lucide-react";

import Features from "../components/Features";
import NavBar from "../components/NavBar"; // Import NavBar
import Footer from "../components/Footer";
import "../LandingPage/Hero/Hero.css";

const translations = {
  en: {
    nav: {
      home: "Home",
      features: "Features",
      community: "Community",
      learning: "Learning",
      contact: "Contact",
    },
    hero: {
      title: "Smart Financial Planning for Your Future",
      subtitle:
        "Expert guidance, micro-investments, and government schemes all in one place",
      cta: "Get Started",
    },
    features: {
      title: "Why Choose Us",
      description:
        "Discover the tools and resources that make us your ideal partner in your journey to success.",
      items: [
        {
          title: "Financial Advisor - Chatbot",
          description: "Get personalized financial advice from our AI-powered chatbot",
          link: "/advisor",
          icon: Bot,
        },
        {
          title: "Learning Center",
          description: "Access courses and educational content",
          link: "/learn",
          icon: BookOpen,
        },
        {
          title: "Roadmap",
          description: "Explore a tailored roadmap to financial success",
          link: "/road",
          icon: Map,
        },
        {
          title: "Expense Tracker", // Added expense tracker
          description: "Track and manage your daily expenses with smart categorization and budget insights",
          link: "/expenses",
          icon: Receipt,
        },
        {
          title: "Microinvestment Opportunities",
          description: "Explore the latest investment opportunities for small investors",
          link: "/mip",
          icon: BadgeDollarSign,
        },
        {
          title: "Rural Business Opportunities",
          description: "Explore business opportunities in rural India",
          link: "/rural",
          icon: Briefcase,
        },
        {
          title: "Schemes & Benefits",
          description: "View and manage detailed government schemes and benefits",
          link: "/scheme",
          icon: Shield,
        },
        {
          title: "Community",
          description: "Join the community to discuss and share ideas with other users",
          link: "/community",
          icon: Users,
        },
        {
          title: "QnA Sessions",
          description: "Participate in live QnA sessions with financial experts",
          link: "/qna",
          icon: GraduationCap,
        },
        {
          title: "Success Stories",
          description: "Read inspiring stories of individuals who have overcome adversity",
          link: "/stories",
          icon: Award,
        },
        {
          title: "Women's Portal",
          description: "Empowering women through financial independence and support",
          link: "/womens",
          icon: Users,
        },
        {
          title: "OCR Based Finance Doc Reading",
          description: "Scan and understand financial documents with AI-powered OCR",
          link: "/ocr",
          icon: FileText,
        },
      ]
    },
    successStories: {
      title: "Success Stories of the Underprivileged",
      subtitle: "Inspiring journeys of overcoming adversity",
      steps: [
        {
          title: "Rising from Poverty",
          description:
            "A story of determination and hard work leading to financial stability",
          icon: "🌟",
          youtubeId: "zZ-VeqYPxoA",
        },
        {
          title: "Empowering Women",
          description:
            "How micro-financing helped women start their own businesses",
          icon: "👩‍💼",
          youtubeId: "i9UYbJ2xMTI",
        },
        {
          title: "Education for All",
          description: "Providing education to children in impoverished areas",
          icon: "📚",
          youtubeId: "VILohre4Q6w",
        },
        {
          title: "Community Support",
          description:
            "Building a support network to uplift entire communities",
          icon: "🤝",
          youtubeId: "EsrJ_NKBkww",
        },
        {
          title: "Community Support",
          description:
            "Building a support network to uplift entire communities",
          icon: "🤝",
          youtubeId: "EsrJ_NKBkww",
        },
      ],
    },
    businessIdeas: {
      title: "Trending Business Ideas",
      subtitle: "Scroll to explore opportunities",
      ideas: [
        {
          title: "Poultry Farming",
          description: "Start your own chicken and egg production farm",
          icon: "🐔",
        },
        {
          title: "Local Grocery Store",
          description: "Set up a store for essential food and household items",
          icon: "🛒",
        },
        {
          title: "Fishery Business",
          description: "Raise and sell fish for local and regional markets",
          icon: "🐟",
        },
        {
          title: "Organic Farming",
          description: "Cultivate and sell organic fruits and vegetables",
          icon: "🥦",
        },
        {
          title: "Dairy Farming",
          description: "Produce milk and other dairy products",
          icon: "🐄",
        },
        {
          title: "Handicrafts",
          description: "Make and sell handmade goods like baskets and pottery",
          icon: "🎨",
        },
      ],
    },
  },
  hi: {
    nav: {
      home: "होम",
      features: "सुविधाएं",
      community: "समुदाय",
      learning: "शिक्षा",
      contact: "संपर्क",
    },
    hero: {
      title: "आपके भविष्य के लिए स्मार्ट वित्तीय योजना",
      subtitle:
        "विशेषज्ञ मार्गदर्शन, माइक्रो-निवेश और सरकारी योजनाएं एक ही जगह पर",
      cta: "शुरू करें",
    },
    features: {
      title: "हमें क्यों चुनें",
      description:
        "सफलता की यात्रा में आपका आदर्श साथी बनने के लिए हमारे उपकरण और संसाधनों की खोज करें।",
      items: [
        {
          title: "वित्तीय सलाहकार - चैटबॉट",
          description: "हमारे AI-संचालित चैटबॉट से व्यक्तिगत वित्तीय सलाह प्राप्त करें",
          link: "/advisor",
          icon: Bot,
        },
        {
          title: "लर्निंग सेंटर",
          description: "पाठ्यक्रमों और शैक्षिक सामग्री तक पहुंचें",
          link: "/learn",
          icon: BookOpen,
        },
        {
          title: "रोडमैप",
          description: "वित्तीय सफलता के लिए एक अनुकूलित रोडमैप का अन्वेषण करें",
          link: "/road",
          icon: Map,
        },
        {
          title: "व्यय ट्रैकर", // Added expense tracker in Hindi
          description: "स्मार्ट वर्गीकरण और बजट अंतर्दृष्टि के साथ अपने दैनिक खर्चों को ट्रैक और प्रबंधित करें",
          link: "/expenses",
          icon: Receipt,
        },
        {
          title: "माइक्रोइन्वेस्टमेंट अवसर",
          description: "छोटे निवेशकों के लिए नवीनतम निवेश अवसरों का अन्वेषण करें",
          link: "/mip",
          icon: BadgeDollarSign,
        },
        {
          title: "ग्रामीण व्यापार अवसर",
          description: "ग्रामीण भारत में व्यापारिक अवसरों का अन्वेषण करें",
          link: "/rural",
          icon: Briefcase,
        },
        {
          title: "योजनाएं और लाभ",
          description: "विस्तृत सरकारी योजनाओं और लाभों को देखें और प्रबंधित करें",
          link: "/scheme",
          icon: Shield,
        },
        {
          title: "समुदाय",
          description: "अन्य उपयोगकर्ताओं के साथ विचार चर्चा करने और साझा करने के लिए समुदाय में शामिल हों",
          link: "/community",
          icon: Users,
        },
        {
          title: "प्रश्नोत्तर सत्र",
          description: "वित्तीय विशेषज्ञों के साथ लाइव प्रश्नोत्तर सत्रों में भाग लें",
          link: "/qna",
          icon: GraduationCap,
        },
        {
          title: "सफलता की कहानियां",
          description: "उन व्यक्तियों की प्रेरणादायक कहानियां पढ़ें जिन्होंने प्रतिकूलता पर विजय पाई है",
          link: "/stories",
          icon: Award,
        },
        {
          title: "महिला पोर्टल",
          description: "वित्तीय स्वतंत्रता और समर्थन के माध्यम से महिलाओं को सशक्त बनाना",
          link: "/womens",
          icon: Users,
        },
        {
          title: "OCR आधारित वित्त दस्तावेज़ पठन",
          description: "AI-संचालित OCR के साथ वित्तीय दस्तावेज़ों को स्कैन और समझें",
          link: "/ocr",
          icon: FileText,
        },
      ],
    },
    successStories: {
      title: "सफलता की यात्रा",
      subtitle: "हमारी चरण-दर-चरण प्रक्रिया",
      steps: [
        {
          title: "खोज और व्यक्तिगतकरण",
          description: "हम आपके वित्तीय लक्ष्यों का विश्लेषण करते हैं",
          icon: "🎯",
        },
        {
          title: "डिज़ाइन में साझेदार",
          description: "हम साथ मिलकर आपकी निवेश रणनीति बनाते हैं",
          icon: "🤝",
        },
        {
          title: "कार्यान्वयन",
          description: "विशेषज्ञ मार्गदर्शन के साथ योजना को लागू करें",
          icon: "⚡",
        },
        {
          title: "निरंतर विकास",
          description: "नियमित निगरानी और अनुकूलन",
          icon: "📈",
        },
      ],
    },
    businessIdeas: {
      title: "ट्रेंडिंग बिजनेस आइडियाज",
      subtitle: "अवसरों की खोज करें",
      ideas: [
        {
          title: "डिजिटल मार्केटिंग",
          description: "अपनी डिजिटल मार्केटिंग एजेंसी शुरू करें",
          icon: "📱",
        },
        {
          title: "ई-लर्निंग प्लेटफॉर्म",
          description: "ऑनलाइन कोर्स बनाएं और बेचें",
          icon: "🎓",
        },
        {
          title: "फिनटेक सॉल्यूशंस",
          description: "वित्तीय तकनीक उत्पाद विकसित करें",
          icon: "💳",
        },
        {
          title: "ग्रीन बिजनेस",
          description: "स्थायी और पर्यावरण अनुकूल उद्यम",
          icon: "🌱",
        },
        {
          title: "हेल्थ टेक",
          description: "स्वास्थ्य तकनीक समाधान",
          icon: "⚕️",
        },
        {
          title: "ई-कॉमर्स",
          description: "ऑनलाइन खुदरा और मार्केटप्लेस",
          icon: "🛍️",
        },
      ],
    },
  },
};

const SuccessStoryTimeline = ({ steps }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-8 mb-16 relative`}
        >
          {/* Timeline connector */}
          <div className="hidden md:block absolute h-full w-0.5 bg-green-200 left-1/2 transform -translate-x-1/2 -z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-green-400 rounded-full border-4 border-white shadow" />
          </div>

          {/* YouTube Video Container */}
          <div className="w-full md:w-1/2 relative">
            <div
              className="relative rounded-xl overflow-hidden shadow-lg"
              style={{ height: "315px" }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${step.youtubeId}?start=1&autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="backdrop-blur-sm bg-white/50 rounded-xl p-6">
              {/* Step Number */}
              <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4">
                Step {index + 1}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {step.description}
              </p>

              <div className="pt-4 border-t border-gray-100/20">
                <p className="text-gray-500 text-sm">{step.extraDescription}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BusinessIdeasScroll = ({ ideas }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const scrollAmount = 4; // Increased scroll speed
    let scrollInterval;

    if (container) {
      scrollInterval = setInterval(() => {
        container.scrollBy({
          left: scrollAmount,
          behavior: "auto", // Changed to auto for smoother continuous scrolling
        });

        // Reset scroll position to the start if at the end
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({ left: 0 });
        }
      }, 20); // Reduced interval for smoother animation
    }

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Left blur gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-br from-green-50 to-white z-10"></div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-6 px-12 py-6 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Double the items for seamless infinite scroll */}
        {[...ideas, ...ideas].map((idea, index) => (
          <div
            key={index}
            className="flex-none w-72 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="text-4xl mb-4 block">{idea.icon}</span>
            <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
              {idea.title}
              <ArrowUpRight className="h-4 w-4" />
            </h3>
            <p className="text-green-600 text-center">{idea.description}</p>
          </div>
        ))}
      </div>

      {/* Right blur gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
};

const SNAKE_LENGTH = 18;

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  // Cursor and snake trail logic
  const cursorRef = useRef(null);
  const snakeTrailRef = useRef(Array(SNAKE_LENGTH).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
  const [snakeTrail, setSnakeTrail] = useState(snakeTrailRef.current);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrame;
    const moveCursor = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (cursor) {
        cursor.style.left = mouse.x + "px";
        cursor.style.top = mouse.y + "px";
      }
    };
    const animateSnake = () => {
      setSnakeTrail((prev) => {
        const newTrail = [...prev];
        newTrail[0] = { ...mouse };
        for (let i = 1; i < SNAKE_LENGTH; i++) {
          newTrail[i] = {
            x: newTrail[i].x + (newTrail[i - 1].x - newTrail[i].x) * 0.5,
            y: newTrail[i].y + (newTrail[i - 1].y - newTrail[i].y) * 0.5,
          };
        }
        return newTrail;
      });
      animationFrame = requestAnimationFrame(animateSnake);
    };
    animateSnake();
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // SVG lines for snake effect
  const lines = [];
  for (let i = 1; i < snakeTrail.length; i++) {
    const p1 = snakeTrail[i - 1];
    const p2 = snakeTrail[i];
    lines.push(
      <line
        key={i}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="url(#snake-gradient)"
        strokeWidth={16 - i * 0.7}
        opacity={0.10 + 0.4 * (1 - i / SNAKE_LENGTH)}
        strokeLinecap="round"
        className="snake-line"
      />
    );
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <NavBar language={language} toggleLanguage={toggleLanguage} t={t.nav} />{" "}
        {/* Use NavBar */}
        <header className="text-center pt-24">
          <h1 className="text-4xl font-bold text-green-800">{t.hero.title}</h1>
          <p className="mt-4 text-green-600">{t.hero.subtitle}</p>
        </header>
        <Features t={t.features} />
        <section className="py-12 bg-white text-center">
          <h2 className="text-2xl font-bold text-green-800">
            {t.businessIdeas.title}
          </h2>
          <p className="mt-2 text-green-600">{t.businessIdeas.subtitle}</p>
          <BusinessIdeasScroll ideas={t.businessIdeas.ideas} />
        </section>
        <section className="py-12 bg-gradient-to-br from-green-100 to-green-50">
          <h2 className="text-2xl font-bold text-green-800 text-center">
            {t.successStories.title}
          </h2>
          <p className="mt-2 text-green-600 text-center">
            {t.successStories.subtitle}
          </p>
          <SuccessStoryTimeline steps={t.successStories.steps} />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;