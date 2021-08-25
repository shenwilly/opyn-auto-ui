import { Container, Flex, Spacer, Text } from "@chakra-ui/react"
import styled from "styled-components";
import Web3Account from "../Web3Account";

const Header = () => {

    return (
        <StyledHeader maxW="container.xl">
            <StyledRow align="center">
                <Text textStyle="appTitle">AutoGamma</Text>
                <Spacer />
                <Web3Account />
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