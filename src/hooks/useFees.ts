import { BigNumber, ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import useEthereum from './useEthereum'
import GammaRedeemerAbi from "../constants/abis/GammaRedeemer.json";
import { CHAIN_ID, DEFAULT_INTERVAL } from '../constants';
import { GAMMA_REDEEMER_ADDRESS } from '../constants/address';
import { GammaRedeemer } from '../types/eth/GammaRedeemer';

export function useFees(chainId: CHAIN_ID) {
  const { injectedProvider } = useEthereum();
  const [redeemFee, setRedeemFee] = useState<BigNumber | null>(null);
  const [settleFee, setSettleFee] = useState<BigNumber | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  const getGammaRedeemer = useCallback((): GammaRedeemer => {
    return (new ethers.Contract(GAMMA_REDEEMER_ADDRESS[chainId], GammaRedeemerAbi, injectedProvider)) as GammaRedeemer;
  }, [chainId, injectedProvider]);
  
  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateFees() {
      if (!injectedProvider) {
        return;
      }
      setIsLoading(true);

      const gammaRedeemer = getGammaRedeemer();
      const redeemFee = await gammaRedeemer.redeemFee();
      const settleFee = await gammaRedeemer.settleFee();

      setRedeemFee(redeemFee);
      setSettleFee(settleFee);
      
      setIsLoading(false);
    }
    updateFees()
    const interval = setInterval(updateFees, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [injectedProvider, refreshCount, chainId, getGammaRedeemer])

  return { redeemFee, settleFee, isLoading, refetch }
}
