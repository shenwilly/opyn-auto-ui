import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import useEthereum from './useEthereum'
import ControllerAbi from "../constants/abis/GammaController.json";
import { CHAIN_ID, DEFAULT_INTERVAL } from '../constants';
import { GammaController } from '../types/eth/GammaController';
import { GAMMA_CONTROLLER_ADDRESS } from '../constants/address';

export function useOperator(operator: string, chainId: CHAIN_ID) {
  const { accountAddress, ethAccount, injectedProvider } = useEthereum();
  const [isOperator, setIsOperator] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [fetchIsLoading, setFetchIsLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const setOperator = useCallback(
    async (value: boolean) => {
      if (!ethAccount || !injectedProvider || operator === "") {
        return;
      }
      setIsLoading(true);
      const controller = (
        new ethers.Contract(GAMMA_CONTROLLER_ADDRESS[chainId], ControllerAbi, ethAccount)
      ) as GammaController;

      await controller.setOperator(operator, value);
      setIsLoading(false);
    },
    [ethAccount, injectedProvider, operator],
  )

  const refetch = useCallback(() => {
    setRefreshCount(count => count + 1)
  }, [setRefreshCount])

  useEffect(() => {
    async function updateIsOperator() {
      const controller = (
        new ethers.Contract(GAMMA_CONTROLLER_ADDRESS[chainId], ControllerAbi, ethAccount)
      ) as GammaController;
      const isOperator = await controller.isOperator(accountAddress, operator);
      
      setIsOperator(isOperator);
      setFetchIsLoading(false);
    }
    updateIsOperator()
    const interval = setInterval(updateIsOperator, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [ethAccount, accountAddress, refreshCount])

  return { setOperator, isLoading, isOperator, refetch, fetchIsLoading }
}
