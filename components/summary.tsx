import { useEffect, useState } from "react";
import { Summary } from "../types/summary";
import { User } from "../types/user";
import { getSummaryDownloadUrl, getUserDoc } from "../lib/firebase";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";
import { parseISO, formatDistance } from "date-fns";
import { motion } from "framer-motion";
import esLocale from "date-fns/locale/es";

import * as Dialog from "@radix-ui/react-dialog";
import Button from "./button";

// Components

export default function SummaryModal({
  id,
  title,
  description,
  topic,
  author_id,
  date,
  file_reference,
}: Summary) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [downloadUrl, setDownloadUrl] = useState<string>();

  useEffect(() => {
    getUserDoc(author_id).then((value) => setUser(value));
    getSummaryDownloadUrl(file_reference).then((value) =>
      setDownloadUrl(value)
    );
  }, [author_id, file_reference]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button>Abrir</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex justify-center items-center bg-zinc-800/60 backdrop-blur-sm dialog-overlay">
          <Dialog.Content className="w-2/6 bg-white p-4 rounded-lg dialog-content">
            <Dialog.Title className="flex justify-between">
              <p className="text-md text-zinc-300">{id}</p>
            </Dialog.Title>
            <Dialog.Description>
              <p>{description}</p>
              <p>{topic}</p>
              <p>
                {formatDistance(parseISO(date), new Date(), {
                  addSuffix: true,
                  locale: esLocale,
                })}
              </p>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/*
<ModalOverlay />
<motion.div
          whileHover={{ scale: 1.05, cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-col bg-green-50 rounded-lg p-4 gap-8">
            <p className="text-xl">{title}</p>
            <div className="flex flex-col">
              <span className="bg-green-100 text-green-900">{topic}</span>
              {user && <p>{user.name}</p>}
            </div>
          </div>
        </motion.div>
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
*/
