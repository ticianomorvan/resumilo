import { ReactNode } from "react";
import Head from "next/head";
import { VStack } from "@chakra-ui/react";
import Navbar from "../navbar";

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

const BaseLayout = ({ title, children }: Props) => (
  <>
    <Head>
      <meta
        name="description"
        content="Resumilo es una plataforma digital que te permite compartir tus resúmenes de forma fácil y ser recompensado por ello."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>

    <VStack
      width="100%"
      height="container.sm"
      justifyContent="center"
      userSelect="none"
    >
      <Navbar />
      {children}
    </VStack>
  </>
);

export default BaseLayout;
