import { VersionedTransaction } from "@solana/web3.js";
import { connection } from "../config";


interface Blockhash {
  blockhash: string;
  lastValidBlockHeight: number;
}

