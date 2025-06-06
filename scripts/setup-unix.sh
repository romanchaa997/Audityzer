#!/bin/bash

# Web3 Security Test Kit - Unix Setup Script
# This script sets up the development environment on Linux/macOS

# Set error handling
set -e

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print a colored message
print_message() {
  local color=$1
  local message=$2
  echo -e "${color}${message}${NC}"
}

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Display welcome message
print_message "$CYAN" "\n=== Web3 Security Test Kit - Unix Setup ==="
print_message "$CYAN" "This script will set up your development environment.\n"

# Check Node.js
print_message "$YELLOW" "Checking Node.js installation..."
if command_exists node; then
  node_version=$(node --version)
  print_message "$GREEN" "Node.js $node_version is installed."
else
  print_message "$RED" "Node.js is not installed. Please install Node.js from https://nodejs.org/"
  print_message "$RED" "Then run this script again."
  exit 1
fi

# Check npm
print_message "$YELLOW" "\nChecking npm installation..."
if command_exists npm; then
  npm_version=$(npm --version)
  print_message "$GREEN" "npm $npm_version is installed."
else
  print_message "$RED" "npm is not installed. Please install Node.js from https://nodejs.org/"
  print_message "$RED" "Then run this script again."
  exit 1
fi

# Install dependencies
print_message "$YELLOW" "\nInstalling project dependencies..."
if npm install; then
  print_message "$GREEN" "Dependencies installed successfully."
else
  print_message "$RED" "Failed to install dependencies."
  print_message "$YELLOW" "Trying with legacy peer deps..."
  if npm install --legacy-peer-deps; then
    print_message "$GREEN" "Dependencies installed successfully with legacy peer deps."
  else
    print_message "$RED" "Failed to install dependencies. Please check the error messages above."
    exit 1
  fi
fi

# Configure environment
print_message "$YELLOW" "\nConfiguring environment..."

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
  print_message "$YELLOW" "Creating .env file from .env-example..."
  if [ -f ".env-example" ]; then
    cp .env-example .env
    print_message "$GREEN" ".env file created. Please review and update the values."
  else
    print_message "$YELLOW" "Warning: .env-example not found. Creating empty .env file."
    echo "# Web3 Security Test Kit Environment Variables" > .env
    echo "" >> .env
    echo "# Add your environment variables here" >> .env
  fi
else
  print_message "$GREEN" ".env file already exists."
fi

# Set up Firebase config if it doesn't exist
if [ ! -f ".firebase-config.json" ]; then
  print_message "$YELLOW" "\nCreating Firebase configuration..."
  if npm run firebase:setup; then
    print_message "$GREEN" "Firebase configuration created."
    print_message "$YELLOW" "Please update .firebase-config.json with your Firebase credentials."
  else
    print_message "$RED" "Failed to create Firebase configuration."
  fi
else
  print_message "$GREEN" "\nFirebase configuration already exists."
fi

# Create scripts directory if it doesn't exist
if [ ! -d "scripts" ]; then
  print_message "$YELLOW" "\nCreating scripts directory..."
  mkdir -p scripts
  print_message "$GREEN" "Scripts directory created."
fi

# Create server-manager.sh if it doesn't exist
server_manager_path="scripts/server-manager.sh"
if [ ! -f "$server_manager_path" ]; then
  print_message "$YELLOW" "\nCreating server manager script..."
  cat > "$server_manager_path" << 'EOL'
#!/bin/bash

# Function to display usage
usage() {
  echo "Usage: $0 [start|stop|restart] [port]"
  echo "  start   - Start the development server"
  echo "  stop    - Stop the development server"
  echo "  restart - Restart the development server"
  echo "  port    - Optional port number (default: 5000)"
  exit 1
}

# Function to start the server
start_server() {
  local port=$1
  echo "Starting server on port $port..."
  npm run dev:serve -- --port "$port" &
  echo $! > .server-pid
  sleep 2
  if command -v open > /dev/null; then
    # macOS
    open "http://localhost:$port"
  elif command -v xdg-open > /dev/null; then
    # Linux
    xdg-open "http://localhost:$port"
  else
    echo "Server started. Open http://localhost:$port in your browser."
  fi
}

# Function to stop the server
stop_server() {
  echo "Stopping server..."
  if [ -f .server-pid ]; then
    pid=$(cat .server-pid)
    if ps -p "$pid" > /dev/null; then
      kill "$pid"
      echo "Server stopped successfully"
    else
      echo "No running server found with PID $pid"
    fi
    rm .server-pid
  else
    # Fallback: Find by port
    local port=$1
    pid=$(lsof -t -i:"$port")
    if [ -n "$pid" ]; then
      kill "$pid"
      echo "Server stopped successfully"
    else
      echo "No server running on port $port"
    fi
  fi
}

# Main script
if [ $# -lt 1 ]; then
  usage
fi

action=$1
port=${2:-5000}

case "$action" in
  start)
    start_server "$port"
    ;;
  stop)
    stop_server "$port"
    ;;
  restart)
    stop_server "$port"
    sleep 1
    start_server "$port"
    ;;
  *)
    usage
    ;;
esac
EOL
  chmod +x "$server_manager_path"
  print_message "$GREEN" "Server manager script created at $server_manager_path"
else
  print_message "$GREEN" "\nServer manager script already exists."
fi

# Create start server script
start_server_path="start-server.sh"
if [ ! -f "$start_server_path" ]; then
  print_message "$YELLOW" "\nCreating start server script..."
  cat > "$start_server_path" << 'EOL'
#!/bin/bash
echo "Starting Web3 Security Test Kit Server..."
echo

./scripts/server-manager.sh start 5000
EOL
  chmod +x "$start_server_path"
  print_message "$GREEN" "Start server script created at $start_server_path"
else
  print_message "$GREEN" "\nStart server script already exists."
fi

# Create stop server script
stop_server_path="stop-server.sh"
if [ ! -f "$stop_server_path" ]; then
  print_message "$YELLOW" "\nCreating stop server script..."
  cat > "$stop_server_path" << 'EOL'
#!/bin/bash
echo "Stopping Web3 Security Test Kit Server..."
echo

./scripts/server-manager.sh stop 5000
EOL
  chmod +x "$stop_server_path"
  print_message "$GREEN" "Stop server script created at $stop_server_path"
else
  print_message "$GREEN" "\nStop server script already exists."
fi

# Setup complete
print_message "$CYAN" "\n=== Setup Complete! ==="
print_message "$NC" "You can now start the development server with:"
print_message "$GREEN" "./start-server.sh"

print_message "$NC" "\nOr use the server manager directly:"
print_message "$GREEN" "./scripts/server-manager.sh start 5000"
print_message "$GREEN" "./scripts/server-manager.sh stop 5000"
print_message "$GREEN" "./scripts/server-manager.sh restart 5000"

print_message "$CYAN" "\nHappy testing!" 