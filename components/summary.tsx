import { Badge, HStack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "../types/user";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  id: string;
  title: string;
  topic: string;
  author_id: string;
}

const SummaryItem = ({ id, title, topic, author_id }: Props) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const getUser = useCallback(async () => {
    const { firebase, getUserDoc } = await import("../lib/firebase");
    const user = await getUserDoc(firebase, author_id);
    return user;
  }, [author_id]);

  const getBackgroundColor = () => {
    const colors = ["red.50", "green.50", "yellow.50", "blue.50", "orange.50"];
    return colors[Math.floor(Math.random() * colors.length - 1)];
  };

  useEffect(() => {
    getUser().then((value) => setUser(value));
  }, [getUser]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 100, translateY: 0 }}
    >
      <HStack
        gap={4}
        backgroundColor={getBackgroundColor()}
        padding={2}
        borderRadius={10}
      >
        <Text fontSize="2xl">{title}</Text>
        <Badge colorScheme="green">{topic}</Badge>
        {user && (
          <>
            <Text>{user.name}</Text>
            <Image
              style={{
                borderRadius: "50%",
              }}
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              width={32}
              height={32}
            />
          </>
        )}
        <FaExternalLinkAlt
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/resumenes/${id}`)}
        />
      </HStack>
    </motion.div>
  );
};

export default SummaryItem;
