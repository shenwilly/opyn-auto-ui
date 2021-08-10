import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton, useToast
} from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { GAMMA_REDEEMER_ADDRESS } from "../../constants/address";
import { useAllowance } from "../../hooks/useAllowance";
import useEthereum from "../../hooks/useEthereum";
import useGamma from "../../hooks/useGamma";
import { useOrders } from "../../hooks/useOrders";
import { OTokenBalance } from "../../types";
import { dateFormat } from "../../utils/date";
import { formatFee } from "../../utils/misc";

interface ModalProps {
  otoken: OTokenBalance;
  isOpen: boolean;
  onClose: () => void;
}

const ModalRedeem: React.FC<ModalProps> = ({ otoken, isOpen, onClose }) => {
  const { accountAddress, chainId } = useEthereum();
  const { refetchOrders, redeemFee } = useGamma();
  const { allowance, allowanceIsLoading, approve, approveIsLoading } = useAllowance(otoken.token.id, GAMMA_REDEEMER_ADDRESS[chainId]);
  const { createOrder, isLoading:createIsLoading } = useOrders(accountAddress, chainId);
  const toast = useToast();

  const isLoading = useMemo(() => {
    return allowanceIsLoading || approveIsLoading || createIsLoading;
  }, [allowanceIsLoading, approveIsLoading, createIsLoading])

  const isAllowanceEnough = useMemo(() => {
    return allowance.gte(otoken.balance);
  }, [allowance, otoken.balance])

  const handleApprove = async () => {
    await approve();
  }

  const handleCreate = async () => {
    await createOrder(otoken.token.id, otoken.balance, BigNumber.from(0));
    refetchOrders();
    toast({
      title: "Redeem order created.",
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
              Set Auto Redeem
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              oToken: {otoken.token.symbol}
            </Text>

            <Text>
              Amount: {formatUnits(otoken.balance.toString(), otoken.token.decimals)}
            </Text>

            <Text>
              Expiry: {dateFormat(parseInt(otoken.token.expiryTimestamp) * 1000)}
            </Text>

            <Text>
              Fee: {redeemFee !== null
                      ? `${formatFee(redeemFee)}%`
                      : '-'}
            </Text>

            {!isAllowanceEnough && 
              <Button w="100%" colorScheme="green" mt={5} mb={3}
                isLoading={isLoading}
                onClick={handleApprove}>
                Approve
              </Button>}

            {isAllowanceEnough && 
              <Button w="100%" colorScheme="green" mt={5} mb={3}
                isLoading={isLoading}
                onClick={handleCreate}>
                Create Redeem Order
              </Button>}
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalRedeem;