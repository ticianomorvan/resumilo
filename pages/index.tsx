import Head from "next/head";
import { useRouter } from "next/router";
import { container, primaryCta } from "styles/pages/index.css";
import Button from "components/button";

const Home = () => {
  const router = useRouter();
  return (
    <div className={container}>
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
      <Button
        otherClasses={primaryCta}
        onClick={() => router.push("/resumenes")}
      >
        Resúmenes
      </Button>
    </div>
  );
};

export default Home;
