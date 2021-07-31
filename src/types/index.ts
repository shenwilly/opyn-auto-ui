import { BigNumber } from "ethers";

export interface ETHEREUM_CHAIN {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export type SubgraphToken = {
  id: string
  symbol: string
  name: string
  decimals: number
}

export type SubgraphOToken = SubgraphToken & {
  underlyingAsset: SubgraphToken
  strikeAsset: SubgraphToken
  collateralAsset: SubgraphToken
  strikePrice: string
  expiryTimestamp: string
  isPut: boolean
  creator: string
  createdAt: string
  totalSupply: string
}

export type OTokenBalance = {
  token: SubgraphOToken
  balance: BigNumber
}

export type SubgraphVault = {
  vaultId: string
  collateralAmount: string | null
  collateralAsset: SubgraphToken | null
  longAmount: string | null
  longOToken: SubgraphOToken | null
  shortAmount: string | null
  shortOToken: SubgraphOToken | null
}

export type SubgraphOrder = {
  orderId: string
  owner: string
  otoken: string
  amount: string
  vaultId: string
  isSeller: boolean
  toEth: boolean
  finished: boolean
  finishTxHash: string
}