import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Image, Button, Text, HStack, ModalCloseButton
} from "@chakra-ui/react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalVault: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
          <Text>
            Collateral: 1 WETH
          </Text>
          
          <Text>
            Long: -
          </Text>

          <Text>
            Short: 0.1 oWETHUSDC/WETH-30JUL21-2200C	
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

export default ModalVault;