import aiosqlite, random, string, json
from typing import Any, List, Dict, Optional

DB_NAME = "cloud.db"

class Database:
    def __init__(self):
        self.conn: Optional[aiosqlite.Connection] = None
        
    async def connect(self):
        """Устанавливает асинхронное соединение с базой данных."""
        if not self.conn:
            self.conn = await aiosqlite.connect(DB_NAME)
            self.conn.row_factory = aiosqlite.Row
            await self.init_tables()

    async def init_tables(self):
        """Создает необходимые таблицы."""
        await self.conn.execute("""
            CREATE TABLE IF NOT EXISTS files (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                idg TEXT NOT NULL,
                status INTEGER NOT NULL DEFAULT 0,
                ownertoken TEXT NOT NULL,
                tgmessageid INTEGER,
                ip TEXT NOT NULL,
                views INTEGER NOT NULL DEFAULT 0,
                viewsIP TEXT NOT NULL DEFAULT "[]",
                size INTEGER NOT NULL DEFAULT 0,
                owner TEXT,
                coowners TEXT NOT NULL DEFAULT "[]"
            );
        """)

        await self.conn.execute("""
            CREATE TABLE IF NOT EXISTS webUsers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                token TEXT NOT NULL,
                ip TEXT NOT NULL,
                own TEXT NOT NULL DEFAULT "[]",
                flashes TEXT NOT NULL DEFAULT "[]",
                username TEXT
            );
        """)
        await self.conn.commit()

    async def check_id(self, idg: str) -> bool:
        """Проверяет, существует ли idg (вернет True, если не существует)."""
        async with self.conn.execute("SELECT idg FROM files WHERE idg = ?", (idg,)) as cursor:
            return await cursor.fetchone() is None

    async def change_status(self, _id: str, status: int):
        await self.conn.execute("UPDATE files SET status = ? WHERE idg = ?", (status, _id))
        await self.conn.commit()

    async def addfile(self, _id: str, filename: str, ownertoken: str, size: int, ip: str, user_token: str):
        await self.conn.execute("INSERT INTO files (name, idg, ownertoken, ip, size, owner) VALUES (?, ?, ?, ?, ?, ?)", 
                                (filename, _id, ownertoken, ip, size, user_token))
        await self.conn.commit()

    async def setfilename(self, _id: str, name: str):
        await self.conn.execute("UPDATE files SET name = ? WHERE idg = ?", (name, _id))
        await self.conn.commit()

    async def check_tasks(self) -> List[aiosqlite.Row]:
        """Возвращает файлы со статусом 0."""
        async with self.conn.execute("SELECT name, idg, ownertoken FROM files WHERE status = 0") as cursor:
            return await cursor.fetchall()
        
    async def uploaded(self, _id: str, tgmsgid: int):
        await self.change_status(_id, 1)
        await self.conn.execute("UPDATE files SET tgmessageid = ? WHERE idg = ?", (tgmsgid, _id))
        await self.conn.commit()

    async def search(self, idg: str) -> List[aiosqlite.Row]:
        async with self.conn.execute("SELECT tgmessageid, ownertoken, name, status, size, owner FROM files WHERE idg = ?", (idg,)) as cursor:
            return await cursor.fetchall()

    async def get_owner(self, _id: str) -> Optional[aiosqlite.Row]:
        async with self.conn.execute("SELECT ownertoken FROM files WHERE idg = ?", (_id,)) as cursor:
            return await cursor.fetchone()

    async def getfile(self, _id: str) -> Optional[aiosqlite.Row]:
        async with self.conn.execute("SELECT * FROM files WHERE idg = ?", (_id,)) as cursor:
            return await cursor.fetchone()

    async def view(self, _id: str, ip: str):
        async with self.conn.execute("SELECT views, viewsIP FROM files WHERE idg = ?", (_id,)) as cursor:
            row = await cursor.fetchone()

        if row:
            views = row["views"] + 1
            try:
                viewsip = json.loads(row["viewsIP"])
            except:
                viewsip = []
                
            if ip not in viewsip:
                viewsip.append(ip)
                await self.conn.execute("UPDATE files SET viewsIP = ? WHERE idg = ?", (json.dumps(viewsip), _id))
            
            await self.conn.execute("UPDATE files SET views = ? WHERE idg = ?", (views, _id))
            await self.conn.commit()

    async def front_create_user(self, ip: str) -> str:
        token = "".join(random.choices(string.ascii_letters + string.digits, k=26))
        username = "".join(random.choices(string.ascii_letters + string.digits, k=6))
        
        try:
            await self.conn.execute("INSERT INTO webUsers (token, ip, username, own) VALUES (?, ?, ?, ?)", (token, ip, username, "[]"))
            await self.conn.commit()
            return token
        except Exception as e:
            print(f"DB Error: {e}")
            return ""

    async def get_own(self, user_token: str) -> Optional[aiosqlite.Row]:
        async with self.conn.execute("SELECT own FROM webUsers WHERE token = ?", (user_token,)) as cursor:
            return await cursor.fetchone()

    async def get_webUser_files(self, user_token: str) -> List[Dict[str, str]]:
        user_row = await self.get_own(user_token)
        if not user_row:
            return []
        
        try:
            owns = json.loads(user_row["own"])
        except:
            owns = []
            
        nowns = []
        
        for own in owns:
            async with self.conn.execute(
                "SELECT owner, coowners FROM files WHERE idg = ? AND ownertoken = ?", 
                (own["fileid"], own["owner"])
            ) as cursor:
                ce_row = await cursor.fetchone()
                
            if ce_row:
                coowners_list = json.loads(ce_row["coowners"])
                if ce_row["owner"] == user_token or user_token in coowners_list:
                    nowns.append(own)
        
        return nowns

    async def front_update_own(self, own: str, user_token: str):
        await self.conn.execute("UPDATE webUsers SET own = ? WHERE token = ?", (own, user_token))
        await self.conn.commit()

    async def front_doOwn(self, user_token: str, _id: str, ownertoken: str) -> bool:
        row = await self.get_own(user_token)
        current_own = []

        if row:
            try:
                current_own = json.loads(row['own'])
            except:
                current_own = []
        
        for item in current_own:
            if item.get("fileid") == _id:
                return False

        new = {"fileid": _id, "owner": ownertoken}
        current_own.append(new)
        own = json.dumps(current_own)

        await self.conn.execute("UPDATE webUsers SET own = ? WHERE token = ?", (own, user_token))
        await self.conn.commit()
        return True

    async def get_me(self, user_token: str) -> Dict[str, Any]:
        async with self.conn.execute("SELECT ip, username FROM webUsers WHERE token = ?", (user_token,)) as cursor:
            row = await cursor.fetchone()
        if not row: return {}
        
        return {"ip": row["ip"], "username": row["username"]}

    async def set_username(self, user_token: str, new_username: str) -> bool:
        async with self.conn.execute("SELECT token FROM webUsers WHERE username = ? AND token != ?", (new_username, user_token)) as cursor:
            if await cursor.fetchone():
                return False
        
        await self.conn.execute("UPDATE webUsers SET username = ? WHERE token = ?", (new_username, user_token))
        await self.conn.commit()
        
        async with self.conn.execute("SELECT changes() as count") as cursor:
            changes = await cursor.fetchone()
            return changes["count"] > 0

    async def getflashes(self, user_token: str, erase: bool = True) -> List[Dict[str, str]]:
        user_row = await self.conn.execute("SELECT flashes FROM webUsers WHERE token = ?", (user_token,))
        user_row = await user_row.fetchone()
        if not user_row: return []
        
        try:
            userflashes = json.loads(user_row["flashes"])
        except:
            userflashes = []

        if erase and userflashes:
            await self.conn.execute("UPDATE webUsers SET flashes = ? WHERE token = ?", ("[]",user_token))

        user_data = await self.get_own(user_token)
        owns = []
        if user_data:
            try:
                owns = json.loads(user_data["own"])
            except:
                owns = []

        fileflashes = []
        for own in owns:
            async with self.conn.execute("SELECT flashes FROM files WHERE idg = ? AND ownertoken = ?", (own["fileid"], own["owner"])) as cursor:
                f_row = await cursor.fetchone()
                
            if f_row:
                try:
                    filefl = json.loads(f_row["flashes"])
                    fileflashes.extend(filefl)
                    if erase and fileflashes:
                        await self.conn.execute("UPDATE files SET flashes = ? WHERE idg = ?", ("[]",own["fileid"]))
                except:
                    pass
                    
        if erase:
            await self.conn.commit()
            
        return userflashes + fileflashes

    async def flash(self, message: str, category: str = "message", unique: bool = False, idg: str = None, user_token: str = None) -> None:
        if {"message": message, "category": category} not in await self.getflashes(user_token, False) or not unique:
            
            if idg:
                row = await self.conn.execute("SELECT flashes FROM files WHERE idg = ?", (idg,))
                row = await row.fetchone()
                if row:
                    filefl = json.loads(row["flashes"])
                    filefl.append({"message":message, "category": category})
                    await self.conn.execute("UPDATE files SET flashes = ? WHERE idg = ?", (json.dumps(filefl, ensure_ascii=False), idg))
                    await self.conn.commit()

            elif user_token:
                row = await self.conn.execute("SELECT flashes FROM webUsers WHERE token = ?", (user_token,))
                row = await row.fetchone()
                if row:
                    userfl = json.loads(row["flashes"])
                    userfl.append({"message":message, "category": category})
                    await self.conn.execute("UPDATE webUsers SET flashes = ? WHERE token = ?", (json.dumps(userfl, ensure_ascii=False), user_token))
                    await self.conn.commit()

    async def check_token(self, user_token: str) -> bool:
        async with self.conn.execute("SELECT token FROM webUsers WHERE token = ?", (user_token,)) as cursor:
            return await cursor.fetchone() is not None

db = Database()