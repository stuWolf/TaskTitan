export function calculateVisibility(jobStatus, userStatus) {
    const quotingStatuses = ["Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const assignStatuses = ["Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const implementStatuses = ["Job Implementation", "Customer Review", "Closed"];

    const quotingVisable = (userStatus === "manager") || 
                           (userStatus === "customer" && quotingStatuses.includes(jobStatus));

    const assignVisable = (userStatus === "manager" && assignStatuses.includes(jobStatus)) || 
                          (userStatus === "customer" && assignStatuses.includes(jobStatus));

    const implementVisable = (userStatus === "manager" && implementStatuses.includes(jobStatus)) || 
                             (userStatus === "customer" && implementStatuses.includes(jobStatus)) || 
                             (userStatus === "worker" && implementStatuses.includes(jobStatus));

    const reviewVisable = (userStatus === "manager" && implementStatuses.includes(jobStatus)) ||
                          (userStatus === "customer" && implementStatuses.includes(jobStatus)) || 
                          (userStatus === "worker" && jobStatus === "Closed");

    return { quotingVisable, assignVisable, implementVisable, reviewVisable };
}
