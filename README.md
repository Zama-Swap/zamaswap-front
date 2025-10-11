# ZamaSwap Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-cyan)](https://tailwindcss.com/)
[![FHEVM](https://img.shields.io/badge/FHEVM-0.1.2-green)](https://docs.zama.ai/fhevm)

> A modern, privacy-preserving DEX frontend built with Zama's FHE technology

ZamaSwap Frontend is a cutting-edge decentralized exchange interface that leverages Zama's Fully Homomorphic Encryption (FHE) technology to enable completely private token swaps and liquidity management. Built with React 19, TypeScript, and modern web technologies, it provides a seamless user experience while maintaining complete transaction privacy.

> **📄 Smart Contracts**: This frontend interacts with the [ZamaSwap Contracts](https://github.com/Zama-Swap/ZamaSwap_contracts) - privacy-preserving smart contracts built with Zama's FHEVM technology.

## ✨ Features

- 🔐 **Private Token Swaps** - Execute swaps with encrypted amounts using FHE
- 💧 **Confidential Liquidity** - Add/remove liquidity while maintaining privacy
- 🪙 **Token Minting** - Mint new tokens with encrypted supply
- 🔗 **Wallet Integration** - Connect with popular Web3 wallets via RainbowKit
- 🎨 **Modern UI/UX** - Beautiful, responsive interface built with Tailwind CSS
- ⚡ **High Performance** - Optimized with Vite and React 19
- 🛡️ **MEV Protection** - Private transactions prevent front-running attacks

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18
- pnpm (recommended) or npm
- Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zamaswap-frontend.git
cd zamaswap-frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [FHE Integration](#-fhe-integration)
- [Components](#-components)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

### Web3 & Blockchain
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **Ethers.js** - Ethereum library
- **RainbowKit** - Wallet connection UI

### FHE & Privacy
- **Zama Relayer SDK** - FHE operations
- **FHEVM** - Fully Homomorphic Encryption for Ethereum

### UI & Animation
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **GSAP** - Animation library
- **Motion** - Animation utilities
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── scroll-area.tsx
│   ├── swap.tsx            # Token swap interface
│   ├── liquidity.tsx       # Liquidity management
│   ├── mint.tsx            # Token minting
│   ├── token-input.tsx     # Token amount input
│   ├── token-selector-modal.tsx  # Token selection
│   ├── reserve-card.tsx    # Pool reserves display
│   └── particles.tsx       # Background animations
├── lib/                    # Utility libraries
│   ├── fhe/               # FHE encryption/decryption
│   │   ├── instance.ts    # FHE instance initialization
│   │   ├── encrypt.ts     # Encryption utilities
│   │   ├── decrypt.ts     # Decryption utilities
│   │   └── user-decrypt.ts # User-specific decryption
│   ├── contract.ts        # Smart contract interactions
│   ├── format.ts          # Data formatting utilities
│   ├── utils.ts           # General utilities
│   └── etherscan.tsx      # Etherscan integration
├── hooks/                  # Custom React hooks
│   ├── use-balance.ts     # Token balance management
│   └── use-swap.ts        # Swap functionality
├── contexts/               # React contexts
├── constants/              # Application constants
├── abi/                    # Smart contract ABIs
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🎮 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |

## 🔐 FHE Integration

This application leverages Zama's FHE technology to enable:

### Encryption Operations
- **Token Amount Encryption** - All swap amounts encrypted before submission
- **Balance Privacy** - User balances remain confidential
- **Reserve Protection** - Pool reserves encrypted on-chain

### Key Features
- **Client-side Encryption** - FHE operations performed in browser
- **Zero-knowledge Swaps** - Transaction amounts hidden from public
- **MEV Protection** - Front-running prevention through privacy

### FHE Workflow
1. User inputs swap amount
2. Amount encrypted using FHE
3. Encrypted amount sent to smart contract
4. Contract processes encrypted transaction
5. User receives encrypted output amount
6. Output decrypted client-side

## 🧩 Components

### Core Components

#### Swap Interface (`swap.tsx`)
- Token selection and amount input
- Real-time price calculations
- Encrypted swap execution
- Transaction status tracking

#### Liquidity Management (`liquidity.tsx`)
- Add liquidity to pools
- Remove liquidity with LP tokens
- Encrypted liquidity calculations
- Pool share tracking

#### Token Minting (`mint.tsx`)
- Create new confidential tokens
- Encrypted supply management
- Token metadata configuration

#### Token Input (`token-input.tsx`)
- Amount input with validation
- Token balance display
- FHE encryption integration
- Real-time formatting

### UI Components (shadcn/ui)
- **Button** - Accessible button component
- **Card** - Content container
- **Dialog** - Modal dialogs
- **Input** - Form input fields
- **Scroll Area** - Custom scrollable areas

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# RPC URLs
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key
VITE_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-api-key

# Contract Addresses
VITE_TOKEN_A_ADDRESS=0x...
VITE_TOKEN_B_ADDRESS=0x...
VITE_SWAP_CONTRACT_ADDRESS=0x...

# FHE Configuration
VITE_FHE_RELAYER_URL=https://relayer.zama.ai
```

### Tailwind Configuration

The project uses Tailwind CSS 4 with custom configuration:

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
}
```

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 🚀 Deployment

### Build for Production

```bash
# Build the application
pnpm build

# Preview the build
pnpm preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
pnpm build

# Deploy dist folder to Netlify
```

### Environment Setup

Ensure all environment variables are configured in your deployment platform:

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

## 🧪 Development

### Code Style

- **ESLint** - Configured with TypeScript and React rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Strict type checking enabled

### Git Hooks

Consider adding pre-commit hooks for code quality:

```bash
# Install husky
pnpm add -D husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/zamaswap-front.git
   cd zamaswap-front
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

5. **Run quality checks**
   ```bash
   pnpm lint
   pnpm format:check
   pnpm build
   ```

6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request**

### Code Guidelines

- Use TypeScript for all new code
- Follow React best practices
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design
- Test on multiple browsers

## 📖 Documentation

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [FHEVM Documentation](https://docs.zama.ai/fhevm)

### Related Projects
- [ZamaSwap Contracts](https://github.com/Zama-Swap/zamaswap_contracts) - Smart contracts repository

### Project-Specific
- [Component API Reference](./docs/components.md)
- [FHE Integration Guide](./docs/fhe-integration.md)
- [Deployment Guide](./docs/deployment.md)

## 🆘 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/your-username/zamaswap-frontend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/zamaswap-frontend/discussions)
- 📚 **Documentation**: [Project Wiki](https://github.com/your-username/zamaswap-frontend/wiki)
- 🔗 **Smart Contracts**: [ZamaSwap Contracts](https://github.com/Zama-Swap/zamaswap-contracts)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Zama](https://zama.ai/) for the FHEVM technology
- [Vercel](https://vercel.com/) for the deployment platform
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [RainbowKit](https://www.rainbowkit.com/) for wallet integration

## ⚠️ Disclaimer

This software is experimental and has not been audited. Use at your own risk. The FHE technology is still under development, and there may be bugs or security vulnerabilities. Always test thoroughly before using in production environments.

---

<div align="center">
  <strong>Built with ❤️ using Zama's FHEVM technology</strong>
  <br>
  <a href="https://zama.ai/">Zama</a> • 
  <a href="https://docs.zama.ai/fhevm">FHEVM Docs</a> • 
  <a href="https://github.com/your-username/zamaswap-frontend">Frontend</a> • 
  <a href="https://github.com/Zama-Swap/zamaswap-contracts">Contracts</a>
</div>