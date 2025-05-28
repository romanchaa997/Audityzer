
import subprocess
import time
import os
import json

def run_stealth_agent(url):
    subprocess.run(['node', 'f:\\Ігор\\Audityzer\\phishing_sim\\agents\\puppeteerAgent.js', url])

def wait_for_json_file(file_path):
    while not os.path.exists(file_path):
        time.sleep(1)
    print(f"JSON file {file_path} found.")

def run_scan_js():
    subprocess.run(['node', 'scanJS.js'])

def main():
    url = 'https://parik-24.io'
    script_urls_file = 'script_urls.json'

    # Run stealthAgent.js
    run_stealth_agent(url)

    # Wait for the JSON file to be created
    wait_for_json_file(script_urls_file)

    # Run scanJS.js
    run_scan_js()

if __name__ == "__main__":
    main()