import React, { useState, useEffect } from 'react';
import '../App.css';
import {getCountOfJobs } from "../services/jobsServices";

function Side({ userMessage, updateUserMessage }) {

  //console.log('side panel mount '  )
  // Get messages from local storage or initialize as an empty array
  const storedMessages = localStorage.getItem('messages');
  const [previousJobCounts, setPreviousJobCounts] = useState(() => {
    // Retrieve from localStorage when initializing the state
    
    const savedCounts = localStorage.getItem('previousJobCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
});  
const [initializationPhase, setInitializationPhase] = useState(true);
const userStatus = localStorage.getItem('userStatus');
  
  const [pollingInterval, setPollingInterval] = useState(5000); // Start with 5 seconds
    //  const pollingIntervalRef = useRef(10000);
     
     const [noChangeCount, setNoChangeCount] = useState(0); // Count how many times no change is detected
  
  
     



      // count raises of		userStatus	Message
          // Quoting		        manager	    You have a new job for quoting
          // Customer Approval    customer	Your quote just arrived
          // Work Assignment		manager	    Please assign a worker
          // Job Implementation	worker	    You received a new job for processing
          // Customer Review		customer	Your job has been completed, please write a review
          //                      Manager	    Another job has been completed, time to write an invoice
          // Closed		        Manager	    Another job closed
      
          let messageMapping = {};

switch (userStatus) {
    case "manager":
        messageMapping = {
            "Quoting": "You have a new job for quoting",
            "Worker Assignment": "Your quote was approved, Please assign a worker",
            "Customer Review": "Another job has been completed, time to write an invoice",
            "Closed": "Another job closed"
        };
        break;
    case "customer":
        messageMapping = {
            "Customer Approval": "Your quote just arrived",
            "Customer Review": "Your job has been completed, please write a review"
        };
        break;
    case "worker":
        messageMapping = {
            "Job Implementation": "You received a new job for processing"
        };
        break;
    default:
        break;
}
      // const jobStatuses = ["Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
      let jobStatuses = [];
      // this defines the jobs of what status are momnitored, this are also the jobs that are displayed
          if (userStatus === "manager") {
              jobStatuses = ["Quoting", "Worker Assignment", "Closed"];
          } else if (userStatus === "customer") {
              jobStatuses = ["Customer Approval", "Customer Review"];
          } else if (userStatus === "worker") {
              jobStatuses = ["Job Implementation"];
          }
          // const [previousJobCounts, setPreviousJobCounts] = useState({});
      
          useEffect(() => {
            // const message = messageMapping[status];
            // if (message) {
            //     updateUserMessage(message);
            // }

            //console.log('pollingInterval side ' + pollingInterval )
            
            //console.log('side use effect')
            const countJobs = async () => {
                const responses = await Promise.all(jobStatuses.map(status => getCountOfJobs(localStorage.getItem('userId'), userStatus, status)));
                const counts = responses.map(response => response.totalJobs);
                const saveAndSetPreviousJobCounts = (updatedCounts) => {
                  // Save to localStorage
                  localStorage.setItem('previousJobCounts', JSON.stringify(updatedCounts));
                  // Update the state
                  setPreviousJobCounts(updatedCounts);
              };
              
      
                let updatedCounts = { ...previousJobCounts };
                let changeDetected = false;
      
                for (let i = 0; i < jobStatuses.length; i++) {
                    const currentCount = counts[i];
                    const status = jobStatuses[i];
                    const previousCount = previousJobCounts[status] || 0;
      
                    //console.log('status ' + status)
                    //console.log('currentCount ' + currentCount)
             
                    //console.log('previousCount ' + previousCount)
      
                    if (!initializationPhase && currentCount !== previousCount) {
                        changeDetected = true;
                        // const message = messageMapping[status] && messageMapping[status][userStatus];
                        const message = messageMapping[status];  // Here, get the message directly
                        if (message) {
                          //console.log('message', message)
                          updateUserMessage(message);
                         // ***************************** interface here *******************
                            // setUserMessage(message);
                            // console.log('message' + message)
                        }
                    }
      
                    updatedCounts[status] = currentCount;
                }
      
                if (changeDetected) {
                    // Reset the polling interval and no change count when a change is detected
                    setPollingInterval(5000);
                    setNoChangeCount(0);
                } else {
                    // Increase the no change count
                    setNoChangeCount(prevCount => prevCount + 1);
      
                    // If no changes are detected for 3 consecutive polls, double the polling interval
                    if (noChangeCount >= 5) {
                      //console.log('pollingInterval side ' + pollingInterval )
                        setPollingInterval(prevInterval => prevInterval * 1.5);
                        setNoChangeCount(0); // Reset the no change count
                    }
                }
      
                saveAndSetPreviousJobCounts (updatedCounts);
      
                if (initializationPhase) {
                    setInitializationPhase(false);
                }
            };
      
            const interval = setInterval(() => {
      
              //console.log('count jobs called' )
                countJobs();
            }, pollingInterval);
      
            return () => clearInterval(interval);
        }, [previousJobCounts, userMessage]);
          
      // end use effect  [previousJobCounts, userStatus, initializationPhase, pollingInterval, noChangeCount]




    // ****************************************** existing function to stack message  
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
    //console.log('userMessage', userMessage)
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
