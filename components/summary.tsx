import { Badge, HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";

interface Props {
  id: string;
  title: string;
  topic: string;
}

const SummaryItem = ({ id, title, topic }: Props) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 100, translateY: 0 }}
      whileHover={{ scale: 1.05, cursor: "pointer" }}
      onClick={() => router.push(`/resumenes/${id}`)}
    >
      <HStack gap={4} backgroundColor="green.50" padding={2} borderRadius={10}>
        <Text fontSize="2xl">{title}</Text>
        <Badge colorScheme="green">{topic}</Badge>
      </HStack>
    </motion.div>
  );
};

export default SummaryItem;
