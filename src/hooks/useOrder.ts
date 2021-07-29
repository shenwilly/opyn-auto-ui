import { BigNumber, ethers } from 'ethers'
import { useCallback, useState } from 'react'
import useEthereum from './useEthereum'
import GammaRedeemerAbi from "../constants/abis/GammaRedeemer.json";
import { GammaRedeemer } from '../types/eth';

export function useOrder(gammaRedeemerAddress: string) {
  const { ethAccount, injectedProvider } = useEthereum();
  const [ isLoading, setIsLoading] = useState(false)

  const getGammaRedeemer = (): GammaRedeemer => {
    return (new ethers.Contract(gammaRedeemerAddress, GammaRedeemerAbi, ethAccount)) as GammaRedeemer;
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

  return { createOrder, cancelOrder, isLoading }
}
