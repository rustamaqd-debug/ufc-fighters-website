import json
import re

# Read current fighters.js
with open(r"C:\Users\user\.gemini\antigravity\scratch\ufc-fighters-website\fighters.js", "r", encoding="utf-8") as f:
    content = f.read()

print("File loaded successfully. Size:", len(content))
