import { useState, useCallback, useEffect } from 'react'

import { SubgraphVault } from '../types'
import { getVaults } from '../utils/graph'
import { CHAIN_ID } from '../constants/networks'
import { DEFAULT_INTERVAL } from '../constants'

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
    async function updateVaults() {
      setIsLoading(true)
      const vaults = await getVaults(chainId, account);
      setIsLoading(false)
      if (vaults === null) return
      setVaults(vaults)
    }
    updateVaults()
    const interval = setInterval(updateVaults, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [chainId, account, refreshCount])

  return { vaults, isLoading, refetch }
}
