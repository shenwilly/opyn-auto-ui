import { Box, VStack } from "@chakra-ui/react"
import Menus from "../../components/Menus";
import Page from "../../components/Page";
import PanelSeller from "./components/PanelSeller";

const Settle = () => {
    return (
        <Page>
            <VStack>
                <Menus />
                <Box pb='50px'>
                  <PanelSeller/>
                </Box>
            </VStack>
        </Page>
    );
};

export default Settle;