import React, { useCallback, useState, useEffect } from "react";
import useEthereum from "../../hooks/useEthereum";
import { useOTokenBalances } from "../../hooks/useOTokenBalances";
import Context from "./Context";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId } = useEthereum();
    const { balances, isLoading: balancesIsLoading } = useOTokenBalances(accountAddress, chainId);
    
    return (
        <Context.Provider
            value={{
              balances,
              balancesIsLoading,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;