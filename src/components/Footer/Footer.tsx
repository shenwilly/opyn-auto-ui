import { Container, Flex, Button, Image } from "@chakra-ui/react"
import GithubLogo from "../../assets/github.png";
import EtherscanLogo from "../../assets/etherscan.png";
import { contractEtherscanUrl, repoGithubUrl } from "../../constants";

const Footer = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Container maxW="container.xl">
            <Flex align="right">
                <Button onClick={() => openInNewTab(contractEtherscanUrl)} 
                    p="2" size="md" variant="ghost"
                >
                    <Image src={EtherscanLogo} fit="contain" width="24px" />
                </Button>
                <Button onClick={() => openInNewTab(repoGithubUrl)} 
                    p="2" size="md" variant="ghost"
                >
                    <Image src={GithubLogo} fit="contain" width="24px" />
                </Button>
            </Flex>
        </Container>
    );
};

export default Footer;