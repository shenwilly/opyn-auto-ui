import { Button, Box, HStack, VStack } from "@chakra-ui/react"
import { useState } from "react";
import Page from "../../components/Page";
import useGamma from "../../hooks/useGamma";
import PanelBuyer from "./components/PanelBuyer";
import PanelSeller from "./components/PanelSeller";

enum HomeMenu {
    Buyer,
    Seller
}

const Home = () => {
    const { balances } = useGamma();
    const [menu, setMenu] = useState<HomeMenu>(HomeMenu.Buyer);

    console.log(balances);
    
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