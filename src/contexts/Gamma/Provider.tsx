import React from "react";
import useEthereum from "../../hooks/useEthereum";
import { useFees } from "../../hooks/useFees";
import { useOrders } from "../../hooks/useOrders";
import { useOTokenBalances } from "../../hooks/useOTokenBalances";
import { useVaults } from "../../hooks/useVaults";
import Context from "./Context";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId } = useEthereum();
    const { balances, isLoading: balancesIsLoading } = useOTokenBalances(accountAddress, chainId);
    const { vaults, isLoading: vaultsIsLoading, refetch: refetchVaults } = useVaults(accountAddress, chainId);
    const { 
        orders, 
        isLoading: ordersIsLoading, 
        refetch: refetchOrders, 
        fetchIsLoading: orderFetchIsLoading 
    } = useOrders(accountAddress, chainId);
    const { redeemFee, settleFee, isLoading: feesIsLoading, refetch: refetchFees } = useFees(chainId);
    
    return (
        <Context.Provider
            value={{
              balances,
              balancesIsLoading,
              vaults,
              vaultsIsLoading,
              refetchVaults,
              orders,
              ordersIsLoading,
              refetchOrders,
              orderFetchIsLoading,
              redeemFee,
              settleFee,
              feesIsLoading,
              refetchFees
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;