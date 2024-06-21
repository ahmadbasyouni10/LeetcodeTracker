import unittest
from unittest.mock import patch, MagicMock
import os
import pandas as pd
from main import (
    get_api_token,
    fetch_data,
    create_dataframe,
    save_to_database,
    query_database,
)


class TestMain(unittest.TestCase):

    # Test get_api_token (normal, none, empty)
    @patch.dict(os.environ, {"API_TOKEN": "test_token"})
    def test_get_api_token(self):
        self.assertEqual(get_api_token(), "test_token")

    @patch.dict(os.environ, {"API_TOKEN": "test_token"}, clear=True)
    def test_get_api_token_none(self):
        del os.environ["API_TOKEN"]
        self.assertIsNone(get_api_token())

    @patch.dict(os.environ, {"API_TOKEN": ""})
    def test_get_api_token_empty(self):
        self.assertEqual(get_api_token(), "")

    # Test fetch_data (normal, edge, edge, edge)
    @patch("requests.get")
    def test_fetch_data_valid_token(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "data": [
                {
                    "id": 1,
                    "name": "Match 1",
                    "starting_at": "2024-06-21",
                    "result_info": "Result",
                    "leg": 1,
                    "length": 90,
                    "has_odds": True,
                }
            ]
        }
        mock_get.return_value = mock_response
        api_token = "valid_token"
        result = fetch_data(api_token)
        self.assertEqual(result, mock_response.json())

    @patch("requests.get")
    def test_fetch_data_invalid_token(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 401
        mock_get.return_value = mock_response

        api_token = "invalid_token"
        result = fetch_data(api_token)
        self.assertIsInstance(result, ValueError)
        self.assertEqual(str(result), "ERROR: 401")

    def test_create_dataframe(self):
        matches = {
            "data": [
                {
                    "id": 1,
                    "name": "Match 1",
                    "starting_at": "2024-06-21",
                    "result_info": "Result",
                    "leg": 1,
                    "length": 90,
                    "has_odds": True,
                }
            ]
        }
        df = create_dataframe(matches)
        self.assertEqual(
            list(df.columns),
            ["id", "name", "starting_at", "result_info", "leg",
             "length", "has_odds"],
        )
        self.assertEqual(df.iloc[0]["id"], 1)

    @patch("sqlalchemy.create_engine")
    def test_save_to_database(self, mock_create_engine):
        df = pd.DataFrame(
            [
                {
                    "id": 1,
                    "name": "Match 1",
                    "starting_at": "2024-06-21",
                    "result_info": "Result",
                    "leg": 1,
                    "length": 90,
                    "has_odds": True,
                }
            ]
        )
        mock_engine = MagicMock()
        mock_create_engine.return_value = mock_engine

        result_engine = save_to_database(df)
        mock_create_engine.assert_called_once_with("sqlite:///soccergames.db")
        self.assertEqual(result_engine, mock_engine)

    @patch("sqlalchemy.create_engine")
    def test_query_database(self, mock_create_engine):
        mock_engine = MagicMock()
        mock_connection = MagicMock()
        mock_result = [(1, "Match 1", "2024-06-21", "Result", 1, 90, True)]
        mock_connection.execute.return_value \
            .fetchall.return_value = mock_result
        mock_engine.connect.return_value.__enter__.return_value = mock_connection
        mock_create_engine.return_value = mock_engine

        result_df = query_database(mock_engine)
        self.assertEqual(len(result_df), 1)
        self.assertEqual(result_df.iloc[0][0], 1)
        self.assertEqual(result_df.iloc[0][1], "Match 1")


if __name__ == "__main__":
    unittest.main()
