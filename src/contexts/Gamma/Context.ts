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
  redeemFee: null,
  settleFee: null,
  feesIsLoading: false,
  refetchFees: () => {},
});

export default Context;
