import { NextPage } from "next";

import Link from "next/link";
import Head from "next/head";
import Button from "../components/button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Resumilo es una plataforma digital que permite a sus usuarios compartir sus apuntes de estudio y obtener una recompensa por ello."
        />
        <title>Resumilo, un hogar para tus resúmenes.</title>
      </Head>
      <h1>Resumilo</h1>
      <h2>Un hogar para tus resúmenes</h2>
      <Link href="resumenes">
        <Button variant="ghost">Resúmenes</Button>
      </Link>
    </>
  );
};

export default Home;
