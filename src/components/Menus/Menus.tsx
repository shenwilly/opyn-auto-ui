import { Button, HStack } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

const Menus = () => {
  const { push, location } = useHistory();

  return (
      <HStack justify="center" spacing={5}>
          <Button onClick={() => push("/redeem")} 
            border={location.pathname === '/redeem' ? '1px' : ''}
            >Redeem oToken</Button>
          <Button onClick={() => push("/settle")} 
            border={location.pathname === '/settle' ? '1px' : ''}
            >Settle Vault</Button>
      </HStack>
  );
};

export default Menus;