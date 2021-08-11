import { useState, useCallback, useEffect } from 'react'

import { OTokenBalance } from '../types'
import { getBalances } from '../utils/graph'
import { CHAIN_ID } from '../constants/networks'
import { DEFAULT_INTERVAL } from '../constants'

export function useOTokenBalances(
  account: string,
  chainId: CHAIN_ID,
): { balances: OTokenBalance[] | null; refetch: Function; isLoading: boolean } {
  const [balances, setBalances] = useState<OTokenBalance[]>([])

  const [refreshCount, setRefreshCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateBalances() {
      setIsLoading(true)
      const balances = await getBalances(chainId, account)
      setIsLoading(false)
      if (balances === null) return
      setBalances(balances)
    }
    updateBalances()
    const interval = setInterval(updateBalances, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [chainId, account, refreshCount])

  return { balances, isLoading, refetch }
}
