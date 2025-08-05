import { Connection, PublicKey, Keypair } from "@solana/web3.js"
import {
  TxVersion, Token, Currency,
  TOKEN_PROGRAM_ID,
  SOL,
  LOOKUP_TABLE_CACHE,
} from "@raydium-io/raydium-sdk";
import bs58 from 'bs58';

// import { retrieveEnvVariable } from "./src/utils"
import { UserToken } from "./src/types"
import dotenv from 'dotenv'

dotenv.config()

const retrieveEnvVariable = (variableName: string) => {
  const variable = process.env[variableName] || ''
  if (!variable) {
    console.log(`${variableName} is not set`)
    process.exit(1)
  }
  return variable
}

// Network configuration
export const cluster = retrieveEnvVariable("CLUSTER") // "mainnet-beta" or "devnet"
export const connection = new Connection(retrieveEnvVariable("RPC_ENDPOINT"), "confirmed")

// Jito configuration
export const JITO_FEE = retrieveEnvVariable("JITO_FEE")

// SWAP configuration
export const SWAP = {
  programId: cluster === "devnet" ? "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM" : "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
  authority: cluster === "devnet" ? "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1" : "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"
}

// Wallet configuration
export const LP_wallet_keypair = Keypair.fromSecretKey(bs58.decode(retrieveEnvVariable("LP_WALLET_PRIVATE_KEY")))

// Token configuration
export const tokens: UserToken[] = [
  {
    name: 'Hello',
    symbol: 'Hello',
    decimals: 9,
    description: "Hello, World!",
    uiAmount: 10 ** 9,
    image: "./src/images/1.jpg",
    extensions: {
      website: "https://www.soldev.app/",
      twitter: "https://x.com/mklrwt013",
      telegram: "https://t.me/Tiffanystones"
    },
    tags: [
      "Meme",
      "Tokenization"
    ],
    creator: {
      name: "",
      site: "https://www.soldev.app/"
    }
  }
]

// Swap wallets configuration
export const swapWallets = [
  // Add your swap wallet configurations here
]


