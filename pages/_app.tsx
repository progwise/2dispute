/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from '../components/Header';
import '../css/tailwind.css';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => (
  <div className="px-8">
    <div className="max-w-screen-lg mx-auto">
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <footer />
    </div>
  </div>
);

export default MyApp;
