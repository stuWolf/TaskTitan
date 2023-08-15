export function calculateVisibility(jobStatus, userStatus,userId, customerId) {
    const quotingStatuses = ["Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const assignStatuses = ["Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const implementStatuses = ["Job Implementation", "Customer Review", "Closed"];
    const reviewStatuses = ["Customer Review", "Closed"];

    const quotingVisable = (userStatus === "manager"&& quotingStatuses.includes(jobStatus)) || 
                           (userStatus === "customer" && quotingStatuses.includes(jobStatus));

    const assignVisable = (userStatus === "manager" && assignStatuses.includes(jobStatus)) || 
                          (userStatus === "customer" && assignStatuses.includes(jobStatus));

    const implementVisable = (userStatus === "manager" && implementStatuses.includes(jobStatus)) || 
                             (userStatus === "customer" && implementStatuses.includes(jobStatus)) || 
                             (userStatus === "worker" && implementStatuses.includes(jobStatus));

    const reviewVisable = (userStatus === "manager" && reviewStatuses.includes(jobStatus)) ||
                          (userStatus === "customer" && reviewStatuses.includes(jobStatus)) || 
                          (userStatus === "worker" && jobStatus === "Closed");

    const submitVisable = (userStatus === "manager" && ["Draft", "Quoting", "Worker Assignment", "Customer Review"].includes(jobStatus)) ||
                          (userStatus === "customer" && ["Draft", "Customer Review"].includes(jobStatus)) ||
                          (userStatus === "worker" && jobStatus === "Job Implementation");
// console.log(jobStatus+ userStatus+  userId+  customerId)
    console.log('quotingVisable ' + quotingVisable +'  assignVisable ' +assignVisable+ '  implementVisable '
    + implementVisable +"  reviewVisable "+ reviewVisable + "  submitVisable " + submitVisable);

    return { quotingVisable, assignVisable, implementVisable, reviewVisable, submitVisable };
}
