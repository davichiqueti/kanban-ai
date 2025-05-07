from models import Board
import smtplib
from email.mime.text import MIMEText
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


def send_email(to_email: str, subject: str, body: str):
    from_email = "reports@kanbaiai.com"
    password = "your-email-password"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.example.com", 465) as server:
        server.login(from_email, password)
        server.sendmail(from_email, to_email, msg.as_string())


def generate_board_email_report(board: Board, email: str):
    report = generate_board_report(board)
