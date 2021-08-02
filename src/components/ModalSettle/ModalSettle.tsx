import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Image, Button, Text, HStack, ModalCloseButton, useToast
} from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { GAMMA_CONTROLLER_ADDRESS } from "../../constants/address";
import useEthereum from "../../hooks/useEthereum";
import useGamma from "../../hooks/useGamma";
import { useOperator } from "../../hooks/useOperator";
import { useOrders } from "../../hooks/useOrders";
import { SubgraphVault } from "../../types";
import { dateFormat } from "../../utils/date";
import { getVaultOtoken } from "../../utils/gamma";

interface ModalProps {
  vault: SubgraphVault;
  isOpen: boolean;
  onClose: () => void;
}

const ModalSettle: React.FC<ModalProps> = ({ vault, isOpen, onClose }) => {
  const { accountAddress, chainId } = useEthereum();
  const { refetchVaults } = useGamma();
  const { setOperator, isLoading:setIsLoading, isOperator, fetchIsLoading } = useOperator(GAMMA_CONTROLLER_ADDRESS[chainId], chainId);
  const { createOrder, isLoading:createIsLoading } = useOrders(accountAddress, chainId);
  const otoken = getVaultOtoken(vault);
  const toast = useToast();
  
  const isLoading = useMemo(() => {
    return setIsLoading || fetchIsLoading || createIsLoading;
  }, [setIsLoading, fetchIsLoading, createIsLoading])
  
  const handleSetOperator = async () => {
    await setOperator(true);
  }

  const handleCreate = async () => {
    await createOrder(otoken!.id, BigNumber.from(0), BigNumber.from(vault.vaultId));
    refetchVaults();
    toast({
      title: "Settle order created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose();
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>
              Set Auto Settle Vault
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Collateral: {vault.collateralAsset !== null && vault.collateralAmount !== null 
                      ? `${vault.collateralAsset?.symbol} ${formatUnits(vault.collateralAmount, vault.collateralAsset?.decimals)}`
                      : '-'
                    }
            </Text>

            <Text>
              Long: {vault.longAmount !== null && vault.longOToken !== null 
                      ? `${formatUnits(vault.longAmount, vault.longOToken.decimals)} ${vault.longOToken?.symbol}`
                      : '-'
                    }
            </Text>

            <Text>
              Short: {vault.shortAmount !== null && vault.shortOToken !== null 
                      ? `${formatUnits(vault.shortAmount, vault.shortOToken.decimals)} ${vault.shortOToken?.symbol}`
                      : '-'
                    }
            </Text>

            <Text>
              Expiry: {otoken 
                        ? dateFormat(parseInt(otoken.expiryTimestamp) * 1000)
                        : '-'}
            </Text>

            {!isOperator &&
              <Button w="100%" colorScheme="green" mt={5} mb={3}
                isLoading={isLoading}
                onClick={handleSetOperator}>Set Operator</Button>}
            {isOperator &&
              <Button w="100%" colorScheme="green" mt={5} mb={3}
                isLoading={isLoading}
                onClick={handleCreate}>Create Settle Order</Button>}
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalSettle;