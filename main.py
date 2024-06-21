import requests
import pandas as pd
import sqlalchemy as db
from dotenv import load_dotenv
import os

load_dotenv()


def get_api_token():
    """Fetches the API token from the environment variables.

    Returns:
        str: The API token.

    Test cases:
    1. Normal case: The API token is fetched from the environment variables.
    2. Edge case: The API token is not found in the environment variables
    (None)
    3. Edge case: The API token is an empty string ('')
    """

    return os.getenv("API_TOKEN")


def fetch_data(api_token):
    """Fetches data from the API using the provided token.

    Args:
        api_token (str): The API token.

    Returns:
        dict: The JSON response from the API.

    Test cases:
    1. Normal case: Valid API token returns data.
    2. Edge case: Invalid API token returns an error.
    3. Edge case: API token is None.
    4. Edge case: Network issues causing a request failure.
    """

    url = (
    f"https://api.sportmonks.com/v3/football/fixtures?"
    f"api_token={api_token}"
)

    response = requests.get(url)
    if response.status_code == 200:
        matches = response.json()
        return matches
    else:
        return ValueError(f"ERROR: {response.status_code}")


def create_dataframe(matches):
    """Converts the API data into a pandas DataFrame.

    Args:
        data (dict): The JSON data from the API.

    Returns:
        pd.DataFrame: DataFrame containing match information.

    Test cases:
    1. Normal case: Data is correctly formatted and complete.
    2. Edge case: Data is missing some expected keys.
    3. Edge case: Data is empty.
    4. Edge case: Data is not in expected format (e.g., list instead of dict).
    """
    matches_df = pd.DataFrame(
        matches["data"],
        columns=[
            "id",
            "name",
            "starting_at",
            "result_info",
            "leg",
            "length",
            "has_odds",
        ],
    )
    return matches_df


def save_to_database(matches_df):
    """Saves the DataFrame to a SQLite database.

    Args:
        df (pd.DataFrame): The DataFrame to be saved.

    Test cases:
    1. Normal case: DataFrame is correctly formatted and saved.
    2. Edge case: DataFrame is empty.
    3. Edge case: DataFrame contains null values.
    """
    engine = db.create_engine("sqlite:///soccergames.db")
    matches_df.to_sql("matches", con=engine, if_exists="replace", index=False)
    return engine


def query_database(engine):
    """Queries the SQLite database and returns the result as a DataFrame.

    Args:
        engine (sqlalchemy.engine.Engine): The database engine.

    Returns:
        pd.DataFrame: DataFrame containing the query result.

    Test cases:
    1. Normal case: Database contains data and returns it correctly.
    2. Edge case: Database is empty.
    3. Edge case: Database connection issue.
    """
    with engine.connect() as connection:
        query_result = connection.execute(db.text("SELECT * FROM matches;")).fetchall()
    return pd.DataFrame(query_result)


def main():
    try:
        api_token = get_api_token()
        if not api_token:
            raise ValueError("API token not found")

        matches = fetch_data(api_token)
        matches_df = create_dataframe(matches)
        engine = save_to_database(matches_df)
        query_result = query_database(engine)
        print(query_result)
    except Exception as e:
        print(str(e))


if __name__ == "__main__":
    main()
