import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Image, Button, Text, HStack, ModalCloseButton
} from "@chakra-ui/react"
import { formatUnits } from "ethers/lib/utils";
import { STRIKE_PRICE_DECIMALS } from "../../constants";
import { OTokenBalance } from "../../types";
import { dateFormat } from "../../utils/date";


interface ModalProps {
  otoken: OTokenBalance;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOtoken: React.FC<ModalProps> = ({ otoken, isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>
              {otoken.token.symbol}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {otoken.token.underlyingAsset.symbol}
            </Text>
            
            <Text>
              Strike: {otoken.token.strikeAsset.symbol} {formatUnits(otoken.token.strikePrice, STRIKE_PRICE_DECIMALS)}
            </Text>

            <Text>
              Amount: {formatUnits(otoken.balance.toString(), otoken.token.decimals)}
            </Text>

            <Text>
              Expiry: {dateFormat(parseInt(otoken.token.expiryTimestamp) * 1000)}
            </Text>

            <Button w="100%" colorScheme="orange" mt={5} mb={3}>Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalOtoken;