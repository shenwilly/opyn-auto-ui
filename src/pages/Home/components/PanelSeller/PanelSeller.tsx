import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
} from "@chakra-ui/react"

const PanelSeller: React.FC = () => {

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
              <Tr>
                <Td>WETH 0.1</Td>
                <Td>-</Td>
                <Td>0.1 oWETHUSDC/WETH-30JUL21-2200C</Td>
                <Td textAlign="center">-</Td>
                <Td>
                  <Button w="100%" colorScheme="green">Auto Settle</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>WETH 0.1</Td>
                <Td>-</Td>
                <Td>0.1 oWETHUSDC/WETH-30JUL21-2200P</Td>
                <Td textAlign="center">Waiting Expiry</Td>
                <Td>
                  <Button w="100%" colorScheme="blue">Details</Button>
                </Td>
              </Tr>
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
              <Tr>
                <Td>WETH 0.1</Td>
                <Td>-</Td>
                <Td>0.1 oWETHUSDC/WETH-30JUL21-2200C</Td>
                <Td>
                  Settled
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </>
    );
};

export default PanelSeller;