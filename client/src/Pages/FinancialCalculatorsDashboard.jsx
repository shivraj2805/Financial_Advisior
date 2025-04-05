import React, { useState } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PPFCalculator from './PpfCalculator';
import SIPCalculator from './SIPCalculator';
import EMICalculator from './EMICalculator';
import RetirementCalculator from './RetirementCalculator';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import TaxCalculator from './TaxCalculator';

// Placeholder icons using emojis instead of Lucide
const icons = {
  ppf: '💰',
  sip: '📈',
  emi: '💳',
  retirement: '🏦',
  compoundInterest: '🧮',
  tax: '📋'
};

const CalculatorCard = ({ icon, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white hover:bg-green-50 transition-all duration-300 rounded-xl shadow-md p-6 cursor-pointer group border border-gray-100 hover:border-green-200 hover:shadow-lg- transform hover:scale-105"
    >
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4">{icon}</span>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-end">
        <span className="text-green-500 font-medium group-hover:translate-x-1 transition-transform">
          Calculate →
        </span>
      </div>
    </div>
  );
};

const FinancialCalculatorsDashboard = () => {
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [language, setLanguage] = useState("en");

  const calculators = [
    {
      id: 'ppf',
      title: 'PPF Calculator',
      description: 'Calculate your Public Provident Fund investment growth and potential returns.',
      icon: icons.ppf,
      component: PPFCalculator
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Estimate your Systematic Investment Plan returns and wealth creation potential.',
      icon: icons.sip,
      component: SIPCalculator
    },
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installments for loans.',
      icon: icons.emi,
      component: EMICalculator
    },
    {
      id: 'retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement corpus and understand future financial needs.',
      icon: icons.retirement,
      component: RetirementCalculator
    },
    {
      id: 'compoundInterest',
      title: 'Compound Interest Calculator',
      description: 'Understand the power of compounding on your investments.',
      icon: icons.compoundInterest,
      component: CompoundInterestCalculator
    },
    {
      id: 'tax',
      title: 'Tax Calculator',
      description: 'Estimate your tax liability and potential savings.',
      icon: icons.tax,
      component: TaxCalculator
    }
  ];

  const handleCalculatorSelect = (calculator) => {
    setActiveCalculator(calculator);
  };

  const handleBackToDashboard = () => {
    setActiveCalculator(null);
  };

  // Render selected calculator or dashboard
  if (activeCalculator) {
    const SelectedCalculator = activeCalculator.component;
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')} />
        <div className="flex-grow">
          <button 
            onClick={handleBackToDashboard}
            className="m-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            ← Back to Calculators
          </button>
          <SelectedCalculator />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  // Default view: Calculator Cards
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-green-100 to-white mt-11">
      <NavBar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')} />
      <div className="flex-grow p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Financial Calculators
          </h1>
          <div className="grid md:grid-cols-3 gap-6">
            {calculators.map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                title={calculator.title}
                description={calculator.description}
                icon={calculator.icon}
                onClick={() => handleCalculatorSelect(calculator)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default FinancialCalculatorsDashboard;