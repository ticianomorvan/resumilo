import { HStack, Text } from "@chakra-ui/react";
import { Author } from "../types/resumen";

type Props = {
  title: string;
  date: string;
  author: Author;
  topic: string;
};

const ResumenItem = ({ title, date, author, topic }: Props) => {
  return (
    <HStack>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Text>{author.name}</Text>
      <Text>{topic}</Text>
    </HStack>
  );
};

export default ResumenItem;
