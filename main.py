import os
from dotenv import load_dotenv
import sqlalchemy as db
import pandas as pd
import requests

load_dotenv()


def get_api_token():
    return os.getenv("API_TOKEN")


def fetch_data(api_token):
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
    engine = db.create_engine("sqlite:///soccergames.db")
    matches_df.to_sql("matches", con=engine, if_exists="replace", index=False)
    return engine


def query_database(engine):
    with engine.connect() as connection:
        query = db.text("SELECT * FROM matches;")
        query_result = connection.execute(query).fetchall()
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
