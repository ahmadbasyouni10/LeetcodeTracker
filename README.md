# SEO-Tech-Developer-Football-Fixtures-Project

![example workflow](https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project/actions/workflows/check-style.yaml/badge.svg)
![example workflow](https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project/actions/workflows/test.yaml/badge.svg)

This project retrieves football match fixtures from the Sportmonks API, stores them in an SQLite database, and displays the stored data.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmadbasyouni10/SEO-Tech-Developer-Project
   cd SEO-Tech-Developer-Project
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
* Retrieves football match fixtures from the Sportmonks API using requests.
* Parses the JSON data into a Pandas DataFrame (matches_df).
* Creates an SQLite database named soccergames.db using SQLAlchemy (engine).
* Stores the match data into an SQLite table named matches.
* Fetches and prints all rows from the matches table using SQL queries (SELECT * FROM matches;).

