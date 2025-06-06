# Contributing to Audityzer

## Branching Strategy

We follow a GitFlow-inspired branching model:

### Main Branches
- **`main`** - Production-ready code, protected branch
- **`develop`** - Integration branch for features, protected branch

### Supporting Branches
- **`feature/*`** - New features and enhancements
- **`hotfix/*`** - Critical fixes for production
- **`release/*`** - Release preparation

## Branch Protection Rules

### Main Branch Protection
- Require pull request reviews (minimum 1)
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to admins only
- Require linear history

### Develop Branch Protection
- Require pull request reviews (minimum 1)
- Require status checks to pass
- Allow force pushes for maintainers

## Workflow

1. **Feature Development**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   # Make changes
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   # Create PR to develop
   ```

2. **Release Process**
   ```bash
   git checkout develop
   git checkout -b release/v1.x.x
   # Update version numbers, changelog
   git commit -m "chore: prepare release v1.x.x"
   # Create PR to main
   # After merge, tag the release
   ```

3. **Hotfixes**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Make fix
   git commit -m "fix: critical issue description"
   # Create PR to main and develop
   ```

## Current Active Branches

- `main` - Latest stable version with all improvements
- `develop` - Development integration branch
- `feature/production-environment` - Production deployment setup
- `feature/monitoring-setup` - Monitoring and analytics
- `feature/community-portal` - Community platform setup
- `feature/marketing-automation` - Marketing and growth tracking

## Code Quality Standards

- All code must pass ESLint and Prettier checks
- Unit tests required for new features
- Integration tests for API changes
- Security scans must pass
- Performance benchmarks maintained

## Pull Request Guidelines

1. Use descriptive titles and descriptions
2. Link related issues
3. Include screenshots for UI changes
4. Update documentation as needed
5. Ensure CI/CD passes
6. Request appropriate reviewers

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

## Getting Started

1. Fork the repository
2. Clone your fork
3. Set up development environment
4. Create feature branch
5. Make changes and test
6. Submit pull request

For questions, please open an issue or contact the maintainers.
