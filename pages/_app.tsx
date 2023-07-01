import React from 'react';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss';
import Head from 'next/head';


const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/footer-cat.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
