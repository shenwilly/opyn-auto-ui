import { BigNumber } from "ethers"
import { CHAIN_ID } from "../constants"
import { graphAutoRedeemEndpoint, graphGammaEndpoints } from "../constants/endpoints"
import { OTokenBalance, SubgraphOrder, SubgraphVault } from "../types"

export async function getBalances(
  chainId: CHAIN_ID,
  owner: string,
  errorCallback: Function = () => {},
): Promise<OTokenBalance[] | null> {
  const query = `
    {
      accountBalances (where: {account: "${owner}"}) {
        token {
          id
          name
          symbol
          decimals
          underlyingAsset{
            id
            symbol
            decimals
          }
          strikeAsset {
            id
            symbol
            decimals
          }
          collateralAsset {
            id
            symbol
            decimals
          }
          strikePrice
          expiryTimestamp
          isPut
        }
      balance
    }
  }`

  try {
    const response = await postQuery(graphGammaEndpoints[chainId], query)
    const balances = response.data.accountBalances
    return balances
      .map((b: OTokenBalance) => {
        return {
          ...b,
          balance: BigNumber.from(b.balance),
        }
      })
      .filter((b: OTokenBalance) => !b.balance.isZero())
  } catch (error) {
    errorCallback(error)
    return null
  }
}

export async function getVaults(
  chainId: CHAIN_ID,
  account: string,
  errorCallback: Function = () => {},
): Promise<SubgraphVault[] | null> {
  const query = `
  {
    account(id: "0x70ebf55a237337ce1ad0c62212188f5f58b1a2fd") {
      vaults {
        vaultId
        collateralAsset {
          id
          symbol
          decimals
        }
        collateralAmount
        shortOToken{
          id
          symbol
          decimals
          expiryTimestamp
          underlyingAsset {
            symbol
            id
          }
        }
        shortAmount
        longOToken {
          id
          symbol
          decimals
          expiryTimestamp
          underlyingAsset {
            symbol
            id
          }
        }
        longAmount
      }
    }
  }`
  try {
    const response = await postQuery(graphGammaEndpoints[chainId], query)
    return response.data.account.vaults
  } catch (error) {
    errorCallback(error)
    return null
  }
}

export async function getOrders(
  chainId: CHAIN_ID,
  account: string,
  errorCallback: Function = () => {},
): Promise<SubgraphOrder[] | null> {
  const query = `
  {
    orders(owner: "${account}") {
      orderId
      owner
      otoken
      amount
      vaultId
      isSeller
      toETH
      finished
    }
  }`
  try {
    const response = await postQuery(graphAutoRedeemEndpoint[chainId], query)
    return response.data.vaults
  } catch (error) {
    errorCallback(error)
    return null
  }
}

const postQuery = async (endpoint: string, query: string) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }
  const url = endpoint
  const response = await fetch(url, options)
  const data = await response.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  } else {
    return data
  }
}
