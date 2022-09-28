import { NextPage } from "next";

import { Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Heading as="h1" fontSize="8xl">
        Resumilo
      </Heading>
      <Heading as="h2" fontWeight="normal">
        Un hogar para tus resúmenes
      </Heading>

      <Link href="/resumenes">
        <Button>Resumenes</Button>
      </Link>
    </>
  );
};

export default Home;
