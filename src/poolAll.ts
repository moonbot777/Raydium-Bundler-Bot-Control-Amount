import * as spl from '@solana/spl-token';
import { MARKET_STATE_LAYOUT_V3, Market } from '@openbook-dex/openbook';
import { AccountInfo, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { u8, u32, struct } from '@solana/buffer-layout';
import { u64, publicKey } from '@solana/buffer-layout-utils';
import base58 from 'bs58';
import { LIQUIDITY_STATE_LAYOUT_V4, LiquidityPoolKeysV4 } from '@raydium-io/raydium-sdk';
import { connection, cluster } from '../config';
import { LP_wallet_keypair } from '../settings';

export const SPL_MINT_LAYOUT = struct<any>([
  u32('mintAuthorityOption'),
  publicKey('mintAuthority'),
  u64('supply'),
  u8('decimals'),
  u8('isInitialized'),
  u32('freezeAuthorityOption'),
  publicKey('freezeAuthority')
]);

export const SPL_ACCOUNT_LAYOUT = struct<any>([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority')
]);

