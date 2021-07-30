import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3modal";
import { Signer } from "ethers";
import { CHAIN_METADATA, CHAIN_ID } from "../../constants";

const Provider: React.FC = ({ children }) => {
    const [ethAccount, setEthAccount] = useState<Signer>();
    const [accountAddress, setAccountAddress] = useState<string>("");
    const [injectedProvider, setInjectedProvider] = useState<Web3Provider>();
    const [chainId, setChainId] = useState<number>(CHAIN_ID.MAINNET);

    const loadWeb3Modal = useCallback(async () => {
        const provider = await web3Modal.connect();
        const web3Provider = new Web3Provider(provider)
        setInjectedProvider(web3Provider);

        const signer = web3Provider.getSigner(0);
        setEthAccount(signer);

        const address = await signer.getAddress();
        setAccountAddress(address.toLowerCase());

        const network = await web3Provider.getNetwork();
        setChainId(network.chainId);
    }, [setInjectedProvider]);

    const logoutOfWeb3Modal = async () => {
        web3Modal.clearCachedProvider();
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    const switchChain = async (chainId: CHAIN_ID) => {
        if (!injectedProvider) return;

        const chainMetadata = CHAIN_METADATA[chainId];

        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainMetadata.chainId }],
            });
            window.location.reload();
        } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [chainMetadata],
                });
              } catch (addError) {
                console.log(addError)
              }
            }
        }  
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal();
        }
    }, [loadWeb3Modal]);

    useEffect(() => {
        window.ethereum &&
        window.ethereum.on("chainChanged", () => {
        web3Modal.cachedProvider &&
            setTimeout(() => {
            window.location.reload();
            }, 1);
        });

        window.ethereum &&
        window.ethereum.on("accountsChanged", () => {
        web3Modal.cachedProvider &&
            setTimeout(() => {
            window.location.reload();
            }, 1);
        });
    }, []);
    
    return (
        <Context.Provider
            value={{
                ethAccount,
                accountAddress,
                injectedProvider,
                web3Modal,
                chainId,
                switchChain,
                loadWeb3Modal,
                logoutOfWeb3Modal,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;