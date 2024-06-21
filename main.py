import requests
import pandas as pd
import sqlalchemy as db
from dotenv import load_dotenv
import os

load_dotenv()

api_token = os.getenv('API_TOKEN')
url = f'https://api.sportmonks.com/v3/football/fixtures?api_token={api_token}'
response = requests.get(url)


if response.status_code == 200:
    matches = response.json()
    matches_df = pd.DataFrame(matches['data'], columns=['id', 'name',
                                                        'starting_at', 
                                                        'result_info',
                                                        'leg', 
                                                        'length', 
                                                        'has_odds'])
    engine = db.create_engine('sqlite:///soccergames.db')
    matches_df.to_sql('matches', con=engine, if_exists='replace', index=False)

    with engine.connect() as connection:
        query_result = connection.execute(
            db.text('SELECT * FROM matches;')
            ).fetchall()
        print(pd.DataFrame(query_result))
else:
    print('Error:', response.status_code)
