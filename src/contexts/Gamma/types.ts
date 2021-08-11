import { BigNumber } from "ethers/lib/ethers";
import { OTokenBalance, SubgraphOrder, SubgraphVault } from "../../types";

export interface ContextValues {
  balances: OTokenBalance[] | null,
  balancesIsLoading: boolean,
  vaults: SubgraphVault[] | null,
  vaultsIsLoading: boolean,
  refetchVaults: Function,
  orders: SubgraphOrder[] | null,
  ordersIsLoading: boolean,
  refetchOrders: Function,
  orderFetchIsLoading: boolean,
  redeemFee: BigNumber | null,
  settleFee: BigNumber | null,
  feesIsLoading: boolean
  refetchFees: Function,
}

