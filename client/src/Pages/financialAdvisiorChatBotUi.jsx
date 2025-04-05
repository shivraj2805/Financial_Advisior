

import { useState, useEffect } from "react";

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

  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/business-types")
      .then((response) => response.json())
      .then((data) => setBusinessTypes(data.business_types))
      .catch((error) => console.error("Error fetching business types:", error));
  }, []);

  useEffect(() => {
    const isValid =
      formData.name.trim() !== "" &&
      formData.age > 0 &&
      formData.monthly_income > 0 &&
      formData.location.trim() !== "";
    setFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true);
    setAdvice(null);

    try {
      const response = await fetch("http://localhost:8080/api/financial-advice/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to fetch advice");

      const result = await response.json();
      console.log("API Response:", result);
      setAdvice(result.financial_advice || "No advice available.");
    } catch (error) {
      console.error("Error fetching advice:", error);
      alert("Error fetching advice. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const stripMarkdown = (text) => {
    if (!text) return ""; // Handle null or undefined text
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold (**text**)
      .replace(/_(.*?)_/g, "$1")       // Remove italic (_text_)
      .replace(/`(.*?)`/g, "$1")       // Remove inline code (`text`)
      .replace(/#+\s/g, "")            // Remove headings (#, ##, ###)
      .replace(/\*/g, "")              // Remove all asterisks (*)
      .replace(/\s+/g, " ");           // Replace multiple spaces with a single space
  };

  return (
    <div className="bg-green-50 min-h-screen p-6">
      <div className="max-w-full bg-white p-8 rounded-xl shadow-2xl border border-green-300">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
          🌿 Rural Financial Advisor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
  
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />
  
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
  
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="monthly_income"
              placeholder="Monthly Income (₹)"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="family_size"
              placeholder="Family Size"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
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
  
          <input
            type="number"
            name="existing_savings"
            placeholder="Existing Savings (₹)"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />
  
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
            className="w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50"
            disabled={!formValid}
          >
            Get Financial Advice
          </button>
        </form>

        {loading && (
          <p className="text-center mt-4 font-semibold text-green-700">
            Generating advice...
          </p>
        )}

        {advice ? (
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">📢 Financial Advice</h2>
            <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg border border-green-300">
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                {advice
                  .split("\n") // Split advice into lines
                  .slice(1) // Skip the first line
                  .join("\n") // Join the remaining lines back
                  .split("\n\n") // Split into sections by double newlines
                  .map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-green-700 mb-2">
                        {stripMarkdown(section.split(":")[0].trim())}
                      </h3>
                      <p>{stripMarkdown(section.split(":").slice(1).join(":").trim())}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center mt-4 text-gray-500">
              No advice to display yet.
            </p>
          )
        )}
      </div>
    </div>
  );
}