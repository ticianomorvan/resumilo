import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

type Layout = {
  children: ReactNode | ReactNode[];
};

const BaseLayout = ({ children }: Layout) => (
  <VStack
    width="100%"
    height="container.sm"
    justifyContent="center"
    userSelect="none"
  >
    {children}
  </VStack>
);

export default BaseLayout;
