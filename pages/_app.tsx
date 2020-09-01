/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
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

export default withApollo(MyApp);
