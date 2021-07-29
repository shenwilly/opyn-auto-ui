import React, { useCallback, useState, useEffect } from "react";
import useEthereum from "../../hooks/useEthereum";
import { useOrders } from "../../hooks/useOrders";
import { useOTokenBalances } from "../../hooks/useOTokenBalances";
import { useVaults } from "../../hooks/useVaults";
import Context from "./Context";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId } = useEthereum();
    const { balances, isLoading: balancesIsLoading } = useOTokenBalances(accountAddress, chainId);
    const { vaults, isLoading: vaultsIsLoading } = useVaults(accountAddress, chainId);
    const { orders, isLoading: ordersIsLoading } = useOrders(accountAddress, chainId);
    
    return (
        <Context.Provider
            value={{
              balances,
              balancesIsLoading,
              vaults,
              vaultsIsLoading,
              orders,
              ordersIsLoading
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;