import sqlite3, random, string, json
ch = string.ascii_letters + string.digits

conn = sqlite3.connect('cloud.db')
conn.row_factory = sqlite3.Row
cur = conn.cursor()

new = [
    {
        "webUsers": 'username TEXT'
    },
    {
        "files": 'owner TEXT'
    },
    {
        "files": 'coowners TEXT NOT NULL DEFAULT "[]"'
    },
]

for task in new:
    for table, col in task.items():
        print(f" >> Task: \"{table}\' ADD \"{col}\"")
        try:
            cur.execute(f"ALTER TABLE {table} ADD COLUMN {col}")
            conn.commit()
            print(f"success '{col}' -> '{table}'")
        except sqlite3.OperationalError as e:
            if "duplicate column name:" in str(e):
                print(f"'{table}': '{col}' exists")
            else:
                print(f"err '{col}' -> '{table}': {e}")

        except sqlite3.Error as e:
            print(f"SQLite err: {e}")

print(" >> Task: usernames")

cur.execute("SELECT id, username FROM webUsers")
mass = cur.fetchall()

if not mass:
    print("База данных не содержит записей для обработки.")
else:

    for row in mass:
        if not row["username"]:
            cur.execute("UPDATE webUsers SET username = ? WHERE id = ?", ("".join(random.choices(ch, k=8)), row["id"]))
            conn.commit()

print(" >> Task: owners")

cur.execute("SELECT token, own FROM webUsers")
mass = cur.fetchall()

if not mass:
    print("База данных не содержит записей для обработки.")

else:
    for row in mass:
        token = row['token']
        owns = json.loads(row['own'])

        for own in owns:
            ce = cur.execute("SELECT owner, coowners FROM files WHERE idg = ? AND ownertoken = ?", (own["fileid"], own["owner"])).fetchone()
            if ce:
                if not ce["owner"]:
                    cur.execute("UPDATE files SET owner = ? WHERE idg = ?", (token, own["fileid"]))
                elif ce["owner"] != token:
                    co = json.loads(ce["coowners"])
                    if token not in co:
                        co.append(token)
                        cur.execute("UPDATE files SET coowners = ? WHERE idg = ?", (json.dumps(co), own["fileid"]))
                else:
                    pass
                conn.commit()

print(" [ DONE ]")

conn.close()