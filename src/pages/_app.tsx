import "@/styles/globals.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const {session} = pageProps;
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <SessionProvider session={session}>
 <Component {...pageProps} />
    </SessionProvider>
 
  );
}
