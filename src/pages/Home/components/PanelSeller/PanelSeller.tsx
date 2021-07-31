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
  useDisclosure
} from "@chakra-ui/react"
import { BiLinkExternal } from 'react-icons/bi';
import ModalSettle from "../../../../components/ModalSettle";
import ModalVault from "../../../../components/ModalVault";
import useGamma from "../../../../hooks/useGamma";

const PanelSeller: React.FC = () => {
    const { vaults, orders } = useGamma();
    const useSettleModal = useDisclosure();
    const useVaultModal = useDisclosure();

    const pastOrders = orders?.filter((order) => order.finished) ?? [];

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
              {vaults && vaults.map((vault) => (
                <Tr>
                  <Td>WETH 0.1</Td>
                  <Td>-</Td>
                  <Td>0.1 oWETHUSDC/WETH-30JUL21-2200C</Td>
                  <Td textAlign="center">-</Td>
                  <Td>
                    <Button w="100%" colorScheme="green" onClick={useSettleModal.onOpen}>Auto Settle</Button>
                  </Td>
                </Tr>
              ))}
              {/* <Tr>
                <Td>WETH 0.1</Td>
                <Td>-</Td>
                <Td>0.1 oWETHUSDC/WETH-30JUL21-2200C</Td>
                <Td textAlign="center">-</Td>
                <Td>
                  <Button w="100%" colorScheme="green" onClick={useSettleModal.onOpen}>Auto Settle</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>WETH 0.1</Td>
                <Td>-</Td>
                <Td>0.1 oWETHUSDC/WETH-30JUL21-2200P</Td>
                <Td textAlign="center">Waiting Expiry</Td>
                <Td>
                  <Button w="100%" colorScheme="blue" onClick={useVaultModal.onOpen}>Details</Button>
                </Td>
              </Tr> */}
            </Tbody>
          </Table>

          <Text my="4">Order History</Text>
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
              ))}
              {/* <Tr>
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
              </Tr> */}
            </Tbody>
          </Table>

          <ModalSettle isOpen={useSettleModal.isOpen} onClose={useSettleModal.onClose}/>
          <ModalVault isOpen={useVaultModal.isOpen} onClose={useVaultModal.onClose}/>
        </>
    );
};

export default PanelSeller;