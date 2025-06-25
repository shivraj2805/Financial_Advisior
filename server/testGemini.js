require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });  // ✅ Correct model name
        const response = await model.generateContent("Hello, how are you?");
        
        console.log(await response.response.text());  // ✅ Fetch correct text response
    } catch (error) {
        console.error("Error:", error);
    }
}

testGemini();
