export function calculateEditability(jobStatus, userStatus) {
    const quotingStatuses = ["Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const assignStatuses = ["Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const implementStatuses = ["Job Implementation", "Customer Review", "Closed"];
    const reviewStatuses = ["Customer Review", "Closed"];

    const draftEditable = (userStatus === "manager") || 
                           (userStatus === "customer" && quotingStatuses.includes(jobStatus));
    
    const quotingEditable = (userStatus === "manager") || 
                           (userStatus === "customer" && quotingStatuses.includes(jobStatus));

    const assignEditable  = (userStatus === "manager" && assignStatuses.includes(jobStatus)) || 
                          (userStatus === "customer" && assignStatuses.includes(jobStatus));

    const implementEditable  = (userStatus === "manager" && implementStatuses.includes(jobStatus)) || 
                             (userStatus === "customer" && implementStatuses.includes(jobStatus)) || 
                             (userStatus === "worker" && implementStatuses.includes(jobStatus));

    const reviewEditable = (userStatus === "manager" && jobStatus === "Closed") ||
                          (userStatus === "customer" && reviewStatuses.includes(jobStatus)) || 
                          (userStatus === "worker" && jobStatus === "Closed");

    return { quotingEditable , assignEditable , implementEditable , reviewEditable,draftEditable  };
}
