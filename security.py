import aiosqlite    
from quart import jsonify, make_response, abort, Request
from typing import Literal
import time
from functools import wraps
from reporter import report
from config import RPS_LIM, RATE_STEP_S, \
                   BAN_DUR_S, BAN_RPS, BAN_STEP_S, \
                   GLOB_F_LIMIT, GLOB_F_STEP_S, \
                   BRUTE_LIMIT, BRUTE_STEP_S

UA_SCRIPTS = [
    'python', 'curl', 'wget', 'http-client', 'aiohttp', 'urllib',
    'java/', 'golang', 'postman', 'axios', 'scrapy', 'powershell'
]

UA_BOTS = [
    'bot', 'crawler', 'spider', 'slurp', 'facebookexternalhit', 
    'ahrefs', 'semrush', 'mj12bot', 'yandexbot', 'googlebot'
]

UA_BROWSERS = ['mozilla', 'chrome', 'safari', 'opera', 'edg']

class SecurityManager:

    def __init__(self, db):
        self.db = db 
        self.conn: aiosqlite.Connection = None

    async def init_tables(self):
        if not self.db.conn:
            await self.db.connect()
        self.conn = self.db.conn
        
        # RATE_LIMITS
        await self.conn.execute("""
            CREATE TABLE IF NOT EXISTS ratelimits (
                ip TEXT PRIMARY KEY,
                resetTime REAL NOT NULL,
                count INTEGER NOT NULL
            )
        """)
        # BAN_TRACKER
        await self.conn.execute("""
            CREATE TABLE IF NOT EXISTS bantracker (
                ip TEXT NOT NULL,
                idg TEXT NOT NULL,
                resetTime REAL NOT NULL,
                count INTEGER NOT NULL,
                PRIMARY KEY (ip, idg)
            )
        """)
        # BANLIST
        await self.conn.execute("""
            CREATE TABLE IF NOT EXISTS banlist (
                ip TEXT PRIMARY KEY,
                banUntil REAL NOT NULL,
                reason TEXT
            )
        """)
        # GLOBAL_FILE_TRACKER
        await self.conn.execute("""
            CREATE TABLE IF NOT EXISTS filetracker (
                idg TEXT PRIMARY KEY,
                resetTime REAL NOT NULL,
                count INTEGER NOT NULL
            )
        """)
        
        await self.conn.commit()

    async def cleanup(self):
        """Clean outdated (DELETE WHERE time < now)."""
        now = time.time()
        
        await self.conn.execute("DELETE FROM ratelimits WHERE resetTime < ?", (now - RATE_STEP_S,))
        await self.conn.execute("DELETE FROM bantracker WHERE resetTime < ?", (now - BAN_STEP_S,))
        await self.conn.execute("DELETE FROM filetracker WHERE resetTime < ?", (now - GLOB_F_STEP_S,))
        await self.conn.execute("DELETE FROM banlist WHERE banUntil < ?", (now,))
        
        await self.conn.commit()

    async def process(self, ip: str, idg: str):
        """
        Main file security check (ASYNC)
        """
        now = time.time()
        
        try:
            # Banlist Check
            async with self.conn.execute("SELECT banUntil, reason FROM banlist WHERE ip = ?", (ip,)) as cursor:
                row = await cursor.fetchone()

            if row:
                until = row["banUntil"]
                if now < until:
                    bantime_left = int(until - now)
                    res = await make_response(jsonify({"ok": False, "error": f"Banned until {time.ctime(until)}."}), 403)
                    res.headers["Retry-After"] = str(bantime_left)
                    return res
                else:
                    await self.conn.execute("DELETE FROM banlist WHERE ip = ?", (ip,))
                    await self.conn.commit()

            # Global File Ratelimit
            async with self.conn.execute("SELECT resetTime, count FROM filetracker WHERE idg = ?", (idg, )) as cursor:
                row = await cursor.fetchone()

            if not row or now > row["resetTime"]:
                new_resetTime = now + GLOB_F_STEP_S
                await self.conn.execute(
                    "INSERT OR REPLACE INTO filetracker (idg, resetTime, count) VALUES (?, ?, ?)",
                    (idg, new_resetTime, 1)
                )
                glob_count = 1
            else:
                glob_count = row["count"] + 1
                await self.conn.execute("UPDATE filetracker SET count = ? WHERE idg = ?", (glob_count, idg))

                if glob_count > GLOB_F_LIMIT:
                    retry_after = int(row["resetTime"] - now) + 1
                    await self.conn.commit()
                    res = await make_response(jsonify(ok=False, error="Too many requests to that file."), 429)
                    res.headers["Retry-After"] = str(retry_after)
                    return res
            
            await self.conn.commit()

            # IP Ratelimits
            async with self.conn.execute("SELECT resetTime, count FROM ratelimits WHERE ip = ?", (ip,)) as cursor:
                row = await cursor.fetchone()
            
            if not row or now > row["resetTime"]:
                new_resetTime = now + RATE_STEP_S
                await self.conn.execute(
                    "INSERT OR REPLACE INTO ratelimits (ip, resetTime, count) VALUES (?, ?, ?)",
                    (ip, new_resetTime, 1)
                )
                rate_count = 1
            else:
                rate_count = row["count"] + 1
                await self.conn.execute("UPDATE ratelimits SET count = ? WHERE ip = ?", (rate_count, ip))

                if rate_count > RPS_LIM:
                    retry_after = int(row['resetTime'] - now) + 1
                    await self.conn.commit()
                    res = await make_response(jsonify(ok=False, error="Too many requests from that IP."), 429)
                    res.headers['Retry-After'] = str(retry_after)
                    return res
            
            await self.conn.commit()

            # Ban Tracker
            async with self.conn.execute("SELECT resetTime, count FROM bantracker WHERE ip = ? AND idg = ?", (ip, idg)) as cursor:
                row = await cursor.fetchone()

            if not row or now > row["resetTime"]:
                new_resetTime = now + BAN_STEP_S
                await self.conn.execute(
                    "INSERT OR REPLACE INTO bantracker (ip, idg, resetTime, count) VALUES (?, ?, ?, ?)",
                    (ip, idg, new_resetTime, 1)
                )
                bantracker_count = 1
            else:
                bantracker_count = row["count"] + 1
                await self.conn.execute("UPDATE bantracker SET count = ? WHERE ip = ? AND idg = ?", (bantracker_count, ip, idg))

                if bantracker_count > BAN_RPS:
                    ban_until = now + BAN_DUR_S
                    await self.conn.execute("INSERT OR REPLACE INTO banlist (ip, banUntil, reason) VALUES (?, ?, ?)", (ip, ban_until, "Too many requests to one resource."))
                    # report("banned", ip=ip, reason="\"Too many requests to one resource.\"")
                    await self.conn.commit()
                    
                    retry_after = int(BAN_DUR_S)
                    res = await make_response(jsonify(ok=False, error="Too many requests to one resource."), 403)
                    res.headers['Retry-After'] = str(retry_after) 
                    return res
            
            await self.conn.commit()
            
            await self.cleanup()
            
            return None

        except aiosqlite.Error as e:
            return await make_response(jsonify(ok=False, error=f"Server SQL Error: {e}"), 500)
    
    async def check_bruteforce(self, ip: str, idg: str = 'login') -> tuple[bool, int]:
        """Check wrong try counter (ASYNC)."""
        now = time.time()
        
        async with self.conn.execute(
            "SELECT resetTime, count FROM bantracker WHERE ip = ? AND idg = ?", 
            (ip, idg)
        ) as cursor:
            row = await cursor.fetchone()

        if not row or now > row["resetTime"]:
            new_resetTime = now + BRUTE_STEP_S
            await self.conn.execute(
                "INSERT OR REPLACE INTO bantracker (ip, idg, resetTime, count) VALUES (?, ?, ?, ?)",
                (ip, idg, new_resetTime, 1)
            )
            await self.conn.commit()
            return True, BRUTE_LIMIT - 1
        
        current_count = row["count"] + 1
        await self.conn.execute(
            "UPDATE bantracker SET count = ? WHERE ip = ? AND idg = ?",
            (current_count, ip, idg)
        )
        await self.conn.commit()
        
        attempts_left = BRUTE_LIMIT - current_count
        
        if current_count > BRUTE_LIMIT:
            ban_until = now + BAN_DUR_S
            await self.conn.execute(
                "INSERT OR REPLACE INTO banlist (ip, banUntil, reason) VALUES (?, ?, ?)",
                (ip, ban_until, f"Bruteforce on {idg}")
            )
            report("banned", ip=ip, reason=f"\"Bruteforce on {idg}\"")
            await self.conn.commit()
            return False, 0
        
        return True, attempts_left
    
    async def ua_checker(self, request: Request) -> str:
        """Check User-Agent, return category"""
        user_agent = request.headers.get('User-Agent', '')
        if not user_agent or len(user_agent) < 5: return 'other'
        ua_lower = user_agent.lower()

        for keyword in UA_SCRIPTS:
            if keyword in ua_lower: return 'script'
        for keyword in UA_BOTS:
            if keyword in ua_lower: return 'bot'

        is_browser = any(sig in ua_lower for sig in UA_BROWSERS)
        if is_browser: return 'browser'
        return 'other'
    
    def wr_process(self, f):
        """calls process but for routes"""
        @wraps(f)
        async def wrapper(*args, **kwargs):
            from quart import request
            ip = request.headers.get('X-Real-IP')
            idg = kwargs.get("filename", "unknown")
            error_response = await self.process(ip, idg)
            if error_response: abort(error_response)
            return await f(*args, **kwargs)
        return wrapper
    
    def wr_bruteforce(self, idg: str):
        """Brute checker"""
        def decorator(f):
            @wraps(f)
            async def wrapper(*args, **kwargs):
                from quart import request 
                ip = request.headers.get('X-Real-IP')
                allowed, attempts_left = await self.check_bruteforce(ip, idg)
                if not allowed:
                    res = await make_response(jsonify(ok=False, error=f"Too many attempts on {idg}. IP temporarily banned."), 403)
                    abort(res)
                return await f(*args, **kwargs)
            return wrapper
        return decorator

    def wr_useragent(self, allow: list[Literal["browser", "bot", "script", "other"]] = ["browser"]):
        """Check useragent with @"""
        def decorator(f):
            @wraps(f)
            async def wrapper(*args, **kwargs):
                from quart import request 
                rtype = await self.ua_checker(request)
                err = None

                if rtype in allow:
                    return await f(*args, **kwargs)
                
                if rtype == 'script':
                    err = "Blocked: Script/Tool User-Agent detected."
                elif rtype == 'bot':
                    err = "Blocked: Automated Bot User-Agent detected."
                elif rtype == 'other':
                    err = "Blocked: Missing or suspicious User-Agent signature."
                elif rtype == 'browser':
                    err = "Blocked: Browsers not allowed here."
                
                error_response = await make_response(
                    jsonify(ok=False, error=err), 
                    403
                )
                abort(error_response)
            return wrapper
        return decorator