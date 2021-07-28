import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    ethAccount: undefined,
    accountAddress: "",
    web3Modal: undefined,
    injectedProvider: undefined,
    chainId: undefined,
    switchChain: (_) => {},
    loadWeb3Modal: () => {},
    logoutOfWeb3Modal: () => {}
});

export default Context;
