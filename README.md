# LeetcodeTracker-SEO-Tech-Developer

![example workflow](https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project/actions/workflows/check-style.yaml/badge.svg)
![example workflow](https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project/actions/workflows/test.yaml/badge.svg)

Leetcode Tracker helps you track your problems for coding interviews, by allowing users to CRUD coding problems. Users can track the name of each problem, its status (Solved, Unsolved, In Progress), and add notes to assist with review before an interview. Built with Python Flask, React, ChakraUI, and SQLite3.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmadbasyouni10/LeetcodeTracker-SEO-Tech-Developer
   cd LeetcodeTracker-SEO-Tech-Developer
    ```

2. Install Dependencies:
  ```bash
   pip install requests pandas sqlalchemy python-dotenv
  ```

3. Create a .env file:
* Claim your api key through sportmonks:
  https://www.sportmonks.com/football-apis
```bash
API_TOKEN=your_api_token_here
 ```

## How To Run
```bash
python main.py
 ```

## Overview
* Allows users to create, read, update, and delete (CRUD) Leetcode problems.
* Tracks the name of each problem, its status (Solved, Unsolved, In Progress), and notes for review before an interview.
* Built with Python Flask for the backend.
* Uses React and ChakraUI for the frontend interface.
* Utilizes SQLite3 as the database to store problem data.
* Provides a user-friendly interface to manage and organize coding problems effectively.

