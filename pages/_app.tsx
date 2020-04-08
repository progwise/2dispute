/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '../css/tailwind.css';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => (
  <div className="max-w-screen-lg mx-auto shadow-lg border p-2">
    <header className="w-full text-center  py-4">
      <span className="text-2xl">2 Dispute</span>
    </header>
    <main>
      <Component {...pageProps} />
    </main>
    <footer />
  </div>
);

export default MyApp;
