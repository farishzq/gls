import React, { useEffect } from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';
import "@/styles/globals.css";
//import '@react-next-calendar/core/styles.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>GFIS HRIS 0.1</title>
        <meta name="description" content="Human Resource Information System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {Component.auth ? <Auth><Component {...pageProps} /></Auth>
        : <Component {...pageProps} />
      }
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;
  const router = useRouter();

  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) router.push('/')
    // If not authenticated, force log in
  }, [isUser, loading, router])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Auth is processing. Loading...</div>
}

export default MyApp;
