import React, { useState, useEffect } from 'react';
import '../App.css';

function Side({ userMessage }) {
  // Get messages from local storage or initialize as an empty array
  const storedMessages = localStorage.getItem('messages');
  let initialMessages = [];

  if (storedMessages) {
    try {
      initialMessages = JSON.parse(storedMessages);
    } catch (error) {
      console.error("Error parsing stored messages:", error);
    }
  }

  const [messages, setMessages] = useState(initialMessages);

  // Update the messages state whenever userMessage prop changes
  useEffect(() => {
    if (userMessage) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current time without seconds
      const newMessage = { text: userMessage, time: timestamp };
      const newMessages = [newMessage, ...messages];
      setMessages(newMessages);
      // Update local storage
      localStorage.setItem('messages', JSON.stringify(newMessages));
    }
  }, [userMessage]);





  
  return (
    <div className="side-panel">
      <h2>Notifications</h2>
      <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      {/* Map over the messages state to display each message with its timestamp */}
      {messages.map((message, index) => (
        <div key={index} className="sie-messages">
          <span>{message.time} - {message.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Side;
