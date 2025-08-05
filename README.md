# Raydium Bundler Bot - Token Launchpad & Bundle Trading

[![GitHub](https://img.shields.io/badge/GitHub-moonbot777-blue)](https://github.com/moonbot777)
[![Telegram](https://img.shields.io/badge/Telegram-@greenfoxfun-blue)](https://t.me/greenfoxfun)

A comprehensive Solana token launchpad and bundle trading bot built for Raydium DEX. This bot enables automated token creation, liquidity pool setup, and bundle buying operations with multiple wallet management.

## 🌟 Features

- **Token Creation**: Automated SPL token creation with metadata
- **Market Creation**: Raydium liquidity pool setup
- **Bundle Trading**: Multi-wallet bundle buying operations
- **Security Features**: Mint/Freeze authority revocation, LP token burning
- **Wallet Management**: Automated wallet creation and SOL distribution
- **Lookup Tables**: Optimized transaction handling with LUT
- **Simulation**: Transaction simulation before execution
- **Bulk Operations**: Token distribution and SOL gathering

## 📋 Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Solana CLI tools
- RPC endpoint (Helius, QuickNode, etc.)
- Jito RPC (for bundle transactions)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/moonbot777/Raydium-Bundler-Bot-Control-Amount.git
   cd Raydium-Bundler-Bot-Control-Amount
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Network Configuration
   CLUSTER=mainnet-beta
   RPC_ENDPOINT=https://your-rpc-endpoint.com
   
   # Jito Configuration
   JITO_FEE=your-jito-fee
   
   # Wallet Configuration
   LP_WALLET_PRIVATE_KEY=your-main-wallet-private-key
   
   # Recovery Mode (optional)
   RECOVERY_MODE=false
   ```

## ⚙️ Configuration

### 1. Token Settings (`settings.ts`)

Configure your token parameters:

```typescript
export const tokens: UserToken[] = [
  {
    name: 'Your Token Name',
    symbol: 'SYMBOL',
    decimals: 9,
    description: "Your token description",
    uiAmount: 10 ** 9, // Total supply
    image: "./src/images/your-token-image.jpg",
    extensions: {
      website: "https://your-website.com",
      twitter: "https://x.com/your-twitter",
      telegram: "https://t.me/your-telegram"
    },
    tags: ["Meme", "Tokenization"],
    creator: {
      name: "Your Name",
      site: "https://your-website.com/"
    }
  }
]
```

### 2. Wallet Distribution Settings

Configure wallet distribution percentages (must sum to 100% or less):

```typescript
export const wallet1 = 12    // Main wallet (8-15 recommended)
export const wallet2 = 1     // Bundle wallets (max 1.5 each)
export const wallet3 = 1.45
// ... continue for wallet4 through wallet21
```

### 3. Pool Configuration

```typescript
export const quote_Mint_amount = 1; // SOL amount for liquidity
export const input_baseMint_tokens_percentage = 1; // Token percentage for LP
export const defaltSwapSolAmount = 0.001; // Default SOL per bundle buy
export const batchSize = 7; // Wallets per transaction
export const bundleWalletNum = batchSize * 3; // Total bundle wallets
```

## 🎯 Usage

### Starting the Bot

```bash
npm run start
# or
yarn start
```

### Main Menu Options

1. **Create Token** - Mint your SPL token with metadata
2. **Create Market** - Set up Raydium liquidity pool
3. **Security Checks** - Revoke authorities and burn LP tokens
4. **Create Wallets** - Generate bundle trading wallets
5. **Create LookUpTable** - Optimize transaction handling
6. **Extend LUT & Simulate** - Extend lookup table and simulate transactions
7. **Create Pool & Bundle Buy** - Create pool and execute bundle buys
8. **Sell All Tokens** - Sell tokens from all wallets
9. **Gather SOL** - Collect SOL from bundle wallets
10. **Exit** - Close the application

### Recommended Workflow

For optimal token launch, follow this sequence:

**Option 1:**
```
1 → 2 → 3 → 1 → 2 → 4 → 4 → 5 → 6 → 7 → 3 → 3
```

**Option 2:**
```
1 → 2 → 4 → 5 → 6 → 7 → 3 → 1 → 2 → 3 → 4
```

### Security Checks Menu

1. **Remove Mint Authority** - Revoke token minting authority
2. **Remove Freeze Authority** - Revoke token freezing authority
3. **Burn LP Token** - Burn liquidity pool tokens
4. **Back** - Return to main menu
5. **Exit** - Close the application

## 🔧 Advanced Features

### Bundle Trading
- Automated multi-wallet bundle buying
- Configurable SOL amounts per wallet
- Batch transaction processing
- Lookup table optimization

### Liquidity Management
- Automated liquidity pool creation
- LP token burning functionality
- Liquidity removal capabilities

### Wallet Management
- Automated wallet generation
- SOL distribution to bundle wallets
- Token distribution across wallets
- SOL gathering from wallets

## 📁 Project Structure

```
Raydium-Bundler-Bot-Control-Amount/
├── config.ts              # Network and wallet configuration
├── settings.ts            # Token and pool settings
├── index.ts              # Main application entry point
├── layout/               # Main feature implementations
│   ├── createToken.ts    # Token creation
│   ├── createMarket.ts   # Market creation
│   ├── poolBuy.ts        # Bundle buying
│   ├── manualAllSell.ts  # Bulk selling
│   └── ...
├── src/                  # Core utilities and functions
│   ├── utils.ts          # Utility functions
│   ├── types.ts          # TypeScript type definitions
│   ├── build_a_sendtxn.ts # Transaction building
│   └── ...
├── menu/                 # User interface
│   └── menu.ts           # Menu display functions
└── wallets/              # Wallet storage
    ├── wallets.json      # Generated wallets
    └── lutAddress.txt    # Lookup table addresses
```

## ⚠️ Important Notes

### Wallet Configuration
- Ensure wallet percentages sum to 100% or less
- Main wallet (wallet1) should be 8-15%
- Bundle wallets should be 1.5% or less each
- Total bundle wallets should not exceed 60-80% of supply

### Security Considerations
- Always revoke mint and freeze authorities after token creation
- Burn LP tokens to prevent manipulation
- Use secure RPC endpoints
- Keep private keys secure

### Network Configuration
- Supports both mainnet-beta and devnet
- Configure appropriate RPC endpoints
- Set up Jito RPC for bundle transactions

## 🐛 Troubleshooting

### Common Issues

1. **RPC Connection Errors**
   - Verify your RPC endpoint is working
   - Check network configuration in `.env`

2. **Insufficient SOL**
   - Ensure main wallet has enough SOL for transactions
   - Check wallet distribution settings

3. **Transaction Failures**
   - Verify all wallet private keys are correct
   - Check token and pool configurations
   - Ensure sufficient SOL in all wallets

4. **Bundle Buy Issues**
   - Verify Jito RPC configuration
   - Check bundle wallet SOL amounts
   - Ensure lookup table is properly extended

## 📞 Support

For questions, issues, or support:

- **GitHub**: [moonbot777/Raydium-Bundler-Bot-Control-Amount](https://github.com/moonbot777/Raydium-Bundler-Bot-Control-Amount)
- **Telegram**: [@greenfoxfun](https://t.me/greenfoxfun)

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Disclaimer

This software is for educational and development purposes. Users are responsible for their own trading decisions and should understand the risks involved in cryptocurrency trading. The developers are not responsible for any financial losses incurred through the use of this software.

---

**Made with ❤️ by [moonbot777](https://github.com/moonbot777)**