import { ETHEREUM_CHAIN } from "../types";

export enum CHAIN_ID {
  MAINNET = 1,
}

export const CHAIN_METADATA: {[key: number]: ETHEREUM_CHAIN} = {
  1: {
    chainId: "0x01",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
}