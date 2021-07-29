import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  balances: null,
  balancesIsLoading: false,
});

export default Context;
