# DeFAI: AI-Powered Financial Assistant with MetaMask Delegation Toolkit

DeFAI is an AI-powered financial assistant that uses the MetaMask Delegation Toolkit (DTK) and ERC-7715 permissions to provide automated financial management services. This project was created for the MetaMask Delegation Toolkit (DTK) Dev Cook-Off Hackathon.

## Features

The application demonstrates how AI can automate financial tasks using delegated permissions:

### 1. Subscription Management

- Auto-detection of recurring payments
- Subscription optimization and cost reduction
- Automated payments with delegated permissions

### 2. Portfolio Rebalancing

- AI-driven portfolio analysis and rebalancing recommendations
- Automated execution of balance adjustments
- Risk management and diversification assistance

### 3. Spending Limits & Budgeting

- AI-monitored spending with custom limits
- Budget analysis and recommendations
- Spending pattern detection and alerts

## Technology Stack

- **Frontend**: Next.js with React 19
- **Styling**: TailwindCSS
- **Web3 Integration**: Viem
- **Smart Accounts**: MetaMask Delegation Toolkit
- **Standards**:
  - ERC-7715 for wallet permissions
  - ERC-7710 for smart contract delegation
  - ERC-4337 for account abstraction

## How It Works

1. **Account Creation**: Users create an AI assistant smart account
2. **Permission Granting**: Users grant specific financial management permissions to the AI assistant
3. **AI Analysis**: The AI analyzes financial data and makes recommendations
4. **Execution**: With delegated permissions, the AI can execute financial optimizations

## Security Features

- Granular permissions with specific limits and expiration dates
- All permissions can be revoked at any time
- Clear visibility of all granted permissions

## Setup Instructions

### Prerequisites

1. MetaMask Flask installed
2. Sepolia testnet ETH for testing
3. Pimlico API key for bundler services

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/defai.git
cd defai
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_PIMLICO_API_KEY=your_pimlico_api_key
NEXT_PUBLIC_RPC_URL=your_rpc_url_for_sepolia
```

4. Start the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Usage Guide

1. Connect your MetaMask Flask wallet
2. Create your AI Financial Assistant (a smart account)
3. Choose an AI financial feature (subscription, portfolio, or spending)
4. Grant the appropriate permissions
5. Execute AI actions to simulate financial optimizations

## Project Structure

```
src/
├── app/                # Next.js app router
├── components/         # React components
│   ├── Hero.tsx               # Hero section
│   ├── Steps.tsx              # Step progression UI
│   ├── CreateSessionAccount.tsx # AI assistant account creation
│   ├── GrantPermissionsButton.tsx # Permission management
│   ├── RedeemPermissionButton.tsx # AI action execution
│   └── ...
├── providers/          # React context providers
│   ├── SessionAccountProvider.tsx # Smart account state
│   └── PermissionProvider.tsx    # Permissions state
└── services/           # External services
    ├── bundlerClient.ts         # ERC-4337 bundler
    └── pimlicoClient.ts         # Pimlico API client
```

## Evaluation Criteria

This project addresses the hackathon evaluation criteria:

- **Technical Difficulty**: Implements ERC-7715 and ERC-7710 permissions
- **UI/UX**: Clean, intuitive interface for managing delegated permissions
- **Ecosystem Impact**: Shows how AI assistants can enhance financial management using permission delegation
- **Innovation**: Combines AI capabilities with granular permissions for new user experiences

## Future Enhancements

- Integration with real financial data APIs
- Multi-chain support beyond Sepolia
- Advanced AI models for better financial insights
- Mobile responsive design
- Social wallet recovery options

## License

MIT

## Acknowledgments

- MetaMask team for creating the Delegation Toolkit
- Gaia for AI integration capabilities
- Pimlico for bundler services
