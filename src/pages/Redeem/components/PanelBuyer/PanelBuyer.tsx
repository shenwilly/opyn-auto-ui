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
  Spinner,
} from "@chakra-ui/react"
import { formatUnits } from "ethers/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { BiLinkExternal } from 'react-icons/bi';
import ModalOtoken from "../../../../components/ModalOtoken";
import ModalRedeem from "../../../../components/ModalRedeem/ModalRedeem";
import { CHAIN_ID, ETHERSCAN_LINK_TYPE, STRIKE_PRICE_DECIMALS } from "../../../../constants";
import useEthereum from "../../../../hooks/useEthereum";
import useGamma from "../../../../hooks/useGamma";
import { OTokenBalance, SubgraphOrder, SubgraphOToken } from "../../../../types";
import { dateFormat } from "../../../../utils/date";
import { getOtokens } from "../../../../utils/graph";
import { buildEtherscanLink } from "../../../../utils/misc";

const PanelBuyer: React.FC = () => {
    const { balances, balancesIsLoading, orders, orderFetchIsLoading } = useGamma();
    const { chainId } = useEthereum();
    const [selectedOtoken, setSelectedOtoken] = useState<OTokenBalance>();
    const [selectedOrder, setSelectedOrder] = useState<SubgraphOrder>();
    const [historyOtokens, setHistoryOtokens] = useState<SubgraphOToken[]>([]);
    
    const useRedeemModal = useDisclosure();
    const useDetailModal = useDisclosure();

    const redeemOrders = useMemo(() => {
      return orders?.filter((order) => !order.isSeller) ?? [];
    }, [orders]) ;

    const activeOrders = useMemo(() => {
      return redeemOrders?.filter((order) => !order.finished) ?? [];
    }, [redeemOrders]) ;

    const pastOrders = useMemo(() => {
      return redeemOrders?.filter((order) => order.finished) ?? [];
    }, [redeemOrders]) ;

    const hasActiveOrder = (otokenAddress: string): boolean => {
      const activeOrder = activeOrders?.find((order) => order.otoken === otokenAddress);
      return activeOrder !== undefined;
    }

    const getActiveOrder = (otokenAddress: string): SubgraphOrder | null => {
      const activeOrder = activeOrders?.find((order) => order.otoken === otokenAddress) ?? null;
      return activeOrder;
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

    const handleClickDetails = (otoken: OTokenBalance) => {
      setSelectedOtoken(otoken);

      const order = getActiveOrder(otoken.token.id);
      if (order) {
        setSelectedOrder(order);
        useDetailModal.onOpen();
      } else {
        useRedeemModal.onOpen();
      }
    }

    const handleClickSetAutoRedeem = (otoken: OTokenBalance) => {
      setSelectedOtoken(otoken);
      useRedeemModal.onOpen();
    }

    useEffect(() => {
      const fetchTokens = async (addreses: string[]) => {
        const oTokens = await getOtokens(CHAIN_ID.MAINNET, addreses);
        setHistoryOtokens(oTokens ?? []);
      }
      const addreses = pastOrders.map((order) => order.otoken);
      fetchTokens(addreses);
    }, [pastOrders])

    return (
        <>
          <Text mt="5" fontWeight="bold">My oTokens</Text>
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
              {balances && !balancesIsLoading && balances.map((otoken) => (
                <Tr key={otoken.token.id}>
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
                    {dateFormat(parseInt(otoken.token.expiryTimestamp) * 1000)}
                  </Td>
                  <Td isNumeric>
                    {formatUnits(otoken.balance.toString(), otoken.token.decimals)}
                  </Td>
                  <Td textAlign="center">
                    {getStatus(otoken.token)}
                  </Td>
                  <Td>
                    {hasActiveOrder(otoken.token.id)
                      ? <Button w="100%" colorScheme="blue" onClick={() => handleClickDetails(otoken)}>Details</Button>
                      : <Button w="100%" colorScheme="green" onClick={() => handleClickSetAutoRedeem(otoken)}>Auto Redeem</Button> 
                    }
                  </Td>
                </Tr>
              ))}
              
              {balances && !balancesIsLoading && balances.length === 0 &&
                <Tr>
                  <Td colSpan={7}>
                    <Text textAlign="center">
                      You have no oTokens
                    </Text>
                  </Td>
                </Tr>}

              {balancesIsLoading &&
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    <Spinner />
                  </Td>
                </Tr>}
            </Tbody>
          </Table>

          <Text mt="5" fontWeight="bold">Order History</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Option</Th>
                <Th isNumeric>Amount</Th>
                <Th>Txn Hash</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pastOrders && !orderFetchIsLoading && pastOrders.map((order) => {
                let otoken = historyOtokens.find((token) => token.id === order.otoken);
                if (!otoken) return null;
                
                return (
                  <Tr key={order.orderId}>
                    <Td>{otoken.symbol}</Td>
                    <Td isNumeric>{formatUnits(order.amount, otoken.decimals)}</Td>
                    <Td>
                      <Link href={buildEtherscanLink(ETHERSCAN_LINK_TYPE.Tx, order.finishTxHash, chainId)} isExternal>
                        <Flex as="u">
                          <Text mr="2">{order.finishTxHash}</Text> <BiLinkExternal/>
                        </Flex>
                      </Link>
                    </Td>
                  </Tr>
                )
              })}
              
              {pastOrders && !orderFetchIsLoading && pastOrders.length === 0 &&
                <Tr>
                  <Td colSpan={3}>
                    <Text textAlign="center">
                      You have no previous orders
                    </Text>
                  </Td>
                </Tr>}

              {orderFetchIsLoading &&
                <Tr>
                  <Td colSpan={3} textAlign="center">
                    <Spinner />
                  </Td>
                </Tr>}
            </Tbody>
          </Table>

          {selectedOtoken && 
            <ModalRedeem otoken={selectedOtoken} isOpen={useRedeemModal.isOpen} onClose={useRedeemModal.onClose}/>}
          {selectedOtoken && 
            <ModalOtoken otoken={selectedOtoken} order={selectedOrder!} 
            isOpen={useDetailModal.isOpen} onClose={useDetailModal.onClose}/>}
        </>
    );
};

export default PanelBuyer;