// Types
import { UseToastOptions } from "@chakra-ui/react";

export const errorToast = (error: string) => {
  const options: UseToastOptions = {
    title: 'Hubo un problema.',
    description: error,
    status: 'error',
    isClosable: true
  }

  return options;
}