import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton
} from "@chakra-ui/react"
import { formatUnits } from "ethers/lib/utils";
import { OTokenBalance } from "../../types";
import { dateFormat } from "../../utils/date";

interface ModalProps {
  otoken: OTokenBalance;
  isOpen: boolean;
  onClose: () => void;
}

const ModalRedeem: React.FC<ModalProps> = ({ otoken, isOpen, onClose }) => {
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

            <Button w="100%" colorScheme="green" mt={5} mb={3}>Approve</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalRedeem;