from models_ import Board
import requests
import os
import json


def __generate_prompt(board_data: str) -> str:
    return f"Generate a detailed report for the following, focused on an manager view of status and summary.Kanban board:{board_data}"


def generate_board_report(board: Board) -> str:
    board_data = json.dumps(board, default=str)
    payload = {
        "contents": [{
            "parts":[{"text": __generate_prompt(board_data)}]
            }]
    }
    api_key = os.environ["AI_API_KEY"]
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    response = requests.post(url, json=payload)
    response.raise_for_status()
    data = response.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


"""         "messages": [
            {
                "role": "user",
                "content": "Generate a detailed report for the following board"
            },
            {
                "role": "user",
                "content": str(board_dict)
            }
        ], """
