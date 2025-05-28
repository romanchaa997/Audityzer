import sqlite3
import subprocess
import time
import os
import json

def setup_db():
    conn = sqlite3.connect('phishing_data.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scripts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            apis TEXT
        )
    ''')
    conn.commit()
    return conn

def launch_browser(url):
    subprocess.run(['node', 'f:\\Ігор\\Audityzer\\phishing_sim\\agents\\puppeteerAgent.js', url])

def extract_scripts(script_urls_file):
    subprocess.run(['python', 'script_extractor.py'])
    return wait_for_json_file(script_urls_file)

def scan_apis(script_urls_file):
    subprocess.run(['python', 'api_scanner.py', script_urls_file])

def store_to_db(script_urls_file, conn):
    with open(script_urls_file, 'r') as f:
        script_data = json.load(f)

    cursor = conn.cursor()
    for url, apis in script_data.items():
        cursor.execute('INSERT INTO scripts (url, apis) VALUES (?, ?)',
                      (url, json.dumps(apis)))
    conn.commit()

def wait_for_json_file(file_path, timeout=30):
    start_time = time.time()
    while not os.path.exists(file_path):
        if time.time() - start_time > timeout:
            raise TimeoutError(f"Timeout waiting for {file_path}")
        time.sleep(1)
    return file_path

def main():
    url = 'https://parik-24.io'
    script_urls_file = 'script_urls.json'

    conn = setup_db()

    launch_browser(url)
    extract_scripts(script_urls_file)
    scan_apis(script_urls_file)
    store_to_db(script_urls_file, conn)

    conn.close()

if __name__ == "__main__":
    main