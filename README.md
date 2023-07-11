
## TASK TITAN Full stack application Part A



### R1: Website descriprion

Purpose:
The electrical contractor Wolf Electrical Enterprises Pty.Ltd
asked me to develop a platform for customers to initiate and track electrical trade jobs, the management than can provide a quote and after customer acceptance assign the job to the right workers and track their progress.  After the customer is satisfied with the work and signes off the job there is an option to leave a review.

Target Audience:
Trade  enterprises, customers, workers
If successfull this app can be easily adjusted to other trades and enterprises.

Features:
User sign up with email verification
User sign in
JWT authentication
Encrypted password (bcrypt + salted) stored in database
The app has a seperate view for Manager, tradies and customers
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

* Users must log in to add a new Job or review. Jobs can be canceled by the user who posted them or admin.

* Admin can view all users.

* Users can update their own details and delete their own accounts.

### Nice to have:
* Connect the app to google and facebook and publish the reviews on the business profiles
(I have had a service like that by Block (Former Square) I need to research if there are APIs available)

### Tech Stack


react, axios, expres.js, mongoose, multer, bcryptjs, jsonwebtoken 






### R2: Dataflow diagram

### R3: Application Architecture Diagram


### R4: User Stories

Title: User Profile Creation

Persona: As a new user (John, a 35-year-old tech enthusiast who loves trying out new apps)

What: I want to be able to create a personal profile

Why: So that I can customize my experience and keep track of my activities within the app.

Acceptance Criteria:

    When I open the app for the first time, I should be prompted to create a new profile.
    I should be able to enter my name, email address, and create a password.
    I should have the option to add a profile picture.
    I should be able to save my profile and view it.
    I should receive a confirmation email once my profile is successfully created.
    I should be able to edit my profile information at any time.


### R5: Wireframes

### R6: Screenshots Of Trello board

### [Trello board](https://trello.com/b/95B4bXrR/tasktitan)

![ImplementationPlan](./docs/Screenshot_trello.jpg)