import  { useState, useEffect}from 'react';
import {getCountOfJobs } from "../services/jobsServices";

    // count raises of		userStatus	Message
    // Quoting		        manager	    You have a new job for quoting
    // Customer Approval    customer	Your quote just arrived
    // Work Assignment		manager	    Please assign a worker
    // Job Implementation	worker	    You received a new job for processing
    // Customer Review		customer	Your job has been completed, please write a review
    //                      Manager	    Another job has been completed, time to write an invoice
    // Closed		        Manager	    Another job closed
    

    export  function useUserMessaging(userStatus, userId, jobStatus) {
        const [previousJobCount, setPreviousJobCount] = useState(0);
        const [userMessage, setUserMessage] = useState('');
    
        const messageMapping = {
            "Quoting": {
                "manager": "You have a new job for quoting"
            },
            "Customer Approval": {
                "customer": "Your quote just arrived"
            },
            "Work Assignment": {
                "manager": "Please assign a worker"
            },
            "Job Implementation": {
                "worker": "You received a new job for processing"
            },
            "Customer Review": {
                "customer": "Your job has been completed, please write a review",
                "manager": "Another job has been completed, time to write an invoice"
            },
            "Closed": {
                "manager": "Another job closed"
            }
        };
    
        useEffect(() => {
            const countJobs = async () => {
                const response = await getCountOfJobs(localStorage.getItem(userId), userStatus, jobStatus);
                const currentCount = response.totalJobs;
    
                console.log('currentCount' + currentCount);
                if (currentCount > previousJobCount) {
                    // Set the message based on jobStatus and userStatus
                    const message = messageMapping[jobStatus] && messageMapping[jobStatus][userStatus];
                    if (message) {
                        setUserMessage(message);
                    }
                    setPreviousJobCount(currentCount);
                }
            };
    
            // Set up an interval to fetch jobs every 5 seconds
            const interval = setInterval(() => {
                countJobs();
            }, 5000);
    
            // Clean up function to clear the interval when the component is unmounted
            return () => clearInterval(interval);
        }, [previousJobCount, userStatus, jobStatus]);
           
    
        return {userMessage} ;
    }
    