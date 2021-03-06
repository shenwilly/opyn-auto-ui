import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton, useToast
} from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import useEthereum from "../../hooks/useEthereum";
import useGamma from "../../hooks/useGamma";
import { useOrders } from "../../hooks/useOrders";
import { SubgraphOrder, SubgraphVault } from "../../types";
import { dateFormat } from "../../utils/date";
import { getVaultOtoken } from "../../utils/gamma";
import { formatFee } from "../../utils/misc";
import ItalicText from "../ModalComponents/ItalicText";
import TextField from "../ModalComponents/TextField";

interface ModalProps {
  vault: SubgraphVault;
  order: SubgraphOrder;
  isOpen: boolean;
  onClose: () => void;
}

const ModalVault: React.FC<ModalProps> = ({ vault, order, isOpen, onClose }) => {
  const { accountAddress, chainId } = useEthereum();
  const { refetchVaults } = useGamma();
  const { cancelOrder, isLoading } = useOrders(accountAddress, chainId);
  const otoken = getVaultOtoken(vault);
  const toast = useToast();
  
  const expiryText = useMemo(() => {
    return otoken 
      ? dateFormat(parseInt(otoken.expiryTimestamp) * 1000)
      : '-'
  }, [otoken])
  
  const handleCancel = async () => {
    await cancelOrder(BigNumber.from(order.orderId));
    refetchVaults();
    toast({
      title: "Order cancelled.",
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
            Vault Detail
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TextField 
            title="Collateral:"
            description={vault.collateralAsset !== null && vault.collateralAmount !== null 
              ? `${vault.collateralAsset?.symbol} ${formatUnits(vault.collateralAmount, vault.collateralAsset?.decimals)}`
              : '-'}
            />

          <TextField 
            title="Long Option:"
            description={vault.longAmount !== null && vault.longOToken !== null 
              ? `${formatUnits(vault.longAmount, vault.longOToken.decimals)} ${vault.longOToken?.symbol}`
              : '-'}
            />

          <TextField 
            title="Short Option:"
            description={vault.shortAmount !== null && vault.shortOToken !== null 
              ? `${formatUnits(vault.shortAmount, vault.shortOToken.decimals)} ${vault.shortOToken?.symbol}`
              : '-'}
            />

          <TextField 
            title="Expiry:"
            description={expiryText}
            />

          <TextField 
            title="Fee:"
            description={order.fee !== null
              ? `${formatFee(order.fee)}%`
              : '-'}
            />

          <ItalicText 
            text="Cancel automatic vault settlement?"
            />

          <Button w="100%" colorScheme="orange" mt={5} mb={3}
            isLoading={isLoading}
            onClick={handleCancel}>Cancel</Button>
        </ModalBody>
      </ModalContent>
      </Modal>
  );
};

export default ModalVault;