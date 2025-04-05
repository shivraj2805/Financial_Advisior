import React, { useState, useRef, useEffect } from 'react';
import { Mic, User, Bot, Volume2, ChevronDown, ChevronRight } from 'lucide-react';



const summaryData = 
{
    "Feasibility Analysis": {
      title: "Feasibility Analysis",
      content: {
        type: "sections",
        sections: [
          {
            title: "Current Assets",
            items: [
              "2 cows already owned",
              "Daily milk production: 15 liters (7.5 liters per cow)",
              "Available land for fodder growing",
              "Basic shed infrastructure possible"
            ]
          },
          {
            title: "Key Challenges",
            items: [
              "Limited initial production scaling",
              "Storage optimization needed",
              "Market access management",
              "Waste minimization requirements"
            ]
          }
        ]
      }
    },
    "Estimated Investment": {
      title: "Estimated Investment Breakdown",
      content: {
        type: "table",
        headers: ["Expense Category", "Cost (₹)"],
        rows: [
          ["Fodder and feed (3 months)", "7,500"],
          ["Shed construction/repair", "10,000"],
          ["Milking equipment", "5,000"],
          ["Storage (small milk cans)", "2,500"],
          ["Miscellaneous (transport, etc.)", "3,000"],
          ["Total Initial Investment", "28,000"]
        ]
      }
    },
    "Profitability": {
      title: "Profitability Analysis",
      content: {
        type: "multi",
        sections: [
          {
            type: "metrics",
            title: "Daily Operations",
            metrics: [
              { label: "Milk Production", value: "15 liters/day" },
              { label: "Price per Liter", value: "₹40" },
              { label: "Daily Revenue", value: "₹600" }
            ]
          },
          {
            type: "table",
            title: "Monthly Financial Overview",
            headers: ["Category", "Amount (₹)"],
            rows: [
              ["Monthly Revenue", "18,000"],
              ["Fodder Cost", "-2,500"],
              ["Misc. Expenses", "-1,000"],
              ["Net Monthly Profit", "14,500"]
            ]
          }
        ]
      }
    },
    "Risk Management": {
      title: "Risk Management Strategy",
      content: {
        type: "cards",
        items: [
          {
            title: "Insurance Coverage",
            description: "Comprehensive livestock insurance to cover illness and mortality risks",
            action: "Get insurance quotes from local providers"
          },
          {
            title: "Health Management",
            description: "Regular veterinary checkups and preventive care schedule",
            action: "Schedule monthly vet visits"
          },
          {
            title: "Income Diversification",
            description: "Additional revenue from by-products (manure, biogas)",
            action: "Explore local by-product markets"
          },
          {
            title: "Emergency Planning",
            description: "Maintain ₹10,000 emergency fund for unexpected expenses",
            action: "Set up separate emergency account"
          }
        ]
      }
    },
    "Financing Options": {
    title: "Financing Options",
    content: {
      type: "cards",
      items: [
        {
          title: "NABARD Dairy Loans",
          description: "Special loan schemes for small dairy farmers",
          details: [
            "Interest rate: 6-12% annually",
            "Repayment period: 3-5 years"
          ]
        },
        {
          title: "Government Subsidies (DEDS)",
          description: "Dairy Entrepreneurship Development Scheme",
          details: [
            "Up to 25-33% subsidy on investment costs"
          ]
        },
        {
          title: "Cooperative Memberships",
          description: "Join local dairy cooperatives for support",
          details: [
            "Partners: Amul, Mother Dairy",
            "Benefits: Guaranteed milk sales"
          ]
        },
        {
          title: "Microfinance Options",
          description: "Alternative financing through MFIs",
          details: [
            "Small loans with flexible terms",
            "Higher interest rates than banks"
          ]
        },
        {
          title: "Personal Savings Plan",
          description: "Strategic use of existing savings",
          details: [
            "Allocate ₹20,000 from savings",
            "Maintain ₹10,000 emergency fund"
          ]
        }
      ]
    }
  },
  };
  

