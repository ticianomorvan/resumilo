import Head from "next/head";
import Navbar from "components/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
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
