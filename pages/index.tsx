import { NextPage } from "next";
import BaseLayout from "../components/layouts/BaseLayout";

import { Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <BaseLayout title="Resumilo">
      <Heading as="h1" fontSize="8xl">
        Resumilo
      </Heading>
      <Heading as="h2" fontWeight="normal">
        Un hogar para tus resúmenes
      </Heading>

      <Link href="/resumenes">
        <Button>Resumenes</Button>
      </Link>
    </BaseLayout>
  );
};

export default Home;
