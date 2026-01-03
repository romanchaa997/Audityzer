# 👨‍💻 UHIP Developer Guide

## Quick Start

### Prerequisites
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 13+
- Redis 6+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/romanchaa997/Audityzer.git
cd Audityzer

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\\Scripts\\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Setup Docker services
docker-compose up -d

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver 0.0.0.0:8000
```

## Project Structure

```
Audityzer/
├─ uhip/
│  ├─ core/                 # Core UHIP algorithms
│  ├─ api/                  # FastAPI endpoints
│  ├─ ml/                   # Machine learning models
│  ├─ processors/           # Neural, Symbolic, Quantum
│  ├─ config/               # Configuration files
│  └─ tests/                # Unit & integration tests
├─ docs/                    # Documentation
├─ .github/workflows/       # CI/CD pipelines
├─ docker-compose.yml       # Docker configuration
├─ requirements.txt         # Python dependencies
├─ pytest.ini               # Test configuration
├─ README.md                # Project overview
└─ .env.example             # Environment template
```

## Development Workflow

### Running Tests
```bash
pytest -v --cov=uhip tests/
```

### Code Quality
```bash
# Linting
flake8 uhip/

# Type checking
mypy uhip/

# Formatting
black uhip/
```

### API Documentation
Swagger UI: http://localhost:8000/docs
Redoc: http://localhost:8000/redoc

## Key Technologies

- **Backend**: FastAPI, asyncio
- **Database**: PostgreSQL, SQLAlchemy
- **Cache**: Redis
- **ML**: scikit-learn, TensorFlow
- **Testing**: pytest, coverage
- **Monitoring**: Prometheus, Grafana
- **Containerization**: Docker, Kubernetes

## Contributing

1. Create feature branch: `git checkout -b feature/xxx`
2. Make changes & commit: `git commit -am 'Add feature'`
3. Push & create PR: `git push origin feature/xxx`
4. Ensure tests pass & code review approved

## Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Security Guidelines](./docs/SECURITY.md)

## Support

Email: development@audityzer.io
