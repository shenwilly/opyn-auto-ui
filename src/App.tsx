import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { Container, ChakraProvider } from "@chakra-ui/react"
import styled, { ThemeProvider } from "styled-components"

import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import chakraTheme from "./utils/chakraTheme"
import { EthereumProvider } from "./contexts/Ethereum"
import { GammaProvider } from "./contexts/Gamma"
import ModalNetwork from "./components/ModalNetwork"
import useEthereum from "./hooks/useEthereum"
import { CHAIN_ID } from "./constants"

function App() {
  const { chainId } = useEthereum();
  return (
    <Router>
      <SiteWrapper>
        <Header />
        <BodyWrapper maxW="container.xl" display="flex" alignItems="start" justifyContent="center">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BodyWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </SiteWrapper>
      <ModalNetwork isOpen={chainId !== undefined && chainId !== CHAIN_ID.MAINNET} />
    </Router>
  );
}

const SiteWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

const BodyWrapper = styled(Container)`
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`}
`;

const FooterWrapper = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 15px;
  left: 0;
`;

const Providers: React.FC = ({ children }) => {
  const styledTheme = {
    headerHeight: '60px',
  };

  return (
    <ThemeProvider theme={styledTheme}>
      <ChakraProvider theme={chakraTheme}>
        <EthereumProvider>
          <GammaProvider>
            {children}
          </GammaProvider>
        </EthereumProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};

function withProviders<P>(
  Component: React.ComponentType<P>
) {
  const ComponentProviders = (props: P) => {
    return (
      <Providers>
        <Component {...props}/>
      </Providers>
    )
  };
  return ComponentProviders;
}

export default withProviders(App);