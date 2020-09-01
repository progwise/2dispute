import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../utils/withApollo';
import { ChatBoxRightSideContent } from '../components/ChatBox/ChatBoxRightSide';
import useUser from '../utils/react-hooks/useUser';
import { UserInfoById } from '../components/UserInfo';

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
    <ChatBoxRightSideContent>
      <UserInfoById userId={user.twitterId} />
    </ChatBoxRightSideContent>
  );
};

export default withApollo(Me);
