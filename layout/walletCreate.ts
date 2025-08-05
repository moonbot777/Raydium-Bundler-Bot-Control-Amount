import { ComputeBudgetProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction, Connection } from "@solana/web3.js";
import { newSendToken } from "../src/sendBulkToken";
import { Data, mainMenuWaiting, readBundlerWallets, readJson, saveBundlerWalletsToFile, saveHolderWalletsToFile, sleep } from "../src/utils";
import { connection } from "../config";
import { LP_wallet_private_key, bundlerWalletName, bundleWalletNum, needNewWallets } from "../settings"
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import bs58 from 'bs58'
import { screen_clear } from "../menu/menu";
import { execute } from "../src/legacy";
import { wallet1, wallet2, wallet3, wallet4, wallet5, wallet6, wallet7, wallet8, wallet9, wallet10, wallet11, wallet12, wallet13, wallet14, wallet15, wallet16, wallet17, wallet18, wallet19, wallet20, wallet21, quote_Mint_amount } from "../settings"
const walletNum = bundleWalletNum
export const wallet_create = async () => {
  screen_clear()
  console.log(`Creating ${walletNum} Wallets for bundle buy`);

}


export const calcWalletSol = () => {

  if ((wallet1SwapSol + wallet2SwapSol + wallet3SwapSol + wallet4SwapSol + wallet5SwapSol + wallet6SwapSol + wallet7SwapSol + wallet8SwapSol + wallet9SwapSol + wallet10SwapSol + wallet11SwapSol + wallet12SwapSol + wallet13SwapSol + wallet14SwapSol + wallet15SwapSol + wallet16SwapSol + wallet17SwapSol + wallet18SwapSol + wallet19SwapSol + wallet20SwapSol + wallet21SwapSol) >= 100) {
    console.log("Total token percent of 21 wallets over 100%.");

  } else {

    return walletSwapSol;
  }

}