import { CHAIN_ID, etherscanEndpoint, ETHERSCAN_LINK_TYPE } from "../constants"

export const buildEtherscanLink = (type: ETHERSCAN_LINK_TYPE, value: string, chainId: CHAIN_ID) => {
  const baseUrl = etherscanEndpoint[chainId];
  let suffix = "";
  if (type === ETHERSCAN_LINK_TYPE.Address) {
    suffix = "/address/";
  } else if (type === ETHERSCAN_LINK_TYPE.Tx) {
    suffix = "/tx/";
  } 

  const url = baseUrl + suffix + value;
  return url;
}