export function calculateEditability(jobStatus, userStatus, userId, customerId) {
   

    const draftEditable =  (userId  === customerId && jobStatus === 'Draft');
   
    const quotingEditable = (userStatus === "manager" && jobStatus === 'Quoting'); 
                         
    const approvalEditable =  (userId  === customerId && jobStatus === 'Draft');
    const assignEditable  = (userStatus === "manager" && jobStatus === "Worker Assignment"); 
    const implementEditable  = (userStatus === "worker" && jobStatus === "Job Implementation"); 

    const reviewEditable = (userId  === customerId && jobStatus === "Customer Review");

    return { quotingEditable , approvalEditable,assignEditable , implementEditable , reviewEditable,draftEditable  };
}
