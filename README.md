# Tasklinker

Tasklinker is a full-stack web application designed to connect businesses (clients) with freelancers. The platform facilitates detailed user profiles, AI-based matching, secure communication, project management,  The application includes real-time chat functionality and uses a dark black and golden theme with Poppins and Karla fonts.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure signup and login for both freelancers and clients.
- **Dynamic Dashboards**: Separate dashboards for freelancers and clients, displaying relevant information.
- **Project Management**: Clients can post projects; freelancers can view and apply for projects.
- **Real-time Chat**: Instant messaging between clients and freelancers using Socket.io.
- **Responsive Design**: Dark theme with black and golden colors, optimized for all devices.
- **Protected Routes**: Only authenticated users can access certain pages.

## Tech Stack

- **Frontend**: HTML, CSS (Poppins and Karla fonts), JavaScript (Vanilla JS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Express-Session
- **Real-time Communication**: Socket.io

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine
- MongoDB installed locally or an active MongoDB Atlas account

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tasklinker.git
   cd tasklinker

2. **Install dependencies**:
   ```bash
   npm install

3. **Create environment variables: Create a .env file in the root directory and add the following:**:
   ```bash
   PORT=8080
   EMAIL_USER=change with you email
   EMAIL_PASS=change with your pass-key


## Database Setup

1. **Connect to MongoDB**
    - If using MongoDB Atlas, ensure your connection string in .env is correct.
    - If using a local MongoDB server, start your MongoDB server and ensure the MONGO_URI is set accordingly.

2. **Seed the database (optional):**
    - You can add some seed data for testing by running a script or using tools like MongoDB Compass or Mongoose.


## Running the application
1. **Start the server**
    ```bash
    npm start
This will start the application on http://localhost:8080.

2. Access the application: Open your web browser and go to http://localhost:8080.

## Project Structure
    ```bash
    Tasklinker/
    │
    ├── public/                  # Static files (CSS, JS, images)
    │   ├── css/
    │   ├── js/
    │   └── images/
    │
    ├── routes/                  # Express routes
    │   ├── freelancer.js
    │   ├── client.js
    │   └── index.js
    │
    ├── models/                  # Mongoose models
    │   ├── Freelancer.js
    │   ├── Client.js
    │   ├── Project.js
    │   └── Message.js
    │
    ├── views/                   # EJS templates
    │   ├── freelancer-dashboard.ejs
    │   ├── client-dashboard.ejs
    │   ├── signup.ejs
    │   ├── login.ejs
    │   ├── terms-of-service.ejs
    │   └── chat.ejs
    │
    ├── .env                     # Environment variables
    ├── app.js                   # Main application file
    ├── package.json             # Node.js dependencies and scripts
    ├── README.md                # Project documentation
    └── server.js                # Server setup and configuration
    ```


## Usage


1. User Registration:
- Freelancers and clients can sign up through their respective signup pages.
- Once registered, users can log in to access their dashboards.

2. Dashboard Access:
- Freelancer Dashboard: View profile, available projects, and start chats with clients.
- Client Dashboard: Post new projects, view freelancer profiles, and initiate hiring.

3. Real-time Chat:
- Both freelancers and clients can chat with each other in real-time after connecting via the chat option in the dashboard.

4. Project Management:
- Clients can post projects and manage them through their dashboards.
- Freelancers can view projects and apply or contact clients directly.

## Contributing
Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

  ```bash
  This code is ready to be pasted into your `README.md` file. Make sure to replace placeholders like `your-username` with the actual details for your project.
  ```
