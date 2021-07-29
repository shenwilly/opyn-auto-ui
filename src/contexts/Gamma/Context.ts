import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  balances: null,
  balancesIsLoading: false,
  vaults: null,
  vaultsIsLoading: false,
});

export default Context;
