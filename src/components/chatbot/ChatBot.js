import React, { useState } from "react";
import "./ChatBot.css";

const responses = {
  hello: "Hi! How can I help you?",
  "who are you": "I’m your friendly Gita Chatbot 🙏",
  "bhagavad gita": "The Bhagavad Gita is a sacred Hindu scripture, part of the Mahabharata.",
  bye: "Goodbye! Have a blessed day 🌸"
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    let reply = "Sorry, I don’t understand that yet. 🙏";

    // Fuzzy matching: check if input contains any key
    const lower = input.toLowerCase();
    for (const key in responses) {
      if (lower.includes(key)) {
        reply = responses[key];
        break;
      }
    }

    setMessages([...messages, userMsg, { sender: "Bot", text: reply }]);
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
              <div key={i}><strong>{msg.sender}:</strong> {msg.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              placeholder="Ask something..."
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
