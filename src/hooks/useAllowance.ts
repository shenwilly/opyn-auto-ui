import { BigNumber, constants, ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import useEthereum from './useEthereum'
import ERC20abi from "../constants/abis/ERC20.json";
import { ERC20 } from '../types/eth/ERC20';
import { DEFAULT_INTERVAL } from '../constants';

export function useAllowance(token: string, spender: string) {
  const { accountAddress, ethAccount, injectedProvider } = useEthereum();
  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const [allowanceIsLoading, setAllowanceIsLoading] = useState(true)
  const [refreshAllowanceCount, setRefreshAllowanceCount] = useState(0)
  const [approveIsLoading, setApproveIsLoading] = useState(false)

  const approve = useCallback(
    async (amount?: BigNumber) => {
    if (!ethAccount || !injectedProvider || !spender || !token) {
      return;
    }

    const approveAmount = amount ? amount : constants.MaxUint256;
  
    setApproveIsLoading(true);
    try {
      const erc20 = (new ethers.Contract(token, ERC20abi, ethAccount)) as ERC20;
      await erc20.approve(spender, approveAmount);
      setApproveIsLoading(false);
    } catch (e) {
      setApproveIsLoading(false);
      return false;
    }
    },
    [ethAccount, injectedProvider, spender, token],
  )

  const refetchAllowance = useCallback(() => {
    setRefreshAllowanceCount(count => count + 1)
  }, [setRefreshAllowanceCount])

  useEffect(() => {
    async function updateBalances() {
      const erc20 = (new ethers.Contract(token, ERC20abi, ethAccount)) as ERC20;
      const balances = await erc20.balanceOf(accountAddress);
      
      setAllowanceIsLoading(false);
      setAllowance(balances);
    }
    updateBalances()
    const interval = setInterval(updateBalances, DEFAULT_INTERVAL)
    return () => clearInterval(interval)
  }, [ethAccount, token, accountAddress, refreshAllowanceCount])

  return { approve, approveIsLoading, allowance, allowanceIsLoading, refetchAllowance }
}
