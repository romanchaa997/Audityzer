#!/usr/bin/env bash
# create-demo-video.sh
# Records a terminal session with Terminalizer and converts it to MP4 using FFmpeg.

set -e

# New behaviour (2025-05):
# 1. Spawns the demo dApp found under examples/demo-dapp using `serve` on port 5001.
# 2. Executes a Playwright demo test (tests/demo-flow.spec.ts) pointing to that URL.
# 3. Captures the entire automated terminal session with Terminalizer → GIF → MP4 → WebP.
# 4. Ensures clean shutdown of background server even on Ctrl-C / script error.
#
# The resulting files are stored in media/ and will be picked up by the Playwright GitHub
# workflow (upload-artifacts) then attached to release drafts.

# -------- CONFIG --------
DEMO_DIR="examples/demo-dapp"
PORT="5001"
TARGET_URL="http://localhost:${PORT}"
PLAYWRIGHT_SPEC="tests/demo-flow.spec.ts"
OUTPUT_DIR="media"
GIF_NAME="web3fuzzforge-quickstart.gif"
MP4_NAME="web3fuzzforge-quickstart.mp4"
# ------------------------

# Ensure deps
if ! command -v terminalizer &> /dev/null; then
  echo "Installing terminalizer globally..."
  npm install -g terminalizer
fi

# Detect FFmpeg cross-platform
if ! command -v ffmpeg >/dev/null 2>&1; then
  # Git Bash on Windows sometimes lacks `command`, fallback to `which`
  if ! which ffmpeg >/dev/null 2>&1; then
    # PowerShell launched via Git Bash may still not find it, fallback to `where` (Windows native)
    if command -v where >/dev/null 2>&1 && ! where ffmpeg 1> /dev/null 2>&1; then
      echo "FFmpeg is required but was not found in your PATH."
      echo "\nFix suggestions:" \
           "\n  • Windows  : winget install ffmpeg  (then restart your shell)" \
           "\n  • macOS    : brew install ffmpeg" \
           "\n  • Linux    : sudo apt-get install ffmpeg  # or pacman/apt/yum depending on distro" \
           "\nAfter installing, reopen the terminal so that updated PATH is picked up."
      exit 1
    fi
  fi
fi

# Ensure Node.js is available in Git Bash on Windows
if ! command -v node >/dev/null 2>&1; then
  # 1) Try NVM environment variables
  for envVar in NVM_SYMLINK NVM_HOME; do
    eval p="\${$envVar}"
    if [ -n "$p" ]; then
      # Convert Windows path to Unix path using cygpath if available
      if command -v cygpath >/dev/null 2>&1; then
        p="$(cygpath -u "$p")"
      else
        # crude conversion C:\foo -> /c/foo
        p="/$(echo "$p" | sed -E 's#^([A-Za-z]):\\\\#\L\1/#;s#\\\\#/#g')"
      fi
      export PATH="$PATH:$p"
    fi
  done

  # 2) Common install directories
  for p in "/c/Program Files/nodejs" "/c/Program Files (x86)/nodejs" "/c/nvm" "/c/nvm4w"; do
    if [ -x "$p/node.exe" ]; then
      export PATH="$PATH:$p"
      break
    fi
  done

  # 3) Ask Windows 'where' command for node.exe
  if command -v where >/dev/null 2>&1; then
    node_win_path=$(where node 2>/dev/null | head -n 1 | tr -d '\r')
    if [ -n "$node_win_path" ]; then
      if command -v cygpath >/dev/null 2>&1; then
        node_dir="$(dirname "$(cygpath -u "$node_win_path")")"
      else
        node_dir="/$(echo "${node_win_path%\\*}" | sed -E 's#^([A-Za-z]):\\\\#\L\1/#;s#\\\\#/#g')"
      fi
      export PATH="$PATH:$node_dir"
    fi
  fi
fi

# Re-check after PATH modification
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not found in your PATH even after PATH adjustments. Please verify Node installation and restart the terminal (node -v)."
  exit 1
fi

# Prefer npx to avoid relying on a global install of Terminalizer
if ! command -v terminalizer >/dev/null 2>&1; then
  echo "Installing Terminalizer locally (dev dependency)..."
  npm install terminalizer --save-dev --no-audit --progress=false --silent
fi

# Use npx to execute Terminalizer (works regardless of install location)
TERMINALIZER_BIN="npx --yes terminalizer"

# Record session (manual stop with Ctrl+D)
TERMINALIZER_CONFIG="demo.yml"

# Ensure demo dir exists; if not, create a minimal placeholder index.html so the server starts.
if [ ! -d "$DEMO_DIR" ]; then
  echo "⚠️  $DEMO_DIR not found – creating placeholder demo-dapp."
  mkdir -p "$DEMO_DIR/public"
  cat > "$DEMO_DIR/public/index.html" <<EOF
<!doctype html><html><head><title>Demo DApp</title></head><body><h1>🚀 Demo DApp Placeholder</h1></body></html>
EOF
fi

# Function to clean up background processes on exit / error / Ctrl+C
cleanup() {
  if [ -n "$SERVER_PID" ] && ps -p $SERVER_PID > /dev/null 2>&1; then
    echo "Stopping demo-dapp server (PID=$SERVER_PID)"
    kill $SERVER_PID || true
  fi
}
trap cleanup EXIT INT TERM

# Start demo-dapp static server (use npx serve for portability)
echo "🏗  Starting demo-dapp on $TARGET_URL ..."
npx --yes serve "$DEMO_DIR" -s -l $PORT &
SERVER_PID=$!
# Wait for server to be ready
for i in {1..20}; do
  if curl -s "$TARGET_URL" > /dev/null; then
    echo "✅ demo-dapp is up."
    break
  fi
  sleep 0.5
done

# Run Playwright demo spec (headed mode for video) BEFORE recording to load assets and cache.
echo "🎬 Priming Playwright demo spec ($PLAYWRIGHT_SPEC) ..."
# Ensure browsers are installed
npx --yes playwright install chromium
MOCK_MODE=false TARGET_URL=$TARGET_URL npx playwright test "$PLAYWRIGHT_SPEC" --timeout=60000 --reporter=line || echo "Playwright demo finished (non-zero exit ignored for recording)."

echo "▶ Starting Terminalizer recording of the demo walk-through ..."

# Record session (manual stop with Ctrl+D)
echo "Recording terminal session... Press Ctrl+D when done."
$TERMINALIZER_BIN record -o "$TERMINALIZER_CONFIG"

echo "Rendering GIF..."
$TERMINALIZER_BIN render "$TERMINALIZER_CONFIG" -o "$GIF_NAME"

mkdir -p "$OUTPUT_DIR"

mv "$GIF_NAME" "$OUTPUT_DIR/"

echo "Converting to MP4..."
ffmpeg -y -i "$OUTPUT_DIR/$GIF_NAME" -movflags faststart -pix_fmt yuv420p "$OUTPUT_DIR/$MP4_NAME"

echo "✔ Demo video created at $OUTPUT_DIR/$MP4_NAME" 