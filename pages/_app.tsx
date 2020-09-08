/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import App from 'next/app';
import '../css/tailwind.css';
import Layout from '../components/Layout';
import TokenManager from '../components/TokenManager';
import { ChatContextProvider } from '../components/ChatBox/ChatContext';
import Seo from '../components/Seo';
import { UserProvider } from '../utils/react-hooks/useUser';
import ChatBox from '../components/ChatBox';
import withApollo from '../utils/withApollo';
import { SelectedChatItemProvider } from '../utils/react-hooks/useSelectChatItem';
import { DisplayChatListOnSmallDevicesProvider } from '../utils/react-hooks/useDisplayChatListOnSmallDevices';
import i18n from '../utils/i18n';

interface MyAppProp {
  Component: new (props: any) => React.Component;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProp): JSX.Element => (
  <UserProvider>
    <SelectedChatItemProvider>
      <DisplayChatListOnSmallDevicesProvider>
        <ChatContextProvider>
          <div className="h-screen">
            <Seo />
            <TokenManager />
            <Layout className="h-full">
              <main className="h-full">
                <ChatBox>
                  <Component {...pageProps} />
                </ChatBox>
              </main>
              <footer />
            </Layout>
          </div>
        </ChatContextProvider>
      </DisplayChatListOnSmallDevicesProvider>
    </SelectedChatItemProvider>
  </UserProvider>
);

MyApp.getInitialProps = async (appContext): Promise<{ pageProps: any }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default i18n.appWithTranslation(withApollo(MyApp));
