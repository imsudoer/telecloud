import sqlite3

new = [
    {
        "files": "views INTEGER NOT NULL DEFAULT 0"    
    },
    {
        "files": 'viewsIP TEXT NOT NULL DEFAULT "[]"'
    },
    {
        "files": "size INTEGER NOT NULL DEFAULT 0"
    },
    {
        "webUsers": 'flashes TEXT NOT NULL DEFAULT "[]"'
    },
    {
        "files": 'flashes TEXT NOT NULL DEFAULT "[]"'
    }
]

for task in new:
    for table, col in task.items():
        print(f"Task: \"{table}\' ADD \"{col}\"")
        try:
            conn = sqlite3.connect('cloud.db')
            cur = conn.cursor()
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
        finally:
            if conn:
                conn.close()