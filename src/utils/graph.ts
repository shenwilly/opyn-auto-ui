import { BigNumber } from "ethers"
import { CHAIN_ID } from "../constants"
import { graphEndpoints } from "../constants/endpoints"
import { OTokenBalance } from "../types"

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
    const response = await postQuery(graphEndpoints[chainId], query)
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
