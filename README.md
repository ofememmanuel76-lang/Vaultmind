# VaultMind
### Your Autonomous Web3 Wallet Intelligence

> Built for MetaMask Smart Accounts x 1Shot x Venice AI Hackathon

---

## What is VaultMind?

VaultMind is an AI-powered autonomous Web3 wallet
assistant that executes your financial goals automatically.
Just tell it what you want in plain English, it acts
on your behalf with limited safe permissions, and your
data stays completely private.

---

## The Problem We Solve

Managing crypto is stressful:
- Every transaction requires manual approval
- You have to monitor prices 24/7
- Complex DeFi strategies are hard to execute
- Existing AI tools store your financial data

VaultMind fixes all of this.

---

## Key Features

- Plain English Goals - Just describe what you want
- AI Interpretation - Groq AI understands your intent
- Live Price Monitoring - ETH price checked every 30 seconds
- Autonomous Execution - Rules trigger and execute automatically
- Privacy First - Zero data retention
- Non-Custodial - You always control your funds
- Multi-Network - Sepolia testnet and Ethereum mainnet

---

## How It Works

1. Connect Wallet - Connect your MetaMask wallet
2. Set a Goal - Type your goal in plain English
   Example: "Swap my ETH to USDC if price drops below $2000"
3. AI Interprets - Groq AI breaks down your goal into:
   - Trigger conditions
   - Assets involved
   - Execution steps
   - Risk level
4. Monitor - VaultMind watches ETH price every 30 seconds
5. Execute - When trigger fires, 1Shot executes the transaction

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| MetaMask | Wallet connection and authentication |
| Groq AI (llama-3.3-70b) | Natural language goal interpretation |
| 1Shot API | Autonomous transaction execution |
| CoinGecko API | Live ETH price monitoring |
| Node.js + Express | Backend server |
| HTML/CSS/JavaScript | Frontend |

---

## Security

- Non-custodial - VaultMind never holds your funds
- Limited permissions - AI only executes approved actions
- Privacy protected - No data stored or shared
- Safe testing - Sepolia testnet for risk-free testing
- Network guard - Blocks execution if wrong network detected

---

## Getting Started

### Prerequisites
- Node.js v18+
- MetaMask browser extension
- Groq API key (free at console.groq.com)
- 1Shot API key (free at app.1shotapi.com)

### Installation

1. Clone the repository
2. Install dependencies:
   cd server
   npm install

3. Create .env file in server folder:
   ONESHOT_API_KEY=your_1shot_api_key
   ONESHOT_API_SECRET=your_1shot_api_secret
   ONESHOT_METHOD_ID=your_method_id
   PORT=3001

4. Add Groq API key to index.html:
   const GROQ_API_KEY = "your_groq_api_key"

5. Start the backend server:
   node server.js

6. Open index.html in browser with Live Server

---

## Demo

### Test Goals to Try:
- "Swap my ETH to USDC if price drops below $2000"
- "Save 10% of my balance weekly into USDC"
- "Rebalance my portfolio every Monday"

### Demo Flow:
1. Open app and connect MetaMask
2. Make sure MetaMask is on Sepolia testnet
3. Type a goal in the Goal Composer
4. Click Interpret Goal
5. Watch AI analyse your goal
6. See trigger activate on Market Monitor
7. Click Execute Now to send transaction

---

## Hackathon Submission

Event: MetaMask Smart Accounts x 1Shot x Venice AI
Prize Pool: $14,000
Deadline: June 15, 2026

### How VaultMind Uses Sponsor Technologies:

MetaMask:
- Wallet connection and authentication
- Network detection and switching
- Transaction signing

1Shot API:
- Autonomous transaction execution
- Smart contract method calls
- Gas management via executor wallet

Groq AI:
- Natural language processing
- Goal interpretation
- Risk assessment

---

## Team

Built with love for the MetaMask x 1Shot x Venice AI Hackathon

---

## License

MIT License
