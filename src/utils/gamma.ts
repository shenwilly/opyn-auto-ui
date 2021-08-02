import { SubgraphOToken, SubgraphVault } from "../types";

export const getVaultOtoken = (vault: SubgraphVault): SubgraphOToken | null => {
  if (vault.shortOToken !== null) {
    return vault.shortOToken;
  } else if (vault.longOToken !== null) {
    return vault.longOToken
  }
  return null
}