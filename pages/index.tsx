import { NextPage } from "next";

import Link from "next/link";
import Head from "next/head";
import SummaryModal from "../components/summary";

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
      <h2 className="text-4xl">Un hogar para tus resúmenes</h2>

      <Link href="resumenes">
        <button className="button">Resúmenes</button>
      </Link>

      <SummaryModal
        id="2222"
        title="titu"
        description="desc"
        topic="topc"
        file_reference="image"
        author_id="2122"
        date="2022-05-23"
      />
    </>
  );
};

export default Home;
