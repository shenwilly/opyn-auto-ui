import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Flex,
  Link,
  useDisclosure,
  Spinner
} from "@chakra-ui/react"
import { formatUnits } from "ethers/lib/utils";
import { useMemo, useState } from "react";
import { BiLinkExternal } from 'react-icons/bi';
import ModalSettle from "../../../../components/ModalSettle";
import ModalVault from "../../../../components/ModalVault";
import useGamma from "../../../../hooks/useGamma";
import { SubgraphOrder, SubgraphVault } from "../../../../types";

const PanelSeller: React.FC = () => {
    const { vaults, vaultsIsLoading, orders } = useGamma();
    const useSettleModal = useDisclosure();
    const useVaultModal = useDisclosure();
    const [selectedVault, setSelectedVault] = useState<SubgraphVault>();
    const [selectedOrder, setSelectedOrder] = useState<SubgraphOrder>();
  
    const settleOrders = useMemo(() => {
      return orders?.filter((order) => order.isSeller) ?? [];
    }, [orders]);

    const activeOrders = useMemo(() => {
      return settleOrders?.filter((order) => !order.finished && order.isSeller) ?? [];
    }, [settleOrders]);

    const pastOrders = useMemo(() => {
      return settleOrders?.filter((order) => order.finished && order.isSeller) ?? [];
    }, [settleOrders]);

    const hasActiveOrder = (vaultId: string): boolean => {
      const activeOrder = activeOrders?.find((order) => order.vaultId === vaultId);
      return activeOrder !== undefined;
    }

    const getActiveOrder = (vaultId: string): SubgraphOrder | null => {
      const activeOrder = activeOrders?.find((order) => order.vaultId === vaultId) ?? null;
      return activeOrder;
    }

    const getStatus = (vault: SubgraphVault) => {
      let status = ""
      
      if (vault.longOToken === null && vault.shortOToken === null) {
        return "Redeemable"
      } else if (vault.shortOToken !== null) {
        const otoken = vault.shortOToken;
        const timestamp = Math.round(Date.now() / 1000);
        if (timestamp > parseInt(otoken.expiryTimestamp)) {
          status = "Waiting settlement"
        } else {
          status = "Waiting expiry"
        }
      } else if (vault.longOToken !== null) {
        const otoken = vault.longOToken;
        const timestamp = Math.round(Date.now() / 1000);
        if (timestamp > parseInt(otoken.expiryTimestamp)) {
          status = "Waiting settlement"
        } else {
          status = "Waiting expiry"
        }
      }
      return status;
    }

    const handleClickDetails = (vault: SubgraphVault) => {
      setSelectedVault(vault);

      const order = getActiveOrder(vault.vaultId);
      if (order) {
        setSelectedOrder(order);
        useVaultModal.onOpen();
      } else {
        useSettleModal.onOpen();
      }
    }

    const handleClickSettle = (vault: SubgraphVault) => {
      setSelectedVault(vault);
      useSettleModal.onOpen();
    }

    return (
        <>
          <Text my="4">My vaults</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Collateral</Th>
                <Th>Long</Th>
                <Th>Short</Th>
                <Th>Status</Th>
                <Th textAlign="right">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {vaults && !vaultsIsLoading && vaults.map((vault) => (
                <Tr key={vault.vaultId}>
                  <Td>
                    {vault.collateralAsset !== null && vault.collateralAmount !== null 
                      ? `${vault.collateralAsset?.symbol} ${formatUnits(vault.collateralAmount, vault.collateralAsset?.decimals)}`
                      : '-'
                    }
                  </Td>
                  <Td>
                    {vault.longAmount !== null && vault.longOToken !== null 
                      ? `${formatUnits(vault.longAmount, vault.longOToken.decimals)} ${vault.longOToken?.symbol}`
                      : '-'
                    }
                  </Td>
                  <Td>
                    {vault.shortAmount !== null && vault.shortOToken !== null 
                      ? `${formatUnits(vault.shortAmount, vault.shortOToken.decimals)} ${vault.shortOToken?.symbol}`
                      : '-'
                    }
                    {/* 0.1 oWETHUSDC/WETH-30JUL21-2200C */}
                  </Td>
                  <Td textAlign="center">
                    {getStatus(vault)}
                  </Td>
                  <Td>
                    {hasActiveOrder(vault.vaultId)
                      ? <Button w="100%" colorScheme="blue" onClick={() => handleClickDetails(vault)}>Details</Button>
                      : <Button w="100%" colorScheme="green" onClick={() => handleClickSettle(vault)}>Auto Settle</Button>
                    }
                  </Td>
                </Tr>
              ))}

              {vaults && !vaultsIsLoading && vaults.length === 0 &&
                <Tr>
                  <Td colSpan={7}>
                    <Text textAlign="center">
                      You have no vaults
                    </Text>
                  </Td>
                </Tr>}

              {vaultsIsLoading &&
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    <Spinner />
                  </Td>
                </Tr>}
            </Tbody>
          </Table>

          {/* <Text my="4">Order History</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Collateral</Th>
                <Th>Long</Th>
                <Th>Short</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pastOrders && pastOrders.map((order) => (
                <Tr key={order.orderId}>
                  <Td>WETH 0.1</Td>
                  <Td>-</Td>
                  <Td>0.1 oWETHUSDC/WETH-30JUL21-2200C</Td>
                  <Td>
                    <Link href="https://chakra-ui.com" isExternal>
                        <Flex as="u">
                          <Text mr="2">Settled</Text> <BiLinkExternal/>
                        </Flex>
                      </Link>
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td>WETH 0.1</Td>
                <Td>-</Td>
                <Td>0.1 oWETHUSDC/WETH-30JUL21-2200C</Td>
                <Td>
                  <Link href="https://chakra-ui.com" isExternal>
                      <Flex as="u">
                        <Text mr="2">Settled</Text> <BiLinkExternal/>
                      </Flex>
                    </Link>
                </Td>
              </Tr>
            </Tbody>
          </Table> */}
              
          {selectedVault && 
            <ModalSettle vault={selectedVault} isOpen={useSettleModal.isOpen} onClose={useSettleModal.onClose}/>}
          {selectedVault && selectedOrder &&
            <ModalVault vault={selectedVault} order={selectedOrder} 
              isOpen={useVaultModal.isOpen} onClose={useVaultModal.onClose}/>}
        </>
    );
};

export default PanelSeller;