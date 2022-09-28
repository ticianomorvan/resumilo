import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@fontsource/jost";
import UserProvider from "../context/user_context";

const theme = extendTheme({
  fonts: {
    heading: `'Jost', system-ui, sans-serif`,
    body: `'Jost', system-ui, sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
