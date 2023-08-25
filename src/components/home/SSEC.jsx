import React, { useState, useEffect } from 'react';

export default function SSEComponent() {
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    // Initialize the EventSource connection
    const eventSource = new EventSource('http://localhost:3001/events');

    // Set up the event listener
    eventSource.onmessage = function(event) {
      console.log('Received event:', event.data);
      setCurrentEvent(event.data);
    };

    eventSource.onerror = function(error) {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // Cleanup the EventSource connection when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, []); // The empty dependency array ensures this useEffect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Server-Sent Events with React</h1>
      <p>Latest Event: {currentEvent}</p>
    </div>
  );
}


