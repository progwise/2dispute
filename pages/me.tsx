import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../utils/withApollo';
import {
  ChatBoxRightSideContent,
  ChatBoxHeader,
} from '../components/ChatBox/ChatBoxRightSide';
import useUser from '../utils/react-hooks/useUser';
import { UserInfoById, UserInfoHeader } from '../components/UserInfo';

const Me = (): JSX.Element | null => {
  const router = useRouter();
  const user = useUser();

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push(`/api/auth/twitter?redirectTo=${router.asPath}`);
    }
    return null;
  }

  return (
    <>
      <ChatBoxHeader>
        <UserInfoHeader userId={user.twitterId} />
      </ChatBoxHeader>
      <ChatBoxRightSideContent>
        <UserInfoById userId={user.twitterId} />
      </ChatBoxRightSideContent>
    </>
  );
};

Me.getInitialProps = (): { [prop: string]: unknown } => ({
  namespacesRequired: ['common'],
});

export default withApollo(Me);
