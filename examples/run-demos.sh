#!/bin/bash
# Script to run Web3 Security Test Kit demos

echo "Web3 Security Test Kit - Demo Runner"
echo "===================================="
echo

# Set mock mode to avoid real transactions
export MOCK_MODE=true

# Run L2 and DeFi Demo
echo "Running L2 and DeFi Demo..."
node examples/demo-l2-defi.js

echo
echo "====================================="
echo

# Run DeFi on L2 Demo
echo "Running DeFi on L2 Demo..."
node examples/defi-on-l2-demo.js

echo
echo "====================================="
echo
echo "Demos completed successfully!" 