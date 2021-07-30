import { BigNumber, ethers } from 'ethers'
import { useState, useCallback, useEffect } from 'react'
import { SubgraphOrder } from '../types'
import { getOrders } from '../utils/graph'
import { CHAIN_ID } from '../constants/networks'
import { DEFAULT_INTERVAL } from '../constants'
import GammaRedeemerAbi from "../constants/abis/GammaRedeemer.json";
import { GammaRedeemer } from '../types/eth';
import { GAMMA_REDEEMER_ADDRESS } from '../constants/address'
import useEthereum from './useEthereum'

interface useOrdersResult {
  createOrder: Function; 
  cancelOrder: Function;
  orders: SubgraphOrder[] | null; 
  refetch: Function; 
  isLoading: boolean;
  fetchIsLoading: boolean;
}

export function useOrders(
  account: string,
  chainId: CHAIN_ID,
): useOrdersResult {
  const { ethAccount, injectedProvider } = useEthereum();
  const [orders, setOrders] = useState<SubgraphOrder[]>([])

  const [refreshCount, setRefreshCount] = useState(0)
  const [fetchIsLoading, setFetchIsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const getGammaRedeemer = (): GammaRedeemer => {
    return (new ethers.Contract(GAMMA_REDEEMER_ADDRESS[chainId], GammaRedeemerAbi, ethAccount)) as GammaRedeemer;
  }

  const createOrder = useCallback(
    async (otoken: string, amount: BigNumber, vaultId: BigNumber) => {
    if (!ethAccount || !injectedProvider || otoken === "") {
      return;
    }
  
    setIsLoading(true);
    const gammaRedeemer = getGammaRedeemer();
    await gammaRedeemer.createOrder(otoken, amount, vaultId);
    setIsLoading(false);
    
    },
    [ethAccount, injectedProvider, getGammaRedeemer],
  )

  const cancelOrder = useCallback(
    async (orderId: BigNumber) => {
      if (!ethAccount || !injectedProvider) {
        return;
      }
    
      setIsLoading(true);
      const gammaRedeemer = getGammaRedeemer();
      await gammaRedeemer.cancelOrder(orderId);
      setIsLoading(false);  
    },
    [ethAccount, injectedProvider, getGammaRedeemer],
  )

  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateOrders() {
      const vaults = await getOrders(chainId, account);
      if (vaults === null) return
      setFetchIsLoading(false)
      setOrders(orders)
    }
    updateOrders()
    const interval = setInterval(updateOrders, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [chainId, account, refreshCount])

  return { createOrder, cancelOrder, orders, isLoading, refetch, fetchIsLoading }
}
