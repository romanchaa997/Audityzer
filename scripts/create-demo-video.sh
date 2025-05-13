#!/usr/bin/env bash
# create-demo-video.sh
# Records a terminal session with Terminalizer and converts it to MP4 using FFmpeg.

set -e

OUTPUT_DIR="media"
GIF_NAME="web3fuzzforge-quickstart.gif"
MP4_NAME="web3fuzzforge-quickstart.mp4"

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

# Record session (manual stop with Ctrl+D)
TERMINALIZER_CONFIG="demo.yml"

echo "Recording terminal session... Press Ctrl+D when done."
terminalizer record -o "$TERMINALIZER_CONFIG"

echo "Rendering GIF..."
terminalizer render "$TERMINALIZER_CONFIG" -o "$GIF_NAME"

mkdir -p "$OUTPUT_DIR"

mv "$GIF_NAME" "$OUTPUT_DIR/"

echo "Converting to MP4..."
ffmpeg -y -i "$OUTPUT_DIR/$GIF_NAME" -movflags faststart -pix_fmt yuv420p "$OUTPUT_DIR/$MP4_NAME"

echo "✔ Demo video created at $OUTPUT_DIR/$MP4_NAME" 