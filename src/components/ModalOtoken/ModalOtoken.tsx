import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Image, Button, Text, HStack, ModalCloseButton
} from "@chakra-ui/react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOtoken: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>
              oWETHUSDC/WETH-30JUL21-2200P
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Asset: WETH
            </Text>
            
            <Text>
              Strike: USDC 1000
            </Text>

            <Text>
              Amount: 1 
            </Text>

            <Text>
              Expiry: Fri, 31 Dec 2021
            </Text>

            <Button w="100%" colorScheme="orange" mt={5} mb={3}>Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalOtoken;