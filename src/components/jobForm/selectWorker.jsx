import React, { useState, useEffect, useCallback} from "react";
import '../../App.css';
import { getUsers } from "../../services/userServices";

export default function SelectWorker(props){
    const [workers, setWorkers] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const fetchWorkers = useCallback(async () => {
        try {
          let workerData;  
          
          // get all users with status Worker
          workerData = await getUsers("worker");
            
          // Check if workerData contains 'message404, not found'
          if (workerData.hasOwnProperty('message404')) {
            setErrorMessage("You have no workers yet")
            return;
          }
        
          // Filter out the required fields
          const filteredWorkers = workerData.map((worker) => ({
            _id: worker._id || 'No Data',  
            firstName: worker.firstName || 'No Data',
            lastName: worker.lastName || 'No Data',
           
            license: worker.license || 'No Data',
          }));
      
          // Set the filtered workers in state
          setWorkers(filteredWorkers);
            
        } catch (error) {
          console.error('Failed to fetch workers:', error);
          setErrorMessage("could not fetch workers");
        }
      },[]);
      // end fetch workers
      
      useEffect(() => {
        // Fetch the open jobs when the component mounts
        fetchWorkers();
        
      }, []);

      const handleWorkerChange = (event) => {
        const workerId = event.target.value;
        const worker = workers.find(w => w._id === workerId);
        
      // Invoke the callback to send data to the parent
        if (worker && props.onWorkerSelected) {
            props.onWorkerSelected(worker._id, worker.firstName, worker.license);
           
            }
            };

      return (

        <div className="App">
            
            {errorMessage && <p>{errorMessage}</p>}
    {/* Dropdown for selecting a worker */}
    <select onChange={handleWorkerChange}>
              <option value="">Select a worker</option>
              {workers.map(worker => (
                <option key={worker._id} value={worker._id}>
                  {worker.firstName} {worker.lastName}
                </option>
              ))}
            </select>
    
           


</div>

      );

}
