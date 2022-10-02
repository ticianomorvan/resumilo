import { NextPage } from "next";

import Link from "next/link";
import Head from "next/head";
import Button from "../components/button";
import { Summary } from "../types/summary";
import { storeSummaryIndexes } from "../lib/utils";

const summaries: Summary[] = [
  {
    id: "1111111",
    title: "111111111",
    description: "1111111",
    topic: "1111111",
    file_reference: "11111",
    author_id: "11111111",
    date: "11111111",
  },
  {
    id: "2222222222",
    title: "2222222222",
    description: "2222222222",
    topic: "2222222222",
    file_reference: "2222222222",
    author_id: "2222222222",
    date: "2222222222",
  },
];

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
    </>
  );
};

export default Home;
