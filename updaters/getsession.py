from pyrogram import Client
from config import API_HASH, API_ID

bot = Client("regacc", API_ID, API_HASH, in_memory=True)

async def g():
    await bot.start()

    print(await bot.export_session_string())
    await bot.stop()

bot.run(g())