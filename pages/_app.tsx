import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@fontsource/jost";

const theme = extendTheme({
  fonts: {
    heading: `'Jost', system-ui, sans-serif`,
    body: `'Jost', system-ui, sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
