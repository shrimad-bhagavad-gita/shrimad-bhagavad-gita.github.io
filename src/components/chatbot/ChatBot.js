import React, { useState, useEffect } from "react";
import "./ChatBot.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🙏 Namaste! Ask me a question from the Bhagavad Gita." }
  ]);
  const [input, setInput] = useState("");
  const [qaData, setQaData] = useState({});
  const toggleChat = () => setIsOpen(!isOpen);
  // Load qa.json on startup
  useEffect(() => {
    fetch("/qa.json")
      .then((res) => res.json())
      .then((data) => setQaData(data))
      .catch((err) => console.error("Error loading qa.json:", err));
  }, []);

  // Simple fuzzy matching (find closest key)
  const findBestMatch = (question) => {
    const lowerQ = question.toLowerCase();
    let bestKey = null;
    let bestScore = 0;

    Object.keys(qaData).forEach((key) => {
      let score = 0;
      const words = key.split(" ");
      words.forEach((w) => {
        if (lowerQ.includes(w)) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        bestKey = key;
      }
    });

    return bestKey;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const match = findBestMatch(input);

    const botReply = match
      ? qaData[match]
      : "Sorry, I don’t understand that yet. 🙏";

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      <button className="chatbot-btn" onClick={toggleChat}>💬</button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">Chatbot</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>


    // <div className="chatbot">
    //     <div className="chatbot-messages">
    //       {messages.map((msg, i) => (
    //         <div key={i} className={`chatbot-message ${msg.sender}`}>
    //           {msg.text}

    //         </div>
    //       ))}
    //     </div>
    //     <div className="chatbot-input">
    //       <input
    //         type="text"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         placeholder="Ask your question..."
    //       />
    //       <button onClick={handleSend}>Send</button>
    //     </div>

    //   </div>
  );
};

export default Chatbot;
