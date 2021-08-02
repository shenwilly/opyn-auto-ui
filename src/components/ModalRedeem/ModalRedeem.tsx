import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton
} from "@chakra-ui/react"
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { GAMMA_REDEEMER_ADDRESS } from "../../constants/address";
import { useAllowance } from "../../hooks/useAllowance";
import useEthereum from "../../hooks/useEthereum";
import { useOrders } from "../../hooks/useOrders";
import { OTokenBalance } from "../../types";
import { dateFormat } from "../../utils/date";

interface ModalProps {
  otoken: OTokenBalance;
  isOpen: boolean;
  onClose: () => void;
}

const ModalRedeem: React.FC<ModalProps> = ({ otoken, isOpen, onClose }) => {
  const { accountAddress, chainId } = useEthereum();
  const { allowance, allowanceIsLoading, approve, approveIsLoading } = useAllowance(otoken.token.id, GAMMA_REDEEMER_ADDRESS[chainId]);
  const { createOrder } = useOrders(accountAddress, chainId);

  const isLoading = useMemo(() => {
    return allowanceIsLoading || approveIsLoading;
  }, [allowanceIsLoading, approveIsLoading])

  const isAllowanceEnough = useMemo(() => {
    return allowance.gte(otoken.balance);
  }, [allowance])

  const handleApprove = async () => {
    await approve();
  }

  const handleCreate = async () => {
    await createOrder(otoken.token.id, otoken.balance, 0);
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