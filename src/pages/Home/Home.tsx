import { Button, Box, HStack, VStack } from "@chakra-ui/react"
import { useState } from "react";
import Page from "../../components/Page";
import PanelBuyer from "./components/PanelBuyer";
import PanelSeller from "./components/PanelSeller";

enum HomeMenu {
    Buyer,
    Seller
}

const Home = () => {
    const [menu, setMenu] = useState<HomeMenu>(HomeMenu.Buyer);
    
    return (
        <Page>
            <VStack>
                <HStack justify="center">
                    <Button onClick={() => setMenu(HomeMenu.Buyer)}>Redeem oToken</Button>
                    <Button onClick={() => setMenu(HomeMenu.Seller)}>Settle Vault</Button>
                </HStack>
                <Box pb='50px'>
                    {menu === HomeMenu.Buyer
                        ? <PanelBuyer/>
                        : <PanelSeller/>
                    }
                </Box>
            </VStack>
        </Page>
    );
};

export default Home;