# Contributing to Web3FuzzForge Community Tests

Thank you for your interest in contributing to the Web3FuzzForge Community Tests repository! This guide will help you understand how to contribute effectively.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please be respectful and collaborative.

## How to Contribute

### Step 1: Fork and Clone

1. Fork the repository
2. Clone your fork locally
3. Add the upstream repository: `git remote add upstream https://github.com/Web3FuzzForge/web3fuzzforge-community-tests.git`

### Step 2: Create a Branch

Create a branch with a descriptive name related to the test case you're adding:

```bash
git checkout -b add-metamask-signature-bypass-test
```

### Step 3: Add Your Test Case

1. Place your test in the appropriate directory (see repository structure in README.md)
2. Make sure your test follows our formatting guidelines
3. Include comprehensive comments explaining:
   - What vulnerability/edge case is being tested
   - How to reproduce it manually
   - Why it matters for security
   - Any prerequisites for running the test

### Step 4: Test Your Contribution

Before submitting, make sure:

1. Your test runs successfully
2. You've linted your code: `npm run lint`
3. You've formatted your code: `npm run format`

### Step 5: Commit and Push

Commit your changes with a clear message and push to your fork:

```bash
git add .
git commit -m "Add: Metamask signature request bypass test case"
git push origin add-metamask-signature-bypass-test
```

### Step 6: Submit a Pull Request

1. Go to your fork on GitHub
2. Create a new pull request
3. Provide a detailed description of your test case
4. Link any relevant issues
5. Fill out the PR template completely

## Test Structure Guidelines

Each test should:

1. Be self-contained and runnable
2. Include clear setup and teardown
3. Document all prerequisites
4. Use descriptive variable names
5. Include appropriate assertions
6. Focus on a specific vulnerability or edge case

## Getting Added to Contributors Hall of Fame

All accepted PRs will be recognized in our Contributors Hall of Fame! To be featured:

1. Ensure your GitHub profile is up-to-date with the name you want displayed
2. Your PR must be accepted and merged
3. We'll update the contributors list automatically

## Questions?

If you have questions about contributing, please open an issue with the "question" tag or contact the maintainers directly.

Thank you for helping make Web3 more secure!
