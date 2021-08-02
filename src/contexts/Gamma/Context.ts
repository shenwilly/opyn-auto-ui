import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  balances: null,
  balancesIsLoading: false,
  vaults: null,
  vaultsIsLoading: false,
  refetchVaults: () => {},
  orders: null,
  ordersIsLoading: false,
  refetchOrders: () => {},
});

export default Context;
