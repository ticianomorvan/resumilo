import { AppProps } from "next/app";

// Styles
import "@fontsource/inter";
import "styles/globals.css.ts";
import "sanitize.css";

// Progress Bar
import Router from "next/router";
import nProgress from "nprogress";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
