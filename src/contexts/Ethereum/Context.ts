import { createContext } from "react";
import { CHAIN_ID } from "../../constants";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    ethAccount: undefined,
    accountAddress: "",
    web3Modal: undefined,
    injectedProvider: undefined,
    chainId: CHAIN_ID.MAINNET,
    switchChain: (_) => {},
    loadWeb3Modal: () => {},
    logoutOfWeb3Modal: () => {}
});

export default Context;