const questions = [
    { id: 4, text: "What is your primary source of income?", type: "options", options: ["Farming", "Shopkeeping", "Daily wage work", "Other (specify in voice)"], hasVoice: true, voicePrompt: "Say your source aloud if not listed." },
    { id: 5, text: "How much do you earn monthly from this source?", type: "options", options: ["Less than ₹5,000", "₹5,000–₹10,000", "₹10,000–₹20,000", "Above ₹20,000"], hasVoice: true, voicePrompt: "Or say the exact amount you earn." },
    { id: 6, text: "Do you have other sources of income, like seasonal crops or small businesses?", type: "options", options: ["Yes", "No"] },
    { id: 7, text: "If yes, what are these sources, and how much do you earn from each?", type: "voice", voicePrompt: "Please describe your additional income sources." },
    { id: 8, text: "How much do you spend monthly on household expenses like food, education, and electricity?", type: "options", options: ["Less than ₹5,000", "₹5,000–₹10,000", "₹10,000–₹15,000", "Above ₹15,000"], hasVoice: true, voicePrompt: "Or specify the amount aloud." },
    { id: 9, text: "Do you have any monthly loan repayments?", type: "options", options: ["Yes", "No"] },
    { id: 10, text: "If yes, please specify the loan type, monthly EMI, and tenure.", type: "voice", voicePrompt: "Describe the loan details aloud." },
    { id: 11, text: "Are there any irregular expenses like festivals or family functions?", type: "options", options: ["Yes", "No"] },
    { id: 12, text: "If yes, what is the approximate annual cost of these expenses?", type: "voice", voicePrompt: "Say the estimated cost aloud." },
    { id: 13, text: "What assets do you own? (Choose all that apply)", type: "options", options: ["Agricultural land", "Tractor", "Livestock", "Jewelry", "Other (specify in voice)"], hasVoice: true, voicePrompt: "Say your assets aloud if not listed." },
    { id: 14, text: "Do you have any savings?", type: "options", options: ["Savings account", "Cash at home", "Fixed deposits", "Other (specify in voice)"] },
    { id: 15, text: "If yes, how much is the total amount of your savings?", type: "voice", voicePrompt: "Say the total amount of your savings aloud." },
    { id: 16, text: "Do you have any outstanding loans?", type: "options", options: ["Yes", "No"] },
    { id: 17, text: "If yes, please specify the loan type, amount, interest rate, and remaining tenure.", type: "voice", voicePrompt: "Describe your loans aloud." },
    { id: 18, text: "Are there challenges in paying back these loans?", type: "options", options: ["Yes", "No"] },
    { id: 19, text: "If yes, please describe the challenges.", type: "voice", voicePrompt: "Say the challenges aloud." },
    { id: 20, text: "What are your short-term financial goals (like repairs, seeds, or equipment)?", type: "voice", voicePrompt: "Say your short-term goals aloud." },
    { id: 21, text: "What are your long-term financial goals (like saving for education, starting a new business)?", type: "voice", voicePrompt: "Say your long-term goals aloud." },
    { id: 22, text: "Please Ask your question. In what regards do you need our advice?", type: "options", type: "voice", voicePrompt: "In what regard do you want our advice aloud."  },
  ];

