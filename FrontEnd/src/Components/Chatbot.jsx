
import React, { useState, useEffect, useRef } from "react";
import chatbot from "../assets/chatbot.svg";
import "../App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { name: "TrekBot", message: "Namaste. My name is TrekBot. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true); // default open
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { name: "User", message: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
    const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { name: "TrekBot", message: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Fetch error:", err.message);
      const errorMessage = {
        name: "TrekBot",
        message: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput(""); // Clear input box
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat_container">
      <div className="chatbox">
        {/* Chatbox window */}
        <div className={`chatbox__support ${isOpen ? "chatbox--active" : ""}`}>
          {/* Header */}
          <div className="chatbox__header">
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">TrekMate</h4>
              <p className="chatbox__description--header">
                Namaste. My name is TrekBot. How can I help you?
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbox__messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.name === "TrekBot"
                    ? "messages__item messages__item--visitor"
                    : "messages__item messages__item--operator"
                }
              >
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer / Input */}
          <div className="chatbox__footer">
            <input
              type="text"
              placeholder="Write a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chatbox__send--footer send__button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>

        {/* Toggle button */}
        <div className="chatbox__button">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={chatbot} alt="Chatbot" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
