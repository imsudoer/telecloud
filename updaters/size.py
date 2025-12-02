import sqlite3
from pyrogram import Client
from pyrogram.errors import MessageIdInvalid
from pyrogram import filters
conn = sqlite3.connect("cloud.db", check_same_thread=False)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("SELECT tgmessageid FROM files")
mass = cur.fetchall()

FILE_CHAT_ID = -100
bot = Client("acc")

@bot.on_message(filters.user())
async def update_file_sizes(client: Client, message):
    if not mass:
        print("База данных не содержит записей для обработки.")
        await client.stop()
        return

    for row in mass:
        tgmessage_id = row['tgmessageid']
        file_size = None
        
        try:
            message = await client.get_messages(
                chat_id=FILE_CHAT_ID, 
                message_ids=tgmessage_id
            )
            
            if message and message.media:
                media_type = message.media.value 
                media_obj = getattr(message, media_type)
                
                if hasattr(media_obj, 'file_size'):
                    file_size = media_obj.file_size
                    print(f"ID: {tgmessage_id}, Size: {file_size} bytes")
                else:
                    print(f"ID: {tgmessage_id}: Медиафайл ({media_type}) не содержит атрибута file_size.")

            else:
                print(f"ID: {tgmessage_id}: Сообщение не найдено или не содержит медиа.")


        except Exception as e:
            print(f"ошибка при обработке {tgmessage_id}: {e}")
            
        if file_size is not None:
            try:
                cur.execute(
                    "UPDATE files SET size = ? WHERE tgmessageid = ?",
                    (file_size, tgmessage_id)
                )
                conn.commit()
                print(f"-> Обновлена запись для ID: {tgmessage_id}")
            except Exception as db_e:
                print(f" Ошибка БД для {tgmessage_id}: {db_e}")
                conn.rollback()

    conn.close()

if __name__ == "__main__":
    try:
        bot.run() 
    except KeyboardInterrupt:
        print("Скрипт остановлен пользователем")