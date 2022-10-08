import Head from 'next/head';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import container from 'styles/layouts/minimal.css';

interface Props {
  title: string;
  children: ReactNode | ReactNode[];
}

function MinimalLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Resumilo es una plataforma digital que te permite compartir tus resúmenes de forma fácil y ser recompensado por ello."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{`${title} | Resumilo`}</title>
      </Head>

      <div className={container}>
        <Toaster />
        <main>{children}</main>
      </div>
    </>
  );
}

export default MinimalLayout;
