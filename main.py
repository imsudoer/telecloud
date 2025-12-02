import os, re
import user_agents as ua
import json
import urllib.parse
import string
import random
import asyncio
import socket
from quart import Quart, request, jsonify, Response, render_template, make_response, redirect, flash, render_template_string
from werkzeug.exceptions import InternalServerError
from pyrogram import Client
from reporter import report
import db as dbase
import pyrofix
from config import *
from keys import *
import security as sec

with open(__file__, 'rb') as f:
    VERSION = "".join(random.choices(string.ascii_letters ,k=8))

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MIMETYPES = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.ogg': 'video/ogg', '.pdf': 'application/pdf',
    '.mp3': 'audio/mpeg', '.txt': 'text/plain', '.js': 'text/plain', '.css': 'text/plain',
    '.html': 'text/plain', '.py': 'text/plain', '.c': 'text/plain', '.cpp': 'text/plain',
    '.java': 'text/plain', '.rb': 'text/plain', '.json': 'application/json', '.xml': 'application/xml',
    '.md': 'text/plain', '.log': 'text/plain', '.sh': 'text/plain', '.cfg': 'text/plain',
}

db = dbase.db 
security = sec.SecurityManager(db)

def formatsize(size: int):
    K = 1024; M = K * 1024; G = M * 1024
    if size < K: return f"{size:.2f} B"
    elif size < M: return f"{size / K:.2f} KB"
    elif size < G: return f"{size / M:.2f} MB"
    else: return f"{size / G:.2f} GB"

app = Quart(__name__)
app.config["SECRET_KEY"] = ""

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def idg():
    return "".join(random.choices(string.ascii_letters + string.digits, k=random.randint(4,12)))

def gip(rquest):
    return rquest.headers.get('X-Real-IP')

def ishuman(rquest):
    return not ua.parse(rquest.headers.get("User-Agent")).is_bot

async def uploadworker():
    bot = Client("acc", API_ID, API_HASH, session_string=uwsession, device_model="Cloud UploadWorker")
    await bot.start()
    try:
        while True:
            await asyncio.sleep(1)
            try:
                tasks = await db.check_tasks() 
            except:
                continue
            if tasks:
                file, _id, owner = tasks.pop()
                try:
                    doc = await bot.send_document(FILECHAT, "storage/"+file, caption=_id, disable_notification=True)
                    did = doc.id
                    await db.uploaded(_id, did)
                    await asyncio.to_thread(os.remove, "storage/"+file) 
                except Exception as e:
                    await db.change_status(_id, 2)
                    print(f"Error in uploadworker: {e}")
    finally:
        await bot.stop()

dlbot = None

async def dldrbot(msgid):
    try:
        message = await dlbot.get_messages(FILECHAT, msgid)
        async for chunk in dlbot.stream_media(message):
            yield chunk
    except Exception as e:
        print(f"Error streaming file {msgid}: {e}")

BOT_LOCK_PORT = 4099
lock_socket = None

@app.before_serving
async def startup():
    global lock_socket, dlbot
    
    await db.connect() 
    await security.init_tables() 
    
    dlbot = Client("dldr", API_ID, API_HASH, session_string=dldrsession, device_model="Cloud DownloadWorker")
    await dlbot.start()
    
    try:
        lock_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        lock_socket.bind(("127.0.0.1", BOT_LOCK_PORT))
        app.add_background_task(uploadworker)
    except OSError:
        pass

@app.route('/upload', methods=['POST'])
async def upload_file():
    files = await request.files
    if 'file' not in files: return jsonify({"error":'No file part'}), 400
    file = files['file']
    if file.filename == '': return jsonify({"error":'No filename', "ok": False}), 400

    filename = file.filename
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    await file.save(save_path)
    file_size = os.path.getsize(save_path)

    if file_size > MAX_UPLOAD_SIZE:
        await asyncio.to_thread(os.remove, save_path)
        return jsonify({"error":f"File too large. Max size: {MAX_UPLOAD_SIZE}", "ok": False})

    while True:
        _id = idg()
        if await db.check_id(_id): break 
    ownertoken = idg()
    user_ip = request.headers.get('X-Real-IP')
    user_token = request.cookies.get("user_token")

    await asyncio.to_thread(report, "upload", id=_id, filename=filename, ownertoken=ownertoken, user=user_token)
    await db.addfile(_id, filename, ownertoken, file_size, user_ip, user_token)
    
    user_token = request.cookies.get('user_token')
    if user_token:
        try:
            row = await db.get_own(user_token)
            current_own = []
            if row:
                try: current_own = json.loads(row)
                except: current_own = []
            
            new_entry = {"fileid": _id, "owner": ownertoken}
            current_own.append(new_entry)
            await db.front_update_own(json.dumps(current_own), user_token)
            await db.flash("load files", "system", True, user_token=user_token)
        except Exception: 
            raise

    return jsonify({"url":BASE_URL+"/file/"+_id, "owner":ownertoken, "id": _id, "ok": True})

