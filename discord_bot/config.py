import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("discord_token_id")
API_URL = os.getenv("API_URL")
ALERT_CHANNEL_ID = int(os.getenv("ALERT_CHANNEL_ID"))