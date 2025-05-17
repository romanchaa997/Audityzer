#!/bin/bash
# Setup script for Audityzer visuals & metadata

# Stop on error
set -e

echo "🚀 Setting up Audityzer Landing Page Assets"

# Step 1: Create directories
echo "\n📁 Creating asset directories..."
mkdir -p assets/img assets/demo

# Step 2: Check for existing visual assets
if [ -d "./visuals" ]; then
  echo "\n📁 Copying media files from visuals folder..."
  [ -f "./visuals/banner.png" ] && cp ./visuals/banner.png ./assets/img/Audityzer-banner.png
  [ -f "./visuals/logo.png" ] && cp ./visuals/logo.png ./assets/img/logo.png
  [ -f "./visuals/demo.gif" ] && cp ./visuals/demo.gif ./assets/demo/demo.gif
  [ -f "./visuals/favicon.ico" ] || [ -f "./visuals/favicon.png" ] && cp ./visuals/favicon.* ./assets/
fi

# Step 3: Create demo GIF if not exists and script is available
if [ ! -f "./assets/demo/demo.gif" ] && [ -f "./create-quickstart-gif.sh" ]; then
  echo "\n🎬 Creating demo GIF..."
  chmod +x ./create-quickstart-gif.sh
  ./create-quickstart-gif.sh
  
  # Check if the script created the GIF in the media folder
  if [ -f "./media/Audityzer-quickstart.gif" ]; then
    cp ./media/Audityzer-quickstart.gif ./assets/demo/demo.gif
  fi
fi

# Step 4: Reminder for missing assets
echo "\n🔍 Checking for missing assets..."
missing=0

if [ ! -f "./assets/img/Audityzer-banner.png" ]; then
  echo "❌ Missing: assets/img/Audityzer-banner.png"
  missing=1
fi

if [ ! -f "./assets/img/logo.png" ]; then
  echo "❌ Missing: assets/img/logo.png"
  missing=1
fi

if [ ! -f "./assets/favicon.png" ] && [ ! -f "./assets/favicon.ico" ]; then
  echo "❌ Missing: assets/favicon.png or assets/favicon.ico"
  missing=1
fi

if [ ! -f "./assets/demo/demo.gif" ]; then
  echo "❌ Missing: assets/demo/demo.gif"
  missing=1
fi

if [ $missing -eq 1 ]; then
  echo "\n⚠️ Some assets are missing. Please add them manually before deploying."
  echo "📋 Check the assets/README.md file for instructions."
else
  echo "\n✅ All assets are in place! Your landing page is ready to deploy."
fi

# Step 5: Update index.html with the correct asset paths
echo "\n🔄 Make sure to update index.html with your actual website URL for OpenGraph and Twitter cards."

echo "\n🚀 Setup complete! Your landing page is ready for deployment." 