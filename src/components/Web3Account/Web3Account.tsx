import { useCallback } from "react";
import { Button, Box, Flex, Text, useDisclosure } from "@chakra-ui/react"
// import useWeb3 from "../../hooks/useWeb3";
import Web3AccountModal from "../Web3AccountModal";
// import useUbiroll from "../../hooks/useUbiroll";
// import { formatUnits } from "ethers/lib/utils";
import useEthereum from "../../hooks/useEthereum";
// import UbiModal from "../UbiModal";

const Web3Account = () => {
    const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider, accountAddress } = useEthereum()
    const { isOpen, onClose, onOpen } = useDisclosure()
    
    function truncateAddress(str: string) {
        return str.substr(0, 6) + "..." + str.substr(str.length - 5, 6);
    }

    return (
        <Flex align="center">
            {injectedProvider &&
                (<Box display="flex" p="2" borderRadius="8">
                    <Box px="2" py="1" border="1px" borderColor="black.200" cursor="pointer"
                        borderRadius={15} 
                        onClick={onOpen}>
                        <Text>
                            {truncateAddress(accountAddress)}
                        </Text>
                    </Box>
                </Box>)
            }
            <Box ml="2">
                {web3Modal && !web3Modal.cachedProvider &&
                    <Button onClick={loadWeb3Modal} >Connect 🦊</Button>}
            </Box>
            <Web3AccountModal 
                isOpen={isOpen} 
                onClose={onClose}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                address={accountAddress} />
        </Flex>
    );
};

export default Web3Account;