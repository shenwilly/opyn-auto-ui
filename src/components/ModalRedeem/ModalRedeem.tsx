import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Image, Button, Text, HStack, ModalCloseButton
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
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody p="5">
              <Text textAlign="center">
                Modal
              </Text>
            </ModalBody>
          </ModalContent>
      </Modal>
  );
};

export default ModalRedeem;