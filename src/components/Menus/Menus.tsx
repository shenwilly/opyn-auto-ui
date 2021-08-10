import { Button, HStack } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

const Menus = () => {
  const { push } = useHistory();

    return (
        <HStack justify="center">
            <Button onClick={() => push("/redeem")}>Redeem oToken</Button>
            <Button onClick={() => push("/settle")}>Settle Vault</Button>
        </HStack>
    );
};

export default Menus;