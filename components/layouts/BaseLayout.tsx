import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "../navbar";

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
    <Navbar />
    {children}
  </VStack>
);

export default BaseLayout;
