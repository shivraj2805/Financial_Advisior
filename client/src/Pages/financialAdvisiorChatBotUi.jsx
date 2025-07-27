

import { useState, useEffect, useRef } from "react";
import { FaUser, FaMoneyBillWave, FaChartLine, FaMapMarkerAlt, FaBusinessTime, FaPiggyBank, FaUsers, FaBullseye, FaShieldAlt } from "react-icons/fa";
import advisorImg from "../assets/user-1.png";
import "../LandingPage/Hero/Hero.css";

const SNAKE_LENGTH = 18;

export default function FinancialAdvisorChatbotUi() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    preferred_language: "English",
    monthly_income: "",
    family_size: "",
    business_type: "",
    existing_savings: "",
    financial_goal: "",
    risk_tolerance: "low",
  });
  const [errors, setErrors] = useState({});
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  // Cursor and snake trail
  const cursorRef = useRef(null);
  const snakeTrailRef = useRef(Array(SNAKE_LENGTH).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
  const [snakeTrail, setSnakeTrail] = useState(snakeTrailRef.current);

  useEffect(() => {
    fetch(`${backend_url}/api/business-types`)
      .then((response) => response.json())
      .then((data) => setBusinessTypes(data.business_types))
      .catch((error) => console.error("Error fetching business types:", error));
  }, []);

  // Validation function for positive numbers
  const validatePositiveNumber = (value, fieldName) => {
    const num = parseFloat(value);
    if (value === "") return "";
    if (isNaN(num)) return `${fieldName} must be a valid number`;
    if (num <= 0) return `${fieldName} must be greater than 0`;
    if (num > 999999999) return `${fieldName} is too large`;
    return "";
  };

  // Validation function for age
  const validateAge = (value) => {
    const num = parseFloat(value);
    if (value === "") return "";
    if (isNaN(num)) return "Age must be a valid number";
    if (num <= 0) return "Age must be greater than 0";
    if (num < 18) return "Age must be at least 18 years";
    if (num > 120) return "Age must be less than 120 years";
    return "";
  };

  useEffect(() => {
    // Validate form fields
    const newErrors = {};
    
    // Validate age
    newErrors.age = validateAge(formData.age);
    
    // Validate monthly income
    newErrors.monthly_income = validatePositiveNumber(formData.monthly_income, "Monthly income");
    
    // Validate family size
    newErrors.family_size = validatePositiveNumber(formData.family_size, "Family size");
    
    // Validate existing savings
    newErrors.existing_savings = validatePositiveNumber(formData.existing_savings, "Existing savings");
    
    setErrors(newErrors);

    // Check if form is valid
    const isValid =
      formData.name.trim() !== "" &&
      formData.age > 0 &&
      formData.monthly_income > 0 &&
      formData.family_size > 0 &&
      formData.existing_savings >= 0 && // Allow 0 for savings
      formData.location.trim() !== "" &&
      Object.values(newErrors).every(error => error === "");

    setFormValid(isValid);
    
    // Calculate progress (fields filled / total fields)
    const total = 10;
    let filled = 0;
    Object.values(formData).forEach((v) => {
      if (v && v !== "") filled++;
    });
    setProgress(Math.round((filled / total) * 100));
  }, [formData]);

  // Mouse tracking and snake trail animation
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For number fields, only allow positive numbers
    if (['age', 'monthly_income', 'family_size', 'existing_savings'].includes(name)) {
      // Remove any non-numeric characters except decimal point
      const cleanValue = value.replace(/[^0-9.]/g, '');
      
      // Prevent multiple decimal points
      const parts = cleanValue.split('.');
      if (parts.length > 2) return;
      
      // Limit decimal places to 2
      if (parts.length === 2 && parts[1].length > 2) return;
      
      setFormData({ ...formData, [name]: cleanValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true);
    setAdvice(null);
    try {
      const response = await fetch(`${backend_url}/api/financial-advice/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to fetch advice");
      const result = await response.json();
      setAdvice(result.financial_advice || "No advice available.");
    } catch (error) {
      console.error("Error fetching advice:", error);
      alert("Error fetching advice. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const stripMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/#+\s/g, "")
      .replace(/\*/g, "")
      .replace(/\s+/g, " ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Custom Cursor & Snake Trail */}
      <div ref={cursorRef} className="custom-cursor" />
      <svg className="snake-svg-lines" width={window.innerWidth} height={window.innerHeight}>
        <defs>
          <linearGradient id="snake-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#bbf7d0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {lines}
      </svg>
      {snakeTrail.map((pos, idx) => (
        <div
          key={idx}
          className="snake-dot"
          style={{
            left: pos.x + "px",
            top: pos.y + "px",
            opacity: 0.35 * (1 - idx / SNAKE_LENGTH),
            zIndex: 9995,
            width: 28 - idx + "px",
            height: 28 - idx + "px",
            background: `radial-gradient(circle at 40% 40%, #fff 70%, #bbf7d0 90%, #22c55e 100%)`,
            filter: `blur(${2 + idx * 1.1}px)`
          }}
        />
      ))}
      {/* Hero Banner */}
      <div className="w-full py-12 px-4 md:px-0 flex flex-col items-center bg-gradient-to-r from-green-100 to-blue-100 border-b border-green-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-2 text-center">Financial Advisor</h1>
        <p className="text-lg text-green-700 mb-4 text-center max-w-2xl">Get personalized, expert financial advice tailored to your rural business, family, and goals. Your journey to financial growth starts here.</p>
      </div>
      <div className="flex-1 flex flex-col md:flex-row items-start justify-center w-full max-w-7xl mx-auto px-2 md:px-8 py-8 gap-8">
        {/* Main Form Card */}
        <div className="flex-1 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-green-100 p-8 animate-fade-in">
          {/* Progress Bar */}
          <div className="w-full h-3 bg-green-50 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  min="18"
                  max="120"
                  step="1"
                  required
                  className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={handleChange}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
            </div>
            <div>
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
                className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                onChange={handleChange}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            <select
              name="preferred_language"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Odia">Odia</option>
              <option value="Gujarati">Gujarati</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  name="monthly_income"
                  placeholder="Monthly Income (₹)"
                  min="1"
                  step="0.01"
                  required
                  className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500 ${errors.monthly_income ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={handleChange}
                />
                {errors.monthly_income && <p className="text-red-500 text-xs mt-1">{errors.monthly_income}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="family_size"
                  placeholder="Family Size"
                  min="1"
                  step="1"
                  required
                  className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500 ${errors.family_size ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={handleChange}
                />
                {errors.family_size && <p className="text-red-500 text-xs mt-1">{errors.family_size}</p>}
              </div>
            </div>
            <select
              name="business_type"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            >
              <option value="">Select Business Type</option>
              {businessTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div>
              <input
                type="number"
                name="existing_savings"
                placeholder="Existing Savings (₹)"
                min="0"
                step="0.01"
                required
                className={`p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500 ${errors.existing_savings ? 'border-red-500' : 'border-gray-300'}`}
                onChange={handleChange}
              />
              {errors.existing_savings && <p className="text-red-500 text-xs mt-1">{errors.existing_savings}</p>}
            </div>
            <textarea
              name="financial_goal"
              placeholder="Your Financial Goals"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <select
              name="risk_tolerance"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg text-lg font-semibold shadow hover:from-green-600 hover:to-blue-600 transition duration-300 disabled:opacity-50"
              disabled={!formValid}
            >
              Get Financial Advice
            </button>
          </form>
          {loading && (
            <div className="flex justify-center items-center h-24">
              <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          )}
          {(!advice && !loading) && (
            <p className="text-center mt-4 text-gray-500">
              No advice to display yet.
            </p>
          )}
        </div>
        {/* Right Sidebar with Illustration and Quote */}
        <div className="hidden md:flex flex-col items-center justify-center w-96 min-h-[32rem] p-8 bg-white/80 rounded-2xl shadow-xl border border-green-100 animate-fade-in">
          <img src={advisorImg} alt="Advisor" className="w-32 h-32 rounded-full shadow mb-6 border-4 border-green-200 object-cover" />
          <blockquote className="text-lg text-green-800 italic text-center mb-4">"The best way to predict your future is to create it."</blockquote>
          <div className="text-green-600 text-sm text-center">Your trusted financial partner for rural growth.</div>
        </div>
      </div>
      {/* Full-width Advice Timeline */}
      {advice && (
        <div className="w-full py-12 px-2 md:px-0 bg-gradient-to-br from-green-50 to-blue-100 border-t border-green-200 flex flex-col items-center animate-fade-in">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Your Financial Roadmap</h2>
          <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-12">
            {advice
              .split("\n")
              .slice(1)
              .join("\n")
              .split("\n\n")
              .map((section, index, arr) => (
                <div key={index} className="relative flex items-start gap-6 group animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-4 border-white shadow-lg flex items-center justify-center z-10">
                      <img src={advisorImg} alt="Advisor" className="w-5 h-5 rounded-full object-cover" />
                    </div>
                    {index < arr.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-green-300 to-blue-200 mt-1 mb-1"></div>
                    )}
                  </div>
                  {/* Advice content */}
                  <div
                    className="advice-step-card flex-1 bg-white rounded-xl shadow-xl border border-green-100 px-8 py-6 transition-all duration-300 focus:outline-none"
                    tabIndex={0}
                  >
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">
                      {stripMarkdown(section.split(":")[0].trim())}
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {stripMarkdown(section.split(":").slice(1).join(":").trim())}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}