import { Provider, createClient } from "urql";
import Navbar from "@/components/navbar/Navbar";
import { CartContextProvider } from "@/utilities/context/context";

import "../styles/globals.css";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Provider value={client}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </CartContextProvider>
  );
}
