# LeetcodeTracker-SEO-Tech-Developer

![example workflow](https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project/actions/workflows/check-style.yaml/badge.svg)
![example workflow](https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project/actions/workflows/test.yaml/badge.svg)

Leetcode Tracker helps you track your problems for coding interviews, by allowing users to CRUD coding problems. Users can track the name of each problem, its status (Solved, Unsolved, In Progress), and add notes to assist with review before an interview. Built with Python Flask, React, ChakraUI, and SQLite3.

# Project Setup/Run Instructions

## Backend Setup

1. **Create a Virtual Environment**
   - Open your terminal.
   - Navigate to your project directory.
   - Run `python -m venv venv` to create a virtual environment named `venv`.

2. **Activate the Virtual Environment**
   - On Windows, run `.\venv\Scripts\activate`.
   - On macOS and Linux, run `source venv/bin/activate`.

3. **Install Dependencies**
   - Ensure your virtual environment is activated.
   - Install Flask and other dependencies by running:
     ```
     pip install Flask flask_sqlalchemy flask_cors
     ```

4. **Set Environment Variables**
   - Set the Flask application environment variable:
     - On Windows, run `set FLASK_APP=app.py`.
     - On macOS and Linux, run `export FLASK_APP=app.py`.
   - Optionally, set the environment to development for debug mode:
     - On Windows, run `set FLASK_ENV=development`.
     - On macOS and Linux, run `export FLASK_ENV=development`.

5. **Initialize the Database**
   - Ensure your Flask application is correctly set up to connect to the database.
   - Run `flask shell` and then `from app import db; db.create_all()` to initialize your database.

6. **Run the Flask Application**
   - Run `flask run --reload` to start the Flask application with auto-reload enabled.

## Frontend Setup

1. **Ensure Node.js and npm are Installed**
   - Verify Node.js installation: `node -v`.
   - Verify npm installation: `npm -v`.
   - If not installed, download and install from [Node.js official website](https://nodejs.org/).

2. **Install Dependencies**
   - Navigate to the frontend directory: `cd frontend`.
   - Run `npm install` to install all required dependencies including React icons and Chakra UI.
   - Specifically for React icons and Chakra UI, run:
     ```
     npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
     npm install @chakra-ui/icons
     npm install react-icons
     ```

3. **Run the Development Server**
   - Still in the frontend directory, run `npm run dev` to start the development server.

## Note
- Remember to deactivate the virtual environment when you're done working on the project by running `deactivate` in the terminal.
- For the frontend, ensure you are outside the virtual environment to run npm commands.

## Overview
* Allows users to create, read, update, and delete (CRUD) Leetcode problems.
* Tracks the name of each problem, its status (Solved, Unsolved, In Progress), and notes for review before an interview.
* Built with Python Flask for the backend.
* Uses React and ChakraUI for the frontend interface.
* Utilizes SQLite3 as the database to store problem data.
* Provides a user-friendly interface to manage and organize coding problems effectively.

