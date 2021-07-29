import { CHAIN_ID } from "."

export const graphEndpoints: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "https://gateway.thegraph.com/api/[api-key]/subgraphs/id/0xfc3ac80003d8a5181e554d03983284e4341a7610-0",
  [CHAIN_ID.ROPSTEN]: "https://api.thegraph.com/subgraphs/name/opynfinance/gamma-ropsten",
};