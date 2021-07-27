import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton
} from "@chakra-ui/react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalRedeem: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
              oToken: oWETHUSDC/WETH-30JUL21-2200P
            </Text>

            <Text>
              Amount: 1
            </Text>

            <Text>
              Expiry: Fri, 31 Dec 2021
            </Text>

            <Button w="100%" colorScheme="green" mt={5} mb={3}>Approve</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalRedeem;