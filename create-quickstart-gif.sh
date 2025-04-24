#!/bin/bash

# This script requires:
# - terminalizer (npm install -g terminalizer)
# - ImageMagick (for gif optimization)

# Create terminalizer config
cat > config.yml << EOL
# Terminalizer configuration
frames:
  max_idle_time: 1000
  fps: 15
recording:
  width: 900
  height: 500
  command: bash
  cwd: \${PWD}
  env:
    - TERM=xterm-256color
terminal:
  theme:
    background: "#1a1a1a"
    foreground: "#f0f0f0"
    cursor: "#cc0044"
    colors:
      normal:
        black: "#1a1a1a"
        red: "#cc0044"
        green: "#00cc44"
        yellow: "#cccc00"
        blue: "#0044cc"
        magenta: "#cc00cc"
        cyan: "#00cccc"
        white: "#f0f0f0"
      bright:
        black: "#4d4d4d"
        red: "#ff7799"
        green: "#99ff77"
        yellow: "#ffff77"
        blue: "#7799ff"
        magenta: "#ff77ff"
        cyan: "#77ffff"
        white: "#ffffff"
fontFamily: "Cascadia Code, Monaco, Menlo, 'DejaVu Sans Mono', 'Lucida Console', monospace"
fontSize: 14
EOL

# Create record script
cat > demo.sh << EOL
#!/bin/bash
clear
echo "# Web3FuzzForge Quickstart Demo"
sleep 1
echo
echo "# Generate a MetaMask connection test"
sleep 1.5
echo "\$ web3fuzzforge generate connect --provider metamask --out ./tests/connection.test.js"
sleep 2
echo "✅ Generated test template at ./tests/connection.test.js"
sleep 1.5
echo
echo "# Generate a transaction test with TypeScript"
sleep 1.5
echo "\$ web3fuzzforge generate tx --provider metamask --out ./tests/transaction.test.ts --typescript"
sleep 2
echo "✅ Generated test template at ./tests/transaction.test.ts"
sleep 1.5
echo
echo "# Generate a test using DeFi preset"
sleep 1.5
echo "\$ web3fuzzforge generate tx --preset defi --out ./tests/defi-swap.test.js"
sleep 2
echo "✅ Generated test template at ./tests/defi-swap.test.js"
sleep 1.5
echo
echo "# Run tests in headed mode"
sleep 1.5
echo "\$ npm run test:headed"
sleep 2
echo "Running tests..."
sleep 1
echo "1 passed (metamask-connection)"
sleep 0.5
echo "1 passed (wallet-snapshot)"
sleep 0.5
echo "1 passed (transaction-flow)"
sleep 1
echo "✅ All tests passed!"
sleep 3
EOL

chmod +x demo.sh

# Record the terminal session
terminalizer record demo --config config.yml
terminalizer render demo --output media/web3fuzzforge-quickstart.gif

# Optimize the GIF (if ImageMagick is installed)
if command -v convert &> /dev/null; then
  convert media/web3fuzzforge-quickstart.gif -fuzz 5% -layers optimize media/web3fuzzforge-quickstart-optimized.gif
  mv media/web3fuzzforge-quickstart-optimized.gif media/web3fuzzforge-quickstart.gif
fi

echo "Quickstart GIF created at media/web3fuzzforge-quickstart.gif"

# Clean up
rm config.yml demo.sh demo.yml 