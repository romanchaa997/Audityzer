#!/bin/bash
# Smart Contract Security Scan Script
# Performs automated checks against common security issues based on the security checklist

# Terminal colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    Web3 Security Checklist Scanner    ${NC}"
echo -e "${BLUE}========================================${NC}"

# Create results directory
mkdir -p scan-results

# Functions
check_solidity_version() {
  echo -e "\n${BLUE}Checking Solidity Version...${NC}"
  
  # Find all Solidity files
  files=$(find . -type f -name "*.sol" | grep -v "node_modules")
  
  if [ -z "$files" ]; then
    echo -e "${YELLOW}No Solidity files found${NC}"
    return
  fi
  
  echo "Found $(echo "$files" | wc -l) Solidity files"
  
  # Check pragma statements
  outdated=0
  for file in $files; do
    version=$(grep -E "pragma solidity" "$file" | head -1)
    
    if [[ $version =~ 0\.[0-7]\. ]]; then
      echo -e "${RED}✗ $file uses outdated compiler: $version${NC}"
      outdated=$((outdated+1))
    else
      echo -e "${GREEN}✓ $file uses recent compiler: $version${NC}"
    fi
  done
  
  if [ $outdated -gt 0 ]; then
    echo -e "${YELLOW}Found $outdated files with outdated compiler versions${NC}"
    echo "- Use Solidity 0.8.0+ for built-in overflow protection" >> scan-results/recommendations.txt
  else
    echo -e "${GREEN}All files use recent compiler versions${NC}"
  fi
}

check_reentrancy() {
  echo -e "\n${BLUE}Checking for Reentrancy Vulnerabilities...${NC}"
  
  files=$(find . -type f -name "*.sol" | grep -v "node_modules")
  
  if [ -z "$files" ]; then
    echo -e "${YELLOW}No Solidity files found${NC}"
    return
  fi
  
  # Look for risky patterns
  risky_files=0
  for file in $files; do
    # Check for external calls before state changes
    external_calls=$(grep -E "\.call{|\.send\(|\.transfer\(" "$file" | wc -l)
    
    if [ $external_calls -gt 0 ]; then
      echo -e "${YELLOW}⚠ $file contains $external_calls external calls that may be vulnerable to reentrancy${NC}"
      
      # Check if nonReentrant modifier or ReentrancyGuard is used
      if grep -q "nonReentrant" "$file" || grep -q "ReentrancyGuard" "$file"; then
        echo -e "${GREEN}  ✓ File uses reentrancy protection${NC}"
      else
        echo -e "${RED}  ✗ No reentrancy protection found${NC}"
        risky_files=$((risky_files+1))
        echo "- Add ReentrancyGuard to $file" >> scan-results/recommendations.txt
      fi
    fi
  done
  
  if [ $risky_files -eq 0 ]; then
    echo -e "${GREEN}No immediate reentrancy concerns detected${NC}"
  else
    echo -e "${YELLOW}Found $risky_files files with potential reentrancy issues${NC}"
  fi
}

run_slither() {
  echo -e "\n${BLUE}Running Slither Analysis...${NC}"
  
  # Check if there are any Solidity files
  files=$(find . -type f -name "*.sol" | grep -v "node_modules")
  
  if [ -z "$files" ]; then
    echo -e "${YELLOW}No Solidity files found to analyze${NC}"
    return
  fi
  
  # Check if Slither is installed
  if ! command -v slither &> /dev/null; then
    echo -e "${RED}Slither is not installed. Skipping analysis.${NC}"
    echo "- Install Slither with: pip3 install slither-analyzer" >> scan-results/recommendations.txt
    return
  fi
  
  # Run Slither on all Solidity files
  echo "Running Slither on project..."
  slither . --markdown-root "." --markdown ./slither-report.md 2>/dev/null || echo -e "${YELLOW}Slither encountered some issues but continued${NC}"
  
  echo -e "${GREEN}Slither analysis complete. Report saved to ./slither-report.md${NC}"
}

check_access_control() {
  echo -e "\n${BLUE}Checking Access Control...${NC}"
  
  files=$(find . -type f -name "*.sol" | grep -v "node_modules")
  
  if [ -z "$files" ]; then
    echo -e "${YELLOW}No Solidity files found${NC}"
    return
  fi
  
  # Look for ownable patterns
  ownable_protection=0
  for file in $files; do
    # Check for common access control patterns
    if grep -q "Ownable" "$file" || grep -q "onlyOwner" "$file" || 
       grep -q "AccessControl" "$file" || grep -q "onlyRole" "$file"; then
      echo -e "${GREEN}✓ $file implements access control${NC}"
      ownable_protection=$((ownable_protection+1))
    else
      # Check for functions that might need access control
      admin_functions=$(grep -E "function.*(admin|owner|withdraw|upgrade|pause|unpause|set)" "$file")
      if [ ! -z "$admin_functions" ]; then
        echo -e "${YELLOW}⚠ $file may have admin functions without explicit access control:${NC}"
        echo "$admin_functions" | head -3
        if [ $(echo "$admin_functions" | wc -l) -gt 3 ]; then
          echo "  ...and more"
        fi
        echo "- Add access control to admin functions in $file" >> scan-results/recommendations.txt
      fi
    fi
  done
  
  echo -e "${GREEN}Found $ownable_protection files with access control${NC}"
}

