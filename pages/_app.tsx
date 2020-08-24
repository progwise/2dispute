/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '../css/tailwind.css';
import Layout from '../components/Layout';
import TokenManager from '../components/TokenManager';
import { ChatContextProvider } from '../components/ChatBox/ChatContext';
import Seo from '../components/Seo';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => (
  <div className="h-screen">
    <Seo />
    <TokenManager />
    <Layout className="h-full">
      <main className="h-full">
        <Component {...pageProps} />
      </main>
      <footer />
    </Layout>
  </div>
);

const MyAppWithProvider = (props): JSX.Element => (
  <ChatContextProvider>
    <MyApp {...props} />
  </ChatContextProvider>
);

export default MyAppWithProvider;