const Chatbot = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  

  
  const [showSummary, setShowSummary] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const stopRecording = () => {
    const option = "Answer recorded";
      setResponses([...responses, { question: questions[currentQuestion].text, answer: option }]);
      setIsRecording(false);

      if (currentQuestion < questions.length ) {
        setCurrentQuestion(currentQuestion + 1);
      }
      if(currentQuestion === questions.length - 1) {
        setShowSummary(true);
      }
    
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses, currentQuestion]);

  const handleOptionSelect = (option) => {
    setResponses([...responses, { question: questions[currentQuestion].text, answer: option }]);
    if (currentQuestion < questions.length ) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if(currentQuestion === questions.length - 1) {
      setShowSummary(true);
    }
  };

  const startVoiceRecording = () => {
    
      setIsRecording(true);
    
  
    
  
   
  };
  

  const VoiceRecordingAnimation = () => (
    <div className="flex items-center justify-center space-x-3">
      <div className="relative">
        <div className={`absolute inset-0 bg-green-400 rounded-full animate-ping ${isRecording ? 'opacity-75' : 'opacity-0'}`}></div>
        <div className={`relative w-3 h-3 bg-green-500 rounded-full ${isRecording ? 'animate-pulse' : ''}`}></div>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-1 bg-green-500 rounded-full transform origin-bottom transition-all duration-300 ${
              isRecording ? `h-${Math.random() > 0.5 ? '4' : '6'} animate-bounce` : 'h-1'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
  const TableView = ({ headers, rows, title }) => (
    <div className="overflow-x-auto">
      {title && <h4 className="text-green-800 font-medium mb-2">{title}</h4>}
      <table className="w-full text-m">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="text-left p-2 bg-green-50 border-b-2 border-green-100">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}>
              {row.map((cell, cellIdx) => (
                <td 
                  key={cellIdx} 
                  className={`p-2 ${
                    idx === rows.length - 1 ? 'font-semibold text-green-800' : ''
                  }`}
                >
                  {cellIdx === 1 && cell !== "Amount (₹)" ? `₹${cell}` : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const MetricsView = ({ metrics, title }) => (
    <div className="mb-4">
      {title && <h4 className="text-green-800 font-medium mb-2">{title}</h4>}
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-green-600">{metric.label}</div>
            <div className="text-lg font-semibold text-green-800">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const CardsView = ({ items }) => (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg border-2 border-green-100 hover:border-green-200 transition-colors">
          <h4 className="text-green-800 font-medium mb-2">{item.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
          {item.details && (
            <ul className="space-y-1">
              {item.details.map((detail, detailIdx) => (
                <li key={detailIdx} className="flex items-start space-x-2 text-sm">
                  <div className="w-1 h-1 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          )}
          {item.action && (
            <div className="text-green-600 text-sm font-medium mt-2">{item.action}</div>
          )}
        </div>
      ))}
    </div>
  );

  const SectionsView = ({ sections }) => (
    <div className="space-y-4">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h4 className="text-green-800 font-medium mb-2">{section.title}</h4>
          <ul className="space-y-2">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const ContentRenderer = ({ content }) => {
    switch (content.type) {
      case "table":
        return <TableView {...content} />;
      case "metrics":
        return <MetricsView {...content} />;
      case "cards":
        return <CardsView {...content} />;
      case "sections":
        return <SectionsView {...content} />;
      case "multi":
        return (
          <div className="space-y-6">
            {content.sections.map((section, idx) => (
              <ContentRenderer key={idx} content={section} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const SummarySection = ({ title, content }) => (
    <div className="mb-4">
      <button
        onClick={() => setExpandedSection(expandedSection === title ? null : title)}
        className="w-full flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
      >
        <span className="font-semibold text-green-800">{title}</span>
        {expandedSection === title ? (
          <ChevronDown className="w-5 h-5 text-green-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-green-600" />
        )}
      </button>
      {expandedSection === title && (
        <div className="mt-2 p-4 bg-white border-2 border-green-100 rounded-xl">
          <ContentRenderer content={content} />
        </div>
      )}
    </div>
  );

  return (  
      <div className="flex-1 min-h-full max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg min-h-full flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b bg-gradient-to-r from-green-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Bot className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800">Dhan Sarthi</h1>
                <p className="text-sm text-green-600">Your Personal Financial Guide</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <style>
              {`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}
            </style>
            {responses.map((response, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="bg-green-50 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-green-800">{response.question}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-white border-2 border-green-200 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                    <p className="text-gray-800">{response.answer}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}

            {/* Current Question */}
            {currentQuestion < questions.length && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-green-600" />
                </div>
                <div className="bg-green-50 p-4 rounded-2xl rounded-tl-none max-w-[80%] animate-fadeIn">
                  <p className="text-green-800">{questions[currentQuestion].text}</p>
                </div>
              </div>
            )}

{showSummary && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-green-600" />
                </div>
                <div className="bg-green-50 p-4 rounded-2xl rounded-tl-none w-full">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                    Based on your responses, here's my detailed analysis:
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(summaryData).map(([key, section]) => (
                      <SummarySection
                        key={key}
                        title={section.title}
                        content={section.content}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-6 bg-gradient-to-r from-green-50 to-white">
            {currentQuestion < questions.length && (
              <div className="space-y-4">
                {questions[currentQuestion].type === "options" && (
                  <div className="grid grid-cols-2 gap-3">
                    {questions[currentQuestion].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="p-3 text-green-700 border-2 border-green-400 rounded-xl hover:bg-green-50 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {(questions[currentQuestion].type === "voice" || questions[currentQuestion].hasVoice) && (
                  <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-xl">
                    <button
                      onClick={startVoiceRecording}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isRecording 
                          ? 'bg-red-100 text-red-500 animate-pulse' 
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                      {isRecording ? (
                        <VoiceRecordingAnimation />
                      ) : (
                        <div className="flex items-center text-sm text-green-600">
                          <Volume2 className="w-4 h-4 mr-2" />
                          {questions[currentQuestion].voicePrompt}
                        </div>
                      )}
                    </div>
                    {isRecording && <button 
                        onClick={stopRecording }
                        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300'
                      >
                        Stop Recording
                      </button>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default Chatbot;