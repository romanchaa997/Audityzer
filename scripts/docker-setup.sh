#!/bin/bash

# Web3 Security Test Kit - Docker Setup Script
# This script helps set up and manage the Docker development environment

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

# Function to display usage information
usage() {
  print_message "$CYAN" "\nUsage: $0 [COMMAND]"
  echo "Commands:"
  echo "  start        Start the Docker environment"
  echo "  stop         Stop the Docker environment"
  echo "  restart      Restart the Docker environment"
  echo "  logs         Show logs from the containers"
  echo "  test         Run tests inside the Docker container"
  echo "  shell        Start a shell inside the container"
  echo "  build        Rebuild the Docker image"
  echo "  full         Start with ElasticSearch and Kibana (full environment)"
  echo "  status       Show container status"
  echo "  clean        Remove all containers and volumes"
  echo "  help         Show this help message"
  echo
  exit 1
}

# Function to check Docker installation
check_docker() {
  if ! command_exists docker; then
    print_message "$RED" "Docker is not installed. Please install Docker first."
    print_message "$YELLOW" "Visit https://docs.docker.com/get-docker/ for installation instructions."
    exit 1
  fi

  if ! command_exists docker-compose; then
    if ! docker compose version > /dev/null 2>&1; then
      print_message "$RED" "Docker Compose is not installed or not available."
      print_message "$YELLOW" "Visit https://docs.docker.com/compose/install/ for installation instructions."
      exit 1
    else
      # Docker Compose is available as a docker plugin
      DOCKER_COMPOSE="docker compose"
    fi
  else
    DOCKER_COMPOSE="docker-compose"
  fi
}

# Function to start the Docker environment
start_environment() {
  print_message "$CYAN" "\n=== Starting Web3 Security Test Kit Docker Environment ==="
  
  if [ "$1" = "full" ]; then
    print_message "$YELLOW" "Starting with full environment (including ElasticSearch and Kibana)..."
    $DOCKER_COMPOSE up -d --profile full
  else
    print_message "$YELLOW" "Starting core environment..."
    $DOCKER_COMPOSE up -d
  fi
  
  print_message "$GREEN" "Environment started successfully!"
  print_message "$YELLOW" "Web interface available at: http://localhost:5000"
  
  if [ "$1" = "full" ]; then
    print_message "$YELLOW" "Kibana available at: http://localhost:5601 (may take a minute to start)"
    print_message "$YELLOW" "ElasticSearch available at: http://localhost:9200"
  fi
}

# Function to stop the Docker environment
stop_environment() {
  print_message "$CYAN" "\n=== Stopping Web3 Security Test Kit Docker Environment ==="
  $DOCKER_COMPOSE down
  print_message "$GREEN" "Environment stopped successfully!"
}

# Function to restart the Docker environment
restart_environment() {
  print_message "$CYAN" "\n=== Restarting Web3 Security Test Kit Docker Environment ==="
  $DOCKER_COMPOSE down
  
  if [ "$1" = "full" ]; then
    $DOCKER_COMPOSE up -d --profile full
  else
    $DOCKER_COMPOSE up -d
  fi
  
  print_message "$GREEN" "Environment restarted successfully!"
}

# Function to show container logs
show_logs() {
  print_message "$CYAN" "\n=== Web3 Security Test Kit Docker Logs ==="
  
  if [ -z "$1" ]; then
    $DOCKER_COMPOSE logs -f
  else
    $DOCKER_COMPOSE logs -f "$1"
  fi
}

# Function to run tests
run_tests() {
  print_message "$CYAN" "\n=== Running Web3 Security Tests in Docker ==="
  
  if [ -z "$1" ]; then
    docker exec -it web3-security-test-kit npm run test:security
  else
    docker exec -it web3-security-test-kit npm run "$1"
  fi
}

# Function to start a shell in the container
start_shell() {
  print_message "$CYAN" "\n=== Starting Shell in Web3 Security Test Kit Container ==="
  docker exec -it web3-security-test-kit /bin/bash
}

# Function to rebuild the Docker image
build_image() {
  print_message "$CYAN" "\n=== Building Web3 Security Test Kit Docker Image ==="
  $DOCKER_COMPOSE build
  print_message "$GREEN" "Docker image built successfully!"
}

# Function to show container status
show_status() {
  print_message "$CYAN" "\n=== Web3 Security Test Kit Docker Status ==="
  $DOCKER_COMPOSE ps
}

# Function to clean up everything
clean_environment() {
  print_message "$CYAN" "\n=== Cleaning Web3 Security Test Kit Docker Environment ==="
  
  print_message "$YELLOW" "Stopping all containers..."
  $DOCKER_COMPOSE down -v
  
  print_message "$YELLOW" "Removing all related containers..."
  docker ps -a | grep 'web3-security-test-kit' | awk '{print $1}' | xargs -r docker rm -f
  
  print_message "$GREEN" "Environment cleaned successfully!"
}

# Check Docker installation
check_docker

# Process command line arguments
if [ $# -eq 0 ]; then
  usage
fi

case "$1" in
  "start")
    start_environment "$2"
    ;;
  "stop")
    stop_environment
    ;;
  "restart")
    restart_environment "$2"
    ;;
  "logs")
    show_logs "$2"
    ;;
  "test")
    run_tests "$2"
    ;;
  "shell")
    start_shell
    ;;
  "build")
    build_image
    ;;
  "full")
    start_environment "full"
    ;;
  "status")
    show_status
    ;;
  "clean")
    clean_environment
    ;;
  "help")
    usage
    ;;
  *)
    print_message "$RED" "Unknown command: $1"
    usage
    ;;
esac 