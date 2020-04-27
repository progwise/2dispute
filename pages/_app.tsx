/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from '../components/Header/Header';
import '../css/tailwind.css';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => (
  <div className="max-w-screen-lg mx-auto shadow-lg border p-2">
    <Header />
    <main>
      <Component {...pageProps} />
    </main>
    <footer />
  </div>
);

export default MyApp;
