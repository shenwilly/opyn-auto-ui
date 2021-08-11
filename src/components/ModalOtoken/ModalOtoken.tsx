import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Button, Text, ModalCloseButton, useToast
} from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { STRIKE_PRICE_DECIMALS } from "../../constants";
import useEthereum from "../../hooks/useEthereum";
import useGamma from "../../hooks/useGamma";
import { useOrders } from "../../hooks/useOrders";
import { OTokenBalance, SubgraphOrder } from "../../types";
import { dateFormat } from "../../utils/date";
import { formatFee } from "../../utils/misc";
import ItalicText from "../ModalComponents/ItalicText";
import TextField from "../ModalComponents/TextField";

interface ModalProps {
  otoken: OTokenBalance;
  order: SubgraphOrder;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOtoken: React.FC<ModalProps> = ({ otoken, order, isOpen, onClose }) => {
  const { accountAddress, chainId } = useEthereum();
  const { refetchOrders } = useGamma();
  const { cancelOrder, isLoading } = useOrders(accountAddress, chainId);
  const toast = useToast();
  
  const handleCancel = async () => {
    await cancelOrder(BigNumber.from(order.orderId));
    refetchOrders();
    toast({
      title: "Order cancelled.",
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
              {otoken.token.symbol}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextField 
              title="Asset:"
              description={otoken.token.underlyingAsset.symbol}
              />

            <TextField 
              title="Strike:"
              description={`${otoken.token.strikeAsset.symbol} ${formatUnits(otoken.token.strikePrice, STRIKE_PRICE_DECIMALS)}`}
              />

            <TextField 
              title="Amount:"
              description={`${formatUnits(otoken.balance.toString(), otoken.token.decimals)}`}
              />

            <TextField 
              title="Expiry:"
              description={dateFormat(parseInt(otoken.token.expiryTimestamp) * 1000)}
              />

            <TextField 
              title="Fee:"
              description={order && order.fee !== null
                ? `${formatFee(order.fee)}%`
                : '-'}
              />

            <ItalicText 
              text="Cancel automatic oToken redemption?"
            />

            <Button w="100%" colorScheme="orange" mt={5} mb={3}
              isLoading={isLoading}
              onClick={handleCancel}
              >Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default ModalOtoken;