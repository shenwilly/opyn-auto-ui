import { useState, useCallback, useEffect } from 'react'

import { SubgraphOrder } from '../types'
import { getOrders, getVaults } from '../utils/graph'
import { CHAIN_ID } from '../constants/networks'
import { DEFAULT_INTERVAL } from '../constants'

export function useOrders(
  account: string,
  chainId: CHAIN_ID,
): { orders: SubgraphOrder[] | null; refetch: Function; isLoading: boolean } {
  const [orders, setOrders] = useState<SubgraphOrder[]>([])

  const [refreshCount, setRefreshCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateOrders() {
      const vaults = await getOrders(chainId, account);
      if (vaults === null) return
      setIsLoading(false)
      setOrders(orders)
    }
    updateOrders()
    const interval = setInterval(updateOrders, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [chainId, account, refreshCount])

  return { orders, isLoading, refetch }
}
