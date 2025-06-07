# Puppeteer Runner

## Purpose
This project uses Puppeteer to open a web page, retrieve its `localStorage` and cookies, and print them to the console. Puppeteer is a Node.js library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

## Components
- **runner.py**: The main script that uses Puppeteer to open a page, retrieve `localStorage` and cookies, and print them.
- **README.md**: This file, which provides an overview of the project and instructions for running it.

## Startup
### Prerequisites
- Python 3.7 or higher
- Node.js and npm installed
- Pyppeteer installed

### Installation
1. Install Node.js and npm if you haven't already.
2. Install Pyppeteer:
   ```bash
   pip install pyppeteer