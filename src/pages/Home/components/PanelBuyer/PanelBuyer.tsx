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

const PanelBuyer: React.FC = () => {

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
              <Tr>
                <Td>Call</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td textAlign="center">-</Td>
                <Td>
                  <Button w="100%" colorScheme="green">Auto Redeem</Button>
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
                  <Button w="100%" colorScheme="orange">Cancel Auto</Button>
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
                  <Button w="100%" colorScheme="orange">Cancel Auto</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Text my="4">History</Text>
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
              <Tr>
                <Td>Call</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td isNumeric>$100</Td>
                <Td textAlign="right">Redeemed</Td>
              </Tr>
              <Tr>
                <Td>Put</Td>
                <Td>WETH</Td>
                <Td>USDC 5000</Td>
                <Td>Fri, 31 Dec 2021</Td>
                <Td isNumeric>0.5</Td>
                <Td isNumeric>$0</Td>
                <Td textAlign="right">Not Profitable</Td>
              </Tr>
            </Tbody>
          </Table>
        </>
    );
};

export default PanelBuyer;