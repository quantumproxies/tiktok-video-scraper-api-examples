"""Minimal TikTok video API call — one typed row per video.

Docs & schema: https://quanticdata.io/collectors/tiktok-video-scraper-api/
"""
import json
import os

import requests

API = "https://api.quanticdata.io/v1/scraper/collectors/tiktok_video/run"
KEY = os.environ["QD_API_KEY"]  # https://quanticdata.io/

payload = {
        "videos": [
            "https://www.tiktok.com/@nasa/video/7668779420412284191"
        ],
        "max_results": 5
    }

r = requests.post(
    API,
    headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
    json=payload,
    timeout=180,
)
r.raise_for_status()
data = r.json()["payload"]

for row in data["results"]:
    print(row.get("video_id"), row.get("url"), row.get("description"))
print(f"{len(data['results'])} videos, cost ${data['cost']}")
