# Contributing to DevForge

We love your input! We want to make contributing to DevForge as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repository to your GitHub account
2. Clone the forked repository to your local machine
3. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
4. Implement your changes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request on the original repository

### Pull Request Requirements

- Update the README.md with details of changes to the interface, if applicable
- Update the documentation with any new commands or features
- The PR should work across Windows, macOS, and Linux
- Include tests for new functionality
- Maintain the existing coding style

## Testing

Before submitting your PR, make sure to run the tests:

```bash
npm test
```

The tests should pass on all three major operating systems (Windows, macOS, and Linux).

## Documentation

Keep the documentation up to date. If you introduce new features or change existing ones, update the relevant documentation.

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server in development mode:
   ```bash
   npm run devforge:start
   ```

## Code Style

We use ESLint and Prettier for code formatting. Please ensure your code follows these standards:

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This makes it easier to review changes and generate changelogs.

Types of commits:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Changes that don't affect the code's meaning (formatting, etc.)
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Performance improvements
- `test:` Adding or fixing tests
- `chore:` Changes to the build process, auxiliary tools, etc.

Example:

```
feat: add support for custom health endpoints
```

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 