import { Provider, createClient } from "urql";
import Navbar from "../components/navbar/Navbar";
import { CartContextProvider } from "../utilities/context/context";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartContextProvider>
        <Provider value={client}>
          <Toaster />
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </CartContextProvider>
    </UserProvider>
  );
}