check_input_validation() {
  echo -e "\n${BLUE}Checking Input Validation...${NC}"
  
  files=$(find . -type f -name "*.sol" | grep -v "node_modules")
  
  if [ -z "$files" ]; then
    echo -e "${YELLOW}No Solidity files found${NC}"
    return
  fi
  
  validation_count=0
  for file in $files; do
    requires=$(grep -E "require\s*\(" "$file" | wc -l)
    reverts=$(grep -E "revert\s*\(" "$file" | wc -l)
    
    total=$((requires + reverts))
    validation_count=$((validation_count + total))
    
    if [ $total -gt 0 ]; then
      echo -e "${GREEN}✓ $file contains $total validation checks ($requires requires, $reverts reverts)${NC}"
    else
      functions=$(grep -E "function\s+[a-zA-Z0-9_]+\s*\(" "$file" | wc -l)
      if [ $functions -gt 0 ]; then
        echo -e "${YELLOW}⚠ $file has $functions functions but no validation checks${NC}"
        echo "- Add input validation to functions in $file" >> scan-results/recommendations.txt
      fi
    fi
  done
  
  echo -e "${GREEN}Found $validation_count validation checks across all files${NC}"
}

check_use_of_unsafe_calls() {
  echo -e "\n${BLUE}Checking for Unsafe Calls...${NC}"
  
  files=$(find . -type f -name "*.sol" | grep -v "node_modules")
  
  if [ -z "$files" ]; then
    echo -e "${YELLOW}No Solidity files found${NC}"
    return
  fi
  
  # Look for unsafe patterns
  unsafe_calls=0
  for file in $files; do
    # Check for low level calls
    if grep -q ".call{value:" "$file" || grep -q ".call(" "$file"; then
      echo -e "${YELLOW}⚠ $file uses low-level .call${NC}"
      unsafe_calls=$((unsafe_calls+1))
      
      # Check if return value is checked
      if grep -E "bool\s+success|success\s*=|,\s*success" "$file" | grep -q "call"; then
        echo -e "${GREEN}  ✓ Return value appears to be checked${NC}"
      else
        echo -e "${RED}  ✗ Return value of call might not be checked${NC}"
        echo "- Ensure return values of .call are checked in $file" >> scan-results/recommendations.txt
      fi
    fi
    
    # Check for deprecated functions
    if grep -q ".transfer(" "$file" || grep -q ".send(" "$file"; then
      echo -e "${YELLOW}⚠ $file uses .transfer() or .send() which have gas limitations${NC}"
      echo "- Consider replacing .transfer()/.send() with .call{value:}() in $file" >> scan-results/recommendations.txt
      unsafe_calls=$((unsafe_calls+1))
    fi
    
    # Check for tx.origin
    if grep -q "tx.origin" "$file"; then
      echo -e "${RED}✗ $file uses tx.origin which is vulnerable to phishing attacks${NC}"
      echo "- Replace tx.origin with msg.sender in $file" >> scan-results/recommendations.txt
      unsafe_calls=$((unsafe_calls+1))
    fi
  done
  
  if [ $unsafe_calls -eq 0 ]; then
    echo -e "${GREEN}No obvious unsafe calls detected${NC}"
  else
    echo -e "${YELLOW}Found $unsafe_calls instances of potentially unsafe patterns${NC}"
  fi
}

generate_report() {
  echo -e "\n${BLUE}Generating Summary Report...${NC}"
  
  echo "# Web3 Security Scan Report" > scan-results/summary-report.md
  echo "Generated on: $(date)" >> scan-results/summary-report.md
  echo "" >> scan-results/summary-report.md
  
  if [ -f "scan-results/recommendations.txt" ]; then
    echo "## Security Recommendations" >> scan-results/summary-report.md
    cat scan-results/recommendations.txt >> scan-results/summary-report.md
    echo "" >> scan-results/summary-report.md
    
    recommendation_count=$(wc -l < scan-results/recommendations.txt)
    echo -e "${YELLOW}Found $recommendation_count security recommendations${NC}"
  else
    echo "## Security Recommendations" >> scan-results/summary-report.md
    echo "No specific recommendations generated." >> scan-results/summary-report.md
    echo "" >> scan-results/summary-report.md
    
    echo -e "${GREEN}No security recommendations needed${NC}"
  fi
  
  echo "## Next Steps" >> scan-results/summary-report.md
  echo "1. Review the recommendations and fix highlighted issues" >> scan-results/summary-report.md
  echo "2. Run a manual review against the full checklist" >> scan-results/summary-report.md
  echo "3. Consider a professional audit for production code" >> scan-results/summary-report.md
  
  echo -e "${GREEN}Report generated at scan-results/summary-report.md${NC}"
}

# Execute all checks
echo "Starting security scan..."
check_solidity_version
check_reentrancy
check_access_control
check_input_validation
check_use_of_unsafe_calls
run_slither
generate_report

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}    Security Scan Complete!            ${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Summary report available at: ${BLUE}scan-results/summary-report.md${NC}"
echo -e "Detailed Slither analysis: ${BLUE}slither-report.md${NC} (if available)"
echo -e "\nNext steps:"
echo -e "1. Review the recommendations in the summary report"
echo -e "2. Compare against the full security checklist"
echo -e "3. Fix identified issues"
echo -e "\n${YELLOW}Remember: Automated tools can't catch everything. Always perform manual review!${NC}" 