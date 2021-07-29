import { providers, Signer } from "ethers";
import Web3Modal from "web3modal";
import { CHAIN_ID } from "../../constants";

export interface ContextValues {
    ethAccount?: Signer,
    accountAddress: string,
    injectedProvider?: providers.Web3Provider,
    web3Modal?: Web3Modal,
    chainId: number,
    switchChain: (network: CHAIN_ID) => void,
    loadWeb3Modal: () => void,
    logoutOfWeb3Modal: () => void,
}
