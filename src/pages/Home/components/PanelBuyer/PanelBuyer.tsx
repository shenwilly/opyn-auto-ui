import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  useDisclosure,
  Link,
  Flex,
} from "@chakra-ui/react"
import { formatUnits } from "ethers/lib/utils";
import { useMemo } from "react";
import { BiLinkExternal } from 'react-icons/bi';
import ModalOtoken from "../../../../components/ModalOtoken";
import ModalRedeem from "../../../../components/ModalRedeem/ModalRedeem";
import { ETHERSCAN_LINK_TYPE, STRIKE_PRICE_DECIMALS } from "../../../../constants";
import useEthereum from "../../../../hooks/useEthereum";
import useGamma from "../../../../hooks/useGamma";
import { SubgraphOToken } from "../../../../types";
import { buildEtherscanLink } from "../../../../utils/misc";
import { format as dateFormat } from 'date-fns'

const PanelBuyer: React.FC = () => {
    const { balances, orders } = useGamma();
    const { chainId } = useEthereum();
    
    const useRedeemModal = useDisclosure();
    const useDetailModal = useDisclosure();

    const activeOrders = useMemo(() => {
      return orders?.filter((order) => !order.finished && !order.isSeller) ?? [];
    }, [orders]) ;

    const pastOrders = useMemo(() => {
      return orders?.filter((order) => order.finished && !order.isSeller) ?? [];
    }, [orders]) ;

    const hasActiveOrder = (otokenAddress: string): boolean => {
      const activeOrder = activeOrders?.find((order) => order.otoken === otokenAddress);
      return activeOrder !== undefined;
    }

    const getStatus = (otoken: SubgraphOToken): string => {
      let status= "";

      const activeOrder = activeOrders?.find((order) => order.otoken === otoken.id);
      if (activeOrder === undefined) {
        status = "-";
      } else {
        const timestamp = Math.round(Date.now() / 1000);
        if (timestamp > parseInt(otoken.expiryTimestamp)) {
          status = "Waiting redeem"
        } else {
          status = "Waiting expiry"
        }
      }

      return status
    }

    return (
        <>
          <Text my="4">My oTokens</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Asset</Th>
                <Th>Strike</Th>
                <Th>Expiry</Th>
                <Th isNumeric>Amount</Th>
                <Th textAlign="center">Status</Th>
                <Th textAlign="right">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {balances && balances.map((otoken) => (
                <Tr key={otoken.token.symbol}>
                  <Td>
                    {otoken.token.isPut
                      ? 'Put'
                      : 'Call'
                    }
                  </Td>
                  <Td>
                    {otoken.token.underlyingAsset.symbol}
                  </Td>
                  <Td>
                    {otoken.token.strikeAsset.symbol} {formatUnits(otoken.token.strikePrice, STRIKE_PRICE_DECIMALS)}
                  </Td>
                  <Td>
                    {dateFormat(parseInt(otoken.token.expiryTimestamp) * 1000, 'E, d LLL y')}
                  </Td>
                  <Td isNumeric>
                    {formatUnits(otoken.balance.toString(), otoken.token.decimals)}
                  </Td>
                  <Td textAlign="center">
                    {getStatus(otoken.token)}
                  </Td>
                  <Td>
                    {hasActiveOrder(otoken.token.id)
                      ? <Button w="100%" colorScheme="blue" onClick={useDetailModal.onOpen}>Details</Button>
                      : <Button w="100%" colorScheme="green" onClick={useRedeemModal.onOpen}>Auto Redeem</Button> 
                    }
                  </Td>
                </Tr>
              ))}
              {/* <Tr>
                <Td>Call</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td textAlign="center">-</Td>
                <Td>
                  <Button w="100%" colorScheme="green" onClick={useRedeemModal.onOpen}>Auto Redeem</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Call</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td textAlign="center">Waiting Expiry</Td>
                <Td>
                  <Button w="100%" colorScheme="blue" onClick={useDetailModal.onOpen}>Details</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Call</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td textAlign="center">Waiting Redeem</Td>
                <Td>
                  <Button w="100%" colorScheme="blue" onClick={useDetailModal.onOpen}>Details</Button>
                </Td>
              </Tr> */}
            </Tbody>
          </Table>

          <Text my="4">Order History</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Asset</Th>
                <Th>Strike</Th>
                <Th>Expiry</Th>
                <Th>Amount</Th>
                <Th>Total Return</Th>
                <Th textAlign="right">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pastOrders && pastOrders.map((order) => (
                <Tr key={order.orderId}>
                  <Td>Call</Td>
                  <Td>WETH</Td>
                  <Td>USDC 5000</Td>
                  <Td>Fri, 31 Dec 2021</Td>
                  <Td isNumeric>0.5</Td>
                  <Td isNumeric>$100</Td>
                  <Td textAlign="right">
                    <Link href={buildEtherscanLink(ETHERSCAN_LINK_TYPE.Tx, order.finishTxHash, chainId)} isExternal>
                      <Flex as="u">
                        <Text mr="2">Redeemed</Text> <BiLinkExternal/>
                      </Flex>
                    </Link>
                  </Td>
                </Tr>
              ))}
              {/* <Tr>
                <Td>Call</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td isNumeric>$100</Td>
                <Td textAlign="right">
                  <Link href="https://chakra-ui.com" isExternal>
                    <Flex as="u">
                      <Text mr="2">Redeemed</Text> <BiLinkExternal/>
                    </Flex>
                  </Link>
                </Td>
              </Tr>
              <Tr>
                <Td>Put</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td isNumeric>$0</Td>
                <Td textAlign="right">Not Profitable</Td>
              </Tr> */}
            </Tbody>
          </Table>

          <ModalRedeem isOpen={useRedeemModal.isOpen} onClose={useRedeemModal.onClose}/>
          <ModalOtoken isOpen={useDetailModal.isOpen} onClose={useDetailModal.onClose}/>
        </>
    );
};

export default PanelBuyer;