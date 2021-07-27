import { Container, Flex, Spacer, Text, Button } from "@chakra-ui/react"
import styled from "styled-components";

const Header = () => {

    return (
        <StyledHeader maxW="container.xl">
            <StyledRow align="center">
                <Text textStyle="appTitle">Opyn Auto</Text>
                <Spacer />
                <Button>Connect 🦊</Button>
            </StyledRow>
        </StyledHeader>
    );
};

const StyledHeader = styled(Container)`
    // background-color: lightgrey;
`
const StyledRow = styled(Flex)`
    height: ${props => props.theme.headerHeight};
`

export default Header;