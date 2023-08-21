
# TASK TITAN
The purpose of this app is to provide a platform for customers and trades people to initiate trade jobs, assign them to workers and track their progress. Also give customers an option to leave a review.


![Screenshot Landing](./docs/screenshotsfrontend/ScreenshoLanding.jpg)






## TASK TITAN Full stack application Part A



### Main links of the project:

[Deployed version client 1](https://task-titan.netlify.app)


[Deployed version server 2](https://tasktitan-b07be6d2dd7a.herokuapp.com)


[TASK TITAN Full stack application Part B](#task-titan-full-stack-application-part-b)

[GIT Hub Client](https://github.com/stuWolf/TaskTitan/tree/integration)

[GIT Hub Server](https://github.com/stuWolf/Task_Titan_backend)

[Figma profile](https://www.figma.com/file/qX4jzRthi9lIYAqwHgjYf8/Task-Titan-Hero?type=design&node-id=0-1&mode=design&t=8PGbexuF1cPnLRi6-0)


[Trello board Part A](https://trello.com/b/95B4bXrR/tasktitan)

[Trello board Part B](https://trello.com/b/PkppCmaY/taks-titan-phase-2)



### R1: Website descriprion Purpose and Goals

Purpose:
The electrical contractor Wolf Electrical Enterprises Pty.Ltd
asked me to develop a platform for customers to initiate and track electrical trade jobs, the management than can provide a quote and after customer acceptance assign the job to the right workers and track their progress.  After the customer is satisfied with the work and signes off the job there is an option to leave a review.

### Desktop view:
![Workflow diagram](./docs/screenshots/Landing.jpg)
![Workflow diagram](./docs/screenshots/Create%20Job.jpg)


### Mobile view: 
![Workflow diagram](./docs/screenshots/Landing%20Phone.jpg)
![Workflow diagram](./docs/screenshots/Job%20creation%20phone.jpg)
![Workflow diagram](./docs/screenshots/Manager%20Phone.jpg)

Target Audience:
Trade  enterprises, customers, workers
If successfull this app can be easily adjusted to other trades and enterprises.

Features:

The app has the following core features:
* User Authentication: This includes user sign up with email verification, user sign in, and JWT authentication. This is a fundamental feature for any platform that handles user data.

* User Roles and Views: Different views for the business owner/manager, workers, and customers. This feature is crucial for providing a customized user experience based on the role of the user.

* Job Management: This includes the ability for customers to initiate new jobs and request quotes, for managers to quote on jobs and assign workers, and for workers to accept jobs and mark them as completed. This is the primary functionality of the platform.

* Notification System: Notifications for new jobs, job assignments, changes in job status, and new reviews. This feature is important for keeping all parties informed about the progress of jobs.

* Review System: The ability for customers to sign off on jobs and leave reviews. This feature is important for quality control and for providing feedback to workers.

* Search and Filter: The ability to search and filter jobs, tradespeople, or reviews. 

### In Detail: 
User sign up with email verification
User sign in with JWT authentication and Encrypted password (bcrypt + salted) stored in database
The app has a seperate view for Manager, tradies and customers.
### Functions for Business owner/ manager: 
* Gets notification when new job and quote requested by customer
* see all open jobs
* Quote on jobs
* Gets notification when quote accepted by customer
* can assign a worker to the job and add comment or refine job description
* Gets notification when job completed by worker
* review and close job
### Functions for worker
* Gets notification when new job assigned
* Worker can accept job
* Worker can mark job as completed
* can see all jobs assigned to him
### Functions for customer
* Can raise new job and request quote
* Gets notification when quote issued
* Customer can accept quote, give go ahead
* Customer can sign off on job and leave a rview.

### General functions: 
* Notification System: The platform can send notifications to users about important updates, such as new job postings, job assignments, changes in job status, and new reviews.
* Search and Filter: The platform can include a search and filter feature, allowing users to easily find specific jobs, tradespeople, or reviews. 
For example as the manager I want to see all jobs done for a specific customer or by a specific tradie.
Or I want to see all reviews for the work of a specific tradie.

* Users must log in to lodge a job or add a new Job or review. Jobs can be canceled by the user who posted them or the admin.

* Admin can view all users.

* Users can update their own details and delete their own accounts.

### Nice to have:
* Connect the app to google and facebook and publish the reviews on the business profiles
(I have had a service like that by Block (Former Square) I need to research if there are APIs available)

### Tech Stack


react, node, axios, expres.js, mongoose, MongoDB, multer, bcryptjs, jsonwebtoken, tailwind

### Workflow diagram

This diagram represents the flow of the process from the customer raising a new job and requesting a quote, through the manager and worker steps, and finally to the job being reviewed and closed. It also includes decision points where the customer or worker can reject a quote or decline a job, respectively, and the process loops back to an earlier step.



![Workflow diagram](./docs/screenshots/WorkflowDiagram.jpg)

### R2: Dataflow diagram
This diagram represents the following flows:

* User signs up and signs in through the Authentication Controller, which interacts with the Mongoose Model to create or authenticate the user in the MongoDB database.
* User creates a job, requests a quote, and accepts a quote through the Job Controller, which interacts with the Mongoose Model to create or update the job in the MongoDB database.
* User leaves a review through the Review Controller, which interacts with the Mongoose Model to create the review in the MongoDB database.
* User performs a search through the Search Controller, which interacts with the Mongoose Model to perform the search in the MongoDB database.

![Dataflow diagram](./docs/screenshots/DataflowDiagram.jpg)
### R3: Application Architecture Diagram
This diagram represents the following architecture:

* The User Interface communicates with the Express.js Server.
* The Express.js Server communicates with various controllers: Authentication Controller, Job Controller, Review Controller, and Search Controller.
* Each of these controllers communicates with their respective Mongoose Models: User Model, Job Model, Review Model, and Search Model.
* All of these models interact with the MongoDB database.


![Application Architecture Diagram](./docs/screenshots/ApplicationArchitectureDiagram.jpg)

### R4: User Stories for each of the core features



#### 1. User Profile Creation and Authentication

**Persona**: As a new user ( homeowner who needs electrical work done)

**What**: I want to be able to create a personal profile, sign up with email verification, and then sign in securely.

**Why**: So that I can customize my experience, keep track of my activities within the app, access the platform, and ensure my account is secure.

**Acceptance Criteria**:

- When I open the app for the first time, I should be prompted to create a new profile.
- I should be able to enter my name, email address, and create a password.
- I should be able to save my profile and view it.
- I should receive a confirmation email once my profile is successfully created.
- I should be able to edit my profile information at any time.
- Successful sign up with email verification, secure sign in with JWT authentication.

#### 2. User Roles and Views

   **Persona**: As a business owner (electrical contractor)

   **What**: I want to have a different view and capabilities in the app compared to workers and customers.

   **Why**: So that I can manage jobs, quotes, and assignments effectively.

   **Acceptance Criteria**: Successful differentiation of views and capabilities based on user roles.

#### 3. Job Management

   **Persona**: As a customer (homeowner)

   **What**: I want to be able to initiate new jobs and request quotes.

   **Why**: So that I can get my electrical work done.

   **Acceptance Criteria**: Successful creation of new jobs and request for quotes.

#### 4. Notification System

   **Persona**: As a worker (electrician)

   **What**: I want to receive notifications when new jobs are assigned to me and when their status changes.

   **Why**: So that I can stay updated on my work assignments.

   **Acceptance Criteria**: Successful receipt of notifications about job assignments and status changes.

#### 5. Review System

   **Persona**: As a customer (homeowner)

   **What**: I want to be able to sign off on completed jobs and leave reviews.

   **Why**: So that I can provide feedback on the work done.

   **Acceptance Criteria**: Successful sign off on completed jobs and submission of reviews.

#### 6. Search and Filter

   **Persona**: As a business owner ( electrical contractor)

   **What**: I want to be able to search and filter jobs, tradespeople, or reviews.

   **Why**: So that I can easily find specific information on the platform.

   **Acceptance Criteria**: Successful search and filter of jobs, tradespeople, or reviews.





### R5: Wireframes


The wireframes show the views of the 3 different roles (Customer, manager, worker) and the job forms according to the process step of a job (left to right, top to bottom) 
Please see [Workflow diagram](#workflow-diagram)

[Figma profile Desktop](https://www.figma.com/file/Qc9RsG9uiw8wHdraibVZ3r/TASK-TITAN-Desktop?type=design&mode=design&t=aUQgCNr24lFKXHUB-0)
![Desktop Overview PDF ](./docs/screenshots/TASK%20TITAN%20Desktop.jpg)

[Figma profile Mobile](https://www.figma.com/file/NWs8T35YOfVAsmh0kb2b2c/Task-Titan-iPhone?type=design&mode=design&t=slEHRmwWZw6L0kR5-0)
![Desktop Overview PDF ](./docs/screenshots/Task%20Titan%20iPhone(1).jpg)

### R6: Screenshots Of Trello board

### [Trello board](https://trello.com/b/95B4bXrR/tasktitan)
01/07/23
![ImplementationPlan](./docs/screenshots/Trello12_07.jpg)
13/07/23
![ImplementationPlan](./docs/screenshots/Trello20230713.jpg)
14/07/23
![ImplementationPlan](./docs/screenshots/Trello14_07.jpg)
15/07/23
![ImplementationPlan](./docs/screenshots/Trello15_07.jpg)
16/07/23
![ImplementationPlan](./docs/screenshots/Trello16_07.jpg)

## TASK TITAN Full stack application Part B

[Back to  Part A](#task-titan-full-stack-application-part-a)


A long journeys end! it was well and truly an enoumous task to create an app like this.
the hero of the app is a job form that changes its status and visability according to workstep and the different roles.
 It doesn't look like much but the ligic behind it is pretty cracy. It is not easy to pass information between the different components and than all the async functions does not make it easier.

 enclosed an overview about the Job form

![JobForm](.//docs/JobFormOverview.jpg)




Deployed version: 
[Deployed version client 1](https://task-titan.netlify.app)
[Deployed version client 2](https://tasktitan.onrender.com)  Both are working but can't talk to the backend
[Deployed version server 1](https://task-titan-render.onrender.com)
[Deployed version server 2](https://tasktitan-2ec5140db0ab.herokuapp.com)  Produces Application error, no error log

[Figma profile](https://www.figma.com/file/qX4jzRthi9lIYAqwHgjYf8/Task-Titan-Hero?type=design&node-id=0-1&mode=design&t=8PGbexuF1cPnLRi6-0)


[Trello Part B](https://trello.com/b/PkppCmaY/taks-titan-part-b)





![ImplementationPlan](./docs/screenshotsfrontend/Backend_deployment.jpg)


That is about as far as I got.

Test in production environment:
The backend is connected to Atlas cloud server
The frontend is deployed too but there where issues with the server. Timeout and CORS.




# Errors found:

CORS error During login:

Access to fetch at 'https://task-titan-render.onrender.com/login' from origin 'https://tasktitan.onrender.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
http://localhost:3001/login. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 200.

Basically the frontend needs to send instead of http://localhost:3001/login 
Access-Control-Allow-Origin: http://localhost:3001/login 

# Testing: 

Routes Test
![Routes test:](./docs/RoutesTest.jpg)

Integration test
Functional test continuously
