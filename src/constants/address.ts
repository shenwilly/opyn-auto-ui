import { CHAIN_ID } from ".";

export const GAMMA_REDEEMER_ADDRESS: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "0xa9bc42ac855be4026ce3ce031f91c8f796122282",
  [CHAIN_ID.ROPSTEN]: "0x9c08febE5979CBc0F5a04ec55c644fa9d9B3F27F",
};

export const GAMMA_CONTROLLER_ADDRESS: {[key in CHAIN_ID]: string} = {
  [CHAIN_ID.MAINNET]: "0x4ccc2339F87F6c59c6893E1A678c2266cA58dC72",
  [CHAIN_ID.ROPSTEN]: "0x7e9beaccdccee88558aaa2dc121e52ec6226864e",
};