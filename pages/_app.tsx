import { AppProps } from "next/app";

import "@fontsource/inter";
import "../styles/globals.css.ts";
import "sanitize.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
