import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton, useToast
} from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { GAMMA_REDEEMER_ADDRESS } from "../../constants/address";
import useEthereum from "../../hooks/useEthereum";
import useGamma from "../../hooks/useGamma";
import { useOperator } from "../../hooks/useOperator";
import { useOrders } from "../../hooks/useOrders";
import { SubgraphVault } from "../../types";
import { dateFormat } from "../../utils/date";
import { getVaultOtoken } from "../../utils/gamma";
import { formatFee } from "../../utils/misc";
import ItalicText from "../ModalComponents/ItalicText";
import TextField from "../ModalComponents/TextField";

interface ModalProps {
  vault: SubgraphVault;
  isOpen: boolean;
  onClose: () => void;
}

const ModalSettle: React.FC<ModalProps> = ({ vault, isOpen, onClose }) => {
  const { accountAddress, chainId } = useEthereum();
  const { refetchVaults, settleFee } = useGamma();
  const { setOperator, isLoading:setIsLoading, 
    isOperator, fetchIsLoading, refetch:refetchIsOperator } = useOperator(GAMMA_REDEEMER_ADDRESS[chainId], chainId);
  const { createOrder, isLoading:createIsLoading } = useOrders(accountAddress, chainId);
  const otoken = getVaultOtoken(vault);
  const toast = useToast();
  
  const isLoading = useMemo(() => {
    return setIsLoading || fetchIsLoading || createIsLoading;
  }, [setIsLoading, fetchIsLoading, createIsLoading])
  
  const expiryText = useMemo(() => {
    return otoken 
      ? dateFormat(parseInt(otoken.expiryTimestamp) * 1000)
      : '-'
  }, [otoken])
  
  const handleSetOperator = async () => {
    await setOperator(true);
    refetchIsOperator();
  }

  const handleCreate = async () => {
    await createOrder(
      ethers.constants.AddressZero, 
      BigNumber.from(0), 
      BigNumber.from(vault.vaultId)
    );
    refetchVaults();
    toast({
      title: "Settle order created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose();
  }

  const noticeText = useMemo(() => {
    let text = "This vault will be settled automatically";
    if (settleFee)text += ` with a ${formatFee(settleFee)}% fee`;
    if (otoken) text += ` on expiry (${expiryText})`;
    text += ".";

    return text;
  }, [settleFee, otoken, expiryText]);

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
              description={settleFee !== null
                ? `${formatFee(settleFee)}%`
                : '-'}
              />
            
            <ItalicText 
              text={noticeText}
            />

            {!isOperator &&
              <Button w="100%" colorScheme="green" mt={4} mb={3}
                isLoading={isLoading}
                onClick={handleSetOperator}>Set Operator</Button>}
            {isOperator &&
              <Button w="100%" colorScheme="green" mt={4} mb={3}
                isLoading={isLoading}
                isDisabled={otoken === null}
                onClick={handleCreate}>Create Settle Order</Button>}
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalSettle;