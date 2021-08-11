import { Box, Text } from "@chakra-ui/react"

interface TextFieldProps {
  title: React.ReactNode,
  description: React.ReactNode
}

const TextField: React.FC<TextFieldProps> = ({ title, description }) => {
  return (
    <Box>
      <Text fontWeight="bold" fontSize="0.9em">
        {title}
      </Text>
      <Text mb={2}>
        {description}
      </Text>
    </Box>
  );
};

export default TextField;