@app.route("/file/<filename>", methods=["GET","DELETE"])
@security.wr_process
async def r_file(filename):
    file_data = await db.search(filename)
    if not file_data: return jsonify({"error":f"No file exists with ID {filename}", "ok": False})
    
    file = file_data[0]
    msgid, ownertoken, name, status, size, owner = file
    user = await db.get_me(owner)
    f = await db.getfile(filename)

    if await security.ua_checker(request) not in ["browser"]:
        return await render_template_string(("<!DOCTYPE html>"
                                            '<html lang="ru"><head><meta property="og:title" content="{{ filename }} | OnlySq Cloud">'
                                            '<meta property="og:description" content="Файл {{ filename }} загружен{% if username %} пользователем @{{ username }}'
                                            '{% else %} анонимно{% endif %} в OnlySq Cloud. Размер: {{ filesize }}. Просмотры: {{ views }} ({{ unique }})"></head>'),
    filename=filename, username=user.get("username"), filesize = formatsize(size),
    views = f["views"], unique = len(json.loads(f["viewsIP"])))
    
    if request.method == "GET":
        if status == 0:
            await asyncio.to_thread(report, "requested too early", id=filename)
            return jsonify({"error":"File is not ready yet", "ok":False}), 425
        if status == 2:
            return jsonify({"error":"Deleted","ok":False})

        user_ip = request.headers.get('X-Real-IP')
        
        mode = request.args.get("mode")
        _, ext = os.path.splitext(urllib.parse.unquote(name).lower())
        mime = MIMETYPES.get(ext)
        if ishuman(request):
            await db.view(filename, user_ip)

        if mode == "view" and mime:
            _mime = mime
            _head = {"Content-Disposition": f"inline; filename=\"{urllib.parse.quote(name)}\""}
        elif mode == "dl":
            _mime = "application/octet-stream"
            _head = {"Content-Disposition": f"attachment; filename=\"{urllib.parse.quote(name)}\""}
        elif mode == "report":
            await asyncio.to_thread(report, "⚠️ reported", id=filename, topic=errtopicid)
            return jsonify({"ok": True})
        else:
            return await render_template(
                "download.html",
                version = VERSION,
                filename=name,
                filesize = formatsize(size),
                username = user.get("username"),
                views = f["views"],
                unique = len(json.loads(f["viewsIP"])),
                viewable = "."+name.split(".")[1] in MIMETYPES,
                ispic = "."+name.split(".")[1] in ['.png', '.jpg', '.jpeg', '.gif']
            )
            
        return Response(dldrbot(msgid), mimetype=_mime, headers=_head)
        
    elif request.method == "DELETE":
        h_owner = request.headers.get("Authorization")
        if not h_owner or (h_owner != ownertoken and h_owner != ADMIN_TOKEN):
            return jsonify({"error":"Forbidden", "ok": False}), 401
        
        await db.change_status(filename, 2)
        return jsonify({"ok": True})

@app.route("/delete/<filename>")
async def r_delete(filename):
    file_data = await db.search(filename)
    if not file_data: return jsonify({"ok":False, "error":"No file found"})
    file = file_data[0]
    h_owner = request.headers.get("Authorization") or request.args.get("auth")
    if not h_owner or (h_owner != file[1] and h_owner != ADMIN_TOKEN):
         return jsonify({"error":"Forbidden", "ok": False}), 401

    await db.change_status(filename, 2)
    return jsonify({"ok": True})

@app.route('/')
async def index():
    rendered = await render_template("index.html", version = VERSION)
    response = await make_response(rendered)
    
    token = request.cookies.get('user_token')
    user_exists = False
    if token:
        user_exists = await db.check_token(token)

    if not token or not user_exists:
        user_ip = request.headers.get('X-Real-IP')
        new_token = await db.front_create_user(user_ip)
        
        if new_token:
            response.set_cookie('user_token', new_token, max_age=60*60*24*365)
            
    return response

@app.route('/api/me', methods=['GET'])
async def r_me():
    token = request.cookies.get('user_token')
    if not token:
        return jsonify({"ok": False}), 401
    
    row = await db.get_me(token)

    if not row:
        return jsonify({"ok": False}), 404

    res = {}
    res["ip"] = row["ip"]
    res["username"] = row["username"]
    res["ok"] = True

    return jsonify(res)

