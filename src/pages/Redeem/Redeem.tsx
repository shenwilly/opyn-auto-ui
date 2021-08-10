import { Box, VStack } from "@chakra-ui/react"
import Menus from "../../components/Menus";
import Page from "../../components/Page";
import PanelBuyer from "./components/PanelBuyer";

const Redeem = () => {
    return (
        <Page>
            <VStack>
                <Menus />
                <Box pb='50px'>
                  <PanelBuyer/>
                </Box>
            </VStack>
        </Page>
    );
};

export default Redeem;