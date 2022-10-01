import { ReactNode, Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { container } from "../../styles/layout.css";
const Navbar = dynamic(() => import("../navbar"));

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

    <div className={container}>
      <Toaster />
      <Suspense fallback={`Loading...`}>
        <Navbar />
      </Suspense>
      <main>{children}</main>
    </div>
  </>
);

export default BaseLayout;
