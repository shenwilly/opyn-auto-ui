import { BigNumber, BigNumberish, ethers } from 'ethers'
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
  createOrder: (otoken: string, amount: BigNumber, vaultId: BigNumberish) => Promise<void>; 
  cancelOrder: (orderId: BigNumber) => Promise<void>;
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

  const getGammaRedeemer = useCallback((): GammaRedeemer => {
    return (new ethers.Contract(GAMMA_REDEEMER_ADDRESS[chainId], GammaRedeemerAbi, ethAccount)) as GammaRedeemer;
  }, [chainId, ethAccount]);

  const createOrder = useCallback(
    async (otoken: string, amount: BigNumber, vaultId: BigNumberish) => {
    if (!ethAccount || !injectedProvider || otoken === "") {
      return;
    }
  
    setIsLoading(true);
    const gammaRedeemer = getGammaRedeemer();
    const tx = await gammaRedeemer.createOrder(otoken, amount, vaultId);
    await tx.wait();
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
      const tx = await gammaRedeemer.cancelOrder(orderId);
      await tx.wait();
      setIsLoading(false);  
    },
    [ethAccount, injectedProvider, getGammaRedeemer],
  )

  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateOrders() {
      const orders = await getOrders(chainId, account);
      if (orders === null) return
      setFetchIsLoading(false)
      setOrders(orders)
    }
    updateOrders()
    const interval = setInterval(updateOrders, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [chainId, account, refreshCount, setOrders])

  return { createOrder, cancelOrder, orders, isLoading, refetch, fetchIsLoading }
}
