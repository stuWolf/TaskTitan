import React from "react";
import '../App.css';


export default function ProgressBar({ jobStatus }) {
    const statuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];

    return (
        <div className="App">
            {/* Progress bar */}
            <div className="progress-bar">
                {statuses.map((status, index) => (
                    <div 
                        key={status} 
                        className={`progress-bar-item ${index < statuses.indexOf(jobStatus) + 1 ? 'active' : ''}`}
                    >
                        {status}
                    </div>
                ))}
            </div>
        </div>
    );
}
    