import bs58 from "bs58"
import { AddressLookupTableProgram, ComputeBudgetProgram, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SignatureStatus, SystemProgram, Transaction, TransactionConfirmationStatus, TransactionInstruction, TransactionMessage, TransactionSignature, VersionedTransaction } from "@solana/web3.js"
import { cluster, connection } from "../config";
import { mainMenuWaiting, outputBalance, readBundlerWallets, readJson, saveLUTAddressToFile, sleep } from "../src/utils";
import { bundlerWalletName } from "../settings";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountIdempotentInstruction, createSyncNativeInstruction, getAssociatedTokenAddress, getAssociatedTokenAddressSync, NATIVE_MINT, TOKEN_PROGRAM_ID, unpackMint } from "@solana/spl-token";
import { DEVNET_PROGRAM_ID, Liquidity, MAINNET_PROGRAM_ID, MARKET_STATE_LAYOUT_V3 } from "@raydium-io/raydium-sdk";
import { derivePoolKeys } from "../src/poolAll";

import { calcWalletSol } from "./walletCreate";

const data = readJson()
const SIGNER_WALLET = Keypair.fromSecretKey(bs58.decode(data.mainKp!))
let swapSolAmount = calcWalletSol();

export const createAndSendV0Tx = async (txInstructions: TransactionInstruction[]) => {
    // Step 1 - Fetch Latest Blockhash
    let latestBlockhash = await connection.getLatestBlockhash();
    console.log("   ✅ - Fetched latest blockhash. Last valid height:", latestBlockhash.lastValidBlockHeight);

    // Step 2 - Generate Transaction Message
    const messageV0 = new TransactionMessage({
        payerKey: SIGNER_WALLET.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: txInstructions
    }).compileToV0Message();
    console.log("   ✅ - Compiled transaction message");
    const transaction = new VersionedTransaction(messageV0);

    // Step 3 - Sign your transaction with the required `Signers`
    transaction.sign([SIGNER_WALLET]);
    console.log(`   ✅ - Transaction Signed by the wallet ${(SIGNER_WALLET.publicKey).toBase58()}`);

    // Step 4 - Send our v0 transaction to the cluster
    const txid = await connection.sendTransaction(transaction, { maxRetries: 5 });
    console.log("   ✅ - Transaction sent to network");

    // Step 5 - Confirm Transaction 
    const confirmation = await confirmTransaction(connection, txid);
    // if (confirmation.value.err) { throw new Error("   ❌ - Transaction not confirmed.") }
    cluster == "devnet" ? console.log('🎉 Transaction successfully confirmed!', '\n', `https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        : console.log('🎉 Transaction successfully confirmed!', '\n', `https://explorer.solana.com/tx/${txid}`);
}

async function confirmTransaction(
    connection: Connection,
    signature: TransactionSignature,
    desiredConfirmationStatus: TransactionConfirmationStatus = 'confirmed',
    timeout: number = 30000,
    pollInterval: number = 1000,
    searchTransactionHistory: boolean = false
): Promise<SignatureStatus> {
    const start = Date.now();

   

    throw new Error(`Transaction confirmation timeout after ${timeout}ms`);
}

async function createLUT() {
    try {
     
    } catch (err) {
        console.log("Error in creating Lookuptable. Please retry this.")
        return
    }

}

async function addAddressesToTable(LOOKUP_TABLE_ADDRESS: PublicKey, mint: PublicKey) {
    const programId = cluster == "devnet" ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID

    const wallets = readBundlerWallets(bundlerWalletName)

    const walletKPs: Keypair[] = wallets.map((wallet: string) => Keypair.fromSecretKey(bs58.decode(wallet)));
    const walletPKs: PublicKey[] = wallets.map((wallet: string) => (Keypair.fromSecretKey(bs58.decode(wallet))).publicKey);

    try {// Step 1 - Adding bundler wallets
        
    }
    catch (err) {
        console.log("There is an error in adding addresses in LUT. Please retry it.")
        mainMenuWaiting()
        return;
    }
}

const createAtas = async (wallets: Keypair[], baseMint: PublicKey) => {
    try {
       
    } catch (error) {
        console.log("Prepare Ata creation error:", error)
        return
    }
}

export const create_extend_lut_ata = async () => {

    const wallets = readBundlerWallets(bundlerWalletName)
    const walletKPs = wallets.map((wallet: string) => Keypair.fromSecretKey(bs58.decode(wallet)));
    const data = readJson()
    const mint = new PublicKey(data.mint!)


    console.log(wallets);
    console.log(walletKPs);
    console.log(data);
    console.log("mint", mint);


    try {
        const programId = cluster == "devnet" ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID

        const wallets = readBundlerWallets(bundlerWalletName)

        const walletKPs: Keypair[] = wallets.map((wallet: string) => Keypair.fromSecretKey(bs58.decode(wallet)));
        const walletPKs: PublicKey[] = wallets.map((wallet: string) => (Keypair.fromSecretKey(bs58.decode(wallet))).publicKey);

        const ata = await createAtas(walletKPs, mint)
        const LOOKUP_TABLE_ADDRESS = ata.lookupTableAddress

        const txInstructions: TransactionInstruction[] = []

        const tx = new Transaction()

        tx.add(new ComputeBudgetProgram.setComputeUnitLimit({ units: 1000000 }))
        tx.add(new AddressLookupTableProgram.createAddressLookupTable({
            payer: SIGNER_WALLET.publicKey,
            address: LOOKUP_TABLE_ADDRESS
        }))

        tx.add(new AddressLookupTableProgram.extendAddressLookupTable({
            payer: SIGNER_WALLET.publicKey,
            address: LOOKUP_TABLE_ADDRESS,
            accounts: walletPKs.map((pk) => ({ pubkey: pk, isWritable: true, isSigner: false }))
        }))

        tx.add(new AddressLookupTableProgram.extendAddressLookupTable({
            payer: SIGNER_WALLET.publicKey,
            address: LOOKUP_TABLE_ADDRESS,
            accounts: walletPKs.map((pk) => ({ pubkey: pk, isWritable: true, isSigner: false }))
        }))

        txInstructions.push(tx.instructions[0])
        txInstructions.push(tx.instructions[1])

        await createAndSendV0Tx(txInstructions)

        console.log("   ✅ - Lookuptable created successfully")
        mainMenuWaiting()
        return
    } catch (err) {
        console.log("Error occurred in creating lookuptable. Please retry this again.")
        mainMenuWaiting()
    }

}