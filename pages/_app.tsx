/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from '../components/Header';
import '../css/tailwind.css';
import Layout from '../components/Layout';
import TokenManager from '../components/TokenManager';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => (
  <>
    <TokenManager />
    <Layout>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <footer />
    </Layout>
  </>
);

export default MyApp;
