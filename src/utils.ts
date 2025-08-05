import dotenv from 'dotenv'
import fs from 'fs'
import readline from 'readline'
import { Connection, GetProgramAccountsFilter, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection } from "../config";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SPL_ACCOUNT_LAYOUT, TokenAccount } from "@raydium-io/raydium-sdk";
import base58 from "bs58";
import { PoolInfo, PoolInfoStr } from "./types";
import { init, security_checks } from '..'
import { rl } from '../menu/menu';

// Utility functions
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retrieveEnvVariable = (variableName: string) => {
  const variable = process.env[variableName] || ''
  if (!variable) {
    console.log(`${variableName} is not set`)
    process.exit(1)
  }
  return variable
}

export const readJson = (): PoolInfoStr => {
  try {
    const data = fs.readFileSync('./data.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      mint: null,
      marketId: null,
      poolId: null,
      mainKp: null,
      poolKeys: null,
      removed: null
    };
  }
}

export const saveDataToFile = (filename: string, data: any) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving data to ${filename}:`, error);
  }
}

export const readWallets = (filename: string): Keypair[] => {
  try {
    const data = fs.readFileSync(`./wallets/${filename}.json`, 'utf8');
    const wallets = JSON.parse(data);
    return wallets.map((wallet: any) => Keypair.fromSecretKey(base58.decode(wallet.privateKey)));
  } catch (error) {
    console.error(`Error reading wallets from ${filename}:`, error);
    return [];
  }
}

export const readBundlerWallets = (filename: string): Keypair[] => {
  try {
    const data = fs.readFileSync(`./wallets/${filename}.json`, 'utf8');
    const wallets = JSON.parse(data);
    return wallets.map((wallet: any) => Keypair.fromSecretKey(base58.decode(wallet.privateKey)));
  } catch (error) {
    console.error(`Error reading bundler wallets from ${filename}:`, error);
    return [];
  }
}

export const readLUTAddressFromFile = (): string => {
  try {
    const data = fs.readFileSync('./wallets/lutAddress.txt', 'utf8');
    return data.trim();
  } catch (error) {
    console.error('Error reading LUT address:', error);
    return '';
  }
}

export const outputBalance = async (keypair: Keypair) => {
  try {
    const balance = await connection.getBalance(keypair.publicKey);
    console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    return balance;
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
}

export const mainMenuWaiting = () => {
  console.log("\nPress Enter to return to main menu...");
  rl.question("", () => {
    init();
  });
}
