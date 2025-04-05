import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import NewsPage from "./Pages/NewsPage";
import LearningCenter from "./Pages/Learnings";
// import UserProfile from "./Pages/ProfilePage";
import VerticalRoadmap from "./Pages/Roadmap";
import YouTubeShorts from "./components/Shorts";
import FinancialAdvisor from "./Pages/Heropage";
import ErrorPage from "./components/ErrorPage";
import GovernmentSchemes from "./Pages/GovernmentScheme";
// import PPFCalculator from "./Pages/PpfCalculator";
import PPFCalculator from "./Pages/FinancialCalculatorsDashboard";
import WomenEmpowerment from "./Pages/WomensSection";
import ChatbotButton from "./components/ChatbobtButton";
import MicroinvestmentPlatform from "./Pages/mip";
import PoultryFarmGuide from "./Pages/poultry";
import RuralBusinessOpportunities from "./Pages/ruralbusiness";
import Chatbot from "./Pages/chatbot";
import DiscussionForums from "./Pages/community";
import DairyForumPage from "./Pages/dairyforum";
import SuccessStories from "./Pages/SuccessStoriesAvi";
import QASessions from "./Pages/qna";

import LoginPage from "./Pages/Login";
import RegistrationPage from "./Pages/Signup";

import ProtectedRoute from "./components/protected-route"; 

import FinancialAdvisorChatbotUi from "./Pages/financialAdvisiorChatBotUi";
import LandingPage from "./LandingPage/Landingpage";  


function App() {
  return (
    <div className="App">
      <ChatbotButton />
      <ToastContainer />

      <Routes>
        <Route path="/financialAdvisior" element={<ProtectedRoute><FinancialAdvisor /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />

        {/* <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/news" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute><LearningCenter /></ProtectedRoute>} />

        {/* <Route path="/profiles" element={<UserProfile />} /> */}

        <Route path="/road" element={<ProtectedRoute><VerticalRoadmap /></ProtectedRoute>} />
        <Route path="/shorts" element={<ProtectedRoute><YouTubeShorts /></ProtectedRoute>} />
        <Route path="/scheme" element={<ProtectedRoute><GovernmentSchemes /></ProtectedRoute>} />
        <Route path="/ppf" element={<PPFCalculator /> }/>
        <Route path="/womens" element={<ProtectedRoute><WomenEmpowerment /></ProtectedRoute>} />
        <Route path="/mip" element={<ProtectedRoute><MicroinvestmentPlatform /></ProtectedRoute>} />
        <Route path="/poultry" element={<ProtectedRoute><PoultryFarmGuide /></ProtectedRoute>} />
        <Route path="/rural" element={<ProtectedRoute><RuralBusinessOpportunities /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><DiscussionForums /></ProtectedRoute>} />

        <Route path="/chatbot" element={<Chatbot />} />        
        <Route path="/dairy" element={<DairyForumPage />} />
        <Route path="/stories" element={<SuccessStories />} />
        
        <Route path="/qna" element={<ProtectedRoute><QASessions /></ProtectedRoute>} />

        <Route path="/advisor" element={<ProtectedRoute><FinancialAdvisorChatbotUi /></ProtectedRoute>} />


        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
