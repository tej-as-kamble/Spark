# Spark - Interaction Platform For Celebrities
A social media platform where celebrities can interact with their fans via chatting. Celebrities can add, edit, and delete messages for their Fans.

## Table of Contents
- Introduction
- Features
- Tech Stack
- Installation
- Usage
- Project Structure
- Deployment

---

## Introduction  
Spark is an interactive multi-user platform that enables secure communication between celebrities and their fans.  
- **Secure Communication**: Built with robust security measures to protect user interactions.  
- **Celebrity Verification**: Ensures only verified celebrities can engage with fans.  
- **Admin Panel**: Allows administrators to manage user requests and verify celebrity accounts, maintaining platform integrity. 

Spark provides a seamless and controlled environment where celebrities can interact with their fans while ensuring authenticity and security.

## Features
- **User Authentication**: Secure registration and login using JWT.  
- **Real-time Chat**: Fans can send messages to celebrities with admin approval.  
- **Celebrity Verification**: Ensuring only real celebrities can engage.  
- **Admin Panel**: Admins manage user requests and verify celebrity accounts.  
- **Responsive Design**: Fully optimized for mobile and desktop users.  
- **Backend API**: RESTful APIs for authentication, messaging, and account management.  

## Tech Stack and Tools
### Frontend:
- **React.js**  
- **HTML, CSS, JavaScript**  

### Backend:  
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Git**  

## Installation  

Follow these steps to set up the project locally:  

### Prerequisites:  
- Install **Node.js** and **npm**.  
- Ensure **MongoDB** is installed and running.  

### Clone the repository:  
```bash
git clone https://github.com/tej-as-kamble/Spark.git
cd Spark
```

### Install backend dependencies:
```bash
cd backend
npm install
```

### Configure backend environment variables:
Create a `.env` file inside the backend directory and add the following:
```ini
DATABASE_URI=mongodb://localhost:27017/spark
JWT_SECRET=your_secret_key
```

### Start the backend server:
```bash
npm start
```

### Install frontend dependencies:
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

### Start the frontend:
```bash
npm run dev
```

Your backend should now be running at `http://localhost:5000`, and the frontend at `http://localhost:3000`.

## Usage
- Visit the frontend in your browser: `http://localhost:3000`.
- Sign up or log in to the platform.
- Celebrities can send, edit, and delete messages.
- Fans can see messages of their favorite celebrity.
