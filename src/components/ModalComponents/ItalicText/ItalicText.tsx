import { Text } from "@chakra-ui/react"

interface ItalicTextProps {
  text: React.ReactNode,
}

const ItalicText: React.FC<ItalicTextProps> = ({ text }) => {
  return (
    <Text fontSize="0.95em" fontStyle="italic" textAlign="center">
      {text}
    </Text>
  );
};

export default ItalicText;