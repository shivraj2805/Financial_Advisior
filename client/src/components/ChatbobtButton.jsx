import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatbotButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50" onClick={() => window.location.href = "/chatbot"}>
      <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 animate-pulse animate-bounce">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatbotButton;
