import { ETHEREUM_CHAIN } from "../types";

export enum CHAIN_ID {
  MAINNET = 1,
  ROPSTEN = 3,
}

export const CHAIN_METADATA: {[key in CHAIN_ID]: ETHEREUM_CHAIN} = {
  [CHAIN_ID.MAINNET]: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  [CHAIN_ID.ROPSTEN]: {
    chainId: "0x3",
    chainName: "Ropsten",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
}