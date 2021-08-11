import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, Center
} from "@chakra-ui/react"
import { CHAIN_ID } from "../../constants";
import useEthereum from "../../hooks/useEthereum";

interface ModalProps {
  isOpen: boolean;
}

const ModalNetwork: React.FC<ModalProps> = ({ isOpen }) => {
  const { switchChain } = useEthereum();
  const handleClick = async () => {
    switchChain(CHAIN_ID.MAINNET);
  }

  return (
      <Modal isOpen={isOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>
              Unsupported Network
            </Text>
          </ModalHeader>
          <ModalBody>
            <Center>
              <Text fontWeight="bold" width="100%">
                Please switch to Mainnet
              </Text>
            </Center>
            <Button isFullWidth colorScheme="green" mt={5} mb={3}
              onClick={handleClick}>
                Switch Network
              </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalNetwork;