import threading
import asyncio
import os
from pyrogram import Client
import db
from config import API_ID, API_HASH, UPLOAD_FOLDER, FILECHAT
import pyrofix

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

async def uploadworker():
    bot = Client(os.path.join(BASE_DIR, "acc"), API_ID, API_HASH)
    while True:
        await asyncio.sleep(1)
        tasks = db.check_tasks()
        if tasks:
            # print(f"New tasks: {tasks}")
            await bot.start()
            file, _id, owner = tasks.pop()
            print(f"file: {file}\n_id: {_id}\nowner: {owner}")
            doc = await bot.send_document(FILECHAT, UPLOAD_FOLDER + '/' + file, caption=_id, disable_notification=True, progress=lambda cur, tot: print(f"{cur / (1024*1024):.2f}MB / {tot / (1024*1024):.2f}MB"))
            did = doc.id
            db.uploaded(_id, did)
            os.remove(UPLOAD_FOLDER + '/' + file)
            await bot.stop()

def uw_asyncrun():
    asyncio.run(uploadworker())

def on_starting(server):
    th = threading.Thread(target=uw_asyncrun, daemon=True)
    th.start()

bind = "127.0.0.1:4090"
workers = 4