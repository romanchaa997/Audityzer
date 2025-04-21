# Smart Contract Security Checklist

# Smart Contract Security Checklist

✅ Use latest compiler version  
✅ Apply “Checks-Effects-Interactions” pattern  
✅ Use OpenZeppelin libraries  
✅ Validate input parameters (require statements)  
✅ Avoid reentrancy vulnerabilities (use ReentrancyGuard)  
✅ Use SafeMath or built-in overflow checks  
✅ Set appropriate visibility (public/private/internal)  
✅ Avoid hardcoded addresses or secrets  
✅ Limit `selfdestruct` usage  
✅ Use time-based access carefully (block.timestamp issues)  
✅ Have fallback functions under control  
✅ Protect against front-running (use commit-reveal if needed)  
✅ Audit before mainnet deployment (even with test coverage)  
