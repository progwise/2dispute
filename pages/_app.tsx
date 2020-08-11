/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Header from '../components/Header';
import '../css/tailwind.css';
import Layout from '../components/Layout';
import TokenManager from '../components/TokenManager';
import { FullPageProvider, FullPageContext } from '../components/FullPage';
import { ChatContextProvider } from '../components/ChatBox/ChatContext';
import Seo from '../components/Seo';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => {
  const isFullPage = useContext(FullPageContext).fullPage;

  const className = isFullPage ? 'grid h-screen grid-rows-fullPage' : undefined;

  return (
    <div className={className}>
      <Seo />
      <TokenManager />
      <Header />
      <Layout className="h-full">
        <main className="h-full">
          <Component {...pageProps} />
        </main>
        <footer />
      </Layout>
    </div>
  );
};

const MyAppWithProvider = (props): JSX.Element => (
  <FullPageProvider>
    <ChatContextProvider>
      <MyApp {...props} />
    </ChatContextProvider>
  </FullPageProvider>
);

export default MyAppWithProvider;
