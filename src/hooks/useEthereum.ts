import { useContext } from "react";
import { EthereumContext } from "../contexts/Ethereum";

const useEthereum = () => {
  return { ...useContext(EthereumContext) };
};

export default useEthereum;
