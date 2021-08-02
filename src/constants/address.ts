import { CHAIN_ID } from ".";

export const GAMMA_REDEEMER_ADDRESS: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "0x9c08febE5979CBc0F5a04ec55c644fa9d9B3F27F",
  [CHAIN_ID.ROPSTEN]: "0x9c08febE5979CBc0F5a04ec55c644fa9d9B3F27F",
};

export const GAMMA_CONTROLLER_ADDRESS: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "0x7e9beaccdccee88558aaa2dc121e52ec6226864e",
  [CHAIN_ID.ROPSTEN]: "0x7e9beaccdccee88558aaa2dc121e52ec6226864e",
};