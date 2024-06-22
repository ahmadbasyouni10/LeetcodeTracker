from main import (
    get_api_token,
    fetch_data,
    create_dataframe,
)
import os
from unittest.mock import patch, MagicMock
import pandas as pd
import unittest


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


if __name__ == "__main__":
    unittest.main()
