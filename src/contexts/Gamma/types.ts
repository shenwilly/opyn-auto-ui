import { OTokenBalance } from "../../types";

export interface ContextValues {
  balances: OTokenBalance[] | null,
  balancesIsLoading: boolean,
}
