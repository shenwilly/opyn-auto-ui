import { CHAIN_ID } from "."

export const graphGammaEndpoints: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "https://api.thegraph.com/subgraphs/name/opynfinance/gamma-mainnet",
  [CHAIN_ID.ROPSTEN]: "https://api.thegraph.com/subgraphs/name/opynfinance/gamma-ropsten",
};

export const graphAutoRedeemEndpoint: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "https://api.thegraph.com/subgraphs/name/shenwilly/opyn-auto",
  [CHAIN_ID.ROPSTEN]: "https://api.thegraph.com/subgraphs/name/shenwilly/opyn-auto",
};

export const etherscanEndpoint: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "https://etherscan.io",
  [CHAIN_ID.ROPSTEN]: "https://ropsten.etherscan.io",
};

