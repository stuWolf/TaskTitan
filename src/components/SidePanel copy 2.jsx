import React, { useState, useEffect } from 'react';
import '../App.css';

function Side({ userMessage }) {
  // Get messages from local storage or initialize as an empty array
  const initialMessages = JSON.parse(localStorage.getItem('messages')) || [];

  const [messages, setMessages] = useState(initialMessages);

  // Update the messages state whenever userMessage prop changes
  useEffect(() => {
    if (userMessage) {
      const newMessages = [userMessage, ...messages];
      setMessages(newMessages);
      // Update local storage
      localStorage.setItem('messages', JSON.stringify(newMessages));
    }
  }, [userMessage]);

  return (
    <div className="side-panel">
      <h2>Notifications</h2>
      <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      {/* Map over the messages state to display each message */}
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default Side;
