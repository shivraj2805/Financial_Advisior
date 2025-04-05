import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Globe, Store, Utensils, Scissors, 
  Leaf, Fish, Phone, Bike, Factory, 
  Truck, Coffee, Brush, Milk, Drumstick, 
  Egg
} from 'lucide-react';



const RuralBusinessOpportunities = () => {
  const [language, setLanguage] = useState('hi');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const translations = {
    hi: {
      title: "ग्रामीण व्यवसाय अवसर",
      description: "आपके क्षेत्र के लिए उपयुक्त व्यवसाय विकल्पों की खोज करें",
      categories: {
        all: "सभी श्रेणियां",
        agriculture: "कृषि व्यवसाय",
        retail: "खुदरा व्यवसाय",
        services: "सेवाएं",
        manufacturing: "उत्पादन"
      }
    },
    en: {
      title: "Rural Business Opportunities",
      description: "Explore business options suitable for your area",
      categories: {
        all: "All Categories",
        agriculture: "Agricultural Business",
        retail: "Retail Business",
        services: "Services",
        manufacturing: "Manufacturing"
      }
    }
  };

  const businessIdeas = [
    { title: { hi: "मुर्गी पालन", en: "Poultry Farming" }, category: "agriculture", icon: <Egg /> },
    { title: { hi: "डेयरी फार्मिंग", en: "Dairy Farming" }, category: "agriculture", icon: <Milk /> },
    { title: { hi: "किराना दुकान", en: "Grocery Shop" }, category: "retail", icon: <Store /> },
    { title: { hi: "बकरी पालन", en: "Goat Farming" }, category: "agriculture", icon: <Drumstick /> },
    { title: { hi: "सब्जी की खेती", en: "Vegetable Farming" }, category: "agriculture", icon: <Leaf /> },
    { title: { hi: "मछली पालन", en: "Fish Farming" }, category: "agriculture", icon: <Fish /> },
    { title: { hi: "सिलाई की दुकान", en: "Tailoring Shop" }, category: "services", icon: <Scissors /> },
    { title: { hi: "ब्यूटी पार्लर", en: "Beauty Parlour" }, category: "services", icon: <Scissors /> },
    { title: { hi: "मोबाइल रिपेयर", en: "Mobile Repair Shop" }, category: "services", icon: <Phone /> },
    { title: { hi: "साइकिल रिपेयर", en: "Cycle Repair Shop" }, category: "services", icon: <Bike /> },
    { title: { hi: "मधुमक्खी पालन", en: "Bee-Keeping" }, category: "agriculture", icon: <Leaf /> },
    { title: { hi: "जैविक खाद उत्पादन", en: "Organic Fertilizer Production" }, category: "manufacturing", icon: <Factory /> },
    { title: { hi: "पापड़ और अचार", en: "Papad and Pickle Making" }, category: "manufacturing", icon: <Utensils /> },
    { title: { hi: "चाय की दुकान", en: "Tea Shop" }, category: "retail", icon: <Coffee /> },
    { title: { hi: "हस्तशिल्प", en: "Handicrafts" }, category: "manufacturing", icon: <Brush /> },
    { title: { hi: "सोलर पैनल", en: "Solar Panel Installation" }, category: "services", icon: <Factory /> },
    { title: { hi: "बीज और खाद की दुकान", en: "Seed and Fertilizer Store" }, category: "retail", icon: <Store /> },
    { title: { hi: "पशु आहार व्यवसाय", en: "Animal Feed Business" }, category: "manufacturing", icon: <Factory /> },
    { title: { hi: "परिवहन सेवा", en: "Transport Service" }, category: "services", icon: <Truck /> }
  ];

  const filteredBusinessIdeas = activeCategory === 'all'
    ? businessIdeas
    : businessIdeas.filter(business => business.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-gray-900 font-bold text-xl">RuralVentures</div>
          <button 
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600 text-sm">
              {language === 'hi' ? 'English' : 'हिंदी'}
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl ">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent py-2">
              {translations[language].title}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            {translations[language].description}
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(translations[language].categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Business Ideas Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
    {businessIdeas.map((business, index) => (
      <div
        key={index}
         className="group bg-gradient-to-br from-emerald-50 via-green-100 to-white rounded-xl hover:translate-y-[-6px] transition-all duration-500 hover:shadow-[0_30px_50px_-12px_rgba(16,185,129,0.12)] shadow-xl"
      >
        <div className="p-8 pb-6" onClick={()=> navigate('/poultry')}> {/* Increased padding */}
          <div className="flex items-start space-x-6 mb-3"> {/* Increased space */}
            <div className="p-4 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-all duration-500">
              {React.cloneElement(business.icon, { 
                className: 'w-8 h-8 text-emerald-600'  // Increased icon size
              })}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 p-2"> {/* Increased font size */}
                {business.title[language]}
              </h3>
              <p className="text-sm text-gray-500 pl-2">
                {translations[language].categories[business.category]}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2" />
          </div>
        </div>
      </div>
    ))}
  </div>
</main>


      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 RuralVentures
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RuralBusinessOpportunities; 