import requests, traceback
import os, sys

if len(sys.argv) < 2:
    sys.exit(1)

URL = "https://cloud.onlysq.ru/upload"
FILE = sys.argv[1]

try:
    with open(FILE, "rb") as f:
        files = {"file": (os.path.basename(FILE), f, "application/octet-stream")}
        response = requests.post(URL, files=files)
        response.raise_for_status()
        print(response.json())
except Exception as e:
    traceback.print_exc()
input("press enter")