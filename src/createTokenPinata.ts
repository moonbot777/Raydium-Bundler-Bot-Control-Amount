import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { connection } from "../config";
import { UserToken } from "./types";
import { saveDataToFile, sleep } from "./utils";

export const createTokenWithMetadata = async (
  token: UserToken,
  mainKp: Keypair
): Promise<{ mint: PublicKey; tokenAccount: PublicKey }> => {
  try {
    console.log("Creating token with metadata...");
    
    // Create mint
    const mint = await createMint(
      connection,
      mainKp,
      mainKp.publicKey,
      mainKp.publicKey,
      token.decimals
    );
    
    console.log(`Token mint created: ${mint.toBase58()}`);
    
    // Create associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      mainKp,
      mint,
      mainKp.publicKey
    );
    
    console.log(`Token account created: ${tokenAccount.address.toBase58()}`);
    
    // Mint tokens
    await mintTo(
      connection,
      mainKp,
      mint,
      tokenAccount.address,
      mainKp,
      token.uiAmount
    );
    
    console.log(`Minted ${token.uiAmount} tokens`);
    
    // Save token data
    const tokenData = {
      mint: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      supply: token.uiAmount
    };
    
    saveDataToFile("token_data.json", tokenData);
    
    await sleep(2000);
    
    return { mint, tokenAccount: tokenAccount.address };
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
}; 