import { useState, useCallback, useEffect } from 'react'

import { OTokenBalance, SubgraphVault } from '../types'
import { getVaults } from '../utils/graph'
import { CHAIN_ID } from '../constants/networks'

export function useVaults(
  account: string,
  chainId: CHAIN_ID,
): { vaults: SubgraphVault[] | null; refetch: Function; isLoading: boolean } {
  const [vaults, setVaults] = useState<SubgraphVault[]>([])

  const [refreshCount, setRefreshCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateBalances() {
      const vaults = await getVaults(chainId, account);
      if (vaults === null) return
      setIsLoading(false)
      setVaults(vaults)
    }
    updateBalances()
    const interval = setInterval(updateBalances, 10000)
    return () => clearInterval(interval)
  }, [chainId, account, refreshCount])

  return { vaults, isLoading, refetch }
}
