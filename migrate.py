import subprocess
import os
import glob

def create_directories():
    """Create the new directory structure."""
    directories = [
        "Audityzer/src",
        "Audityzer/tests",
        "Audityzer/docs",
        "Audityzer/plugins",
        "Audityzer/templates",
        "Audityzer/examples",
        "Audityzer/scripts",
        "Audityzer/config",
        "Audityzer/reports",
        "Audityzer/assets",
        "Audityzer/packages",
    ]
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created {directory}")

def move_files():
    """Move files and directories with git mv to preserve history."""
    moves = [
        ("src", "Audityzer/src"),
        ("backend", "Audityzer/src/backend"),
        ("frontend", "Audityzer/src/frontend"),
        ("tests", "Audityzer/tests/core"),
        ("playwright-tests", "Audityzer/tests/playwright"),
        ("Audityzer-community-tests", "Audityzer/tests/community"),
        ("autotests", "Audityzer/tests/autotests"),
        ("docs", "Audityzer/docs/core"),
        ("docs-site", "Audityzer/docs/site"),
        ("plugins", "Audityzer/plugins"),
        ("templates", "Audityzer/templates"),
        ("examples", "Audityzer/examples/core"),
        ("mocked-sample-app", "Audityzer/examples/mocked-app"),
        ("scripts", "Audityzer/scripts/core"),
        ("utils", "Audityzer/scripts/utils"),
        ("config", "Audityzer/config"),
        ("reports", "Audityzer/reports/core"),
        ("playwright-report", "Audityzer/reports/playwright"),
        ("coverage", "Audityzer/reports/coverage"),
        ("assets", "Audityzer/assets/core"),
        ("media", "Audityzer/assets/media"),
        ("packages", "Audityzer/packages/core"),
        # Move configuration files to config/
        (".env", "Audityzer/config/.env"),
        (".env-example", "Audityzer/config/.env-example"),
        (".env-server-example", "Audityzer/config/.env-server-example"),
        (".firebase-config.json", "Audityzer/config/.firebase-config.json"),
        (".firebase-config.example.json", "Audityzer/config/.firebase-config.example.json"),
        (".audityzer.json", "Audityzer/config/.audityzer.json"),
        ("babel.config.json", "Audityzer/config/babel.config.json"),
        ("jest.config.js", "Audityzer/config/jest.config.js"),
        ("playwright.config.js", "Audityzer/config/playwright.config.js"),
        ("tsconfig.json", "Audityzer/config/tsconfig.json"),
        ("vite.config.ts", "Audityzer/config/vite.config.ts"),
        ("tailwind.config.js", "Audityzer/config/tailwind.config.js"),
        ("postcss.config.js", "Audityzer/config/postcss.config.js"),
    ]
    for source, destination in moves:
        if os.path.exists(source):
            subprocess.run(["git", "mv", source, destination], check=True)
            print(f"Moved {source} to {destination}")
        else:
            print(f"Source {source} not found, skipping...")

def handle_submodules():
    """Handle Git submodules (move but preserve as submodules)."""
    submodules = [
        "Airdrop",
        "darkforest-v0.6",
        "my-vue-app",
        "stream-drip-bot",
        "uniswap-dapp-starter",
    ]
    for submodule in submodules:
        if os.path.exists(submodule):
            subprocess.run(["git", "mv", submodule, f"Audityzer/examples/{submodule}"], check=True)
            print(f"Moved submodule {submodule} to Audityzer/examples/{submodule}")
        else:
            print(f"Submodule {submodule} not found, skipping...")

def update_imports():
    """Update import paths in JavaScript/TypeScript files."""
    # Find all JS/TS files
    files = glob.glob("Audityzer/**/*.js", recursive=True) + glob.glob("Audityzer/**/*.ts", recursive=True)
    for file in files:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            # Replace old paths with new ones
            updated_content = content.replace(
                '"./src/', '"./Audityzer/src/'
            ).replace(
                '"./backend/', '"./Audityzer/src/backend/'
            ).replace(
                '"./frontend/', '"./Audityzer/src/frontend/'
            ).replace(
                '"./tests/', '"./Audityzer/tests/core/'
            )
            if updated_content != content:
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"Updated imports in {file}")
        except Exception as e:
            print(f"Error updating {file}: {e}")

def commit_changes():
    """Stage and commit all changes."""
    subprocess.run(["git", "add", "."], check=True)
    subprocess.run(["git", "commit", "-m", "Reorganized Audityzer into modular structure"], check=True)
    print("Changes committed!")

if __name__ == "__main__":
    if not os.path.exists(".git"):
        print("Error: This is not a Git repository. Initialize Git first.")
        exit(1)
    create_directories()
    move_files()
    handle_submodules()
    update_imports()
    commit_changes()