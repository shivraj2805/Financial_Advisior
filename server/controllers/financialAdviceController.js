const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateFinancialAdvice = async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const {
      name,
      age,
      monthly_income,
      financial_goal,
      location,
      preferred_language,
      business_type,
      existing_savings,
      risk_tolerance,
    } = req.body;

    if (
      !name ||
      !age ||
      !monthly_income ||
      !financial_goal ||
      !location ||
      !preferred_language ||
      !business_type ||
      !existing_savings ||
      !risk_tolerance
    ) {
      console.error("Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `Generate personalized financial advice for an individual with the following details:
                - Name: ${name}
                - Age: ${age}
                - Monthly Income: ${monthly_income}
                - Financial Goal: ${financial_goal}
                - Location: ${location}
                - Preferred Language: ${preferred_language}
                - Business Type: ${business_type}
                - Existing Savings: ${existing_savings}
                - Risk Tolerance: ${risk_tolerance}

                Take into consideration their income, financial goals,location , business type , existing savings and risk tolerance to recommend suitable investment options, savings plans, and budgeting strategies. Include recommendations for short-term and long-term financial goals, and suggest actions based on their location and preferred language and give advise in prefered language only.
         `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent([prompt]);

    console.log("Raw API Response:", JSON.stringify(result, null, 2));

    // ✅ Fix: Properly extract response text
    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.error("Empty response from Gemini API");
      return res.status(500).json({ error: "Empty response from Gemini API" });
    }

    console.log("Processed Response:", responseText);

    // ✅ Fix: Send response as JSON object
    res.json({ financial_advice: responseText });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message }); // Removed the extra 'c'
  }
};

module.exports = { generateFinancialAdvice };
