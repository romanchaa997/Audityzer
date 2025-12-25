# Audityzer Module Reference

## Module Overview Table

| Module Name | Type | Purpose | Status | Dependencies |
|---|---|---|---|---|
| **API Gateway** | Core | REST/GraphQL API interface | Active | Authentication, Request Handler |
| **Contract Analyzer** | Analysis | Parse and analyze smart contracts | Active | Parser, AST Builder, Compiler |
| **Vulnerability Detector** | Analysis | Identify security vulnerabilities | Active | Pattern Database, Rule Engine |
| **Pattern Recognition** | Analysis | ML-based threat detection | Planning | ML Framework, Training Data |
| **Static Analyzer** | Analysis | Control & data flow analysis | Active | Code Analyzer, CFG Builder |
| **Dynamic Analyzer** | Analysis | Transaction simulation | Planning | Web3 Provider, State Manager |
| **Gas Optimizer** | Analysis | Gas consumption analysis | Planning | EVM Simulator, Opcodes |
| **Database Layer** | Storage | PostgreSQL persistence | Active | PostgreSQL, ORM |
| **Cache Layer** | Storage | Redis caching system | Active | Redis, Cache Manager |
| **Authentication** | Security | JWT token management | Active | Crypto Library, Token Service |
| **Rate Limiter** | Security | API rate limiting | Active | Counter, Storage |
| **Dashboard** | Frontend | Web-based UI | Planning | React, D3.js, API Client |
| **CLI Tool** | Frontend | Command-line interface | Planning | Commander.js, Output Formatter |
| **Report Generator** | Output | Audit report creation | Planning | Template Engine, PDF Library |
| **Web3 Integration** | External | Blockchain connectivity | Active | Web3.js, Ethers.js |

## Module Dependencies Graph

```
User Interface Layer
├── Dashboard (UI) → API Gateway
└── CLI Tool → API Gateway
        ↓
API Gateway Layer
├── Authentication Module
├── Rate Limiter
└── Request Handler
        ↓
Core Analysis Engine
├── Contract Analyzer
│   └── Parser, AST, Compiler
├── Vulnerability Detector
│   └── Pattern Database
├── Static Analyzer
│   └── CFG Builder
├── Dynamic Analyzer
│   └── State Manager
└── Gas Optimizer
    └── EVM Simulator
        ↓
Data Processing
├── Index Manager
├── Cache Manager → Redis
└── Report Compiler
        ↓
Storage Layer
├── Database (PostgreSQL)
├── Cache (Redis)
└── Archive Storage
        ↓
External Integration
└── Web3 Provider (Ethereum, Polygon, Arbitrum)
```

## Core Modules Detailed

### 1. Contract Analyzer Module
**File Location:** `src/analyzer/contractAnalyzer.js`
**Status:** Active
**Purpose:** Parse and understand smart contract code structure

**Responsibilities:**
- Solidity/Vyper code parsing
- AST generation from source code
- Bytecode decompilation
- Import and dependency tracking

**Interfaces:**
- Input: Contract source code or bytecode
- Output: AST, symbol table, dependency map

**Dependencies:**
- Solidity Compiler (solc)
- AST Parser Library

### 2. Vulnerability Detector Module
**File Location:** `src/detector/vulnerabilityDetector.js`
**Status:** Active
**Purpose:** Identify security vulnerabilities in smart contracts

**Responsibilities:**
- Common Weakness Enumeration (CWE) detection
- SWC Registry pattern matching
- Re-entrancy vulnerability detection
- Integer overflow/underflow checks
- Access control validation

**Interfaces:**
- Input: Contract AST, bytecode
- Output: Vulnerability findings, severity levels

**Dependencies:**
- Pattern Database
- Rule Engine
- Vulnerability Database

### 3. Authentication Module
**File Location:** `src/security/authentication.js`
**Status:** Active
**Purpose:** Handle user authentication and token management

**Responsibilities:**
- User registration and login
- JWT token generation
- Token validation
- Session management

**Interfaces:**
- Input: User credentials
- Output: JWT tokens, session info

**Dependencies:**
- Crypto library
- Database

### 4. API Gateway Module
**File Location:** `src/api/gateway.js`
**Status:** Active
**Purpose:** Central entry point for all API requests

**Responsibilities:**
- Route management
- Request validation
- Response formatting
- Error handling

**Interfaces:**
- Input: HTTP requests
- Output: HTTP responses (JSON)

**Dependencies:**
- Express.js framework
- All core modules

### 5. Web3 Integration Module
**File Location:** `src/blockchain/web3Integration.js`
**Status:** Active
**Purpose:** Connect to blockchain networks and fetch contract data

**Responsibilities:**
- Network connectivity (Ethereum, Polygon, Arbitrum)
- Smart contract code retrieval
- Transaction history fetching
- State queries

**Interfaces:**
- Input: Contract address, network ID
- Output: Contract code, transaction data

**Dependencies:**
- Web3.js library
- Ethers.js library
- RPC providers (Infura, Alchemy)

## Module Status Legend

- **Active:** Fully implemented and operational
- **Planning:** In design/development phase
- **Testing:** Under quality assurance
- **Deprecated:** No longer in use

## Future Modules (Roadmap)

| Module | Description | Priority | Timeline |
|--------|-------------|----------|----------|
| Formal Verification | Mathematical proof of correctness | High | Q2 2025 |
| ML Threat Detection | Advanced anomaly detection | High | Q2 2025 |
| Real-time Monitoring | Live contract analysis | Medium | Q3 2025 |
| Bug Bounty Integration | Automated bounty management | Medium | Q3 2025 |
| Multi-chain Support | Additional blockchain networks | Medium | Q2 2025 |
