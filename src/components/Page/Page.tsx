import { Container } from "@chakra-ui/react"

const Page: React.FC = ({children}) => {

    return (
        <Container py="3" maxWidth="container.xl">
          {children}
        </Container>
    );
};

export default Page;