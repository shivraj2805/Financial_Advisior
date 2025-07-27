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

    // const prompt = `Generate personalized financial advice for an individual with the following details:
    //             - Name: ${name}
    //             - Age: ${age}
    //             - Monthly Income: ${monthly_income}
    //             - Financial Goal: ${financial_goal}
    //             - Location: ${location}
    //             - Preferred Language: ${preferred_language}
    //             - Business Type: ${business_type}
    //             - Existing Savings: ${existing_savings}
    //             - Risk Tolerance: ${risk_tolerance}

    //             Take into consideration their income, financial goals,location , business type , existing savings and risk tolerance to recommend suitable investment options, savings plans, and budgeting strategies. Include recommendations for short-term and long-term financial goals, and suggest actions based on their location and preferred language and give advise in prefered language only.
    //      `;

    const prompt = `You are a highly experienced financial advisor with deep expertise in personal finance, investment planning, and financial regulations. Generate a detailed, comprehensive financial advice report for the individual with the following profile:
  - Name: ${name}
  - Age: ${age}
  - Monthly Income: ${monthly_income}
  - Financial Goal: ${financial_goal}
  - Location: ${location}
  - Preferred Language: ${preferred_language}
  - Business Type: ${business_type}
  - Existing Savings: ${existing_savings}
  - Risk Tolerance: ${risk_tolerance}

Please provide an in-depth, long-form analysis roughly 2 to 3 pages long. Structure your response into clear sections and include detailed discussion, actionable advice, and practical examples. Incorporate the following schemes, guidelines, and frameworks into your advice:

1. **Comprehensive Financial Planning Framework:** 
   - Assessment of current financial status including cash flow, assets, liabilities, and net worth.
   - Goal setting (short-term, medium-term, long-term) with timelines and measurable milestones.
  
2. **Budgeting and Cash Flow Management:**
   - Strategies for tracking income and expenses.
   - Recommendations for discretionary spending control and automated savings.

3. **Investment Planning:**
   - Diversified investment options aligned with risk tolerance and financial goals.
   - Explanation of risk vs. return for different asset classes (equities, bonds, mutual funds, real estate, etc.).
   - Suggestions on tax-efficient investment vehicles relevant to the location.

4. **Savings Plans and Emergency Funds:**
   - Step-by-step savings strategies to build and maintain an emergency fund covering 3 to 6 months of expenses.
   - Advice on systematic savings and high-yield accounts.

5. **Risk Management and Insurance:**
   - Evaluation of insurance needs (life, health, business, disability, etc.) to protect against unforeseen events.
   - Risk mitigation techniques consistent with stated risk tolerance.

6. **Retirement Planning:**
   - Estimation of retirement needs and income replacement ratios.
   - Utilizing employer-sponsored plans, IRAs, and other retirement accounts available based on location.

7. **Tax Planning Guidelines:**
   - Strategies for tax optimization including use of tax-advantaged accounts, deductions, credits, and income timing.
   - Compliance with local tax regulations and incentives.

8. **Debt Management and Credit Strategies:**
   - Prioritizing high-interest debt repayments.
   - Advice on debt consolidation or refinancing if applicable.

9. **Location-Specific Financial Considerations:**
   - Relevant local financial regulations, market conditions, and investment products.
   - Economic and tax environment affecting the individual’s financial decisions.

10. **Business Financial Guidelines:**
    - Recommendations for managing business income and expenses.
    - Strategies for separating personal and business finances.
    - Advice on business savings, reinvestment, and growth opportunities.

11. **Action Plan Summary:**
    - Clear, prioritized steps for implementation.
    - Recommended timeline for reviews and adjustments.
    - Suggestions for ongoing financial education and professional consultations.

Ensure the entire response is written exclusively in the preferred language specified. Use clear, formal, and engaging language that educates the reader, emphasizing practical and customized advice. Avoid brevity and elaborate on each section with rich detail so the individual gains a deep understanding and a concrete roadmap to follow.`;



    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
