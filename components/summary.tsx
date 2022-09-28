import { useEffect, useState } from "react";
import { Summary } from "../types/summary";
import { User } from "../types/user";
import { getSummaryDownloadUrl, getUserDoc } from "../lib/firebase";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";
import { parseISO, formatDistance } from "date-fns";
import { motion } from "framer-motion";
import esLocale from "date-fns/locale/es";

// Components
import {
  Badge,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

export default function SummaryModal({
  id,
  title,
  description,
  topic,
  author_id,
  date,
  file_reference,
}: Summary) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User>();
  const [downloadUrl, setDownloadUrl] = useState<string>();

  useEffect(() => {
    getUserDoc(author_id).then((value) => setUser(value));
    getSummaryDownloadUrl(file_reference).then((value) =>
      setDownloadUrl(value)
    );
  }, [author_id, file_reference]);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, cursor: "pointer" }}
        onClick={onOpen}
      >
        <HStack backgroundColor="green.50" rounded="lg" padding={4} gap={8}>
          <Text fontSize="xl">{title}</Text>
          <HStack>
            <Badge colorScheme="green">{topic}</Badge>
            {user && <Text>{user.name}</Text>}
          </HStack>
        </HStack>
      </motion.div>

      <Modal id={id} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm" textColor="gray.400" fontWeight="normal">
            {id}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody padding={6}>
            <VStack gap={4}>
              <Text fontSize="4xl">{title}</Text>
              <Text fontSize="xl">{description}</Text>
              <HStack>
                <Badge
                  colorScheme="green"
                  fontSize="sm"
                  paddingX={2}
                  paddingY={1}
                  rounded="full"
                >
                  {topic}
                </Badge>
                <Text>
                  {formatDistance(parseISO(date), new Date(), {
                    addSuffix: true,
                    locale: esLocale,
                  })}
                </Text>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack width="full" justifyContent="space-between">
              {user && (
                <HStack gap={2}>
                  <Image
                    src={user.avatar}
                    alt={`${user.name}'s profile picture.`}
                    width={24}
                    height={24}
                    style={{ borderRadius: "50%" }}
                  />
                  <Text>{user.name}</Text>
                </HStack>
              )}
              <a href={downloadUrl} target="_blank" rel="noreferrer">
                <Button colorScheme="green" rightIcon={<FaFilePdf />}>
                  Ver archivo
                </Button>
              </a>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