@app.route('/api/setme/username', methods=['POST'])
async def r_setme_username():
    token = request.cookies.get('user_token')
    if not token:
        return jsonify({"ok": False, "error": "Unauthorized"}), 401

    try:
        data = await request.get_json()
        new_username = data.get('username')
    except:
        return jsonify({"ok": False, "error": "Invalid JSON"}), 400

    if not new_username:
        return jsonify({"ok": False, "error": "Username is required"}), 400

    if not (6 <= len(new_username) <= 24 and re.match(r'^[a-zA-Z0-9]+$', new_username)):
        return jsonify({"ok": False, "error": "Username must be 6-24 Latin letters/digits"}), 400

    try:
        success = await db.set_username(token, new_username)
        if success:
            return jsonify({"ok": True})
        else:
            return jsonify({"ok": False, "error": "Username already taken or token invalid"})
    except Exception as e:
        print(f"Error setting username: {e}")
        return jsonify({"ok": False, "error": "Server error during update"}), 500

@app.route('/api/files', methods=['GET'])
async def r_files():
    token = request.cookies.get('user_token')
    if not token:
        return jsonify({"ok": False, "error": "Unauthorized"}), 401
    files = await db.get_webUser_files(token)

    if not files:
        return jsonify([])

    resp = []

    for item in files:
        fid = item.get('fileid')
        fowner = item.get('owner')
        # print("fid", fid)
        # print("fowner", fowner)
        
        if not fid or not fowner:
            continue

        file_row = await db.getfile(fid)
        # print(*file_row)
        # print("status", file_row['status'])
        
        if file_row and file_row['status'] != 2:
            try: 
                views_ip = json.loads(file_row["viewsIP"])
            except: 
                views_ip = []
            resp.append({
                "id": fid,
                "name": urllib.parse.unquote(file_row['name']),
                "owner_key": fowner,
                "views": file_row["views"],
                "unique": len(views_ip),
                "size": formatsize(file_row["size"])
            })
            
    return jsonify(resp[::-1])

@app.route('/api/loadtoken', methods=['POST'])
@security.wr_bruteforce("loadtoken")
async def r_loadtoken():
    try: data = await request.get_json()
    except: return jsonify({"ok": False}), 400
    token = data.get('token')
    if not token: return jsonify({"ok": False}), 400

    user_exists = await db.check_token(token)
    if not user_exists: return jsonify({"ok": False, "error": "Token not exists"}), 404

    response = jsonify({"ok": True, "message": "Session loaded"})
    response.set_cookie('user_token', token, max_age=60*60*24*365) 
    return response

@app.route("/api/flashes")
async def r_flashes():
    usr = request.cookies.get('user_token')
    if not usr: return jsonify([])
    flashes = await db.getflashes(usr)
    return jsonify(flashes)

@app.route("/api/rename", methods=["POST"])
async def r_rename():
    user_token = request.cookies.get("user_token")
    if not user_token:
        return jsonify({"ok":"false","error":"Unauthorized"}), 403

    js = await request.get_json(silent=True)
    if not js:
        return jsonify({"ok":"false","error":"No request json found"}), 400
    
    try:
        await db.setfilename(js["file"],js["name"])
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"ok":"false","error":e}), 500

@app.route('/share/<file>')
async def r_share(file):
    if not ishuman(request):
        return jsonify({"ok":False, "error":"Bot detected"})
    usr = request.cookies.get('user_token')
    response = await make_response(redirect(BASE_URL, code=302))

    user_ip = request.headers.get('X-Real-IP') or request.remote_addr
    
    user_exists = False
    if usr:
        user_exists = await db.check_token(usr)

    if not usr or not user_exists:
        usr = await db.front_create_user(user_ip)
        response = await make_response(redirect(BASE_URL, code=302))
        response.set_cookie('user_token', usr, max_age=60*60*24*365)
    else:
        response = await make_response(redirect(BASE_URL, code=302))

    try:
        _id, ownerkey = file.split("_")
        exist = await db.getfile(_id)
        if exist:
            db_owner = await db.get_owner(_id)
            if ownerkey == db_owner[0] or ownerkey == ADMIN_TOKEN:
                success = await db.front_doOwn(usr, _id, ownerkey)
                if not success:
                    await flash(f"Вы уже являетесь владельцем файла \"{exist['name']}\"")
                    return response
                await flash(f"Вы стали владельцем файла \"{exist['name']}\"")
                await db.flash(f"Новый владелец у файла \"{exist['name']}\"", idg=_id)
                await asyncio.to_thread(report, "owned", id=_id)
        return response
    except Exception:
        return response
    

@app.errorhandler(InternalServerError)
async def handle_50(e):

    if await security.ua_checker(request) == "browser":
        code = 500
        error_message = str(e.original_exception) if e.original_exception else str(e)
        
        return await render_template(
            '500.html', 
            error_code=code, 
            error_message=error_message
        ), code
    else:
        return {"ok": False, "error": "500 "+str(e)}

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=4090)
