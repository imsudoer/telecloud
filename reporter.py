from telebot import TeleBot
from config import bot_tokens, chatid, topicid, errtopicid
from flask import request
from itertools import cycle

bots = []

def get_bot(key):
    return TeleBot(token=key, parse_mode="HTML")

for k in bot_tokens:
    bots.append(get_bot(k))

cy = cycle(bots)

def report(action, **kwargs):
    kwargs.get("topic", topicid)
    output = []
    for key, value in kwargs.items():
        output.append(f"{key.capitalize()}: {value}")

    bot: TeleBot = next(cy)
    try:
        ip = request.headers.get('X-Real-IP', "Cloud")
        web = request.cookies.get("user_token")
        if web:
            web = f"\n🌐 Web User: <code>{request.cookies.get('user_token')}</code>"
        bot.send_message(chatid, f"New Action from IP <code>{ip}</code> {action}{web if web else ''}\n"+"\n".join(output), parse_mode='HTML', message_thread_id=topicid, disable_web_page_preview=True)
        
    except Exception as e:
        bot.send_message(chatid, f"Unknown error:\n{e}", parse_mode='HTML', message_thread_id=errtopicid, disable_web_page_preview=True)